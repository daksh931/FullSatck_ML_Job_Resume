import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "sonner"; // Import Sonner for notifications

const ResumeUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [toastId, setToastId] = useState<string | number | undefined >(""); // To store the toast ID

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    },
  });

  const uploadResume = async () => {
    if (!selectedFile) {
      toast.warning("Please select a resume to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      setUploading(true);
      const id = toast.loading("Uploading resume...");
      setToastId(id);

      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data"} }
      );

      if (response.status === 200) {
        toast.dismiss(id);
        toast.success("✅ Resume uploaded successfully!", { id: toastId });
      } else {
        toast.error("Error uploading file. Please try again.", { id: toastId });
      }
    } catch (error) {
      toast.error("Error uploading file. Please try again.", { id: toastId }); // Dismiss loading toast and show error
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Upload Your Resume and Take the Next Step in Your Career
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Upload your resume to easily apply for the latest job opportunities. We support PDF format, so make sure your resume is ready to go!
        </p>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
        >
          <input {...getInputProps()} />
          {selectedFile ? (
            <p className="text-gray-800 font-medium">{selectedFile.name}</p>
          ) : (
            <p className="text-gray-500">Drag & drop your resume here or click to upload</p>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p className="mb-2">By uploading your resume, you agree to our terms and privacy policy.</p>
          <p className="mb-4">Need help? <span className="text-blue-600 cursor-pointer">Contact Support</span></p>
        </div>

        {/* Upload Button */}
        <button
          onClick={uploadResume}
          disabled={!selectedFile || uploading}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50 hover:bg-blue-700 transition"
        >
          {uploading ? "Uploading..." : "Upload Resume"}
        </button>
      </div>
    </div>
  );
};

export default ResumeUpload;
