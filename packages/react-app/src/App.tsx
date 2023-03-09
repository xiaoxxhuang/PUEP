import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PuepHeader from "./components/puep-header";
const Planner = lazy(() => import("./pages/planner"));
const Emblems = lazy(() => import("./pages/emblems"));
const Pokemons = lazy(() => import("./pages/pokemons"));

const App = () => {
  return (
    <>
      <PuepHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Planner />} />
          <Route path="/planner/:pfocus/:sfocus/:pokemonId" element={<Planner />} />
          <Route path="/emblems" element={<Emblems />} />
          <Route path="/pokemons" element={<Pokemons />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
