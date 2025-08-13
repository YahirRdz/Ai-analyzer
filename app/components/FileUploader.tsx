import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {formatSize} from '../lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}


const FileUploader = ({onFileSelect} :FileUploaderProps) => {
    // Define max file size constant for reuse
    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

    const onDrop = useCallback((acceptedFiles: File[])  => {
        const file = acceptedFiles[0] ||  null;

        onFileSelect?.(file);
    }, [onFileSelect])
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDrop
    ,multiple: false,
    accept: { 'application/pdf': ['.pdf']},
        maxSize: MAX_FILE_SIZE
    })
    const file = acceptedFiles[0] || null;



    return (
        <div className="w-full gradient-border">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="space-y-4 cursor-pointer">
                    <div className="mx-auto w-16 h-16 flex items-center justify-between">
                        <img src="/public/icons/info.svg" alt="upload" className="size-20"/>
                    </div>
                    {file ? (
                        <div>
                            <img src="/public/images/pdf.png" alt="pdf" className="size-10"/>


                        <div className="flex items-center space-x-3">
                            <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
                            <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                                <span className="font-semibold">{file.name}</span>
                            </p>
                            <p className="text-sm text-gray-500">
                                Size: {formatSize(file.size)}
                            </p>


                            </div>
                        </div>
                    ):(
                        <div>
                        </div>
                            <p className="text-lg text-gray-500">
                                <span className="font-semibold">
                                    Click to upload a file
                                </span>
                                or drag and drop file
                            </p>
                            <p className="text-lg text-gray-500">PDF </p>
                        </div>
                    ):(
                        <div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileUploader;