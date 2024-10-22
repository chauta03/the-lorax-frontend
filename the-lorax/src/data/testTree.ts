// Data source: https://open.toronto.ca/dataset/street-tree-data/

type RawTree = [string, number, number];

type Tree = {
  key: string;
  name: string;
  lat: number;
  lng: number;
};

const trees: RawTree[] = [
  ["Ash, green", 42.29010644521731, -85.593155733111581],
  ["Birch, white", 42.290106489558964, -85.5911559538418],
  ["Maple1, Manitoba", 42.290106451576906, -85.5951552497644],
  ["Maple2, pink", 42.292106451576906, -85.5951552497644],
  ["Maple3, blue", 42.292106451576906, -85.5951552497644],
  ["Maple4, grey", 42.292106451576906, -85.5951552497644]
];

const formatted: Tree[] = trees.map(([name, lat, lng]) => ({
    name,
    lat,
    lng,
    key: JSON.stringify({ name, lat, lng }),
  }));
  
export default formatted;