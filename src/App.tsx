import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ListingDetail from "./components/listings/ListingDetail";
import routes from "tempo-routes";
import Footer from "./components/navigation/Footer";
import { AuthProvider } from "./lib/auth";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 pt-[120px] pb-[80px]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listing/:id" element={<ListingDetail />} />
            </Routes>
            {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          </div>
          <Footer />
        </div>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
