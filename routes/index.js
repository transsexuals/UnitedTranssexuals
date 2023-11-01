import express from 'express';
import * as auth from '../libs/user/userMiddleware';

const router = express.Router();

/**
 * POST request - User can login.
 */
router.post('/login', auth.login);

/**
 * POST request - User can register.
 */
router.post('/register', auth.register);

/**
 * POST request - User can logout.
 */
router.post('/logout', auth.logout);

export default router;
