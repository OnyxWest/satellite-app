"use client";
import React from "react";
import { Viewer } from "resium";
import { Ion } from "cesium";
import LaunchSites from "./LaunchSites";
import SatelliteCollection from "./SatelliteCollection";

export default function Globe() {
  if (process.env.NEXT_PUBLIC_CESIUM_ACCESS_TOKEN) {
    Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_ACCESS_TOKEN;
  } else {
    console.error("NEXT_PUBLIC_CESIUM_ACCESS_TOKEN is not set");
  }

  return (
    <Viewer
      full
    >
      <LaunchSites />
      <SatelliteCollection />
    </Viewer>
  );
}
