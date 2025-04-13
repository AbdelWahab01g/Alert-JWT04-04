import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-timedimension/dist/leaflet.timedimension.control.css";
import "leaflet-timedimension";
import L from "leaflet";

// Helper function to fetch times from WMS GetCapabilities
const fetchWMSTimes = async (wmsUrl, layerName) => {
  const url = `${wmsUrl}?service=WMS&version=1.1.1&request=GetCapabilities`;
  const response = await fetch(url);
  const text = await response.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "text/xml");

  const layers = xml.getElementsByTagName("Layer");
  for (let i = 0; i < layers.length; i++) {
    const name = layers[i].getElementsByTagName("Name")[0];
    if (name && name.textContent === layerName) {
      const extent = layers[i].getElementsByTagName("Extent")[0];
      if (extent && extent.getAttribute("name") === "time") {
        const timeString = extent.textContent.trim();
        const times = timeString.includes(",")
          ? timeString.split(",")
          : generateTimeStepsFromInterval(timeString); // If it's a range with steps
        return times;
      }
    }
  }
  return [];
};

// If times are given as a range, like "2024-11-09T00:00:00Z/2024-11-10T00:00:00Z/PT1H"
const generateTimeStepsFromInterval = (rangeStr) => {
  const [startStr, endStr, stepStr] = rangeStr.split("/");
  const start = new Date(startStr);
  const end = new Date(endStr);
  const times = [];

  const stepInMs = {
    PT1H: 3600000,
    PT3H: 10800000,
    PT6H: 21600000,
  }[stepStr] || 3600000; // Default to 1 hour

  for (let t = start; t <= end; t = new Date(t.getTime() + stepInMs)) {
    times.push(t.toISOString());
  }
  return times;
};

const TimeDimensionWMSLayer = ({ times }) => {
  const map = useMap();

  useEffect(() => {
    if (!map.timeDimension) {
      map.timeDimension = new L.TimeDimension({
        times: times.join(","),
      });
    }

    const wmsLayer = L.tileLayer.wms("/geoserver/Aromwork/wms?", {
      layers: "t2mWorckfile",
      format: "image/png",
      transparent: true,
      version: "1.1.1",
    });

    const timeDimensionLayer = L.timeDimension.layer.wms(wmsLayer, {
      updateTimeDimension: true,
    });

    timeDimensionLayer.addTo(map);

    if (!map.timeDimensionControl) {
      map.timeDimensionControl = new L.Control.TimeDimension({
        position: "bottomleft",
        autoPlay: true,
        loopButton: true,
        timeSliderDragUpdate: true,
      });
      map.addControl(map.timeDimensionControl);
    }

    return () => {
      map.removeLayer(timeDimensionLayer);
    };
  }, [map, times]);

  return null;
};

const GeoServerTimeLayer = () => {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const getTimes = async () => {
      const fetchedTimes = await fetchWMSTimes("/geoserver/Aromwork/wms", "t2mWorckfile");
      setTimes(fetchedTimes);
    };
    getTimes();
  }, []);

  return (
    <MapContainer center={[30.0, 3.0]} zoom={5} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {times.length > 0 && <TimeDimensionWMSLayer times={times} />}
    </MapContainer>
  );
};

export default GeoServerTimeLayer;
