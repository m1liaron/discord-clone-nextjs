import {NextResponse} from "next/server";
import {RegisterRequest} from "@/common/types/Auth/RegisterRequest";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import createJWToken from "@/helpers/api/createJWToken";

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

        const token = await createJWToken(newUser.id, newUser.email);

        const { password, ...userData} = newUser;
        return NextResponse.json({ user: userData, token });
    } catch (error) {
        let message = 'Error during registration'
        if (error instanceof Error) message = error.message
        return NextResponse.json({ message: message }, { status: 500 });
    }
}
