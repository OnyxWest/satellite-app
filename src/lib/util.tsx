import {twoline2satrec, propagate, SatRec} from "satellite.js";

/* Given a SatRec and a time, output the ECI X,Y,Z coordinates. */
export const satRecToEci = (satRec: SatRec, time: Date)
    : { x: number, y: number, z: number } | null => {
    const posEci = propagate(satRec, time).position;
    if (!posEci) {
    // throw new Error('Error propagating satellite position');
        return null;
    }
    return { x: posEci.x, y: posEci.y, z: posEci.z };
};

/* Given a TLE, output the SatRec object. */
export const tleToSatRec = (line1: string, line2: string) : SatRec => {
    return twoline2satrec(line1, line2);
};

