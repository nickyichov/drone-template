import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icons
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Map({ distance }) {
    const [position, setPosition] = useState(null);       // Your ground station
    const [dronePos, setDronePos] = useState(null);        // Drone GPS position
    const [dronePath, setDronePath] = useState([]);        // Line of where drone has been

    // Get ground station location (your code)
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
            (err) => console.error(err)
        );
    }, []);

    // DEMO: simulate drone movement for now
    useEffect(() => {
        if (!position) return;

        let lat = position[0] + 0.001;
        let lng = position[1] + 0.001;

        const interval = setInterval(() => {
            lat += (Math.random() - 0.5) * 0.0005;
            lng += (Math.random() - 0.5) * 0.0005;

            const newPoint = [lat, lng];
            setDronePos(newPoint);
            setDronePath(path => [...path, newPoint]); // Add to trail
        }, 1500);

        return () => clearInterval(interval);
    }, [position]);

    return (
        <div className="p-4">
            {!position && <p>Loading your location…</p>}

            {position && (
                <MapContainer
                    center={position}
                    zoom={16}
                    style={{ height: "320px", width: "100%", borderRadius: "5%" }}
                >
                    <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {/* Your location */}
                    <Marker position={position}>
                        <Popup>You are here</Popup>
                    </Marker>

                    <Circle
                        center={position}
                        radius={distance}
                        pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.2 }}
                    />

                    {/* Drone Marker */}
                    {dronePos && (
                        <Marker position={dronePos}>
                            <Popup>Drone Location</Popup>
                        </Marker>
                    )}

                    {/* Drone path */}
                    {dronePath.length > 1 && (
                        <Polyline positions={dronePath} color="red" />
                    )}
                </MapContainer>
            )}
        </div>
    );
}
