import { insertBox } from "../services/box.service.js";

export class BoxController {
    static createBox = async (req, res, next) => {
        const {userId, boxLength, boxWidth, boxHeight, boxMaxWeight, boxPrice} = req.body;
        const response = await insertBox({userId, boxLength, boxWidth, boxHeight, boxMaxWeight, boxPrice});
        res.status(201).json({
            message: 'Created Successfully',
            status: 201,
            metadata: response,
        });
    }
}
