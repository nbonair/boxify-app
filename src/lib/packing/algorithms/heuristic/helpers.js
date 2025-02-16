export const getVolume = ({ length, width, height }) => length * width * height;

export const fitInSpace = (rotation, space) => rotation.length <= space.length && rotation.width <= space.width && rotation.height <= space.height;

export const generateRotation = ({ length, width, height }) => [
    { length, width, height },
    { length, height, width },
    { width, height, length },
    { width, length, height },
    { height, length, width },
    { height, width, length }
];

export const getOptimalSpace = (spaces, rotation) => {
    const rotationVolume = getVolume(rotation);
    let bestSpace = null;
    let bestSpaceIdx = null;
    let minWaste = Infinity;

    spaces.forEach((space, idx) => {
        if (fitInSpace(rotation, space)) {
            const waste = getVolume(space) - rotationVolume;
            if (waste < minWaste) {
                bestSpace = space;
                minWaste = waste;
                bestSpaceIdx = idx;
            }
        }
    });

    return {bestSpace, minWaste, bestSpaceIdx};
};