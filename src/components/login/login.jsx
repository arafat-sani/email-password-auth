import React, { useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { auth } from '../../firebase/firebase.init';
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

export const login = () => {
  const [error, setError] = useState('');
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';



  // Email & password login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError('');

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        localStorage.setItem('authToken', 'firebase_user_token');
        window.dispatchEvent(new Event('authChange'));
        navigate(from === '/' ? '/orders' : from, { replace: true });
      })
      .catch((error) => setError(error.message));
  };

  // Forgot password
  const handleForgetPassword = () => {
  const email = emailRef.current.value;
  if (!email) return alert("Please enter your email first.");
  navigate(`/forgot-password?email=${encodeURIComponent(email)}`);
}

  // Google login
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        localStorage.setItem('authToken', 'firebase_user_token');
        window.dispatchEvent(new Event('authChange'));
        navigate(from === '/' ? '/orders' : from, { replace: true });
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="card bg-base-100 m-auto w-full max-w-sm shadow-2xl mt-10">
      <div className="card-body">
        <h1 className="text-5xl font-bold mb-4">Login</h1>

        <form onSubmit={handleLogin}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input type="email" name="email" ref={emailRef} className="input" placeholder="Email" required />
            <label className="label">Password</label>
            <input type="password" name="password" className="input" placeholder="Password" required />
            <div onClick={handleForgetPassword} className="link link-hover mt-2 cursor-pointer">Forgot password?</div>
            <button className="btn btn-neutral mt-4 w-full">Login</button>
          </fieldset>
        </form>

        <button onClick={handleGoogleLogin} className="btn btn-outline btn-primary mt-4 w-full">
          Login with Google
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p className="mt-3">New here? <Link to="/register" className="link">Register</Link></p>
      </div>
    </div>
  );
};
