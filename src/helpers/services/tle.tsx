
import {SatRec} from "satellite.js"

import {tleToSatRec} from "../util";

export const getTles = async (): Promise<SatRec[]> => {
    const response = await fetch("/leo_sats.json");
    const result = await response.json();
    const satRecs: SatRec[] = result.map((s: {line1: string; line2: string}) => tleToSatRec(s.line1, s.line2));
    return satRecs;
};