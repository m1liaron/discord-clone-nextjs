import {NextResponse} from "next/server";
import {RegisterRequest} from "@/common/types/Auth/RegisterRequest";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const data: RegisterRequest = await req.json(); // Parse JSON body
        const user = await prisma.user.findFirst({ where: { email: data.email } });
        if(user) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400});
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await prisma.user.create({
            data: {
                email: data.email,
                username: data.username,
                displayName: data.displayName,
                password: hashedPassword,
                dateOfBirth: data.dateOfBirth
            },
        });

        return NextResponse.json(newUser);
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: error })
    }
}
