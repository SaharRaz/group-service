import express from 'express';
import validateSchema from '../validations/group.validateSchema.middleware.js';
import { createGroupSchema } from '../schema/group.schema.js';

export default function (controller) {
    const router = express.Router();

    router.post('/createGroup', validateSchema(createGroupSchema), async (req, res) => {
        try {
            const group = await controller.createGroup(req.body);
            res.status(201).json(group);
        } catch (err) {
            console.error('POST /createGroup - Error:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    router.get('/getAllGroups', async (req, res) => {
        try {
            const groups = await controller.getAllGroups();
            res.status(200).json(groups);
        } catch (err) {
            console.error('GET /getAllGroups - Error:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    router.get('/getGroupById/:groupId', async (req, res) => {
        try {
            const group = await controller.getGroupById(req.params.groupId);
            if (!group) return res.status(404).json({ error: 'Group not found' });
            res.status(200).json(group);
        } catch (err) {
            console.error('GET /getGroupById/:groupId - Error:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    router.put('/updateGroup/:groupId', async (req, res) => {
        try {
            const updated = await controller.updateGroup(req.params.groupId, req.body);
            if (!updated) return res.status(404).json({ error: 'Group not found' });
            res.status(200).json(updated);
        } catch (err) {
            console.error('PUT /updateGroup/:groupId - Error:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });


    router.delete('/deleteGroup/:groupId', async (req, res) => {
        try {
            const deleted = await controller.deleteGroup(req.params.groupId);
            if (!deleted) return res.status(404).json({ error: 'Group not found' });
            res.status(200).json({ message: 'Group deleted successfully' });
        } catch (err) {
            console.error('DELETE /deleteGroup/:groupId - Error:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    return router;
}
