import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaStar } from "react-icons/fa";

const ToyDetails = () => {
  const { id } = useParams();
  const [toy, setToy] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/toys.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedToy = data.find((item) => item.id === Number(id));
        setToy(selectedToy);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    e.target.reset();
  };

 

  if (!toy) return <p className="text-center mt-10">Loading toy details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6">
        {/* Uncomment if you have image */}
        {/* <img
          src={toy?.thumbnail}
          alt={toy?.toyName}
          className="w-full md:w-1/2 h-80 object-cover rounded-lg"
        /> */}

        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{toy?.toyName}</h2>
          <p className="text-yellow-500 flex items-center gap-2">
            <FaStar /> {toy?.rating}
          </p>
          <p className="text-gray-600 mt-2">Quantity: {toy.availableQuantity}</p>
          <p className="text-xl font-semibold text-gray-900 mt-2">
            Price: ${toy.price}
          </p>
          <p className="mt-4 text-gray-700">{toy.description}</p>

          {/* ✅ Buy Now button */}
          <button
           
            className="btn btn-success mt-6 w-fit"
          >
            Buy Now
          </button>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg shadow-md mt-10 p-6">
        <h3 className="text-2xl font-bold mb-4 text-blue-700">
          Try This Toy Now 🎯
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            className="input input-bordered w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary w-fit">
            Try Now
          </button>
        </form>

        {success && (
          <p className="text-green-600 font-semibold mt-4">
            ✅ Form submitted successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default ToyDetails;
