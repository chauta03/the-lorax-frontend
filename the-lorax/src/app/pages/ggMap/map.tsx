"use client";

import { useEffect, useRef, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";
import {
    APIProvider,
    Map,
    useMap,
    AdvancedMarker,
    InfoWindow,
} from "@vis.gl/react-google-maps"
import trees from "../../../data/trees";
import "./map.css";
import axios from "axios";
import Markers from "./markers";
import logo from '../../../images/logo.svg';

export default function GgMap() {
    const initialPosition = { lat: 42.290106400890906, lng: -85.59815573221456 };
    const apiKey = process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    const [isMobile, setIsMobile] = useState(false);
    const [zoomLevel, setZoomLevel] = useState<number | null>(null);
    const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

    // Detect screen width on mount and resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Set initial value
        handleResize();

        // Attach resize event listener
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    
    return (
        <APIProvider apiKey={apiKey}>
            <div className="map-container">
                <div className='logo-container'>
                    <img src={logo} className='logo-icon'/>
                </div>
                <div className="map">
                    <Map
                        defaultZoom={15}   // Set initial zoom
                        defaultCenter={initialPosition}  // Set initial center
                        mapId={process.env.REACT_APP_NEXT_PUBLIC_MAP_ID}
                        gestureHandling="auto"    // Allows dragging and gestures
                        zoomControl={true}        // Enables zoom control buttons
                        scrollwheel={true}        // Allows zooming with the scroll wheel
                        disableDoubleClickZoom={false}
                    >
                        <Markers />
                    </Map>
                </div>
            </div>
        </APIProvider>
    )
}
