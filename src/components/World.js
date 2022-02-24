import Globe from "react-globe.gl";
import SideBar from "./SideBar";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
        <Globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pointAltitude="size"
          pointColor="color"
          pointsData={points}
        />
      </div>
    </div>
  );
}
