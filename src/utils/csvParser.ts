import { parse } from 'csv-parse';
import fs from 'fs';
import { Book } from '@prisma/client';

export const parseCSV = (filePath: string, userId: number): Promise<Omit<Book, 'id'>[]> => {
    return new Promise((resolve, reject) => {
        const books: Omit<Book, 'id'>[] = [];

        fs.createReadStream(filePath)
            .pipe(parse({ columns: true }))
            .on('data', (row) => {
                books.push({
                    title: row.title,
                    author: row.author,
                    price: parseFloat(row.price),
                    publishedDate: new Date(row.publishedDate),
                    userId: userId
                });
            })
            .on('end', () => resolve(books))
            .on('error', reject);
    });
};
