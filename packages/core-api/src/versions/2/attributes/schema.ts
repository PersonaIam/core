import * as Joi from "joi";
import { pagination } from "../shared/schemas/pagination";

export const LIST_TYPES: object = {
    query: {
        ...pagination,
        ...{
            orderBy: Joi.string(),
            id: Joi.string().regex(/^[0-9]+$/, "numbers"),
            version: Joi.number()
                .integer()
                .min(0),
            timestamp: Joi.number()
                .integer()
                .min(0),
            previousBlock: Joi.string().regex(/^[0-9]+$/, "numbers"),
            height: Joi.number()
                .integer()
                .positive(),
            numberOfTransactions: Joi.number()
                .integer()
                .min(0),
            totalAmount: Joi.number()
                .integer()
                .min(0),
            totalFee: Joi.number()
                .integer()
                .min(0),
            reward: Joi.number()
                .integer()
                .min(0),
            payloadLength: Joi.number()
                .integer()
                .positive(),
            payloadHash: Joi.string().hex(),
            generatorPublicKey: Joi.string()
                .hex()
                .length(66),
            blockSignature: Joi.string().hex(),
        },
    },
};

export const GET_TYPE: object = {
    params: {
        id: Joi.string().regex(/^[0-9]+$/, "numbers"),
    },
};

export const GET_ATTRIBUTE: object = {
    // query: {
    //     ...pagination,
    //     ...{
    //         owner: address,
    //     },
    // },
};

export const POST_ATTRIBUTE: object = {
    query: pagination,
    payload: {
        id: Joi.string().regex(/^[0-9]+$/, "numbers"),
        version: Joi.number()
            .integer()
            .min(0),
        previousBlock: Joi.string().regex(/^[0-9]+$/, "numbers"),
        payloadHash: Joi.string().hex(),
        generatorPublicKey: Joi.string()
            .hex()
            .length(66),
        blockSignature: Joi.string().hex(),
        timestamp: Joi.object().keys({
            from: Joi.number()
                .integer()
                .min(0),
            to: Joi.number()
                .integer()
                .min(0),
        }),
        height: Joi.object().keys({
            from: Joi.number()
                .integer()
                .positive(),
            to: Joi.number()
                .integer()
                .positive(),
        }),
        numberOfTransactions: Joi.object().keys({
            from: Joi.number()
                .integer()
                .min(0),
            to: Joi.number()
                .integer()
                .min(0),
        }),
        totalAmount: Joi.object().keys({
            from: Joi.number()
                .integer()
                .min(0),
            to: Joi.number()
                .integer()
                .min(0),
        }),
        totalFee: Joi.object().keys({
            from: Joi.number()
                .integer()
                .min(0),
            to: Joi.number()
                .integer()
                .min(0),
        }),
        reward: Joi.object().keys({
            from: Joi.number()
                .integer()
                .min(0),
            to: Joi.number()
                .integer()
                .min(0),
        }),
        payloadLength: Joi.object().keys({
            from: Joi.number()
                .integer()
                .min(0),
            to: Joi.number()
                .integer()
                .min(0),
        }),
    },
};

export const PUT_ATTRIBUTE: object = {
    query: pagination,
    payload: {
        id: Joi.string().regex(/^[0-9]+$/, "numbers"),
        version: Joi.number()
            .integer()
            .min(0),
        previousBlock: Joi.string().regex(/^[0-9]+$/, "numbers"),
        payloadHash: Joi.string().hex(),
        generatorPublicKey: Joi.string()
            .hex()
            .length(66),
        blockSignature: Joi.string().hex(),
        timestamp: Joi.object().keys({
            from: Joi.number()
                .integer()
                .min(0),
            to: Joi.number()
                .integer()
                .min(0),
        }),
        height: Joi.object().keys({
            from: Joi.number()
                .integer()
                .positive(),
            to: Joi.number()
                .integer()
                .positive(),
        }),
        numberOfTransactions: Joi.object().keys({
            from: Joi.number()
                .integer()
                .min(0),
            to: Joi.number()
                .integer()
                .min(0),
        }),
        totalAmount: Joi.object().keys({
            from: Joi.number()
                .integer()
                .min(0),
            to: Joi.number()
                .integer()
                .min(0),
        }),
        totalFee: Joi.object().keys({
            from: Joi.number()
                .integer()
                .min(0),
            to: Joi.number()
                .integer()
                .min(0),
        }),
        reward: Joi.object().keys({
            from: Joi.number()
                .integer()
                .min(0),
            to: Joi.number()
                .integer()
                .min(0),
        }),
        payloadLength: Joi.object().keys({
            from: Joi.number()
                .integer()
                .min(0),
            to: Joi.number()
                .integer()
                .min(0),
        }),
    },
};
