import { Entity } from "resium";
import { Cartesian3, NearFarScalar } from "cesium";
import launch_sites from "../tmp_data/launch_sites.json";

export default function LaunchSites() {
	return launch_sites.sites.map((site) => (
		<Entity
			key={site.name}
			description={site.description}
			name={site.name}
			point={{ pixelSize: 5 }}
			position={Cartesian3.fromDegrees(site.cords[1], site.cords[0])}
			label={{
				text: site.name,
				scale: 0.6,
				translucencyByDistance: new NearFarScalar(
					6.0e7,
					1.0,
					7.0e7,
					0.0
				),
			}}
		/>
	));
};
