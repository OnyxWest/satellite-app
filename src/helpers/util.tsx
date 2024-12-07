import {
  twoline2satrec,
  propagate,
  gstime,
  eciToGeodetic,
  SatRec,
  GeodeticLocation,
  EciVec3,
} from "satellite.js";

/* Given a TLE, output the SatRec object. */
export const tleToSatRec = (line1: string, line2: string) : SatRec => {
  return twoline2satrec(line1, line2);
};

/* Given a SatRec and a time, output the ECI X,Y,Z coordinates. */
export const satRecToEci = (satRec: SatRec, time: Date): EciVec3<number> | null => {
  const posEci = propagate(satRec, time).position;
  if (!posEci) {
    return null;
  }
  return posEci;
};

/* Given a SatRec and a time, output the Geodetic coordinates. */
export const satRecToGeodetic = (satRec: SatRec, time: Date): GeodeticLocation | null => {
  const gmst = gstime(time);
  const posEci = propagate(satRec, time).position;
  if (!posEci) {
    return null;
  }
  return eciToGeodetic(posEci, gmst);
};

/* Given a TLE and a time, output the ECI X,Y,Z coordinates. */
export const tleToEci = (line1: string, line2: string, time: Date)
    : { x: number, y: number, z: number } | null => {
  const satrec = twoline2satrec(line1, line2);
  const posEci = propagate(satrec, time).position;
  if (!posEci) {
  // throw new Error('Error propagating satellite position');
    return null;
  }
  return { x: posEci.x, y: posEci.y, z: posEci.z };
};