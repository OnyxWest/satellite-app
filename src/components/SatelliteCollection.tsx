"use client";
import React, {useEffect, useRef, useState} from "react";
import { Cartesian3, Color, Transforms } from "cesium";
import { PointPrimitiveCollection } from "resium";
import { SatRec } from "satellite.js";

import {satRecToEci} from "../helpers/util";
import {getTles} from "../helpers/services/tle"

const BATCH_SIZE = 1000;
const UPDATE_RATE = 75;

export default function SatelliteCollection() {
  const satRecsRef = useRef<SatRec[]>([]);
  const positionsRef = useRef([]);
  const batchIndexRef = useRef(0);
  const pointsRef = useRef([]);
  const collectionRef = useRef<typeof PointPrimitiveCollection | undefined>();

  const [collectionsMounted, setCollectionsMounted] = useState(false)

  const addPoints = () => {
    const fetchData = async () => {
      const satRecs = await getTles();
      satRecsRef.current = satRecs;

      // initial positions
      const initialPositions = satRecs.map((satRec: SatRec) => {
        const position = satRecToEci(satRec, new Date());
        return position ? new Cartesian3(position.x * 1000, position.y * 1000, position.z * 1000) : null;
      });
      positionsRef.current = initialPositions;

      const pointPrimitives = satRecs.map((_satRec, i) => {
        if (initialPositions[i]) {
          return collectionRef.current.cesiumElement.add({
            position: initialPositions[i],
            pixelSize: 2.5,
            color: Color.WHITE,
          });
        }
        return null;
      });
      pointsRef.current = pointPrimitives;
    };

    fetchData();
  };

  const updateSatellitePositions = (satRecs, time, start, end) => {
    for (let i = start; i < end; i++) {
      const satRec = satRecs[i];
      const position = satRecToEci(satRec, time);
      if (position) {
        pointsRef.current[i].position = new Cartesian3(position.x * 1000, position.y * 1000, position.z * 1000);
      }
    }
  };

  useEffect(() => {
    if (
      collectionsMounted &&
            collectionRef.current?.cesiumElement &&
            !collectionRef.current.cesiumElement.isDestroyed()
    ) {
      addPoints();
    }
  }, [collectionsMounted, collectionRef.current]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (
        !collectionsMounted &&
                (satRecsRef.current.length === 0 || !collectionRef.current.cesiumElement.length)
      ) {
        setCollectionsMounted(true);
        return;
      }
      const time = new Date();
      const start = batchIndexRef.current * BATCH_SIZE;
      const end = Math.min(start + BATCH_SIZE, satRecsRef.current.length);
      updateSatellitePositions(satRecsRef.current, time, start, end);

      // Update batch index cyclically
      batchIndexRef.current = (batchIndexRef.current + 1) % Math.ceil(satRecsRef.current.length / BATCH_SIZE);
    }, UPDATE_RATE);

    return () => {
      clearInterval(timer);
    }
  }, [updateSatellitePositions]);

  return (
    <PointPrimitiveCollection
      ref={collectionRef}
      modelMatrix={Transforms.eastNorthUpToFixedFrame(new Cartesian3(0, 0, 0))}
    />
  );
}
