import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { NavLink } from "react-router";


export const Home = () => {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("/toys.json")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  return (
    <div className="px-6">
      {/* Slider Section  */}
      <section className="my-10">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="rounded-xl overflow-hidden shadow-lg"
        >
          <SwiperSlide>
            <img
              src="https://i.ibb.co/xGJLPCD/slider1.jpg"
              alt="Slider 1"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-3xl font-bold">
              Amazing Toy Collection 🎠
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <img
              src="https://i.ibb.co/jRTmTTK/slider2.jpg"
              alt="Slider 2"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-3xl font-bold">
              Play, Learn, and Grow 🌈
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <img
              src="https://i.ibb.co/8zCvC6k/slider3.jpg"
              alt="Slider 3"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-3xl font-bold">
              Fun For Every Age 🚀
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Popular Toys Section */}
      <section className="my-14">
        <h2 className="text-3xl font-bold text-center my-8">🌟 Popular Toys</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {toys.slice(0, 12).map((toy) => ( 
            <div
              key={toy.id}
              className="card bg-base-100 shadow-xl border hover:scale-105 transition-transform"
            >
              <figure>
                <img
                  src={toy.thumbnail}
                  alt={toy.toyName}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-lg font-semibold">{toy.toyName}</h3>
                <p className="flex items-center gap-2 text-yellow-500">
                  <FaStar /> {toy.rating}
                </p>
                <p className="text-gray-600 text-sm">
                  Quantity: {toy.availableQuantity}
                </p>
                <p className="font-bold text-gray-800">Price: ${toy.price}</p>
                <div className="card-actions justify-end mt-2">
                  <button className="btn btn-sm btn-outline btn-primary">
                    <NavLink to={`/details/${toy.id}`}>view more</NavLink>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/*  Featured Collections  */}
      <section className="my-14 bg-blue-50 py-10 rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">
          🧸 Featured Collections
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 w-72 text-center hover:shadow-2xl transition">
            <img
              src="https://i.ibb.co/jM5YP0d/lego.jpg"
              alt="Building Toys"
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Building Toys</h3>
            <p className="text-gray-500 text-sm">
              Build imagination with colorful blocks and creative sets.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 w-72 text-center hover:shadow-2xl transition">
            <img
              src="https://i.ibb.co/VB1v5Hs/action-figures.jpg"
              alt="Action Figures"
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Action Figures</h3>
            <p className="text-gray-500 text-sm">
              Collect your favorite heroes and characters for epic battles.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 w-72 text-center hover:shadow-2xl transition">
            <img
              src="https://i.ibb.co/qy4Rr3b/dolls.jpg"
              alt="Dolls & Plush"
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Dolls & Plush</h3>
            <p className="text-gray-500 text-sm">
              Cute, cuddly companions that bring joy to every child.
            </p>
          </div>
        </div>
      </section>

     
      <section className="my-14">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-800">
          💬 What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Sophia",
              text: "Absolutely loved the toy quality! My son can’t stop playing with his new car.",
            },
            {
              name: "Liam",
              text: "Great customer service and fast delivery. Highly recommend this store!",
            },
            {
              name: "Ava",
              text: "The plush toys are super soft and adorable. Perfect gift for kids!",
            },
          ].map((review, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-lg shadow-md border hover:shadow-xl transition"
            >
              <p className="text-gray-700 italic mb-4">“{review.text}”</p>
              <p className="font-semibold text-gray-900">- {review.name}</p>
              <p className="text-yellow-500 flex gap-1 mt-2">
                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
