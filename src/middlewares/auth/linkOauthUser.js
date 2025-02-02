import createHttpError from "http-errors";
import UserIdentity from "../../models/UserIdentity.js";
import User from "../../models/User.js";

export const linkOauthUser = async (req, res, next) => {
    const claims = req.auth;
    if (!claims) throw new createHttpError(401, `No user found`);

    const sub = claims.sub;
    if (!sub) throw new createHttpError(401, `No user identifier found`);
    const email = claims.email || claims.preferred_username;

    let identity = await UserIdentity.findOne({
        where: { provider: 'microsoft', providerId: sub },
        include: [{ model: User, as: 'user' }]
    });

    if (!identity) {
        let foundUser = await User.findOne({
            where: { email: email }
        });

        if (!foundUser) {
            foundUser = await User.create({ email: email, planType: 'FREE' });
        }

        identity = await UserIdentity.create({
            provider: 'microsoft',
            providerId: sub,
            providerEmail: email,
            userId: foundUser.id
        });
    }

    if (!identity.userId) {
        throw createHttpError(500, 'Create User Error');
    }
    req.user = identity.user;
    next();
}