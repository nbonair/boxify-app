import createHttpError from 'http-errors';
import Box from '../models/Box.js'

export const insertBox = async (userId, length, width, height, maxWeight, price) => {
    const boxData = {
        length: length,
        width: width,
        height: height,
        maxWeight: maxWeight,
        price: price,
        userId: userId
    };

    return await Box.create(boxData);
}

export const getBoxes = async (userId, limit, offset, order) => {
    const { count, rows } = await Box.findAndCountAll({
        where: {
            userId: userId
        },
        limit: limit,
        offset: offset,
        order: order? order : [['createdAt', 'DESC']],
        attributes: ['id', 'length', 'width', 'height', 'maxWeight', 'price']
    });

    return { count, rows }
}

export const updateBox = async (id, updateFields) => {
    const box = await Box.findByPk(id);

    if (!box) {
        throw createHttpError(404, `Box with id ${id} not found`);
    }

    await box.update(
        updateFields, {
        attributes: ['id', 'length', 'width', 'height', 'maxWeight', 'price']
    });

    return box
}

export const deleteBox = async (id) => {
    return await Box.destroy({
        where: { id }
    });
}