import World from "./components/World";
import Footer from "./components/Footer";
import React from "react";

function App() {
  return (
    <div className="flex flex-col leading-normal tracking-normal bg-black text-white">
      <World />

      <Footer />
    </div>
  );
}

export default App;
