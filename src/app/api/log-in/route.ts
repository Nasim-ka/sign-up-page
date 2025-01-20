import { db, users } from "../../../schema"; 
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";


export async function POST(req: Request) {
  
  const {email ,password} = await req.json();
  try{
// const {email ,password} = await req.json();
if (!email || !password) {
  return NextResponse.json(
    { error: "ایمیل و پسورد الزامی است." },
    { status: 400 }
  );
  }

  const [user]= await db
    .select()
    .from(users)
    .where(eq(users.email,email));
   
    if (!user) {
      return NextResponse.json(
        { error: "کاربری با این ایمیل پیدا نشد." },
        { status: 404 }
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "پسورد وارد شده صحیح نیست." },
        { status: 401 }
      );
    }
    const token = jwt.sign({id:user.id,email:user.email},
      process.env.JWT_SECRET!,
      {expiresIn:"1h"}
    );

    const response= NextResponse.json(
      {success: true},
      {status:200}
    );

     response.cookies.set({
      name:"token",
      value:token,
      httpOnly:true,
      secure:process.env.NODE_ENV=== "production",
      sameSite:"lax",
      path:"/",
      maxAge:60*60
     });

     return response;
    } catch(error){
      console.error("Login error:",error);
      return NextResponse.json({error:"internal server error"},
        {status:500})
    }

  }
