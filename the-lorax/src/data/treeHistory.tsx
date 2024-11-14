import axios from "axios";
import { TreeHistory } from "../types/tree";

const fetchTreeHistoryInfo = async (): Promise<TreeHistory[]> => {
    try {
        const backend = process.env.REACT_APP_FASTAPI_URL || "";
        const response = await axios.get(`${backend}treehistory`);

        // Assuming the response data is an array of raw tree data
        const trees: any[] = response.data;

        // Map the raw data into the Point format
        const formatted: TreeHistory[] = trees.map(tree => ({
            treeId: tree.tree_id,
            histId: tree.hist_id,
            hazardRating: tree.hazard_rating,
            DBH: tree.DBH,
            notes: tree.notes,
            year: tree.year
        }));
        
        console.log("Fetched tree history:", formatted);
        return formatted;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error fetching tree history:", error.response?.data);
        } else {
            console.error("Unexpected error:", error);
        }
        return [];
    }
};

export default fetchTreeHistoryInfo;
