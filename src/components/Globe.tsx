"use client";
import React from "react";
import {
	Camera,
	Scene,
	ScreenSpaceCameraController,
	SkyBox,
	Viewer,
} from "resium";
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
		<Viewer full skyAtmosphere={false} targetFrameRate={60}>
			<ScreenSpaceCameraController
				maximumZoomDistance={10000000000}
				minimumZoomDistance={700000}
				//@ts-expect-error - typescript does not recognize zoomFactor prop even though its in the typings lol
				zoomFactor={3}
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
