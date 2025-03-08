import { Navbar } from "./components";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";

function App() {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <Navbar />
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
      <footer
        className={`py-6 text-center text-sm ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        <p>© {new Date().getFullYear()} EcomStore. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
