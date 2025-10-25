import React, { useEffect, useState } from "react";
import { FaBoxOpen, FaCheckCircle } from "react-icons/fa";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulate fetching order history (replace with your API/Firebase call)
    const storedOrders = JSON.parse(localStorage.getItem("toyOrders")) || [];

    // Example demo data if no saved orders
    if (storedOrders.length === 0) {
      const demoOrders = [
        {
          id: 1,
          toyName: "Robo Car",
          price: 25,
          date: "2025-10-24",
          status: "Delivered",
        },
        {
          id: 2,
          toyName: "Flying Drone",
          price: 60,
          date: "2025-10-22",
          status: "Shipped",
        },
      ];
      setOrders(demoOrders);
    } else {
      setOrders(storedOrders);
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">📦 Order History</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <FaBoxOpen className="text-6xl mx-auto mb-4" />
          <p>No orders yet. Start shopping and your orders will appear here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr className="bg-base-200 text-gray-800">
                <th>#</th>
                <th>Toy Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id} className="hover:bg-base-100">
                  <td>{index + 1}</td>
                  <td>{order.toyName}</td>
                  <td>{order.date}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.status === "Delivered"
                          ? "badge-success"
                          : order.status === "Shipped"
                          ? "badge-info"
                          : "badge-warning"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>${order.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {orders.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              localStorage.removeItem("toyOrders");
              setOrders([]);
            }}
            className="btn btn-outline btn-error"
          >
            Clear History
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
