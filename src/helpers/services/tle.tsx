
import {SatRec} from "satellite.js"

import {tleToSatRec} from "../util";
import leo_sats from "../../tmp_data/leo_sats.json";

export const getTles = (): SatRec[] => {
  const satRecs: SatRec[] = leo_sats.map((s: {line1: string; line2: string}) => tleToSatRec(s.line1, s.line2));
  return satRecs;
};