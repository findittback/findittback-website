import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";

// Route-level code splitting keeps the first load small.
const AddItem = lazy(() => import("./pages/AddItem.jsx"));
const ItemsList = lazy(() => import("./pages/ItemsList.jsx"));
const ScanPage = lazy(() => import("./pages/ScanPage.jsx"));
const ManagePage = lazy(() => import("./pages/ManagePage.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center" role="status" aria-live="polite">
      <span className="font-mono text-sm text-slate-500">Loading…</span>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/items" element={<ItemsList />} />
          <Route path="/i/:code" element={<ScanPage />} />
          <Route path="/manage/:code/:token" element={<ManagePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
