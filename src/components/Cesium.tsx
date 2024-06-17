"use client";
import React from "react";
import { Viewer } from "resium";
import { LaunchSites } from "./launch_sites";

export default function Cesium() {
	return (
		<div>
			<Viewer full>
				<LaunchSites />
			</Viewer>
		</div>
	);
}
