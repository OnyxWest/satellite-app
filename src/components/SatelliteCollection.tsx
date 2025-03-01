"use client";
import React, {
	useEffect,
	useRef,
	useState,
	FC,
	MutableRefObject,
} from "react";
import { Cartesian3, Color, Transforms } from "cesium";
import { PointPrimitiveCollection, CesiumComponentRef } from "resium";
import { SatRec } from "satellite.js";
import { PointPrimitive } from "cesium";

import { satRecToEci } from "../helpers/util";
import { getTles } from "../helpers/services/tle";

export interface SatelliteCollectionProps {
	batch_size: number;
	update_rate: number;
}

const SatelliteCollection: FC<SatelliteCollectionProps> = (props) => {
	const satRecsRef = useRef<SatRec[]>([]);
	const positionsRef = useRef<(Cartesian3 | null)[]>([]);
	const batchIndexRef = useRef(0);
	const pointsRef = useRef<(PointPrimitive | null)[]>([]);
	const collectionRef: MutableRefObject<CesiumComponentRef<
		typeof PointPrimitiveCollection
	> | null> = useRef(null);

	const [collectionsMounted, setCollectionsMounted] = useState(false);

	const addPoints = () => {
		const fetchData = async () => {
			const satRecs = await getTles();
			satRecsRef.current = satRecs;

			// initial positions
			const initialPositions = satRecs.map((satRec: SatRec) => {
				const position = satRecToEci(satRec, new Date());
				return position
					? new Cartesian3(
							position.x * 1000,
							position.y * 1000,
							position.z * 1000
						)
					: null;
			});
			positionsRef.current = initialPositions;

			const pointPrimitives = satRecs.map((_satRec, i) => {
				if (initialPositions[i]) {
					// @ts-expect-error - cesiumElement props does not include add method
					return collectionRef.current?.cesiumElement?.add({
						position: initialPositions[i],
						pixelSize: 2.7,
						color: Color.WHITE,
					});
				}
				return null;
			});
			pointsRef.current = pointPrimitives;
		};

		fetchData();
	};

	const updateSatellitePositions = (
		satRecs: SatRec[],
		time: Date,
		start: number,
		end: number
	) => {
		for (let i = start; i < end; i++) {
			const satRec = satRecs[i];
			const position = satRecToEci(satRec, time);
			if (position && pointsRef && pointsRef.current?.[i]) {
				// @ts-expect-error - ts being stupid
				pointsRef.current[i].position = new Cartesian3(
					position.x * 1000,
					position.y * 1000,
					position.z * 1000
				);
			}
		}
	};

	useEffect(() => {
		if (
			collectionsMounted &&
			collectionRef.current?.cesiumElement &&
			// @ts-expect-error - cesiumElement props does not include add isDestroyed method
			!collectionRef.current.cesiumElement.isDestroyed()
		) {
			addPoints();
		}
	}, [collectionsMounted, collectionRef.current]);

	useEffect(() => {
		const timer = setInterval(() => {
			if (
				!collectionsMounted &&
				// @ts-expect-error - cesiumElement is not defined in type
				(satRecsRef.current.length === 0 ||
					!collectionRef.current.cesiumElement.length)
			) {
				setCollectionsMounted(true);
				return;
			}
			const time = new Date();
			const start = batchIndexRef.current * props.batch_size;
			const end = Math.min(
				start + props.batch_size,
				satRecsRef.current.length
			);
			updateSatellitePositions(satRecsRef.current, time, start, end);

			// Update batch index cyclically
			batchIndexRef.current =
				(batchIndexRef.current + 1) %
				Math.ceil(satRecsRef.current.length / props.batch_size);
		}, props.update_rate);

		return () => {
			clearInterval(timer);
		};
	}, [updateSatellitePositions]);

	return (
		<PointPrimitiveCollection
			// @ts-expect-error - ts being stupid
			ref={collectionRef}
			modelMatrix={Transforms.eastNorthUpToFixedFrame(
				new Cartesian3(0, 0, 0)
			)}
		/>
	);
};

export default SatelliteCollection;
