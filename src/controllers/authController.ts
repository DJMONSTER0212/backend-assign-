import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';

export const register = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).send({ error: 'Please provide name, email, password and role' });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "365d" });
        res.status(201).send({ user, token });
    } catch (error) {
        return res.status(500).send({ error: 'Something went wrong- [Register Method]' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ error: "Email and Password are required" });
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "365d" });
        res.send({ user, token });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Something went wrong - [Login Method]' });
    }

};
