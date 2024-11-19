import Fuse from 'fuse.js';
import fetchTreeInfo from './trees';
import { Point } from "../types/tree";

const handleSearch = async (query: string): Promise<Point[]> => {
    try {
        const allTrees = await fetchTreeInfo();

        // Define fields to search within and options for fuzzy matching
        const options = {
            includeScore: true, // Include score so we can see how close the matches are
            threshold: 0.3, // A lower threshold means more strict matches (0 is exact match, 1 is very loose)
            keys: [
                'tree_id',
                'latin_name',
                'common_name',
                'tag_number',
                'species_code',
                'sun',
                'lat',
                'long'
            ]
        };

        const fuse = new Fuse(allTrees, options);
        
        // Split query into multiple terms and search each
        const terms = query.toLowerCase().split(/\s+/);
        const results = terms.flatMap(term => fuse.search(term).map(result => result.item));

        // Remove duplicates (in case multiple terms matched the same item)
        const uniqueResults = Array.from(new Set(results));

        return uniqueResults;
    } catch (error) {
        console.error("Error during search:", error);
        return []; // Return an empty array on error
    }
};

export default handleSearch;
