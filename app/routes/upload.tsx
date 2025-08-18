import {type FormEvent, useState} from "react";
import React from 'react';
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2timage";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "~/routes/constants";

const Upload = () => {
    const {auth, isLoading, fs, ai, kv} = usePuterStore();
    const navigate = useNavigate();
    const [IsProcesing, setIsProcesing] = useState(false
    );
    const [file, setFile] = useState <File | null>(null);
    const [statusText, setStatusText] = useState('')
    const handleFileSelect  = (file: File | null  ) => {
        setFile(file)
    }

    const handleAnalyze = async ({companyName, jobTitle, jobDescription, file}: {companyName: string, jobTitle: string, jobDescription: string, file: File}) => {
        setIsProcesing(true);
        setStatusText('Analyzing your resume...');
        const uploaderFile = await fs.upload([file]);

        if(!uploaderFile) return setStatusText('Error uploading file');

        setStatusText('Converting to image...');
        const imageFile = await  convertPdfToImage(file);
        console.log(imageFile);
        console.log("se tomo la imagen.");


        if(!imageFile.file) return setStatusText('Failed to convert to PDF to image');
        setStatusText('Uploading image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText('Error uploading image');

        setStatusText('Preparing data...');

        const uuid = generateUUID();

        const data = {
            id: uuid,
            resumePath: uploaderFile.path,
            imagePath: uploadedImage.path,
            companyName,
            jobTitle,
            jobDescription,
            feedback: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        await  kv.set(`resume: ${uuid}`, JSON.stringify(data));
        setStatusText('Analyzing');

        const feedback = await ai.feedback(
            uploaderFile.path,
            prepareInstructions({jobTitle,jobDescription})
        )

        if (!feedback) return setStatusText('Error analyzing');

        const feedbackText = typeof feedback.message.content === 'string'
        ? feedback.message.content : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume: ${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete, redirecting to results');
        console.log(data);
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

       const companyName = formData.get('company-name') as string;
       const jobTitle = formData.get('job-title') as string;
       const jobDescription = formData.get('job-description')as string;


         if(!file) return;

        handleAnalyze({companyName, jobTitle, jobDescription, file});


    }
    
    
    return (
        <main className="bg-amber-100">
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Smart feed back for your dream job</h1>
                    {
                        IsProcesing ? (
                            <>
                                <h2>{statusText}</h2>
                                <img src="public/images/resume-scan.gif" className="w-full"/>
                            </>
                        ): (
                            <h2>Drop your resume for an ATS score and improvement tips</h2>
                        )
                    }
                    {
                        !IsProcesing ? (
                            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                                <div className="form-div">
                                    <label htmlFor="company-name"> company name</label>
                                    <input type="text" name="company-name" placeholder="Company name" id="company-name"  />
                                </div>
                                <div className="form-div">
                                    <label htmlFor="job-title"> Job title</label>
                                    <input type="text" name="job-title" placeholder="job-title" id="job-title"  />
                                </div>
                                <div className="form-div">
                                    <label htmlFor="job-description"> company name</label>
                                    <textarea rows={5} name="job-description" placeholder="job-description" id="job-description"  />
                                </div>
                                <div className="form-div">
                                    <label htmlFor="uploader">Upload your resume</label>
                                    <FileUploader onFileSelect={handleFileSelect} />
                                </div>
                                <button className="primary-button" type="submit">Submit</button>
                            </form>
                        ): null
                    }
                </div>

            </section>
        </main>

    );
};


//"Failed to convert PDF: UnknownErrorException: The API version "5.4.54" does not match the Worker version "5.3.93"."

export default Upload;

