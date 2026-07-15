import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from 'database';
import { sendSuccess, sendError } from '../utils/response';

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return sendError(res, 'Unauthorized', 401);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true, createdAt: true }
    });

    if (!user) return sendError(res, 'User not found', 404);

    return sendSuccess(res, user);
  } catch (error) {
    console.error('Get Profile Error:', error);
    return sendError(res, 'Failed to fetch profile');
  }
};
