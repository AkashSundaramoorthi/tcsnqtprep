export type TrackId = "tcs-nqt" | "hackwithinfy";

export interface Track {
  id: TrackId;
  label: string;
  shortLabel: string;
  company: string;
  description: string;
  active: boolean;
}

export const TRACKS: Record<TrackId, Track> = {
  "tcs-nqt": {
    id: "tcs-nqt",
    label: "TCS NQT",
    shortLabel: "TCS",
    company: "Tata Consultancy Services",
    description: "National Qualifier Test — aptitude, verbal, and coding.",
    active: true,
  },
  "hackwithinfy": {
    id: "hackwithinfy",
    label: "HackWithInfy",
    shortLabel: "Infosys",
    company: "Infosys",
    description: "DSA-focused competitive coding rounds for Infosys placement.",
    active: true,
  },
};
