import { deleteBox, getBoxes, insertBox, updateBox } from "../services/box.service.js";
import { pickUpdateFields } from "../utils/pickUpdateFields.js";

export class BoxController {
    static createBox = async (req, res, next) => {
        const { userId, length, width, height, maxWeight, price } = req.body;

        const result = await insertBox(userId, length, width, height, maxWeight, price);

        res.status(201).json({
            message: 'Created Successfully',
            status: 201,
            metadata: {},
            data: result
        });
    }

    static getBoxesByUserId = async (req, res, next) => {
        const userId = req.user.id;
        const { limit = 50, offset = 0 } = req.query;

        const result = await getBoxes(userId, parseInt(limit), parseInt(offset));

        res.status(200).json({
            message: 'Fetched Successfully',
            status: 200,
            metadata: {
                totalRecords: result.count,
                totalPages: Math.ceil(result.count / limit),
                currentPage: Math.floor(offset / limit) + 1,
                size: limit,
                hasMore: offset + limit < result.count
            },
            data: result.rows
        });
    }

    static updateBoxDimension = async (req, res, next) => {
        const { id } = req.params;
        const updateFields = pickUpdateFields(req.body, ["length", "width", "height", "maxWeight", "price"]);

        const result = await updateBox(id, updateFields);

        res.status(200).json({
            message: 'Box Updated Successfully',
            status: 200,
            metadata: {},
            data: { ...result.dataValues }
        })
    }

    static deleteBoxById = async (req, res, next) => {
        const { id } = req.params;

        const result = await deleteBox(id);


        result ? res.status(200).json({
            message: 'Box Deleted Successfully',
            status: 200,
            metadata: {},
            data: id
        }) : res.status(404).json({
            message: `Box with id ${id} not found`,
            status: 404,
            metadata: {},
            data: {
                'id': id
            }
        })
    }
}
