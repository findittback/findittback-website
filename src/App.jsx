import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  const location = useLocation();
  const bare = location.pathname.startsWith("/i/"); // scan page owns its own full-bleed layout

  return (
    <div className="flex min-h-screen flex-col">
      {!bare && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!bare && <Footer />}
    </div>
  );
}
