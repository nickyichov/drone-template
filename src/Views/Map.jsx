import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
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
    const [position, setPosition] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition([pos.coords.latitude, pos.coords.longitude]);
            },
            (err) => console.error(err)
        );
    }, []);

    return (
        <div className="p-4">
            {!position && <p>Loading your location…</p>}

            {position && (
                <MapContainer
                    center={position}
                    zoom={16}
                    style={{ height: "350px", width: "100%", borderRadius: "5%" }}
                >
                    <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {/* Marker at your position */}
                    <Marker position={position}>
                        <Popup>You are here</Popup>
                    </Marker>

                    {/* 100 meter radius circle */}
                    <Circle
                        center={position}
                        radius={distance}   // <— 100 meters
                        pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.2 }}
                    />
                </MapContainer>
            )}
        </div>
    );
}
