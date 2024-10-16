"use client";

import { useState } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from "@vis.gl/react-google-maps"

export default function Intro() {
    const position = { lat: 42.290106400890906,  lng: -85.59815573221456 };
    const apiKey = process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    return (
        <APIProvider apiKey={apiKey}>
            <div style={{ height: "100vh",  width: "100%", overflow: "hidden" }}>
                <Map
                    zoom={9} 
                    center={position}  
                    mapId={process.env.REACT_APP_NEXT_PUBLIC_MAP_ID}
                    gestureHandling="auto" // Enables scrolling and gestures
                    zoomControl={true}     // Enables zoom controls
                    scrollwheel={true}     // Allows zoom with the scroll wheel
                    disableDoubleClickZoom={false} // Allows zoom on double click
                >
                    <AdvancedMarker position={position}>
                        
                    </AdvancedMarker>
                </Map>
            </div>
        </APIProvider>
    )
}