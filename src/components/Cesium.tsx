"use client";
import React from "react";
import { Viewer } from "resium";
import LaunchSites from "./LaunchSites";
import SatelliteCollection from "./SatelliteCollection";

export default function Cesium() {
    return (
        <Viewer
            full
        >
            <LaunchSites />
            <SatelliteCollection />
        </Viewer>
    );
}
