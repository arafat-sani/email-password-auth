import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import { ProtectedRoute } from "../ProtectedRoute.jsx";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || "");
        setPhotoURL(currentUser.photoURL || "");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    updateProfile(auth.currentUser, { displayName: name, photoURL })
      .then(() => {
        setSuccess("Profile updated successfully!");
        setUser({ ...auth.currentUser, displayName: name, photoURL });
        setTimeout(() => setSuccess(""), 3000);
      })
      .catch((err) => console.error(err));
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>
      <div className="text-center mb-4">
        <img
          src={photoURL || user.photoURL || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-2"
        />
        <p className="font-semibold">{name || user.displayName || "No Name"}</p>
        <p className="text-gray-500">{user.email}</p>
      </div>

      <form onSubmit={handleSave}>
        <label className="label">Name</label>
        <input
          type="text"
          className="input w-full mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="label">Photo URL</label>
        <input
          type="text"
          className="input w-full mb-3"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />

        <button className="btn btn-primary w-full">Save Changes</button>
        {success && <p className="text-green-500 mt-2 text-center">{success}</p>}
      </form>
    </div>
  );
};

export default () => (
  <ProtectedRoute>
    <MyProfile />
  </ProtectedRoute>
);
