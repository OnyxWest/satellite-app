"use client";
import React from "react";
import { Scene, ScreenSpaceCameraController, SkyBox, Viewer } from "resium";
import * as Cesium from "cesium";
import LaunchSites from "./LaunchSites";
import SatelliteCollection from "./SatelliteCollection";

export default function Globe() {
	if (process.env.NEXT_PUBLIC_CESIUM_ACCESS_TOKEN) {
		Cesium.Ion.defaultAccessToken =
			process.env.NEXT_PUBLIC_CESIUM_ACCESS_TOKEN;
	} else {
		console.error("NEXT_PUBLIC_CESIUM_ACCESS_TOKEN is not set");
	}

	return (
		<Viewer full skyAtmosphere={false}>
			<ScreenSpaceCameraController
				maximumZoomDistance={300000000}
				minimumZoomDistance={500000}
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
