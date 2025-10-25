import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { auth } from "../../firebase/firebase.init";
import { signOut, onAuthStateChanged } from "firebase/auth";

export const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ mobile toggle

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("authToken", "firebase_user_token");
      } else {
        setUser(null);
        localStorage.removeItem("authToken");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/login");
        alert("Logged out successfully!");
      })
      .catch(() => alert("Error logging out. Try again."));
  };

  if (loading) {
    return (
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Left */}
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">ToyStore</a>

        {/* Mobile menu button */}
        <button
          className="btn btn-ghost lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><NavLink to="/">Home</NavLink></li>
          {!user && <li><NavLink to="/login">Login</NavLink></li>}
          {!user && <li><NavLink to="/register">Register</NavLink></li>}
          {user && <li><NavLink to="/orders">Order History</NavLink></li>}
          {user && <li><NavLink to="/profile">My Profile</NavLink></li>}
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end hidden lg:flex">
        {user ? (
          <>
            <span className="mr-2">Hello, {user.displayName || user.email}</span>
            <button onClick={handleLogout} className="btn btn-sm">Logout</button>
          </>
        ) : null}
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-base-100 shadow-md lg:hidden z-50">
          <ul className="menu p-3">
            <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
            {!user && <li><NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink></li>}
            {!user && <li><NavLink to="/register" onClick={() => setMenuOpen(false)}>Register</NavLink></li>}
            {user && <li><NavLink to="/orders" onClick={() => setMenuOpen(false)}>Order History</NavLink></li>}
            {user && <li><NavLink to="/profile" onClick={() => setMenuOpen(false)}>My Profile</NavLink></li>}
            {user && (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="btn btn-sm mt-2"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
