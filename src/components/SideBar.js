import React, { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";

export default function SideBar(props) {
  const { points, lastFetched, setCoordinates, setAnimationSequence } = props;

  const [selectedPoint, setSelectedPoint] = useState(points[0]);
  const [query, setQuery] = useState("");

  const filteredPoints =
    query === ""
      ? points
      : points.filter((p) => {
          return p.country.toLowerCase().includes(query.toLowerCase());
        });

  const animations = [
    {
      coordinates: [1.3521, 103.8198],
      focusAnimationDuration: 3000,
      focusDistanceRadiusScale: 2,
      focusEasingFunction: ["Linear", "None"],
    },
    {
      coordinates: [39.9042, 116.4074],
      focusAnimationDuration: 3000,
      focusDistanceRadiusScale: 2,
      focusEasingFunction: ["Cubic", "InOut"],
    },
    {
      coordinates: [37.773972, -122.431297],
      focusAnimationDuration: 3000,
      focusDistanceRadiusScale: 2,
      focusEasingFunction: ["Back", "InOut"],
    },
    {
      coordinates: [40.73061, -73.935242],
      focusAnimationDuration: 3000,
      focusDistanceRadiusScale: 2,
      focusEasingFunction: ["Circular", "InOut"],
    },
    {
      coordinates: [51.5074, 0.1278],
      focusAnimationDuration: 3000,
      focusDistanceRadiusScale: 2,
      focusEasingFunction: ["Quadratic", "InOut"],
    },
    {
      coordinates: [1.3521, 103.8198],
      focusAnimationDuration: 5000,
      focusDistanceRadiusScale: 4,
      focusEasingFunction: ["Linear", "None"],
    },
  ];

  return (
    <div className="flex flex-col justify-center space-y-5 p-10 mx-auto  ">
      <h1 className="text-6xl md:text-8xl font-bold p-2 text-wrap ">
        Hello World 🗞️
      </h1>

      <div className="flex-1 ">
        <Combobox value={selectedPoint} onChange={setSelectedPoint}>
          <Combobox.Label className="p-2">Travel directly to...</Combobox.Label>
          <div className="flex flex-row flex-wrap">
            <Combobox.Input
              className=" border-none focus:ring p-2 m-2 text-md  bg-white rounded-lg shadow shadow-white text-gray-900"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(point) => point.country}
            />
            <Combobox.Button className="flex items-center pr-3">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
            <button
              className="p-2 bg-blue-400 self-center rounded-lg shadow shadow-white"
              onClick={() => {
                setCoordinates(selectedPoint.coordinates);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button
              className="p-2 m-2 bg-blue-400 self-center rounded-lg shadow shadow-white"
              onClick={() => setCoordinates(null)}
            >
              Zoom out
            </button>
            <button
              className="p-2 m-2 bg-blue-400 self-center rounded-lg shadow shadow-white"
              onClick={() => setAnimationSequence(animations)}
            >
              Travel the world
            </button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className=" m-2 p-2  overflow-auto max-h-40 text-md bg-white rounded-lg shadow shadow-white ">
              {filteredPoints.length === 0 && query !== "" ? (
                <div className=" text-gray-900 p-2">No results</div>
              ) : (
                filteredPoints.map((point) => (
                  <Combobox.Option
                    key={point.id}
                    className={({ active }) =>
                      `  p-2  rounded-lg ${
                        active ? "text-black bg-blue-200" : "text-gray-900"
                      }`
                    }
                    value={point}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={` ${
                            selected
                              ? "font-bold text-blue-400 "
                              : "font-normal"
                          }`}
                        >
                          {point.country}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </Combobox>
      </div>

      <div className="p-2 space-y-4">
        <p>
          Click on any marker to see the list of articles for that country that
          have been sentiment analysed.
        </p>
        <p>
          Data was last updated at{" "}
          <span className="text-blue-200">{lastFetched}</span>
        </p>
        <div>
          <a href="https://github.com/sam9111/HelloWorld">
            To know more about this project, see
            <img
              className="p-2"
              alt="Github"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAzMCAzMCIKc3R5bGU9IiBmaWxsOiNmZmZmZmY7Ij4gICAgPHBhdGggZD0iTTE1LDNDOC4zNzMsMywzLDguMzczLDMsMTVjMCw1LjYyMywzLjg3MiwxMC4zMjgsOS4wOTIsMTEuNjNDMTIuMDM2LDI2LjQ2OCwxMiwyNi4yOCwxMiwyNi4wNDd2LTIuMDUxIGMtMC40ODcsMC0xLjMwMywwLTEuNTA4LDBjLTAuODIxLDAtMS41NTEtMC4zNTMtMS45MDUtMS4wMDljLTAuMzkzLTAuNzI5LTAuNDYxLTEuODQ0LTEuNDM1LTIuNTI2IGMtMC4yODktMC4yMjctMC4wNjktMC40ODYsMC4yNjQtMC40NTFjMC42MTUsMC4xNzQsMS4xMjUsMC41OTYsMS42MDUsMS4yMjJjMC40NzgsMC42MjcsMC43MDMsMC43NjksMS41OTYsMC43NjkgYzAuNDMzLDAsMS4wODEtMC4wMjUsMS42OTEtMC4xMjFjMC4zMjgtMC44MzMsMC44OTUtMS42LDEuNTg4LTEuOTYyYy0zLjk5Ni0wLjQxMS01LjkwMy0yLjM5OS01LjkwMy01LjA5OCBjMC0xLjE2MiwwLjQ5NS0yLjI4NiwxLjMzNi0zLjIzM0M5LjA1MywxMC42NDcsOC43MDYsOC43Myw5LjQzNSw4YzEuNzk4LDAsMi44ODUsMS4xNjYsMy4xNDYsMS40ODFDMTMuNDc3LDkuMTc0LDE0LjQ2MSw5LDE1LjQ5NSw5IGMxLjAzNiwwLDIuMDI0LDAuMTc0LDIuOTIyLDAuNDgzQzE4LjY3NSw5LjE3LDE5Ljc2Myw4LDIxLjU2NSw4YzAuNzMyLDAuNzMxLDAuMzgxLDIuNjU2LDAuMTAyLDMuNTk0IGMwLjgzNiwwLjk0NSwxLjMyOCwyLjA2NiwxLjMyOCwzLjIyNmMwLDIuNjk3LTEuOTA0LDQuNjg0LTUuODk0LDUuMDk3QzE4LjE5OSwyMC40OSwxOSwyMi4xLDE5LDIzLjMxM3YyLjczNCBjMCwwLjEwNC0wLjAyMywwLjE3OS0wLjAzNSwwLjI2OEMyMy42NDEsMjQuNjc2LDI3LDIwLjIzNiwyNywxNUMyNyw4LjM3MywyMS42MjcsMywxNSwzeiI+PC9wYXRoPjwvc3ZnPg=="
            />
          </a>
        </div>
      </div>
    </div>
  );
}
