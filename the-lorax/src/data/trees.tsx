import axios from "axios";
import { Tree, Point } from "../types/tree";

const fetchTreeInfo = async (): Promise<Point[]> => {
    try {
        const backend = process.env.REACT_APP_FASTAPI_URL || "";
        const response = await axios.get(`${backend}treeinfo`);

        // Assuming the response data is an array of raw tree data
        const trees: any[] = response.data;

        // Map the raw data into the Point format
        const formatted: Point[] = trees.map(tree => ({
            treeId: tree.tree_id,
            tagNum: tree.tag_number,
            speciesCo: tree.species_code,
            latinName: tree.latin_name,
            commonName: tree.common_name,
            sun: tree.sun,
            lat: tree.lat,
            lng: tree.long
        }));
        
        console.log("Fetched tree info:", formatted);
        return formatted;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error fetching tree info:", error.response?.data);
        } else {
            console.error("Unexpected error:", error);
        }
        return [];
    }
};

export default fetchTreeInfo;
