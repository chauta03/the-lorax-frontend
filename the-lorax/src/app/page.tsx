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
import trees from "../data/tree";

export default function Intro() {
    const initialPosition = { lat: 42.290106400890906,  lng: -85.59815573221456 };
    const apiKey = process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    return (
        <APIProvider apiKey={apiKey}>
            <div style={{ height: "100vh", width: "100%", overflow: "hidden" }}>
                <Map
                    defaultZoom={15}   // Set initial zoom
                    defaultCenter={initialPosition}  // Set initial center
                    mapId={process.env.REACT_APP_NEXT_PUBLIC_MAP_ID}
                    gestureHandling="auto"    // Allows dragging and gestures
                    zoomControl={true}        // Enables zoom control buttons
                    scrollwheel={true}        // Allows zooming with the scroll wheel
                    disableDoubleClickZoom={false} // Double-click zoom is enabled
                >
                    <Markers points={trees} />
                </Map>
            </div>
        </APIProvider>
    )
}

type Point = google.maps.LatLngLiteral & {key: string } & {name: string};
type Props = { points: Point[] };

const Markers = ({ points }: Props) => {
    const map = useMap();
    const [markers, setMarkers] = useState<{[key: string]: Marker }>({});
    const [activeMarker, setActiveMarker] = useState<Point | null>(null);
    const clusterer = useRef<MarkerClusterer | null>(null);

    useEffect(() => {
        if (!map) return
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
                return {...prev, [key]: marker}
            } else {
                const newMarkers = {...prev};
                delete newMarkers[key];
                return newMarkers;
            }
        })
    }

    const handleMarkerClick = (point: Point) => {
        setActiveMarker(point);
    }

    const handleCloseInfoWindow = () =>  {
        setActiveMarker(null);
    }

    

    return (
        <>
           {points.map((point) => (
            <AdvancedMarker
                position={{ lat: point.lat - 0.00004, lng: point.lng }}
                key={point.key}
                ref={(marker) => setMarkerRef(marker, point.key)}
                onClick={() => handleMarkerClick(point)}
                
            >
                <span style={{ fontSize: "2rem"}}>🌳</span>
            </AdvancedMarker>
            
          ))}
          {activeMarker && (
                <InfoWindow
                    position={activeMarker}
                    onCloseClick={handleCloseInfoWindow}
                >
                    <div>
                        <h4>Tree Information</h4>
                        <p>Location: {activeMarker.lat}, {activeMarker.lng}</p>
                        <p>Title: {activeMarker.name}</p>
                        {/* Add more info if needed */}
                    </div>
                </InfoWindow>
            )}
        </>
    );
}