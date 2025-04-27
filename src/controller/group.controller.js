import { SERVICE_NAME } from '../configs/constants.js';

export default class GroupController {
    constructor({ GroupModel, logger, axios, notificationUrl }) {
        this.Group = GroupModel;
        this.logger = logger;
        this.axios = axios;
        this.notificationUrl = notificationUrl;
    }

    async createGroup(data) {
        try {
            console.log('[createGroup] req.body:', data);
            this.logger.info(`${SERVICE_NAME}[createGroup] Notification URL: ${this.notificationUrl}`);
            const group = new this.Group(data);
            const saved = await group.save();

            this.logger.info(`${SERVICE_NAME}[createGroup] Group created`, { groupId: saved._id });

            // Notify
            await this.axios.post(this.notificationUrl, {
                groupId: saved._id,
                message: `🎉 Group "${saved.name}" has been created successfully!`,
            });

            return saved;
        } catch (err) {
            this.logger.error(`${SERVICE_NAME}[createGroup] Error:`, { error: err.message });
            throw err;
        }
    }

    async getAllGroups() {
        try {
            const groups = await this.Group.find().lean();
            this.logger.info(`${SERVICE_NAME}[getAllGroups] Fetched all groups`, { count: groups.length });
            return groups;
        } catch (err) {
            this.logger.error(`${SERVICE_NAME}[getAllGroups] Error:`, { error: err.message });
            throw err;
        }
    }

    async getGroupById(id) {
        try {
            const group = await this.Group.findById(id).lean();
            if (!group) {
                this.logger.warn(`${SERVICE_NAME}[getGroupById] Not found`, { id });
                return null;
            }
            this.logger.info(`${SERVICE_NAME}[getGroupById] Found`, { id });
            return group;
        } catch (err) {
            this.logger.error(`${SERVICE_NAME}[getGroupById] Error:`, { error: err.message });
            throw err;
        }
    }

    async updateGroup(groupId, data) {
        try {
            const updated = await this.Group.findByIdAndUpdate(
                groupId,
                { ...data },
                { new: true }
            ).lean();

            if (!updated) {
                this.logger.warn(`${SERVICE_NAME}[updateGroup] Not found`, { groupId });
                return null;
            }

            this.logger.info(`${SERVICE_NAME}[updateGroup] Success`, { groupId });
            return updated;
        } catch (err) {
            this.logger.error(`${SERVICE_NAME}[updateGroup] Error:`, { error: err.message });
            throw err;
        }
    }


    async deleteGroup(id) {
        try {
            const deleted = await this.Group.findByIdAndDelete(id).lean();
            if (!deleted) {
                this.logger.warn(`${SERVICE_NAME}[deleteGroup] Not found`, { id });
                return null;
            }

            this.logger.info(`${SERVICE_NAME}[deleteGroup] Success`, { id });
            return deleted;
        } catch (err) {
            this.logger.error(`${SERVICE_NAME}[deleteGroup] Error:`, { error: err.message });
            throw err;
        }
    }
}
