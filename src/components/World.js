import SideBar from "./SideBar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactGlobe from "react-globe";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export default function World() {
  const [markers, setmarkers] = useState([]);
  const [focus, setFocus] = useState(null);
  useEffect(() => {
    async function fetchmarkers() {
      const response = await axios.get("/api/points");

      setmarkers(response.data);
    }
    fetchmarkers();
  }, []);

  const options = {
    enableMarkerTooltip: true,
    markerEnterAnimationDuration: 1000,
    markerEnterEasingFunction: ["Bounce", "InOut"],
    markerExitAnimationDuration: 1000,
    markerExitEasingFunction: ["Cubic", "Out"],
    markerTooltipRenderer: (marker) => `${marker.country}`,
  };

  return (
    <div className="flex flex-col md:flex-row ">
      <SideBar
        points={markers}
        setCoordinates={(coordinates) => setFocus(coordinates)}
      />
      <div className="md:w-2/3 w-full">
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
