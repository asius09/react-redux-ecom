import { Navbar } from "./components";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { Footer } from "./components";

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
      <Footer />
    </div>
  );
}

export default App;
