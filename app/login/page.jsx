"use client";

import { useState } from "react";
import axios from "axios";
import { FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function AuthPage() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [logForm, setLogForm] = useState({ email: "", password: "" });
  const [regForm, setRegForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogChange = (e) => {
    setLogForm({ ...logForm, [e.target.name]: e.target.value });
  };

  const handleRegChange = (e) => {
    setRegForm({ ...regForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", logForm);
      if (res.data.error) {
         alert(res.data.error);
         return;
      }
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", regForm);
      if (res.data.error) {
         alert(res.data.error);
         return;
      }
      alert("Registered Successfully ✅ Please sign in.");
      setIsRightPanelActive(false); // Slide to login
    } catch (err) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[#f3f4f6] items-center justify-center h-screen px-4 font-sans text-gray-800">
      <div className="relative overflow-hidden w-full max-w-[850px] min-h-[550px] bg-white rounded-[30px] shadow-2xl">
        
        {/* --- SIGN UP FORM --- */}
        <div className={`absolute top-0 left-0 w-full md:w-1/2 h-full transition-all duration-[600ms] ease-in-out p-10 flex justify-center flex-col
          ${isRightPanelActive 
            ? 'md:translate-x-full opacity-100 z-50' 
            : 'opacity-0 z-10 md:translate-x-0 hidden md:flex'}`}
        >
          <form className="flex flex-col items-center justify-center text-center w-full h-full px-5" onSubmit={handleRegister}>
            <h1 className="font-bold text-3xl mb-4 text-gray-900">Create Account</h1>
            <div className="flex gap-4 my-4">
              <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"><FaGoogle className="text-red-500" /></div>
              <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"><FaFacebookF className="text-blue-600" /></div>
              <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"><FaGithub className="text-gray-800" /></div>
              <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"><FaLinkedinIn className="text-blue-700" /></div>
            </div>
            <span className="text-sm text-gray-500 mb-2 mt-1">or use your email for registration</span>
            <input required type="email" name="email" value={regForm.email} onChange={handleRegChange} placeholder="Email" className="bg-[#f3f4f6] border-none outline-none py-3 px-4 my-2 w-full rounded-xl" />
            <input required type="password" name="password" value={regForm.password} onChange={handleRegChange} placeholder="Password" className="bg-[#f3f4f6] border-none outline-none py-3 px-4 my-2 w-full rounded-xl" />
            <button disabled={loading} type="submit" className="mt-6 rounded-full bg-[#0891b2] text-white text-xs font-bold py-3.5 px-14 uppercase tracking-wide transition-transform active:scale-95 hover:bg-[#0e7490] shadow-md cursor-pointer">{loading ? 'Processing...' : 'Sign Up'}</button>
            
            {/* Mobile Only switch button */}
            <p className="mt-6 md:hidden text-sm cursor-pointer text-[#0891b2] font-bold" onClick={() => setIsRightPanelActive(false)}>Already have an account? Sign In</p>
          </form>
        </div>

        {/* --- SIGN IN FORM --- */}
        <div className={`absolute top-0 left-0 w-full md:w-1/2 h-full transition-all duration-[600ms] ease-in-out p-10 flex justify-center flex-col z-20
          ${isRightPanelActive ? 'md:translate-x-full opacity-0 hidden md:flex' : 'md:translate-x-0 opacity-100'}`}
        >
          <form className="flex flex-col items-center justify-center text-center w-full h-full px-5" onSubmit={handleLogin}>
            <h1 className="font-bold text-3xl mb-4 text-gray-900">Sign In</h1>
            <div className="flex gap-4 my-4">
              <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"><FaGoogle className="text-red-500" /></div>
              <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"><FaFacebookF className="text-blue-600" /></div>
              <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"><FaGithub className="text-gray-800" /></div>
              <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"><FaLinkedinIn className="text-blue-700" /></div>
            </div>
            <span className="text-sm text-gray-500 mb-2 mt-1">or use your email account</span>
            <input required type="email" name="email" value={logForm.email} onChange={handleLogChange} placeholder="Email" className="bg-[#f3f4f6] border-none outline-none py-3 px-4 my-2 w-full rounded-xl" />
            <input required type="password" name="password" value={logForm.password} onChange={handleLogChange} placeholder="Password" className="bg-[#f3f4f6] border-none outline-none py-3 px-4 my-2 w-full rounded-xl" />
            <a href="#" className="text-[13px] text-gray-500 mt-2 mb-4 hover:underline">Forgot your password?</a>
            <button disabled={loading} type="submit" className="rounded-full bg-[#0891b2] text-white text-xs font-bold py-3.5 px-14 uppercase tracking-wide transition-transform active:scale-95 hover:bg-[#0e7490] shadow-md cursor-pointer">{loading ? 'Processing...' : 'Sign In'}</button>
            
             {/* Mobile Only switch button */}
             <p className="mt-6 md:hidden text-sm cursor-pointer text-[#0891b2] font-bold" onClick={() => setIsRightPanelActive(true)}>Don't have an account? Sign Up</p>
          </form>
        </div>

        {/* --- OVERLAY CONTAINER (Desktop Only) --- */}
        <div className={`hidden md:block absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-[600ms] ease-in-out z-[100]
          ${isRightPanelActive ? '-translate-x-full' : 'translate-x-0'}`}
        >
          <div className={`bg-gradient-to-r from-[#0d9488] to-[#06b6d4] text-white relative -left-full h-full w-[200%] transform transition-transform duration-[600ms] ease-in-out
            ${isRightPanelActive ? 'translate-x-1/2' : 'translate-x-0'}`}
          >

            {/* OVERLAY LEFT PANEL */}
            <div className={`absolute flex flex-col items-center justify-center px-10 text-center top-0 h-full w-1/2 transform transition-transform duration-[600ms] ease-in-out
              ${isRightPanelActive ? 'translate-x-0' : '-translate-x-[20%]'}`}
            >
              <h1 className="font-bold text-4xl mb-4 text-white drop-shadow-md">Welcome Back!</h1>
              <p className="text-[15px] font-light leading-relaxed mb-8 px-6 text-teal-50">To keep connected with us please login with your personal info</p>
              <button 
                 onClick={() => setIsRightPanelActive(false)} 
                 className="rounded-full border border-white bg-transparent text-white text-xs font-bold py-3 px-12 uppercase tracking-wide transition-transform active:scale-95 hover:bg-white hover:text-[#0d9488] shadow-md cursor-pointer"
              >
                 Sign In
              </button>
            </div>

            {/* OVERLAY RIGHT PANEL */}
            <div className={`absolute right-0 flex flex-col items-center px-10 justify-center text-center top-0 h-full w-1/2 transform transition-transform duration-[600ms] ease-in-out
              ${isRightPanelActive ? 'translate-x-[20%]' : 'translate-x-0'}`}
            >
              <h1 className="font-bold text-4xl mb-4 text-white drop-shadow-md">Hello, Friend!</h1>
              <p className="text-[15px] font-light leading-relaxed mb-8 px-6 text-teal-50">Enter your personal details and start journey with us</p>
              <button 
                 onClick={() => setIsRightPanelActive(true)} 
                 className="rounded-full border border-white bg-transparent text-white text-xs font-bold py-3 px-12 uppercase tracking-wide transition-transform active:scale-95 hover:bg-white hover:text-[#06b6d4] shadow-md cursor-pointer"
              >
                 Sign Up
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}