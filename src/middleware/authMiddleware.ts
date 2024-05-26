import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import { User } from '@prisma/client';  // Import User type

export interface AuthRequest extends Request {
    user?: User;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    // console.log(process.env.JWT_SECRET);
    if (!token) {
        return res.status(401).send({ error: 'Authentication required' });
    }
    // const decoded = jwt.verify(token,process.env.JWT_SECRET || "mYjWtSecREt");
    // // console.log(decoded);
    try {
        const decoded = jwt.verify(token, "secret") as { id: number };
        // console.log(decoded)
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        // console.log("hello");    
        console.log(error)
        res.status(401).send({ error: 'Please authenticate' });
    }
};

export const authorize = (roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log(roles)
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).send({ error: 'Access denied' });
    }
    next();
};
