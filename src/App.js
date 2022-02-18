import World from "./World";
import SideBar from "./SideBar";
import Footer from "./Footer";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [labels, setlabels] = useState([]);
  useEffect(() => {
    async function fetchlabels() {
      const response = await axios.get("/api/labels");
      setlabels(response.data);
    }
    fetchlabels();
  }, []);
  return (
    <div className="flex flex-col leading-normal tracking-normal bg-black text-white">
      <div className="flex flex-row min-h-screen">
        <div className="w-1/3 ">
          <SideBar />
        </div>
        <div className="w-2/3">
          <World labels={labels}></World>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}

export default App;
