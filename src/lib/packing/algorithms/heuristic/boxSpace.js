export const initFreeSpaces = (box) => [{ x: 0, y: 0, z: 0, length: box.length, width: box.width, height: box.height }];

export const splitFreeSpace = (space, itemDimensions) =>{
    const newSpaces = [];
    const {x, y, z, length, width, height} = space;
    const {length: itemLength, width: itemWidth, height: itemHeight} = itemDimensions;

    const remainX = length - itemLength;
    if (remainX > 0){
        newSpaces.push({x: x + itemLength, y, z, length: remainX, width, height });
    }

    const remainY = width - itemWidth;
    if(remainY > 0){
        newSpaces.push({x, y: y + itemWidth, z, length, width: remainY, height });
    }

    const remainZ = height - itemHeight;
    if(remainZ > 0){
        newSpaces.push({x, y, z: z + itemHeight, length, width, height: remainZ });
    }
    return newSpaces;
}