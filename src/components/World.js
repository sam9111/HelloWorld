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
          width={1000}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pointAltitude={(p) => p.size / 4}
          pointsData={points}
          pointRadius={0.75}
          pointColor="color"
          pointLabel={(p) =>
            `${p.country} is majorly reporting ${p.sentiment} news`
          }
        />
      </div>
    </div>
  );
}
