import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const data = await req.json(); // Parse JSON body

        // Find the user by email
        const user = await prisma.user.findFirst({ where: { email: data.email } });
        if (!user) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
        }

        // Compare the password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
        }

        // Return the user data if the password is correct
        const { password, ...userData } = user; // Exclude the password from the response
        return NextResponse.json(userData);
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
