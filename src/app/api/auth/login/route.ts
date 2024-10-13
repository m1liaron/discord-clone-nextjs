import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import createJWToken from "@/helpers/api/createJWToken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const user = await prisma.user.findFirst({ where: { email: data.email } });
        if (!user) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
        }

        const token = await createJWToken(user.id, user.email);

        const { password, ...userData } = user; 
        return NextResponse.json({ user: userData, token });
    } catch (error) {
        let message = 'Unknown error during login process';
        if (error instanceof Error) message = error.message
        return NextResponse.json({ message: message }, { status: 500 });
    }
}
