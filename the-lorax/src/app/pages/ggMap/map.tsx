"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { APIProvider, Map, useMap, AdvancedMarker } from "@vis.gl/react-google-maps";
import Markers from "./markers";
import "./map.css";
import Footer from "../../components/footer";
import fetchTreeInfo from "../../../data/trees";

export default function GgMap() {
    const initialPosition = { lat: 42.290106400890906, lng: -85.59815573221456 };
    const apiKey = process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    const [isMobile, setIsMobile] = useState(false);
    const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [searchLat, setSearchLat] = useState<string>("");
    const [searchLng, setSearchLng] = useState<string>("");
    const [searchId, setSearchId] = useState<string>("");
    const [loadingLocation, setLoadingLocation] = useState<boolean>(false); // Loading state for location
    const [searchingId, setSearchingId] = useState<boolean>(false);
    const [searchingLL, setSearchingLL] = useState<boolean>(false);

    // Get tree
    const [searchParams] = useSearchParams();
    const initialLat = searchParams.get("lat") || "";
    const initialLong = searchParams.get("long") || "";

    const mapInstanceRef = useRef<google.maps.Map | null>(null);

    // Detect screen width on mount and resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    

    // Search by tree ID
    const handleSearchByTreeId = async (id: string) => {
        setSearchingId(true);
        const trees = await fetchTreeInfo()
        const treeId = parseInt(id);

        const targetTree = trees.find((tree) => tree.tree_id === treeId);


        if (targetTree) {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.panTo({ lat: targetTree.lat, lng: targetTree.long });
                mapInstanceRef.current.setZoom(25);
            }
        } else {
            alert("Tree not found.");
        }
        setSearchingId(false);
    }

    // Handle search to center map
    const handleSearch = () => {
        setSearchingLL(true);
        const lat = parseFloat(searchLat);
        const lng = parseFloat(searchLng);

        if (!mapInstanceRef.current) {
            alert("Map is not loaded yet.");
            return;
        }

        if (isNaN(lat) || isNaN(lng)) {
            alert("Please enter valid latitude and longitude values.");
            return;
        }

        mapInstanceRef.current.panTo({ lat, lng });
        mapInstanceRef.current.setZoom(25);
        setSearchingLL(false);
    };

    // Get Current Location
    const handleGetCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        setLoadingLocation(true); // Start loading

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ lat: latitude, lng: longitude });
                setLoadingLocation(false); // End loading

                // Center map on current location
                if (mapInstanceRef.current) {
                    mapInstanceRef.current.panTo({ lat: latitude, lng: longitude });
                    mapInstanceRef.current.setZoom(35);
                }
            },
            (error) => {
                alert("Unable to retrieve your location.");
                console.error(error);
                setLoadingLocation(false); // End loading
            }
        );
    };

    const MapContainer = () => {
        const map = useMap();
        useEffect(() => {
            if (map) {
                mapInstanceRef.current = map;
            }
        }, [map]);

        return null;
    };

    return (
        <div>
            <APIProvider apiKey={apiKey}>
                <div className="map-container">
                    {/* Controls */}
                    <div className="controls">
                        <button
                            className="map-button current-location-button"
                            onClick={handleGetCurrentLocation}
                            disabled={loadingLocation} // Disable button while loading
                        >
                            {loadingLocation ? "Loading location..." : "Get Current Location"}
                        </button>

                        <div className="map-search-container">
                            <div className="map-search-bar">
                            <input
                                    type="text"
                                    placeholder="Tree ID"
                                    value={searchId}
                                    onChange={(e) => setSearchId(e.target.value)}
                                />
                                <button
                                    className="map-button"
                                    onClick={() => handleSearchByTreeId(searchId)}
                                >
                                    {searchingId ? "Searching..." : "Search Tree ID"}
                                </button>
                            </div>



                            <div className="map-search-bar">
                                <input
                                    type="text"
                                    placeholder="Latitude"
                                    value={searchLat}
                                    onChange={(e) => setSearchLat(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Longitude"
                                    value={searchLng}
                                    onChange={(e) => setSearchLng(e.target.value)}
                                />
                                <button className="map-button" onClick={handleSearch}>
                                    {searchingLL ? "Searching..." : "Search Location"}
                                </button>
                            </div>
                        </div>
                        
                    </div>

                    {/* Map */}
                    <div className="map">
                        <Map
                            defaultZoom={15}
                            defaultCenter={initialPosition}
                            mapId={process.env.REACT_APP_NEXT_PUBLIC_MAP_ID}
                            gestureHandling="auto"
                            zoomControl={true}
                            scrollwheel={true}
                            disableDoubleClickZoom={false}
                        >
                            <MapContainer />
                            <Markers initialLat={parseFloat(initialLat)} initialLong={parseFloat(initialLong)} />
                            {currentLocation && (
                                <AdvancedMarker
                                    position={currentLocation}
                                    key="current-location"
                                >
                                    <span style={{ fontSize: "2rem" }}>📍</span>
                                </AdvancedMarker>
                            )}
                        </Map>
                    </div>
                </div>
            </APIProvider>
        </div>
    );
}
