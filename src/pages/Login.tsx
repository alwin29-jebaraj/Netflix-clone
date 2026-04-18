import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { AlertCircle } from "lucide-react";

/**
 * Login Page
 * 
 * This component handles the user's first point of contact.
 * We've aimed for that classic Netflix "cinematic" feel with a dark overlay
 * and a focused, high-contrast login card.
 */

export default function Login() {
  // --- State Management ---
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  // --- Helpers ---
  
  /**
   * A simple regex to ensure the email looks like an actual email.
   */
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (error) setError("");
  };

  // --- Form Submission ---
  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    // 1. Basic Validation
    if (!email.trim() || !password.trim()) {
      setError("Please enter both your email and password.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("That doesn't look like a valid email address.");
      return;
    }

    // 2. API Call
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/login", { email, password });
      
      if (response.status === 200) {
        // Success! Let's head to the dashboard.
        navigate("/dashboard");
      }
    } catch (err: any) {
      // Handle specific error messages from our server
      const serverMessage = err.response?.data?.message || "Something went wrong. Please try again later.";
      setError(serverMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative font-sans"
      style={{ 
        // Using a random cinematic image from Picsum for that "movie library" background vibe
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://picsum.photos/seed/netflix-vibe/1920/1080")' 
      }}
    >
      {/* Brand Logo - Positioned top-left like the real site */}
      <header className="absolute top-0 left-0 p-8 w-full">
        <h1 className="text-netflix-red text-4xl font-bold tracking-tighter cursor-default select-none">
          NETFLIX
        </h1>
      </header>

      {/* Main Login Card */}
      <motion.main 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-black/80 p-10 md:p-16 rounded-md w-full max-w-[450px] z-10 shadow-2xl"
      >
        <h2 className="text-white text-3xl font-bold mb-8">Sign In</h2>
        
        <form onSubmit={handleSignIn} className="space-y-4">
          {/* Error Alert Box */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#e87c03] text-white p-3 rounded text-sm flex items-start gap-2"
            >
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email or phone number"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-[#333] text-white p-4 rounded border-b-2 border-transparent focus:border-netflix-red focus:outline-none transition-all placeholder:text-[#8c8c8c]"
              autoComplete="email"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-[#333] text-white p-4 rounded border-b-2 border-transparent focus:border-netflix-red focus:outline-none transition-all placeholder:text-[#8c8c8c]"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-netflix-red text-white py-4 rounded font-bold hover:bg-red-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>

          <div className="flex items-center justify-between text-[#b3b3b3] text-sm mt-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 accent-netflix-red rounded" defaultChecked />
              <span className="group-hover:text-white transition-colors">Remember me</span>
            </label>
            <a href="#" className="hover:underline">Need help?</a>
          </div>
        </form>

        {/* Secondary Links & Info */}
        <section className="mt-12 space-y-4">
          <div className="text-[#737373] text-base">
            New to Netflix? <a href="#" className="text-white hover:underline font-medium">Sign up now</a>.
          </div>
          <p className="text-[#8c8c8c] text-xs leading-tight">
            This page is protected by Google reCAPTCHA to ensure you're not a bot. 
            <button className="text-[#0071eb] hover:underline ml-1">Learn more.</button>
          </p>
        </section>
      </motion.main>

      {/* Simple Footer - Muted colors to keep focus on the card */}
      <footer className="w-full bg-black/80 mt-auto p-8 border-t border-[#333] text-[#737373] text-sm z-10">
        <div className="max-w-5xl mx-auto space-y-6">
          <p className="hover:underline cursor-pointer">Questions? Call 000-800-919-1694</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["FAQ", "Help Centre", "Terms of Use", "Privacy", "Cookie Preferences", "Corporate Information"].map(link => (
              <a key={link} href="#" className="hover:underline">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
