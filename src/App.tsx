import { Navbar } from "./components/index.ts";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { Footer } from "./components/index.ts";

function App() {
  const isDarkMode: boolean = useSelector(
    (state: { theme: { theme: string } }) => state.theme?.theme === "dark"
  );

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <Navbar />
      <main className="container mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
