import SideBar from "./SideBar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactGlobe from "react-globe";
export default function World() {
  const [points, setPoints] = useState([]);
  useEffect(() => {
    async function fetchPoints() {
      const response = await axios.get("/api/points");

      setPoints(response.data);
    }
    fetchPoints();
  }, []);
  return (
    <div className="flex flex-row ">
      <SideBar />
      <div className="w-2/3">
        <ReactGlobe height="100vh" />
      </div>
    </div>
  );
}
