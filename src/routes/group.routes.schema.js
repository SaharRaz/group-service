import Joi from 'joi';

export const createGroupSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    members: Joi.array().items(Joi.string().min(1)).required(),
    description: Joi.string().max(200).optional()
});

export const updateGroupSchema = Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    members: Joi.array().items(Joi.string().min(1)).optional(),
    description: Joi.string().max(200).optional()
});
