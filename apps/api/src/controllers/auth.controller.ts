import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import prisma from 'database';
import { sendSuccess, sendError } from '../utils/response';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
  role: z.enum(['USER', 'DEVELOPER', 'ADMIN']).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const { email, password, name, role } = validatedData;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return sendError(res, 'User already exists', 400);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        name,
        role: role || 'USER',
      },
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'axiom_secret_123',
      { expiresIn: '24h' }
    );

    return sendSuccess(res, {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token
    }, 201);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return sendError(res, error.errors[0].message, 400);
    }
    console.error('Registration Error:', error);
    return sendError(res, 'Failed to register user');
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return sendError(res, 'Invalid credentials', 401);
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'axiom_secret_123',
      { expiresIn: '24h' }
    );

    return sendSuccess(res, {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return sendError(res, error.errors[0].message, 400);
    }
    console.error('Login Error:', error);
    return sendError(res, 'Failed to login');
  }
};
