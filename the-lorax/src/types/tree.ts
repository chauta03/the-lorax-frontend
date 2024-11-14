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
    treeId: string;
    tagNum?: number;
    speciesCo?: string;
    latinName?: string;
    commonName?: string;
    sun?: string;
    lat?: number;
    lng?: number;
};

export type TreeHistory = {
    treeId?: number;
    histId?: number;
    hazardRating?: string;
    DBH?: number;
    notes?: string;
    year: number;
};