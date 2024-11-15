import Fuse from 'fuse.js';
import fetchTreeHistoryInfo from './treeHistory';
import { TreeHistory } from '../types/tree';

const handleSearchHistory = async (query: string): Promise<TreeHistory[]> => {
    try {
        const allTrees = await fetchTreeHistoryInfo();

        // Define fields to search within and options for fuzzy matching
        const options = {
            includeScore: true, // Include score so we can see how close the matches are
            threshold: 0.3, // A lower threshold means more strict matches (0 is exact match, 1 is very loose)
            keys: [
                'treeId',
                'histId',
                'hazardRating',
                'DBH',
                'notes',
                'year'
            ]
        };

        const fuse = new Fuse(allTrees, options);
        
        // Split query into multiple terms and search each
        const terms = query.toLowerCase().split(/\s+/);
        const results = terms.flatMap(term => fuse.search(term).map(result => result.item));

        // Remove duplicates (in case multiple terms matched the same item)
        const uniqueResults = Array.from(new Set(results));

        console.log(uniqueResults);

        return uniqueResults;
    } catch (error) {
        console.error("Error during search:", error);
        return []; // Return an empty array on error
    }
};

export default handleSearchHistory;
