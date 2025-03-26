
import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Welcome from './components/Welcome';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from "sonner";
import ResumeHandle from './components/ResumeHandle';
import JobsAPI from './components/JobAPI';
import RecommendedJobs from './components/RecommendedJobs';
import HeroSection from './components/HeroSection';

function App() {

  return (
   
   <Router>
<Toaster position="top-right" richColors />
<Routes>
  <Route path='/login' element={<Login />} />
  <Route path='/jobs' element={<JobsAPI />} />
  <Route path='/signup' element={<Signup />} />
  <Route path='/resume' element={<ResumeHandle />} />
  <Route path='/RecommendedJobs' element={<RecommendedJobs />} />
  <Route path='/' element={<HeroSection />} />
  <Route path="/welcome"
          element={<PrivateRoute element={<Welcome />} />}
        />
  <Route path="*" element={<div>Page Not Found</div>} />
</Routes>
   </Router>
   
  )
}

export default App
