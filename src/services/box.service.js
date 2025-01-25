import Box from '../models/Box.js'

export const insertBox = async (userId, boxLength, boxWidth, boxHeight, boxMaxWeight, boxPrice) => {
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

export const getBoxes = async (userId, limit, offset) => {
    const {count, rows} = await Box.findAndCountAll({
        where: {
            userId: userId
        },
        limit: limit,
        offset: offset,
        order: [['createdAt', 'DESC']],
        attributes: ['id','length', 'width', 'height', 'maxWeight', 'price']
    });
    return {count, rows}
}