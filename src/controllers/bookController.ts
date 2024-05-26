import { Request, Response } from 'express';
import prisma from '../prisma';
import fs from 'fs';
import { parseCSV } from '../utils/csvParser';
import { AuthRequest } from '../middleware/authMiddleware';

export const getBooks = async (req: Request, res: Response) => {
    const books = await prisma.book.findMany();
    return res.send(books);
};

export const getBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const book = await prisma.book.findUnique({ where: { id: parseInt(id) } });

        if (!book) {
            return res.status(404).send({ error: 'Book not found' });
        }

        return res.send(book);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "something went wrong - [Get book]" })
    }

};

export const createBook = async (req: AuthRequest, res: Response) => {
    const { title, author, price, publishedDate } = req.body;

    try {
        const book = await prisma.book.create({
            data: {
                title,
                author,
                price,
                publishedDate: new Date(publishedDate),
                userId: req.user!.id
            }
        });
        return res.status(201).send(book);
    } catch (error) {
        console.log(error);
        return res.send("SomeThing went wrong - [BOOK Create]").status(500)
    }



};

export const updateBook = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { title, author, price, publishDate } = req.body;

        const book = await prisma.book.findUnique({ where: { id: parseInt(id) } });

        if (!book || book.userId !== req.user!.id) {
            return res.status(404).send({ error: 'Book not found or access denied' });
        }

        const updatedBook = await prisma.book.update({
            where: { id: parseInt(id) },
            data: { title, author, price, publishedDate: new Date(publishDate) }
        });

        return res.send(updatedBook);
    } catch (error) {
        console.log(error);
        return res.send("SomeThing went wrong - [Book Update]").status(500)
    }

};

export const deleteBook = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const book = await prisma.book.findUnique({ where: { id: parseInt(id) } });

        if (!book || book.userId !== req.user!.id) {
            return res.status(404).send({ error: 'Book not found or access denied' });
        }

        await prisma.book.delete({ where: { id: parseInt(id) } });

        return res.status(204).send();
    } catch (error) {
        console.log(error);
        return res.send("SomeThing went wrong - [Delete Book]").status(500);
    }

};


export const uploadBooks = async (req: AuthRequest, res: Response) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).send({ error: 'No file uploaded' });
        }

        const books = await parseCSV(file.path, req.user!.id);

        await prisma.book.createMany({ data: books });

        fs.unlinkSync(file.path);

        return res.status(201).send(books);
    } catch (error) {
        console.log(error);
        return res.send("SomeThing went wrong - [Upload Book via csv]").status(500);
    }

};
