import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Orders from "./Orders";
import ManageAddress from "./ManageAddress";
import PasswordManager from "./PasswordManager";
import PaymentMethods from "./PaymentMethods";
import PersonalInfo from "./PersonalInfo";
import SidePanel from "./SidePanel";
const Dashboard = () => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Anytown, USA",
    memberSince: "Jan 2023",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  };
  const tabs = [
    {
      id: "personal",
      component: PersonalInfo,
      title: "Personal Information",
      icon: "ri-user-line",
      props: { userData, isDarkMode },
    },
    {
      id: "orders",
      component: Orders,
      title: "My Orders",
      icon: "ri-shopping-bag-line",
      props: { isDarkMode },
    },
    {
      id: "addresses",
      component: ManageAddress,
      title: "Manage Addresses",
      icon: "ri-map-pin-line",
      props: { isDarkMode },
    },
    {
      id: "payment",
      component: PaymentMethods,
      title: "Payment Methods",
      icon: "ri-bank-card-line",
      props: { isDarkMode },
    },
    {
      id: "password",
      component: PasswordManager,
      title: "Password & Security",
      icon: "ri-lock-line",
      props: { isDarkMode },
    },
  ];

  const renderComponent = () => {
    const tab = tabs.find((tab) => tab.id === activeTab);
    return tab ? React.createElement(tab.component, tab.props) : null;
  };

  return (
    <div
      className={`pt-24 px-4 sm:px-6 lg:px-8 py-8 min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar */}
          <SidePanel
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={() => navigate("/login")}
          />

          {/* Main Content */}
          <div className="flex-1">{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
