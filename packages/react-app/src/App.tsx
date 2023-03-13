import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header";
const Planner = lazy(() => import("./pages/planner"));
const Emblems = lazy(() => import("./pages/emblems"));
const Pokemons = lazy(() => import("./pages/pokemons"));

const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/planner" element={<Planner />} />
          <Route path="/emblems" element={<Emblems />} />
          <Route path="/pokemons" element={<Pokemons />} />
          <Route path="*" element={<Navigate to="/planner" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
