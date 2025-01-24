import createHttpError from "http-errors";
import Box from "../../models/Box.js";

const BOX_LIMIT_FREE_PLAN = 3;

export const checkBoxPrivileges = async (req,res,next) => {
    const user = req.user

    if (user.planType === 'FREE') {
        const userBoxesCount = await Box.count({
            where: {
                userId: user.id,
            }
        });
        if (userBoxesCount >= BOX_LIMIT_FREE_PLAN) {
            throw createHttpError(402, `Free plan users are limited to ${BOX_LIMIT_FREE_PLAN} boxes. Please upgrade your plan.`);
        }
    }
    next();
};