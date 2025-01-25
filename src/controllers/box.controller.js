import { getBoxes, insertBox } from "../services/box.service.js";

export class BoxController {
    static createBox = async (req, res, next) => {
        const { userId, boxLength, boxWidth, boxHeight, boxMaxWeight, boxPrice } = req.body;
        const result = await insertBox(userId, boxLength, boxWidth, boxHeight, boxMaxWeight, boxPrice);

        res.status(201).json({
            message: 'Created Successfully',
            status: 201,
            metadata: {},
            data: result
        });
    }

    static getBoxesByUserId = async (req, res, next) => {
        const userId = req.user.id;
        const {limit = 50, offset = 0} = req.query;
        const result = await getBoxes(userId, parseInt(limit), parseInt(offset));

        res.status(200).json({
            message: 'Fetched Successfully',
            status: 200,
            metadata: {
                totalRecords: result.count,
                totalPages: Math.ceil(result.count/limit),
                currentPage: Math.floor(offset/limit) + 1,
                size: limit,
                hasMore: offset + limit < result.count
            },
            data: result.rows
        });
    }
}
