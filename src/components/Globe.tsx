"use client";
import React, { useEffect, useState } from "react";
import { Viewer } from "resium";
import * as Cesium from "cesium";
import { Ion } from "cesium";
import LaunchSites from "./LaunchSites";
import SatelliteCollection from "./SatelliteCollection";

export default function Globe() {
	const [skyBox, setSkyBox] = useState(null);
	if (process.env.NEXT_PUBLIC_CESIUM_ACCESS_TOKEN) {
		Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_ACCESS_TOKEN;
	} else {
		console.error("NEXT_PUBLIC_CESIUM_ACCESS_TOKEN is not set");
	}
	useEffect(() => {
		setSkyBox(
			new Cesium.SkyBox({
				sources: {
					positiveX: "right.png",
					negativeX: "left.png",
					positiveY: "bottom.png",
					negativeY: "top.png",
					positiveZ: "front.png",
					negativeZ: "back.png",
				},
			})
		);
	}, []);

	return (
		<>
			<Viewer full skyAtmosphere={false} skyBox={skyBox}>
				<LaunchSites />
				<SatelliteCollection batch_size={1000} update_rate={75} />
			</Viewer>
		</>
	);
}
