'use client'

import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone'; // Import the useDropzone hook

export default function VisitorDetail3({
                                           uploadedFile,
                                           setUploadedFile,
                                           validationImage,
                                           messageValidationImage,
                                       }: {
    uploadedFile: any,
    setUploadedFile: any,
    validationImage: boolean,
    messageValidationImage: string,
    getRootProps: any,
    getInputProps: any
}) {
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (acceptedFiles: File[]) => { // Handle file drop
        console.log("diterima:", acceptedFiles)
        setDragging(false);
        const file = acceptedFiles[0];
        handleFile(file);
    };

    const handleDragOver = () => { // Handle drag over
        setDragging(true);
    };

    const handleDragLeave = () => { // Handle drag leave
        setDragging(false);
    };

    const handleAreaClick = () => { // Handle click on area
        fileInputRef.current?.click();
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Handle file input change
        const file = e.target.files?.[0];
        handleFile(file);
    };

    const handleFile = (file: File | undefined) => { // Handle file
        if (file && file.type.startsWith('image/')) {
            setUploadedFile(file);
        } else {
            setUploadedFile(null); // Clear uploaded file
        }
    };

    // Use getRootProps and getInputProps from useDropzone hook
    const {getRootProps, getInputProps} = useDropzone({onDrop: handleDrop});

    return (
        <>
            <h1 className='mb-5 text-5xl bodoni-moda'>Book Your Visit</h1>
            <p className='text-sm inter'>3/3: ID VERIFICATION</p>
            <form className={`grid grid-cols-2 mt-12 gap-x-10 gap-y-14 inter ${!validationImage ? '' : 'mb-12'}`}
                  {...getRootProps()} // Spread the getRootProps onto the form
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}>
                <p className="col-span-2">Help us verify your identity by uploading a photo of your ID/KTP or Passport</p>
                <div className={`bg-[#1A1A1A] p-5 col-span-2 cursor-pointer ${dragging ? 'border-dashed border-2 border-blue-500' : ''}`}
                     onClick={handleAreaClick}>
                    {uploadedFile ? (
                        <div className="flex items-center justify-between">
                            <div className='flex items-center gap-5'>
                                <svg className="w-6 h-6 text-[#BAFF00] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"/>
                                </svg>
                                <div className='text-left'>
                                    <p className="font-semibold text-md">{uploadedFile.name}</p>
                                    <p className="text-[#6A6A6A]">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                                </div>
                            </div>
                            <svg onClick={() => setUploadedFile(null)} className="w-6 h-6 text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                            </svg>

                        </div>
                    ) : (
                        <>
                            <div {...getRootProps({className: 'dropzone'})} >
                                <p className="text-xl font-bold">Drag & Drop</p>
                                <p className="my-5 text-[#6A6A6A]">or select file from device max. 2MB</p>
                                <input {...getInputProps()} ref={fileInputRef} className="hidden" type="file" onChange={handleFileInputChange} />
                                <p className="text-xl underline">Upload</p>
                            </div>
                        </>
                    )}
                </div>
            </form>
            <p className={`text-red-500 mt-2 mb-12 ${!validationImage ? '' : 'hidden'}`}>{messageValidationImage}</p>
        </>
    );
}

