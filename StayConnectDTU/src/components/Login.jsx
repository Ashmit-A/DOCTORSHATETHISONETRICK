import React, { useRef, useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";
import "./Login.css";

export default function Login({ setShowLogin, showLogin }) {
  const overlayRef = useRef();
  const [state, setState] = useState("login");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isFormLoading, setIsFormLoading] = useState(false); // Local loading state for form

  const { login, registerUser, error, clearError, isAuthenticated } = useAuthStore();

  // Close modal if click on overlay (not modal content)
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) setShowLogin(false);
  };

  // Clear error when component mounts or state changes
  useEffect(() => {
    clearError();
  }, [clearError, state]);

  // Show error toast when error exists
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Close modal when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setShowLogin(false);
      toast.success("Login successful!");
    }
  }, [isAuthenticated, setShowLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormLoading(true);
    
    if (state === "login") {
      if (!email || !password) {
        toast.error("Please fill in all fields");
        setIsFormLoading(false);
        return;
      }
      
      const result = await login(email, password);
      setIsFormLoading(false);
      if (!result.success) {
        toast.error(result.message || "Login failed");
      }
    } else {
      // Register
      if (!name || !email || !password) {
        toast.error("Please fill in all fields");
        setIsFormLoading(false);
        return;
      }
      
      const result = await registerUser(name, email, password);
      setIsFormLoading(false);
      if (result.success) {
        toast.success("Registration successful! You are now logged in.");
        setShowLogin(false); // Close the modal since user is now logged in
      } else {
        toast.error(result.message || "Registration failed");
      }
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    clearError();
  };

  const handleStateChange = (newState) => {
    setState(newState);
    resetForm();
  };

  return (
    <div className="login-modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <form className="login-modal-form" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
        <button type="button" className="login-close-btn" onClick={() => setShowLogin(false)} aria-label="Close login modal">&times;</button>
        <h1 className="login-title">{state === "login" ? "Login" : "Sign Up"}</h1>
        <p className="login-subtitle">{state === "login" ? "Please sign in to continue" : "Create your account"}</p>
        {state === "register" && (
          <div className="login-input-group">
            <span className="login-icon">
              {/* User SVG */}
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="5.5" r="3.5" fill="#6B7280"/><path d="M2 14c0-2.21 2.686-4 6-4s6 1.79 6 4" fill="#6B7280"/></svg>
            </span>
            <input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              type="text" 
              placeholder="Name" 
              className="login-input" 
              required 
              disabled={isFormLoading}
            />
          </div>
        )}
        <div className="login-input-group">
          <span className="login-icon">
            {/* Email SVG */}
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280" /></svg>
          </span>
          <input 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            type="email" 
            placeholder="Email id" 
            className="login-input" 
            required 
            disabled={isFormLoading}
          />
        </div>
        <div className="login-input-group">
          <span className="login-icon">
            {/* Password SVG */}
            <svg width="13" height="17" viewBox="0 0 13 17" fill="none"><path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280" /></svg>
          </span>
          <input 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            type="password" 
            placeholder="Password" 
            className="login-input" 
            required 
            disabled={isFormLoading}
          />
        </div>
        <div className="login-forgot">
          {state === "login" && <a className="login-forgot-link" href="#">Forgot password?</a>}
        </div>
        <button 
          type="submit" 
          className="login-submit" 
          disabled={isFormLoading}
        >
          {isFormLoading ? "Loading..." : (state === "login" ? "Login" : "Sign Up")}
        </button>
        <p className="login-signup">
          {state === "login" ? (
            <>Don't have an account? <button type="button" className="login-signup-link" onClick={() => handleStateChange("register")}>Sign up</button></>
          ) : (
            <>Already have an account? <button type="button" className="login-signup-link" onClick={() => handleStateChange("login")}>Login</button></>
          )}
        </p>
      </form>
    </div>
  );
}