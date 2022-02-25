import SideBar from "./SideBar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactGlobe from "react-globe";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export default function World() {
  const [markers, setmarkers] = useState([]);
  const [data, setdata] = useState([]);
  const [focus, setFocus] = useState(null);
  useEffect(() => {
    async function fetchmarkers() {
      const response = await axios.get("/api/points");

      setmarkers(response.data);
    }
    async function fetchData() {
      const response = await axios.get("/api/data");

      setdata(response.data);
    }

    fetchmarkers();
    fetchData();
  }, []);

  const options = {
    enableMarkerTooltip: true,
    markerEnterAnimationDuration: 1000,
    markerEnterEasingFunction: ["Bounce", "InOut"],
    markerExitAnimationDuration: 1000,
    markerExitEasingFunction: ["Cubic", "Out"],
    enableDefocus: true,
    markerTooltipRenderer: (marker) => `${marker.country}`,
  };

  return (
    <div className="flex flex-col md:flex-row ">
      <SideBar
        points={markers}
        setCoordinates={(coordinates) => setFocus(coordinates)}
        lastFetched={data.last_fetched}
      />
      <div className="md:w-3/4 w-full">
        <ReactGlobe
          markers={markers}
          options={options}
          height="100vh"
          width="100%"
          focus={focus}
        />
      </div>
    </div>
  );
}
