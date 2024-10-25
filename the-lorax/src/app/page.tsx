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
import trees from "../data/trees";
import "./page.css";
import axios from "axios";
import Markers from "./markers";

export default function Intro() {
    const initialPosition = { lat: 42.290106400890906,  lng: -85.59815573221456 };
    const apiKey = process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    return (
        <APIProvider apiKey={apiKey}>
            <div style={{ height: "100vh", width: "100%"}}>
                <Map
                    defaultZoom={15}   // Set initial zoom
                    defaultCenter={initialPosition}  // Set initial center
                    mapId={process.env.REACT_APP_NEXT_PUBLIC_MAP_ID}
                    gestureHandling="auto"    // Allows dragging and gestures
                    zoomControl={true}        // Enables zoom control buttons
                    scrollwheel={true}        // Allows zooming with the scroll wheel
                    disableDoubleClickZoom={false} // Double-click zoom is enabled
                >
                    <Markers />
                </Map>
            </div>
        </APIProvider>
    )
}
