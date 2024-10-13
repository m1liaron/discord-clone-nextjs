import {NextResponse} from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json(); // Parse JSON body

        return NextResponse.json({ message: 'User login successfully' })
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: error })
    }
}
