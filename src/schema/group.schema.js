import Joi from 'joi';

export const createGroupSchema = Joi.object({
    name: Joi.string().min(2).required(),
    members: Joi.array().items(Joi.string().required()).min(1).required(),
    description: Joi.string().optional(),
    avatarUrl: Joi.string().uri().optional()
});