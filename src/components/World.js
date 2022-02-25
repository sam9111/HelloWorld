import SideBar from "./SideBar";
import axios from "axios";
import React, { useEffect, useState, Fragment } from "react";
import ReactGlobe from "react-globe";
import "tippy.js/dist/tippy.css";
import { Dialog, Transition } from "@headlessui/react";
import Card from "./Card";

export default function World() {
  const [markers, setmarkers] = useState([]);
  const [data, setdata] = useState([]);
  const [focus, setFocus] = useState(null);
  const [country, setCountry] = useState(null);
  const [countryObj, setCountryObj] = useState(null);
  const [animationSequence, setAnimationSequence] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
    <div
      className={`flex flex-col md:flex-row ${
        isOpen ? "blur-md" : "blur-none"
      } `}
    >
      <SideBar
        points={markers}
        setCoordinates={(coordinates) => setFocus(coordinates)}
        lastFetched={data.last_fetched}
        setAnimationSequence={(animationSequence) =>
          setAnimationSequence(animationSequence)
        }
      />
      <div className="w-full">
        <ReactGlobe
          markers={markers}
          options={options}
          height="100vh"
          width="100%"
          focus={focus}
          animations={animationSequence}
          onClickMarker={(marker, markerObject, event) => {
            setCountry(marker.country);
            setCountryObj(data.countries[marker.id]);
            openModal();
          }}
        />
        {countryObj && (
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={closeModal}
            >
              <div className="min-h-screen px-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0" />
                </Transition.Child>

                <span
                  className="inline-block h-screen align-middle"
                  aria-hidden="true"
                ></span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-block space-y-5 w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white  rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-medium leading-6 text-gray-900"
                    >
                      {country}
                    </Dialog.Title>

                    <p className="text-lg text-gray-500">
                      Mostly reporting {countryObj.sentiment} headlines in the
                      past 24 hours.
                    </p>
                    <Card articles={countryObj.articles} />
                    <button
                      type="button"
                      className="p-2 bg-blue-400 text-white self-center rounded-lg "
                      onClick={closeModal}
                    >
                      Go Back
                    </button>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        )}
      </div>
    </div>
  );
}
