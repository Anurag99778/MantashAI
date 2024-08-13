import React, { useState, useEffect } from 'react';
import { MdCancel } from "react-icons/md";
import ClipLoader from 'react-spinners/ClipLoader';
import { FaBell } from "react-icons/fa"; 
import { Line, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';

const progressMessages = [
  "Analyzing Vessel Images...",
  "Processing Data...",
  "Evaluating Rust Levels...",
  "Assessing Hull Fouling...",
  "Generating Detailed Report...",
  "Finalizing Results...",
  "Almost There...",
  "Completing Analysis...",
  "Preparing Output..."
];

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(true);
  const [loading, setLoading] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [result, setResult] = useState(false);
  const [rustPercentage, setRustPercentage] = useState(null);
  const [segmentedImages, setSegmentedImages] = useState([]); // Changed to array for multiple images

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    const storedResult = JSON.parse(localStorage.getItem('analysisResult'));
    setFiles(storedFiles);
    if (storedResult) {
      setRustPercentage(storedResult.rustPercentage);
      setSegmentedImages(storedResult.segmentedImages);
      setResult(true);
    }
  }, []);

  const handleFileUpload = (event) => {
    const uploadedFiles = event.target.files || event.dataTransfer.files;
    const newFiles = Array.from(uploadedFiles).map((file) => {
      const fileURL = URL.createObjectURL(file);
      return {
        id: file.name + '-' + Date.now(),
        file: file, // Store the actual File object
        name: file.name,
        progress: 0,
        url: fileURL
      };
    });
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setUploaded(true);
    uploadFiles(newFiles);
  };

  const uploadFiles = (filesToUpload) => {
    setUploading(true);
    filesToUpload.forEach((file) => {
      const interval = setInterval(() => {
        setFiles((prevFiles) => {
          return prevFiles.map((f) =>
            f.id === file.id ? { ...f, progress: f.progress + 10 } : f
          );
        });
      }, 500);

      setTimeout(() => {
        clearInterval(interval);
        setFiles((prevFiles) => {
          return prevFiles.map((f) =>
            f.id === file.id ? { ...f, progress: 100 } : f
          );
        });
        setUploading(false);
      }, 5000);
    });
  };

  const handleGenerate = () => {
    setUploaded(false);
    setLoading(true);
    setMessageIndex(0);

    const formData = new FormData();
    files.forEach(file => {
        formData.append('files', file.file); // Use the actual File object
    });
    
    axios.post('http://localhost:5000/api/upload', formData, { // Ensure the URL matches your backend's route
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      const { urls, rustPercentage } = response.data;
      setRustPercentage(rustPercentage);  // Set based on your API's analysis result
      setSegmentedImages(urls);  // Assuming the API returns an array of URLs of processed images
      setLoading(false);
      setResult(true);
      localStorage.setItem('analysisResult', JSON.stringify({ rustPercentage, segmentedImages: urls }));
    })
    .catch(error => {
      console.error('Error uploading file:', error);
      setLoading(false);
    });

    const progressInterval = setInterval(() => {
      setMessageIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (newIndex >= progressMessages.length) {
          clearInterval(progressInterval);
          setLoading(false);
          setResult(true);
        }
        setProgressMessage(progressMessages[newIndex] || "Completing Analysis...");
        return newIndex;
      });
    }, 2000); // Slow down progress messages to simulate real-time processing
  };

  useEffect(() => {
    localStorage.setItem('uploadedFiles', JSON.stringify(files));
    setUploaded(true);
  }, [files]);

  const handleDeleteFile = (fileId) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };

  const handleViewFile = (url) => {
    window.open(url, '_blank');
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFileUpload(event);
  };

  const rustData = {
    labels: ['Current Level', 'Rust-Free'],
    datasets: [
      {
        label: 'Overall Rust Percentage',
        data: [rustPercentage, 100 - rustPercentage],
        backgroundColor: ['red', 'grey']
      }
    ]
  };

  return (
    <div className="flex h-screen overflow-auto">
      {/* Main content */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div className='flex items-center justify-between bg-primary p-4 -mt-5 rounded-lg font-bold text-xl'><span className='text-xl'>Dashboard</span>
        <div className="relative mr-4 cursor-pointer text-gray-700 hover:text-gray-900">
           {/* Notification icon */}
           <FaBell 
  size={24} 
  onClick={() => setShowNotifications(!showNotifications)} 
  className={`rounded-full p-1 ${showNotifications ? 'bg-upload' : 'hover:bg-upload'}`} 
/>

            
          <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-red-600 rounded-full"></span> {/* Notification dot */}
          {showNotifications && (
            <div       className={`absolute right-0 mt-1 w-64 bg-slate-100 border rounded-lg shadow-lg transition-all duration-300 ease-in-out transform ${
              showNotifications ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
              <div className="p-1 -mt-3">
                <h3 className="font-bold ">Current Alerts</h3>
                <div className="mt-2">
                  <div className="flex items-center">
                    <span className="mr-2 text-yellow-600">⚠️</span>
                    <span >Rust detected in image3.png</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="mr-2 text-red-600">🔴</span>
                    <span>Critical biofouling in image1.jpeg</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div></div>
        {/* Upload section */}
        <div className="bg-primary p-4 mb-5 rounded-lg shadow-md ">
          <h2 className="text-xl font-bold mt-0">Upload files</h2>
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center  bg-upload rounded-3xl p-3 cursor-pointer hover:bg-gray-400"
            style={{ width: '80%', maxWidth: '600px', margin: '0 auto' }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 00-1.414 0L12 13.586V3a1 1 0 10-2 0v10.586l-3.293-3.293a1 1 0 00-1.414 1.414l5 5a 1 1 0 001.414 0l5-5a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-600">Drag and Drop Here</span>
              <span className="text-gray-500">or</span>
              <span className="font-bold">Choose files</span>
            </div>
            <input
              id="file-upload"
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Uploaded files section */}
        {
          uploaded && (
            <div className="bg-primary p-6 rounded shadow-md  overflow-y-auto max-h-20">
              <h2 className="text-xl font-bold mb-4 mt-0 ">Uploaded files</h2>
              <div className="space-y-4 ">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center bg-gray p-2 rounded-lg justify-between">
                    <span>{file.name}</span>
                    <div className="flex items-center space-x-2">
                      {file.progress < 100 ? (
                        <div className="w-24 bg-gray-200 rounded-full">
                          <div
                            className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                            style={{ width: `${file.progress}%` }}
                          >
                            {file.progress}%
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleViewFile(file.url)}
                          className="text-blue-500 bg-transparent border-none hover:text-blue-700 cursor-pointer"
                        >
                          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_1_446)">
                              <path d="M1.0835 13C1.0835 13 5.41683 4.33331 13.0002 4.33331C20.5835 4.33331 24.9168 13 24.9168 13C24.9168 13 20.5835 21.6666 13.0002 21.6666C5.41683 21.6666 1.0835 13 1.0835 13Z" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M13.0002 16.25C14.7951 16.25 16.2502 14.7949 16.2502 13C16.2502 11.2051 14.7951 9.74998 13.0002 9.74998C11.2052 9.74998 9.75016 11.2051 9.75016 13C9.75016 14.7949 11.2052 16.25 13.0002 16.25Z" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            <defs>
                              <clipPath id="clip0_1_446">
                                <rect width="26" height="26" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteFile(file.id)}
                        className=" cursor-pointer bg-transparent rounded-full border-none text-red-700 hover:text-red-800 "
                      >
                        <MdCancel size={28} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }
       
        {
          loading && (
            <div>
              <div className=" bg-primary flex flex-col justify-center items-center h-40">
                <ClipLoader color={"#000"} loading={loading} size={80} />
                <div className="text-center mt-4 text-xl font-semibold">
                  {progressMessage}
                </div>
              </div>
            </div>
          )
        }
          {
          files.length > 0 && (
            <div className="flex justify-end rela">
              <button
                className="transition duration-150 ease-out hover:ease-in mt-4 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleGenerate}
              >
                Generate Report
              </button>
            </div>
          )
        }
        {/* {
          result && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 -mt-5 p-9 overflow-y-auto">
              {segmentedImages.map((image, index) => (
                <div key={index} className="bg-primary p-7 rounded shadow-md -mt-12  ">
                  <h2 className="text-xl font-bold mb-4 mt-0">Segmented Image {index + 1}</h2>
                  <img src={image} alt={`Segmented result ${index + 1}`} className="object-cover w-full h-full rounded" />
                </div>
              ))}
              <div className="bg-primary p-3 rounded shadow-md  mt-4">
                <h2 className="text-xl font-bold mb-4 mt-0">Overall Rust Percentage</h2>
                 <p className='text-lg mb-4 mt-3'>Percentage of Corrosion: <span className='text-red-600 text-bold'>{rustPercentage}%</span></p>
                <Doughnut width={10} height={10} data={rustData} />
              </div>
            </div>
          )
        } */}
       
      </div>
      {/* Summary cards */}
      <div className="w-17 p-0  space-y-3 bg-white shadow-md overflow-auto">
        <div className="p-2 mt-1 h-60  bg-primary rounded overflow-y-auto">
          <div className='flex justify-center '>
            <h2 className="font-bold mt-0  ">Summary Cards</h2>
          </div>
          <div className="w-225 flex flex-col -mt-3 gap-2 overflow-y-auto">
            <div className="bg-white p-1 rounded-lg shadow-md mt-0 ">
              <h3 className="mt-0 text-sm font-bold">Rust Level</h3>
              <p className='-mt-2'>Overall:{rustPercentage} Percent </p>
              <p className='-mt-2'>Growth: <span className='text-red-600'>20% increase</span></p>
            </div>
            <div className="bg-white p-1 rounded-lg shadow-md mt-0 ">
              <h3 className="mt-0 text-xl font-bold">Hull Fouling</h3>
              <p className='-mt-2'>Overall: 85%</p>
              <p className='-mt-2'>Change: <span className='text-red-600'>15% increase</span></p>
            </div>
            <div className="bg-white p-1 rounded-lg shadow-md mt-0">
              <h3 className="mt-0 text-sm font-bold">Maintenance Required</h3>
              <p className='-mt-2'>Immediate: Yes</p>
              <p className='-mt-2'>Suggested Actions: Painting</p>
            </div>
          </div>
        </div>
        <div className="bg-primary p-4 rounded-lg shadow-md">
          <div className='flex justify-center w-full -mt-2 '>
            <h2 className="font-bold mt-0 text-black  ">Storage Usage</h2>
          </div>
          <div className="flex items-center bg-white p-1 rounded-lg shadow-md -mt-2">
            <div className="bg-blue-200 w-20 h-20 rounded-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold">21%</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className='font-bold'>214gb used</h3>
              <button className="text-blue-500 hover:text-blue-700">Upgrade Plan</button>
            </div>
          </div>
        </div>
        <div className="p-4 bg-primary rounded h-32">
          <div className='flex justify-center w-full -mt-2 '>
            <h2 className="font-bold mt-0 text-black  ">Device Sharing</h2>
          </div>
          <div className='-mt-2 bg-white p-1  rounded-lg shadow-md flex flex-col gap-3 justify-center '>
            <div className='flex items-center'><div className='ml-9'>Device 1</div> <div className='ml-5 bg-green-500 w-3 h-3 rounded-full '></div></div>
            <div className='flex items-center'><div className='ml-9'>Device 2</div> <div className='ml-5 bg-green-500 w-3 h-3 rounded-full '></div></div>
            <div className='flex items-center'><div className='ml-9'>Device 3</div> <div className='ml-5 bg-black w-3 h-3 rounded-full '></div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
