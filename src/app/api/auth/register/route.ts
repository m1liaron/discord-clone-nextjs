import {NextResponse} from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json(); // Parse JSON body

        // Here, you can add your registration logic (e.g., saving user data to the database)

        return NextResponse.json({ message: 'User registered successfully' })
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: error })
    }
}
