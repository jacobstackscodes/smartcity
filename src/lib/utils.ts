import { GoogleGenerativeAI } from '@google/generative-ai';
import clsx, { type ClassArray } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...classes: ClassArray) => twMerge(clsx(classes));

const genAi = new GoogleGenerativeAI(
    process.env.GOOGLE_GEMINI_API_KEY as string,
).getGenerativeModel({ model: 'gemini-2.0-flash' });

export { cn, genAi };
