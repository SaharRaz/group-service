import express from 'express';
import groupsController from '../controller/groups.controller.js';
import validateSchema from '../middleware/groups.validateSchema.middleware.js';
import { createGroupSchema, updateGroupSchema } from './group.routes.schema.js';

const router = express.Router();

// Create a new group
router.post('/', validateSchema(createGroupSchema), async (req, res) => {
    try {
        const group = await groupsController.createGroup(req.body);
        res.status(201).json(group);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all groups
router.get('/', async (req, res) => {
    try {
        const groups = await groupsController.getAllGroups();
        res.status(200).json(groups);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a group by ID
router.get('/:id', async (req, res) => {
    try {
        const group = await groupsController.getGroupById(req.params.id);
        if (!group) return res.status(404).json({ error: 'Group not found' });
        res.status(200).json(group);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a group by ID
router.put('/:id', validateSchema(updateGroupSchema), async (req, res) => {
    try {
        const updatedGroup = await groupsController.updateGroup(req.params.id, req.body);
        if (!updatedGroup) return res.status(404).json({ error: 'Group not found' });
        res.status(200).json(updatedGroup);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a group by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedGroup = await groupsController.deleteGroup(req.params.id);
        if (!deletedGroup) return res.status(404).json({ error: 'Group not found' });
        res.status(200).json({ message: 'Group deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
