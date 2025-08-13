import {type FormEvent, useState} from "react";
import React from 'react';
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";

const Upload = () => {
    const [IsProcesing, setIsProcesing] = useState(false
    );
    const [file, setFile] = useState <File | null>(null);
    const [statusText, setStatusText] = useState('')
    const handleFileSelect  = (file: File | null  ) => {
        setFile(file)
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

       const companyName = formData.get('company-name');
       const jobTitle = formData.get('job-title');
       const jobDescription = formData.get('job-description');


        console.log({companyName, jobTitle, jobDescription, file})


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

export default Upload;

