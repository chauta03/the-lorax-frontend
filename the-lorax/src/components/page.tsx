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
    const position = { lat: 53.54,  lng: 10 };
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    console.log(apiKey)
    console.log(process.env);

    return (
        <APIProvider apiKey={apiKey}>
            <div style={{ height: "100vh",  width: "100%" }}>
                <Map zoom={9} center={position}></Map>
            </div>
        </APIProvider>
    )
}