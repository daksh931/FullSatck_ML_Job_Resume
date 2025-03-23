import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome! </h2>
        <p className="text-lg text-gray-600">
          You’ve successfully logged in. Let’s find the best jobs for you!
        </p>

        {/* Illustration */}
        <div className="flex justify-center my-6">
          
        </div>

        <p className="text-md text-gray-700">
          Upload your <span className="font-semibold">resume</span> to get List of Jobs only for you.
        </p>

        {/* Upload Resume Button */}
        <button
          onClick={() => navigate("/resume")}
          className=" cursor-pointer mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all"
        >
          Upload Resume & Get Jobs 🚀
        </button>
      </div>
    </div>
  );
};

export default Welcome;
