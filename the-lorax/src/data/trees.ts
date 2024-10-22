// import axios from "axios";
// import { Tree } from "../types/tree"

// const fetchTreeInfo = async () => {
//     try {
//         const response = await axios.get("http://localhost:8000/treeinfo");
//         console.log("Tree Info Data:", response.data[0]);

//         // Assuming the response data is an array of raw tree data
//         const trees: any[] = response.data;

//         // Map the raw data into the desired Tree format
//         const formatted: Tree[] = trees.map(tree => ({
//             key: tree.Tree_ID,
//             tagNum: tree.Tag_Number,
//             speciesCo: tree.Species_Co,
//             latinName: tree.Latin_Name,
//             species1: tree.Species_1,
//             builVinta: tree.Buil_Vinta,
//             distToBu: tree.Dist_to_Bu,
//             
//             azimuth: tree.Azimuth,
//             sun: tree.Sun,
//             lat: tree.Y,
//             lng: tree.X
//         }));

//       return formatted;
//     } catch (error) {
//       console.error("Error fetching tree info:", error);
//     }
// };
  
// fetchTreeInfo().then((formatted) => {
//     if (formatted) {
//         console.log("Formatted Tree Data:", formatted);
//     }
// });

// export default fetchTreeInfo;


import axios from "axios";
import { Tree, Point } from "../types/tree";

const fetchTreeInfo = async (): Promise<Point[]> => {
    try {
        const response = await axios.get("http://localhost:8000/treeinfo");

        // Assuming the response data is an array of raw tree data
        const trees: any[] = response.data;

        // Map the raw data into the Point format
        const formatted: Point[] = trees.map(tree => ({
            key: tree.Tree_ID,
            tagNum: tree.Tag_Number,
            speciesCo: tree.Species_Co,
            latinName: tree.Latin_Name,
            species1: tree.Species_1,
            builVinta: tree.Buil_Vinta,
            distToBu: tree.Dist_to_Bu,
            azimuth: tree.Azimuth,
            sun: tree.Sun,
            lat: tree.Y,
            lng: tree.X
        }));

        return formatted;
    } catch (error) {
        console.error("Error fetching tree info:", error);
        return [];
    }
};

export default fetchTreeInfo;
