import createHttpError from "http-errors";
import { validate } from "uuid";
import User from "../../models/User.js";

// Temporary middleware before authentication implement
export const checkUserLevel = async(req, res, next) => {
    const {userId} = req.body;
    console.log(userId)
    if (!userId || !validate(userId)) throw createHttpError(400, 'Invalid userId format');

    const foundUser = await User.findByPk(userId);
    if (!foundUser) throw createHttpError(404, `User not found with id: ${userId}`);

    req.user = foundUser
    next();
}