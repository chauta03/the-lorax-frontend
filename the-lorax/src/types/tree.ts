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

export type Point = {
    tree_id?: number;
    tag_number?: number;
    species_code?: string;
    latin_name?: string;
    common_name?: string;
    sun?: string;
    lat: number;
    long: number;
};

export type TreeHistory = {
    tree_id?: number;
    hist_id: number;
    hazard_rating?: string;
    DBH?: number;
    notes?: string;
    year: number;
};