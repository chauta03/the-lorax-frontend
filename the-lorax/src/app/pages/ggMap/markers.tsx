"use client";

import { act, useEffect, useRef, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";
import { APIProvider, Map, useMap, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import fetchTreeInfo from "../../../data/trees"; // Import the fetch function
import "./page.css";
import { Point } from "../../../types/tree"
import "./markers.css"

const Markers = () => {
    const map = useMap();
    const [points, setPoints] = useState<Point[]>([]); // State to hold fetched points
    const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
    const [activeMarker, setActiveMarker] = useState<Point | null>(null);
    const [showSidebar, setShowSidebar] = useState<boolean>(false); // State for sidebar visibility
    const clusterer = useRef<MarkerClusterer | null>(null);
    

    // Fetch tree data when the component mounts
    useEffect(() => {
        const loadTreeData = async () => {
            const treePoints = await fetchTreeInfo(); // Call the fetch function
            setPoints(treePoints);
        };

        loadTreeData();
    }, []);
    // console.log(points)

    useEffect(() => {
        if (!map) return;
        if (!clusterer.current) {
            clusterer.current = new MarkerClusterer({ map });
        }
    }, [map]);

    useEffect(() => {
        clusterer.current?.clearMarkers();
        clusterer.current?.addMarkers(Object.values(markers));
    }, [markers]);

    const setMarkerRef = (marker: Marker | null, key: string) => {
        if (marker && markers[key]) return;
        if (!marker && !markers[key]) return;

        setMarkers((prev) => {
            if (marker) {
                return { ...prev, [key]: marker };
            } else {
                const newMarkers = { ...prev };
                delete newMarkers[key];
                return newMarkers;
            }
        });
    };

    const handleCloseWindow = () => {
        setActiveMarker(null);
        setShowSidebar(false);
    };

    const handleMarkerClick = (point: Point) => {
        setActiveMarker(point);
    };

    const handleCloseSidebar = () => {
        setShowSidebar(false);
        setActiveMarker(null); // Optionally deselect the marker when closing the sidebar
    };

    return (
        <>
            {points.map((point) => (
                <AdvancedMarker
                    position={{ lat: point.lat, lng: point.long }}
                    key={point.tree_id}
                    ref={(marker) => setMarkerRef(marker, String(point.tree_id))}
                    onClick={() => handleMarkerClick(point)}
                >
                    <span style={{ fontSize: "2rem" }}>🌳</span>
                </AdvancedMarker>
            ))}

            {activeMarker && map && (
                <InfoWindow
                    position={{
                        lat: activeMarker.lat,
                        lng: activeMarker.long,
                    }}
                    onCloseClick={() => handleCloseWindow()}
                    className="infor-window"
                >
                    <div>
                        <h4>Tree Information</h4>
                        <p>Location: {activeMarker.lat}, {activeMarker.long}</p>
                        <p>Title: {activeMarker.latin_name}</p>
                        <button onClick={() => setShowSidebar(true)}>Learn more</button>
                    </div>
                </InfoWindow>
            )}

            {showSidebar && activeMarker && (
                <div
                    className="sidebar"
                    style={{
                        transform: showSidebar ? "translateX(0)" : "translateX(100%)",
                    }}
                >
                    <button className="sidebarButton" onClick={handleCloseSidebar}>
                        Close
                    </button>
                    <h3>{activeMarker.latin_name}</h3>
                    <div className="Details">
                        <p>Tag number: {activeMarker.tree_id}</p>
                        <p>Tag number: {activeMarker.tag_number}</p>
                        <p>Species Code: {activeMarker.species_code}</p>
                        <p>Latin Name: {activeMarker.latin_name}</p>
                        <p>Common Name: {activeMarker.common_name} </p>
                        <p>Sun: {activeMarker.sun}</p>
                        <p>Lat: {activeMarker.lat}</p>
                        <p>Lng: {activeMarker.long}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Markers;
