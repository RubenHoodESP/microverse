import { postHandlers } from './postHandlers';
import { authHandlers } from './authHandlers';
import { feedHandlers } from './feedHandlers';
import { userHandlers } from './userHandlers';

export const handlers = [...postHandlers, ...authHandlers, ...feedHandlers, ...userHandlers];
