import { postHandlers } from './postHandlers';
import { authHandlers } from './authHandlers';

export const handlers = [...postHandlers, ...authHandlers];
