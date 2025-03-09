import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Orders = () => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState([]);

  const ordersList = [
    {
      id: "12345",
      date: "May 15, 2023",
      status: "Processing",
      items: 3,
      total: "$129.99",
    },
    {
      id: "12344",
      date: "April 28, 2023",
      status: "Delivered",
      items: 1,
      total: "$59.99",
    },
    {
      id: "12343",
      date: "April 10, 2023",
      status: "Delivered",
      items: 2,
      total: "$89.99",
    },
    {
      id: "12342",
      date: "March 22, 2023",
      status: "Delivered",
      items: 4,
      total: "$199.99",
    },
  ];

  useEffect(() => {
    if (activeTab === "all") {
      setFilteredOrders(ordersList);
    } else {
      setFilteredOrders(
        ordersList.filter(
          (order) => order.status.toLowerCase() === activeTab.toLowerCase()
        )
      );
    }
  }, [activeTab]);

  const tabs = [
    { id: "all", label: "All Orders" },
    { id: "processing", label: "Processing" },
    { id: "delivered", label: "Delivered" },
  ];

  return (
    <div
      className={`px-4 sm:px-6 lg:px-8  ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <i className="ri-shopping-bag-line mr-3 text-indigo-500"></i>
          My Orders
        </h1>

        <div className="mb-6 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-indigo-500 text-white"
                  : isDarkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className={`rounded-xl p-6 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Order History</h2>
            <div className="flex items-center space-x-2">
              <div
                className={`relative ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <input
                  type="text"
                  placeholder="Search orders..."
                  className={`pl-10 pr-4 py-2 rounded-lg text-sm ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-50 border-gray-200"
                  } border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
                <i className="ri-search-line absolute left-3 top-2.5"></i>
              </div>
              <button
                className={`text-sm px-3 py-2 rounded-lg flex items-center ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200"
                } transition-colors`}
              >
                <i className="ri-filter-3-line mr-1"></i> Filter
              </button>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="py-8 text-center">
              <i
                className={`ri-inbox-line text-4xl ${
                  isDarkMode ? "text-gray-600" : "text-gray-400"
                } mb-3 block`}
              ></i>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                No orders found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead
                  className={`text-left ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  } border-b ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <tr>
                    <th className="pb-3 font-medium">Order ID</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Items</th>
                    <th className="pb-3 font-medium">Total</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody
                  className={isDarkMode ? "text-gray-300" : "text-gray-600"}
                >
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className={`border-b ${
                        isDarkMode ? "border-gray-700" : "border-gray-200"
                      } hover:${
                        isDarkMode ? "bg-gray-700" : "bg-gray-50"
                      } transition-colors`}
                    >
                      <td className="py-4 font-medium">#{order.id}</td>
                      <td className="py-4">{order.date}</td>
                      <td className="py-4">
                        {order.items} {order.items === 1 ? "item" : "items"}
                      </td>
                      <td className="py-4 font-medium">{order.total}</td>
                      <td className="py-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full text-white ${
                            order.status === "Processing"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            className={`px-3 py-1 text-xs rounded-lg ${
                              isDarkMode
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
                            } transition-colors`}
                          >
                            Details
                          </button>
                          <button
                            className={`px-3 py-1 text-xs rounded-lg ${
                              isDarkMode
                                ? "bg-gray-700 hover:bg-gray-600"
                                : "bg-gray-100 hover:bg-gray-200"
                            } transition-colors`}
                          >
                            Track
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
