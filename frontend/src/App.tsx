
import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Welcome from './components/Welcome';
import PrivateRoute from './components/PrivateRoute';

function App() {


  return (
   
   <Router>
<Routes>
  <Route path='/login' element={<Login />} />
  <Route path='/signup' element={<Signup />} />
  {/* <Route path='/home' element={<PrivateRoute component={<Welcome/>} />} /> */}
  {/* <PrivateRoute path="/welcome" element={<Welcome />} /> */}
  <Route
          path="/welcome"
          element={<PrivateRoute element={<Welcome />} />}
        />

  <Route path="*" element={<div>Page Not Found</div>} />
{/* <div className="flex justify-center items-center h-screen bg-gray-100">
   <HeroSection />
 </div> */}
</Routes>
   </Router>
   
  )
}

export default App
