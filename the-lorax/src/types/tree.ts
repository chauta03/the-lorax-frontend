

export type Tree = {
    treeId?: number;
    tagNum?: number;
    speciesCo?: string;
    latinName?: string;
    species1?: string;
    builVinta?: number;
    distToBu?: number;
    azimuth?: number;
    sun?: string;
    lat?: number;
    lng?: number;
};

export type Point = google.maps.LatLngLiteral & {
    key: string;
    tagNum?: number;
    speciesCo?: string;
    latinName?: string;
    species1?: string;
    builVinta?: number;
    distToBu?: number;
    azimuth?: number;
    sun?: string;
    lat?: number;
    lng?: number;
};