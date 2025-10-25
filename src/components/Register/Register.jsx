import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './../../firebase/firebase.init';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router';

export const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Toggle password visibility
  const handleTogglePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // Email/password registration
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    // Password validation
    const lengthPattern = /^.{6,}$/;
    const casePattern = /^(?=.*[a-z])(?=.*[A-Z])/;

    if (!lengthPattern.test(password)) {
      setError('Password must be 6 characters or longer.');
      return;
    } else if (!casePattern.test(password)) {
      setError('Password must contain at least one uppercase and one lowercase character.');
      return;
    }

    if (!terms) {
      setError('Please accept our terms and conditions.');
      return;
    }

    setError('');
    setSuccess(false);

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Update profile with name and photo
        updateProfile(result.user, { displayName: name, photoURL })
          .then(() => {
            setSuccess(true);
            e.target.reset();
            navigate('/login');
          })
          .catch(err => setError(err.message));
      })
      .catch(err => setError(err.message));
  };

  // Google login
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem('authToken', 'firebase_user_token');
        navigate('/'); // redirect after login
      })
      .catch(err => setError(err.message));
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input type="text" name="name" className="input" placeholder="Full Name" required />

                <label className="label">Photo URL</label>
                <input type="text" name="photoURL" className="input" placeholder="Photo URL" />

                <label className="label">Email</label>
                <input type="email" name="email" className="input" placeholder="Email" required />

                <label className="label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="input"
                    placeholder="Password"
                    required
                  />
                  <button onClick={handleTogglePasswordShow} className="btn btn-sm absolute right-5 top-2">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className="mt-2">
                  <label className="label cursor-pointer">
                    <input type="checkbox" name="terms" className="checkbox" />
                    <span className="ml-2">Accept terms and conditions</span>
                  </label>
                </div>

                <button className="btn btn-neutral mt-4 w-full">Register</button>
              </fieldset>

              {success && <p className="text-green-500 mt-2">Account created successfully!</p>}
              {error && <p className="text-red-500 mt-2">Error: {error}</p>}
            </form>

            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline btn-primary mt-4 w-full"
            >
              Register with Google
            </button>

            <p className="mt-3">
              Already have an account? <Link to="/login" className="link">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
