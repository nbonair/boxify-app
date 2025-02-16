import { initFreeSpaces, splitFreeSpace } from './boxSpace.js';
import { generateRotation, getOptimalSpace, getVolume } from './helpers.js';

export const pack = (products, boxes) => {
    const boxStates = boxes.map(box => ({
        ...box,
        freeSpaces: initFreeSpaces(box),
        remainWeight: box.maxWeight,
        placements: []
    }));

    const sortedProducts = products.map(product => ({
        ...product,
        volume: getVolume(product)
    })).sort((a, b) => b.volume - a.volume);

    const unassignedProducts = [];
    console.log(sortedProducts)
    for (const product of sortedProducts) {
        let placed = false;
        const rotations = generateRotation({ length: product.length, width: product.width, height: product.height });

        for (const box of boxStates) {
            if (product.weight <= box.remainWeight) {
                let bestSpace = null;
                let bestSpaceIdx = null;
                let bestRotation = null;
                let minWaste = Infinity;

                rotations.forEach((rotation) => {
                    const {bestSpace: rotationBestSpace, minWaste: rotationMinWaste, bestSpaceIdx: rotationBestSpaceIdx} = getOptimalSpace(box.freeSpaces, rotation);
                    if (rotationMinWaste < minWaste) {
                        bestSpace = rotationBestSpace;
                        bestSpaceIdx = rotationBestSpaceIdx;
                        bestRotation = rotation;
                        minWaste = rotationMinWaste;
                    }
                });

                // Need to handle new space collision with previous split space
                if (bestSpace && bestRotation) {
                    box.placements.push({
                        productId: product.id,
                        rotation: bestRotation,
                        position: { x: bestSpace.x, y: bestSpace.y, z: bestSpace.z }
                    });
                    box.freeSpaces.splice(bestSpaceIdx, 1);
                    box.freeSpaces.push(...splitFreeSpace(bestSpace, bestRotation));
                    box.remainWeight -= product.weight
                    placed = true;
                    break;
                }
            }
        }

        if (!placed) {
            unassignedProducts.push(product);
        }




    }
    const packingPlan = boxStates.reduce((acc, box) => {
        acc[box.id] = box.placements;
        return acc;
    }, {});
    return { packingPlan, unassignedProducts };
};