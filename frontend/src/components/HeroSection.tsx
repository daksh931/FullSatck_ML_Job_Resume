import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 text-white px-6">
      <div className="text-center max-w-2xl">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Find Your Dream Job <span className="text-yellow-400">Effortlessly</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          Get AI-powered job recommendations tailored to your skills and interests.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer px-6 py-3 bg-yellow-600 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition duration-300"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="cursor-pointer px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
          >
            Sign Up
          </button>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
