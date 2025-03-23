import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const ResumeHandle = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    },
  });

  const uploadResume = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      setUploading(true);
      setMessage("");
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMessage(`Resume uploaded: ${response.data.fileUrl}`);
    } catch (error) {
      setMessage("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className=" flex  flex-col p-4  border-[#EB8317]/50 border-[2px] rounded-xl shadow-[#1d1813b0] shadow-lg hover:shadow-md transistion delay-50 duration-300 bg-white/75 ">
      <div {...getRootProps()} className="border border-white rounded-3xl bg-[#10375C] text-white p-4 cursor-pointer text-center">
        <input {...getInputProps()} />
        {selectedFile ? (
          <p>Selected file: {selectedFile.name}</p>
        ) : (
          <p>Drag & drop your resume here or click to select</p>
        )}
      </div>
      <button
        onClick={uploadResume}
        disabled={!selectedFile || uploading}
        className="mt-4 p-2 bg-blue-600 text-white self-center rounded disabled:opacity-70 cursor-pointer hover:bg-blue-800 transition duration-300"
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default ResumeHandle;
