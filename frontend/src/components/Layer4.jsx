import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-timedimension/dist/leaflet.timedimension.control.css";
import "leaflet-timedimension";
import L from "leaflet";
import { Moon, Sun } from "lucide-react";
import "leaflet.fullscreen/Control.FullScreen.css";
import "leaflet.fullscreen";

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
          : generateTimeStepsFromInterval(timeString);
        return times;
      }
    }
  }
  return [];
};

const generateTimeStepsFromInterval = (rangeStr) => {
  const [startStr, endStr, stepStr] = rangeStr.split("/");
  const start = new Date(startStr);
  const end = new Date(endStr);
  const times = [];

  const stepInMs = {
    PT1H: 3600000,
    PT3H: 10800000,
    PT6H: 21600000,
  }[stepStr] || 3600000;

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

    const wmsLayer = L.tileLayer.wms("/geoserver/arome/wms?", {
      layers: "v10",
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

const MapControls = () => {
  const map = useMap();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [baseLayer, setBaseLayer] = useState(null);

  useEffect(() => {
    // Initialize base layer (light mode by default)
    const lightLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    setBaseLayer(lightLayer);

    // Initialize fullscreen control only once
    if (!map.hasFullscreenControl) {
      const fullscreenControl = new L.Control.FullScreen({
        position: 'topleft',
        title: 'View Fullscreen'
      });
      map.addControl(fullscreenControl);
      map.hasFullscreenControl = true;
    }

    return () => {
      if (baseLayer) {
        map.removeLayer(baseLayer);
      }
    };
  }, [map]);

  const toggleDarkMode = () => {
    if (baseLayer) {
      map.removeLayer(baseLayer);
    }

    const newLayer = isDarkMode 
      ? L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
      : L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20
        });

    newLayer.addTo(map);
    setBaseLayer(newLayer);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="leaflet-top leaflet-left">
      <div className="leaflet-control leaflet-bar" style={{ marginLeft: '50px', marginTop: '10px' }}>
        <button
          onClick={toggleDarkMode}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="leaflet-control-button"
          style={{
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDarkMode ? '#333' : '#fff',
            color: isDarkMode ? '#fff' : '#333'
          }}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </div>
  );
};

const Layerfor = () => {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const getTimes = async () => {
      const fetchedTimes = await fetchWMSTimes("/geoserver/arome/wms", "v10");
      setTimes(fetchedTimes);
    };
    getTimes();
  }, []);

  return (
    <MapContainer center={[30.0, 3.0]} zoom={5} style={{ height: "100vh", width: "100%" }}>
      {/* Base layer is now controlled by MapControls component */}
      {times.length > 0 && <TimeDimensionWMSLayer times={times} />}
      <MapControls />
    </MapContainer>
  );
};

export default Layerfor;