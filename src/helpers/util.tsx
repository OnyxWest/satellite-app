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
  // when posEci is boolean, it means there was an error propagating the satellite
  if (!posEci || typeof posEci == "boolean") {
    return null;
  }
  return posEci;
};

/* Given a SatRec and a time, output the Geodetic coordinates. */
export const satRecToGeodetic = (satRec: SatRec, time: Date): GeodeticLocation | null => {
  const gmst = gstime(time);
  const posEci = propagate(satRec, time).position;
  // when posEci is boolean, it means there was an error propagating the satellite
  if (!posEci || typeof posEci == "boolean") {
    return null;
  }
  return eciToGeodetic(posEci, gmst);
};

/* Given a TLE and a time, output the ECI X,Y,Z coordinates. */
export const tleToEci = (line1: string, line2: string, time: Date)
    : EciVec3<number> | null => {
  const satrec = twoline2satrec(line1, line2);
  const posEci = propagate(satrec, time).position;
  // when posEci is boolean, it means there was an error propagating the satellite
  if (!posEci || typeof posEci == "boolean") {
    return null;
  }
  return posEci;
};