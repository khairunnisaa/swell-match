'use client'
import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import VisitorDetail from "./VisitorDetail"
import VisitorDetail2 from "./VisitorDetail2"
import VisitorDetail3 from "./VisitorDetail3"
import VisitorDetail4 from "./VisitorDetail4"
import ProgresElement from './Progres';
import { z } from "zod";
const mime = require('mime-types')
import { postApiData } from '@/function/api';
import Swal from 'sweetalert2'

export default function Form() {
    interface FileData {
        name: string;
        size: number;
    }

    const [uploadedFile, setUploadedFile] = useState<FileData | null>(null);
    const [fileUrl, setFileUrl] = useState<string>(''); // State to store the URL link of the uploaded image
    const [selectBoard, setSelectBoard] = useState(null)
    const [currentStep, setCurrentStep] = useState(1);
    const [selectCountry, setSelectCountry] = useState<null>(null)
    const [validationCountry, setValidationCountry] = useState(true)
    const [validationBoard, setValidationBoard] = useState<boolean>(true)
    const [valudationImage, setValidationImage] = useState<boolean>(true)
    const [messageValidationImage, setMessageValidationImage] = useState<string>('Please upload your identity')
    const [dataBody, setDataBody] = useState<{
        name: any;
        email: any;
        whatsapp_number: any;
        surfing_experience: any;
        visit_date: any;
        desired_board: any;
        id_card_image: any;
        link_url_path:any;
    }>({
        name: '',
        email: '',
        whatsapp_number: '',
        surfing_experience: '',
        visit_date: '',
        desired_board: '',
        id_card_image: '',
        link_url_path:''
    });
    const [valueSurfing, setValueSurfing] = useState(0)
    const [validationError, setValidationError] = useState<any>(undefined)
    const [dataBooking, setDataBooking] = useState<object>({})
    const [loading, setLoading] = useState<boolean>(false)

    const formSchema1 = z.object({
        name: z.string().min(3).max(30),
        email: z.string().email({message: 'Invalid email format'}),
        whatsapp_number: z.string().regex(/^\+[1-9]\d{1,14}$/, {message: 'Use +(country code). Ex: +62812345678'}),
    })

    const formSchema2 = z.object({
        visit_date: z.string().date()
    })

    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
    const allowedImageExtensions = ['png', 'jpg', 'jpeg'];

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);
        console.log("fileurl",fileUrl);
        setUploadedFile({ name: file.name, size: file.size });
        setFileUrl(fileUrl); // Set the URL link of the uploaded image
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
    });
    const handleBoard = (value:any) => {
        setSelectBoard(() => value)
    }
    const handleCountry = (value:any) => {
        setSelectCountry(value)
    }

    const handleChange = (event: any) => {
        const { name, value } = event?.target;
        setDataBody(prevData => ({
            ...prevData,
            country_id: parseInt(selectCountry ?? '0'),
            surfing_experience: valueSurfing,
            desired_board: selectBoard,
            id_card_image: uploadedFile,
            link_url_path: fileUrl,
            [name]: value
        }));
    };

    useEffect(() => {
        setDataBody(prevData => ({
            ...prevData,
            desired_board: selectBoard,
            id_card_image: uploadedFile,
            link_url_path: fileUrl
        }));
    }, [selectBoard, uploadedFile,fileUrl]);


    const nextStep = async () => {
        setValidationError([])
        // Check the current step and execute the appropriate logic
              if(currentStep === 1){
                  try {
                      // Validate member data using Zod schema
                      setValidationCountry(selectCountry !== null);
                      formSchema1.parse(dataBody);
                      if (selectCountry !== null) {
                          // Extract member data from dataBody
                          const { name, email, whatsapp_number } = dataBody;

                          // Validate member data using Zod schema
                          formSchema1.parse({ name, email, whatsapp_number });

                          // Save member first
                          const { data: memberData } = await postApiData({ endPoint: 'members', dataBody: { name, email, whatsapp_number } });

                          setDataBody(prevData => ({ ...prevData, member_id: memberData.id }));
                          // Proceed to the next step
                          setCurrentStep(currentStep + 1);
                      }
                  } catch (error:any) {
                      console.error(error.errors);
                      setValidationError(error.errors)
                      // Check if the error response from the backend contains a message
                      if (error.response && error.response.data && error.response.data.message) {
                          console.error("membersss error",[error.response.data.message]);
                          setValidationError([error.response.data.message]);
                      }
                  }
              }else if(currentStep === 2){
                  try {
                      // Validate additional data for step 2
                      setValidationBoard(selectBoard !== null);
                      formSchema2.parse(dataBody);
                      if (selectBoard !== null) {
                          // Proceed to the next step
                          setCurrentStep(currentStep + 1);
                      }
                  } catch (error:any) {
                      console.error(error.errors);
                      setValidationError(error.errors)
                  }
              } else if(currentStep === 3) {
                  // Handle step 3, which involves file upload and booking creation
                  setLoading(true);
                  try {
                      if (uploadedFile !== null) {
                          // Check if the uploaded file size is within the limit
                          if (uploadedFile.size > MAX_FILE_SIZE) {
                              setMessageValidationImage('File is too large')
                              setLoading(false)
                          } else {
                              // Check MIME type of the uploaded file
                              const mimeType = mime.lookup(uploadedFile.name);
                              const fileExtension = mimeType ? mime.extension(mimeType) : null;

                              // Check if the file is an image and has an allowed extension
                              if (fileExtension && allowedImageExtensions.includes(fileExtension)) {
                                  // Perform API call to create a booking
                                  const { data, success } = await postApiData({ endPoint: 'bookings', dataBody: dataBody });

                                  // Handle successful booking creation
                                  if (success) {
                                      // Show success message
                                      const Toast = Swal.mixin({
                                          toast: true,
                                          position: "top-end",
                                          showConfirmButton: false,
                                          timer: 3000,
                                          timerProgressBar: true,
                                          didOpen: (toast) => {
                                              toast.onmouseenter = Swal.stopTimer;
                                              toast.onmouseleave = Swal.resumeTimer;
                                          }
                                      });
                                      Toast.fire({
                                          icon: "success",
                                          title: "Your book visit request has been recorded."
                                      });

                                      // Update state with booking data
                                      setDataBooking(data);
                                      console.log("data booking success",data)

                                      // Proceed to the next step
                                      setCurrentStep(currentStep + 1);

                                      // Reset loading state
                                      setLoading(false);
                                  }
                              } else {
                                  // Show error message for unsupported file type
                                  setMessageValidationImage('The file type is not supported or is not an image')
                                  setLoading(false);
                              }
                          }
                      } else {
                          // Show error message for missing file
                          setValidationImage(false);
                          setLoading(false);
                      }
                  } catch (error:any) {
                      // Handle unexpected errors
                      let errorMessage = 'An unexpected error occurred.';

                      // Check if the error is from Axios and contains a response message
                      if (error.isAxiosError && error.response && error.response.data && error.response.data.message) {
                          errorMessage = error.response.data.message;
                      }

                      // Show error message
                      const Toast = Swal.mixin({
                          toast: true,
                          position: "top-end",
                          showConfirmButton: false,
                          timer: 3000,
                          timerProgressBar: true,
                          didOpen: (toast) => {
                              toast.onmouseenter = Swal.stopTimer;
                              toast.onmouseleave = Swal.resumeTimer;
                          }
                      });

                      await Toast.fire({
                          icon: "error",
                          title: errorMessage
                      });

                      // Reset loading state
                      setLoading(false);
                  }
              }
    };

    const renderVisitorDetail = () => {
        switch (currentStep) {
            case 1:
                return <VisitorDetail validationCountry={validationCountry} handleChange={handleChange} handleCountry={handleCountry} validationError={validationError}/>;
            case 2:
                return <VisitorDetail2 validationBoard={validationBoard} setValue={setValueSurfing} handleChange={handleChange} value={valueSurfing} handleBoard={handleBoard} validationError={validationError}/>;
            case 3:
                return <VisitorDetail3 messageValidationImage={messageValidationImage} uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} validationImage={valudationImage} getInputProps={getInputProps} getRootProps={getRootProps}/>;
            case 4:
                return <VisitorDetail4 dataBooking={dataBooking}/>;
            default:
                return null;
        }
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout; // decide type of timeout

        if (currentStep === 4) {
            timeout = setTimeout(() => {
                setCurrentStep(1); // back to step after 10 seconds
                setDataBody({
                    name: '',
                    email: '',
                    whatsapp_number: '',
                    surfing_experience: '',
                    visit_date: '',
                    desired_board: '',
                    id_card_image: '',
                    link_url_path:''
                })
                setValidationError(undefined)
            }, 10000); // 10 detik
        }

        return () => clearTimeout(timeout); // clear timeout
    }, [currentStep]);


    return (
        <>
            {renderVisitorDetail()}
            {currentStep < 4 && (
                <button disabled={loading} className={`font-semibold text-black bg-white text-md ${currentStep === 3 && loading ? `flex gap-2 items-center px-10 py-2` : `px-16 py-4`}`} onClick={nextStep}>{currentStep === 3 && loading ? <><ProgresElement/> <p>Book my visit</p></>  : currentStep === 3 ? 'Book my visit' : 'Next'}</button>
            )}
            {currentStep === 4 && (
                <p className="text-base text-gray-400">This form will refresh automatically in 10 seconds</p>
            )}
        </>
    );
}
