// const { transactionSchema } = require('../../routes/transaction.routes.schema');

const validateSchema = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map((err) => err.message) });
    }
    next();
};

export default validateSchema;
