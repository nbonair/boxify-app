import Box from '../models/Box.js'

export const insertBox = async ({ userId, boxLength, boxWidth, boxHeight, boxMaxWeight, boxPrice }) => {
    const boxData = {
        length: boxLength,
        width: boxWidth,
        height: boxHeight,
        maxWeight: boxMaxWeight,
        price: boxPrice,
        userId: userId
    };
    return await Box.create(boxData);
}