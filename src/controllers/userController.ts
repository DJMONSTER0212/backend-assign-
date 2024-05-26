import { Request, Response } from 'express';
import prisma from '../prisma';

export const getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    return res.send(users);
};
