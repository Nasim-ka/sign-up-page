// "use client";

// import {
//   Button,
//   Divider,
//   FormControl,
//   FormLabel,
//   Link,
//   Stack,
//   styled,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useState } from "react";
// import MuiCard from "@mui/material/Card";

// import SignInGoogle from "@/components/SigninGoogle";
// import SignInGithub from "@/components/SigninGithub";

// const Card = styled(MuiCard)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   alignSelf: "center",
//   width: "100%",
//   padding: theme.spacing(4),
//   gap: theme.spacing(1),
//   margin: "auto",
//   boxShadow:
//     "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
//   [theme.breakpoints.up("sm")]: {
//     width: "450px",
//   },
//   ...theme.applyStyles("dark", {
//     boxShadow:
//       "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
//   }),
// }));

// const SignUpContainer = styled(Stack)(({ theme }) => ({
//   height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
//   minHeight: "100%",
//   padding: theme.spacing(2),
//   [theme.breakpoints.up("sm")]: {
//     padding: theme.spacing(4),
//   },
//   "&::before": {
//     content: '""',
//     display: "block",
//     position: "absolute",
//     zIndex: -1,
//     inset: 0,
//     backgroundImage:
//       "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
//     backgroundRepeat: "no-repeat",
//     ...theme.applyStyles("dark", {
//       backgroundImage:
//         "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
//     }),
//   },
// }));

// export default function SignupPage() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [message, setMessage] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage("");

//     if (formData.password !== formData.confirmPassword) {
//       setMessage("Passwords do not match!");
//       return;
//     }

//     try {
//       const res = await fetch("/api/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username: formData.username,
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setMessage("Registration successful!");
//         setFormData({
//           username: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//         });
//       } else {
//         const error = await res.json();
//         setMessage(error.error || "Registration failed.");
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       setMessage("An error occurred during registration.");
//     }
//   };

//   return (
//     <SignUpContainer direction="column" justifyContent="space-between">
//       <Card variant="outlined">
//         <Typography component="h1" variant="h5">
//           Sign up
//         </Typography>

//         {/* <Typography>Enter your information to create an account</Typography> */}

//         <FormControl>
//           <FormLabel htmlFor="username">Username</FormLabel>
//           <TextField
//             fullWidth
//             variant="outlined"
//             id="username"
//             placeholder="John Doe"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </FormControl>
//         <FormControl>
//           <FormLabel htmlFor="email">Email</FormLabel>
//           <TextField
//             fullWidth
//             variant="outlined"
//             id="email"
//             type="email"
//             placeholder="me@example.com"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </FormControl>
//         <FormControl>
//           <FormLabel htmlFor="password">Password</FormLabel>
//           <TextField
//             variant="outlined"
//             id="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </FormControl>
//         <FormControl>
//           <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
//           <TextField
//             variant="outlined"
//             id="confirmPassword"
//             type="password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />
//         </FormControl>
//         <Button
//           sx={{ textTransform: "capitalize" }}
//           type="submit"
//           fullWidth
//           variant="contained"
//         >
//           Sign up
//         </Button>
//         {message && <p className="text-center mt-2">{message}</p>}
//         <Divider>or</Divider>
//         <SignInGoogle />
//         <SignInGithub />
//         <Typography sx={{ textAlign: "center" }}>
//           Already have an account?{" "}
//           <Link href="/login" variant="body2" sx={{ alignSelf: "center" }}>
//             Sign in
//           </Link>
//         </Typography>
//       </Card>
//     </SignUpContainer>
//   );
// }

"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
const formSchema = z.object({
  email: z.string().min(2).max(50),
  username: z.string().min(3).max(50),
  password: z.string().min(8),
});
export default function SignupPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("User created:", result);
      } else {
        setErrorMessage(result.error || "An error occurred");
      }
    } catch (error) {
      setErrorMessage("Internal server error");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Username" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>email</FormLabel>
                        <FormControl>
                          <Input placeholder="email" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>password</FormLabel>
                        <FormControl>
                          <Input placeholder="password" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <Button type="submit">Create an account</Button>

                  <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm2.218 18.616c-.354.069-.468-.149-.468-.336v-1.921c0-.653-.229-1.079-.481-1.296 1.56-.173 3.198-.765 3.198-3.454 0-.765-.273-1.389-.721-1.879.072-.177.312-.889-.069-1.853 0 0-.587-.188-1.923.717-.561-.154-1.159-.231-1.754-.234-.595.003-1.193.08-1.753.235-1.337-.905-1.925-.717-1.925-.717-.379.964-.14 1.676-.067 1.852-.448.49-.722 1.114-.722 1.879 0 2.682 1.634 3.282 3.189 3.459-.2.175-.381.483-.444.936-.4.179-1.413.488-2.037-.582 0 0-.37-.672-1.073-.722 0 0-.683-.009-.048.426 0 0 .46.215.777 1.024 0 0 .405 1.25 2.353.826v1.303c0 .185-.113.402-.462.337-2.782-.925-4.788-3.549-4.788-6.641 0-3.867 3.135-7 7-7s7 3.133 7 7c0 3.091-2.003 5.715-4.782 6.641z" />
                    </svg>
                    Login with GitHub
                  </Button>
                </div>
                <div className="text-center text-sm mt-4">
                  Already have an account?
                  <Link href="/login" className="underline underline-offset-4">
                    sign in
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
