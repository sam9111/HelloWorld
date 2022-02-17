import Globe from "./Globe";
import SideBar from "./SideBar";
import Footer from "./Footer";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/data");
      setData(response.data);
    }
    fetchData();
  }, []);
  return (
    <div className="flex flex-col leading-normal tracking-normal bg-black text-white">
      <div className="flex flex-row min-h-screen">
        <div className="w-1/3 ">
          <SideBar />
        </div>
        <div className="w-2/3">
          <Globe countries={data.countries}></Globe>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}

export default App;
