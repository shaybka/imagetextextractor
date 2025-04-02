import { useState, useEffect } from "react";

const Hero = () => {
  const [state, setState] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null); // State to store the uploaded image
  const [extractedText, setExtractedText] = useState(""); // State to store the extracted text
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file)); // Display the uploaded image
      setLoading(true); // Set loading to true while processing the image

      // Send the file to the backend API
      const formData = new FormData();
      formData.append("image", file);

      fetch("http://localhost:5000/api/v1/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
       
          setExtractedText(data.data); // Set the extracted text from the response
          setLoading(false); // Set loading to false after processing
        })
        .catch((error) => {
         
          alert("Failed to upload file.");
          setLoading(false); // Set loading to false if there's an error
        });
    }
  };

  const navigation = [
    { title: "Features", path: "javascript:void(0)" },
    { title: "Integrations", path: "javascript:void(0)" },
    { title: "Customers", path: "javascript:void(0)" },
    { title: "Pricing", path: "javascript:void(0)" },
  ];

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      <header>
        <div className={`md:hidden ${state ? "mx-2 pb-5" : "hidden"}`}></div>
        <nav
          className={`pb-5 md:text-sm ${
            state
              ? "absolute z-20 top-0 inset-x-0 bg-gray-800 rounded-xl mx-2 mt-2 md:mx-0 md:mt-0 md:relative md:bg-transparent"
              : ""
          }`}
        >
          <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
            <div
              className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
                state ? "block" : "hidden"
              } `}
            >
              <ul className="flex-1 justify-center mt-8 items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                {navigation.map((item, idx) => {
                  return (
                    <li key={idx} className="text-gray-300 hover:text-gray-400">
                      <a href={item.path} className="block text-xl">
                        {item.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <section className="relative">
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-28 md:px-8 flex">
          <div className="space-y-5 max-w-4xl mx-auto text-center flex flex-col items-center">
            <h2 className="text-4xl text-white font-extrabold mx-auto md:text-5xl">
              Extract Text from Images with Ease
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400">
              Upload your images and let our advanced tools extract text
              accurately and efficiently. Perfect for digitizing documents,
              notes, and more.
            </p>
            <div>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e)}
              />
              <label
                htmlFor="fileInput"
                className="flex items-center justify-center gap-x-2 py-2.5 px-4 mt-3 w-full text-sm text-white font-medium bg-sky-500 hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-lg sm:mt-0 sm:w-auto cursor-pointer"
              >
                Upload
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section: Uploaded Image and Extracted Text */}
      <section className="bg-gray-800 py-10">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8">
          {/* Left Side: Uploaded Image */}
          <div className="flex-1">
            <h3 className="text-2xl text-white font-bold mb-4">Uploaded Image</h3>
            <div className="bg-gray-700 rounded-lg p-4 flex justify-center items-center h-64">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <p className="text-gray-400">No image uploaded yet.</p>
              )}
            </div>
          </div>

          {/* Right Side: Extracted Text */}
          <div className="flex-1">
            <h3 className="text-2xl text-white font-bold mb-4">Extracted Text</h3>
            <div className="bg-gray-700 rounded-lg p-4 h-64 overflow-y-auto flex justify-center items-center">
              {loading ? (
                           <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >
                Loading...
              </span>
            </div>
              ) : extractedText ? (
                <p className="text-gray-300 whitespace-pre-wrap">
                  {extractedText}
                </p>
              ) : (
                <p className="text-gray-400">No text extracted yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;