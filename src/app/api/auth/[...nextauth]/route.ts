// import { NextRequest, NextResponse } from 'next/server';
// import { sendMagicLinkEmail } from '../../../../lib/emailService';
//  import { nanoid } from 'nanoid';
// //  import { handlers } from "@/auth"
// import { handlers } from "@/auth"

// export async function POST(req: NextRequest) {
//   const { email } = await req.json();

//
//   if (!email) {
//     return NextResponse.json({ error: 'Email is required' }, { status: 400 });
//   }

//
//   const token = nanoid();
//   const magicLink = `http://localhost:3000/api/auth/verifyMagicLink?token=${token}`;

//
//   try {
//     await sendMagicLinkEmail(email, magicLink);
//     return NextResponse.json({ message: 'Magic link sent!' }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to send magic link' }, { status: 500 });
//   }
// }
// کدهای بالا برای ارسال مجیک لینک هست ///////////////////////////////
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
