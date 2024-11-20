"use client";

import { useEffect, useRef, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker, Cluster } from "@googlemaps/markerclusterer";
import { APIProvider, Map, useMap, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import fetchTreeInfo from "../../../data/trees"; // Import the fetch function
import "./map.css";
import { Point } from "../../../types/tree";
import "./markers.css";

type MarkersProps = {
    initialLat?: number | null;
    initialLong?: number | null;
};

const Markers = ({ initialLat, initialLong }: MarkersProps) => {
    const map = useMap();
    const [points, setPoints] = useState<Point[]>([]); // State to hold fetched points
    const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
    const [activeMarker, setActiveMarker] = useState<Point | null>(null);
    const [showSidebar, setShowSidebar] = useState<boolean>(false); // State for sidebar visibility
    const clusterer = useRef<MarkerClusterer | null>(null);
    const [zoom, setZoom] = useState<number | null>(null);

    // Fetch tree data when the component mounts
    useEffect(() => {
        const loadTreeData = async () => {
            const treePoints = await fetchTreeInfo(); // Call the fetch function
            setPoints(treePoints);

            // Automatically focus on the tree if initialLat and initialLong are passed
            if (initialLat && initialLong) {
                const targetTree = treePoints.find(
                    (point) => point.lat === initialLat && point.long === initialLong
                );

                if (targetTree) {
                    setActiveMarker(targetTree); // Set as active
                    if (map) {
                        map.panTo({ lat: initialLat, lng: initialLong });
                        map.setZoom(25); // Adjust zoom level as needed
                    }
                }
            }
        };

        loadTreeData();
    }, []);

    // Initialize the MarkerClusterer and attach it to the map
    // useEffect(() => {
    //     if (!map) return;

        // Initialize the MarkerClusterer
        // if (!clusterer.current) {
        //     clusterer.current = new MarkerClusterer({ map });
        // }

        // Add a listener for cluster clicks to zoom in on the cluster
    //     clusterer.current.addListener("click", (cluster: Cluster) => {
    //         if (cluster.markers) {
    //             // Zoom in on the clicked cluster
    //             const mapBounds = new google.maps.LatLngBounds();
    //             cluster.markers.forEach((marker) => {
    //                 if ('getPosition' in marker) {
    //                     const position = marker.getPosition();
    //                     if (position) {
    //                         mapBounds.extend(position);
    //                     }
    //                 }
    //             });
    //             map.fitBounds(mapBounds);
    //         }
    //     });

    // }, [map]);

    // Update the MarkerClusterer markers when the markers change
    // useEffect(() => {
    //     clusterer.current?.clearMarkers();
    //     clusterer.current?.addMarkers(Object.values(markers));
    // }, [markers]);

    // if (map) {
    //     google.maps.event.addListener(map, 'zoom_changed', function() {
    //         var zoom = map.getZoom();
    //     });
    // }


    // Function to set or remove a marker from the marker state
    const setMarkerRef = (marker: Marker | null, key: string) => {
        if (marker && markers[key]) return;
        if (!marker && !markers[key]) return;

    };

    const handleCloseWindow = () => {
        setActiveMarker(null);
        setShowSidebar(false);
    };

    const handleMarkerClick = (point: Point) => {
        setActiveMarker(point);

        if (map) {
            // Focus the map on the clicked tree's location and zoom in
            map.panTo({ lat: point.lat, lng: point.long });
            map.setZoom(25); 
        }
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
