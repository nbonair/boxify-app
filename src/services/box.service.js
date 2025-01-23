import createHttpError from 'http-errors';

import Box from '../models/Box.js'
import { validate as uuidValidate } from 'uuid';
import User from '../models/User.js';

const BOX_LIMIT_FREE_PLAN = 3

export const insertBox = async ({ userId, boxLength, boxWidth, boxHeight, boxMaxWeight, boxPrice }) => {
    if (!userId || !uuidValidate(userId)) {
        throw new Error('Invalid userId format');
    }

    const foundUser = await User.findByPk(userId);
    if (!foundUser) throw createHttpError(404, `User not found with id: ${userId}`);

    if (foundUser.planType === 'FREE') {
        const userBoxesCount = await Box.count({
            where: {
                userId: userId,
            }
        });
        if (userBoxesCount >= BOX_LIMIT_FREE_PLAN) {
            throw createHttpError(402, `Free plan users are limited to ${BOX_LIMIT_FREE_PLAN} boxes. Please upgrade your plan.`);
        }
    }

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