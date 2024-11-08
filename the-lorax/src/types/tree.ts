export type Tree = {
    treeId?: number;
    tagNum?: number;
    speciesCo?: string;
    latinName?: string;
    commonName?: string;
    sun?: string;
    lat?: number;
    lng?: number;
};

export type Point = google.maps.LatLngLiteral & {
    key: string;
    tagNum?: number;
    speciesCo?: string;
    latinName?: string;
    commonName?: string;
    sun?: string;
    lat?: number;
    lng?: number;
};