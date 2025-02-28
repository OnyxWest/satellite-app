"use client";
import React from "react";
import { ScreenSpaceCameraController, SkyBox, Viewer } from "resium";
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
		<Viewer full skyAtmosphere={false}>
			<ScreenSpaceCameraController
				maximumZoomDistance={10000000000}
				minimumZoomDistance={700000}
			/>
			<SkyBox
				show={true}
				sources={{
					positiveX: "right.png",
					negativeX: "left.png",
					positiveY: "bottom.png",
					negativeY: "top.png",
					positiveZ: "front.png",
					negativeZ: "back.png",
				}}
			/>
			<LaunchSites />
			<SatelliteCollection batch_size={1000} update_rate={75} />
		</Viewer>
	);
}
