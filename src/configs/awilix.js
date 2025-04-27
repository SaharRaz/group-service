import { createContainer, asClass, asValue } from 'awilix';
import axios from 'axios';
import logger from '../middleware/logger.js';
import GroupController from '../controller/group.controller.js';
import Group from '../model/group.model.js';
import { env } from './config.js';

const container = createContainer();

const axiosClient = axios.create({
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
});


container.register({
    axios: asValue(axiosClient),
    logger: asValue(logger),
    GroupModel: asValue(Group),
    notificationUrl: asValue(env.NOTIFICATION_SERVICE_URL)
});

container.register({
    groupController: asClass(GroupController)
        .inject(() => ({
            Group: container.resolve('GroupModel'),
            logger: container.resolve('logger'),
            axios: container.resolve('axios'),
            notificationUrl: container.resolve('notificationUrl'),
        }))
        .singleton()
});

export default container;
