import { pack } from './pack.js';

const products = [
    { id: 'prod1', length: 10, width: 5, height: 4, weight: 2 },
    { id: 'prod2', length: 8, width: 8, height: 8, weight: 5 },
    { id: 'prod3', length: 4, width: 4, height: 4, weight: 1 },
    { id: 'prod4', length: 12, width: 10, height: 8, weight: 7 },
    { id: 'prod5', length: 6, width: 6, height: 6, weight: 3 }
];

const boxes = [
    { id: 'box1', length: 20, width: 15, height: 15, maxWeight: 15 },
    { id: 'box2', length: 15, width: 15, height: 15, maxWeight: 3 }
];

const result = pack(products, boxes);

console.log(JSON.stringify(result, null, 2));