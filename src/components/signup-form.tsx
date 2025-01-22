// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {z} from "zod";
// import { Control, FieldPath, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Form } from "./ui/form"
// import React from "react"

// const formSchema = z.object({
// email:z.string().email(),
// username:z.string().min(3).max(50),
// password:z.string().min(8),
// confirmPassword: z.string().min(6)
// }).refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });



// export function SignupForm({
   
//   className,
//   ...props
// }: React.ComponentPropsWithoutRef<"div">) {
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver:zodResolver(formSchema),
//         defaultValues:{
//             email:"",
//             username:"",
//             password:"",
//         },
//     });
//     const onSubmit = (values: z.infer<typeof formSchema>)=>{console.log(values)}
//   return (
//     <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8">
// <Button type="submit"> sign up</Button>
//         </form>
//     </Form>
//   )
// };

// interface SignupFormFieldProps {
// name: FieldPath<z.infer<typeof formSchema>>;
// lable: string;
// placeholder:string;
// description?: string;
// inputType:string;
// formcontrol:Control<z.infer<typeof formSchema>,any>  
// }
//  const SignupFormField :React.FC<SignupFormFieldProps>=({

//  })=>{
//     return(
// <div></div>
//     )
//  }
