// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Box,
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
// import SignInGoogle from "@/components/SigninGoogle";
// import SignInGithub from "@/components/SigninGithub";
// import MuiCard from "@mui/material/Card";
// const Card = styled(MuiCard)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   alignSelf: "center",
//   width: "100%",
//   padding: theme.spacing(4),
//   gap: theme.spacing(2),
//   margin: "auto",
//   [theme.breakpoints.up("sm")]: {
//     maxWidth: "450px",
//   },
//   boxShadow:
//     "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
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

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("/api/log-in", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         router.push("/dashboard");
//       } else {
//         setError(data.error || "خطای غیرمنتظره");
//       }
//     } catch (error) {
//       setError("خطای سرور، لطفا بعدا تلاش کنید.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SignUpContainer direction="column" justifyContent="space-between">
//       <Card variant="outlined">
//         {/* <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{ display: "flex", flexDirection: "column", gap: 1 }}
//         > */}
//           <Typography
//             component="h1"
//             variant="h5"

//           >
//             Login to your account
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             noValidate
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               width: "100%",
//               gap: 2,
//             }}
//           >
//             <FormControl>
//               <FormLabel htmlFor="email">Email</FormLabel>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </FormControl>

//             <FormControl className="mb-6">
//               <FormLabel htmlFor="password">Password</FormLabel>
//               <TextField
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </FormControl>

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               disabled={loading}
//             >
//               Login
//             </Button>
//           </Box>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//           <Divider>or</Divider>
//             <SignInGoogle />
//             <SignInGithub />
//             <Typography sx={{ textAlign: "center" }}>
//               Don't have an account?
//               <Link href="/signup" variant="body2" sx={{ alignSelf: "center" }}>
//                 Sign up
//               </Link>
//             </Typography>
//           </Box>
//         {/* </Box> */}
//       </Card>
//     </SignUpContainer>
//   );
// }

"use client";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        router.push("/dashboard");
        console.log("Logged in successfully", result);
      } else {
        console.log("Login failed:", result);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Login with your Github or Google account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  <div className="flex flex-col gap-4">
                    <Button variant="outline" className="w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
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
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                  <div className="grid">
                    <div className="col flex-col">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <Label>email</Label>

                            <Input
                              className="w-full"
                              placeholder="email"
                              {...field}
                              {...form.register("email")}
                            />

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <Label>password</Label>

                            <Input
                              placeholder="password"
                              {...field}
                              {...form.register("password")}
                            />

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a> */}

                      {/* <Input id="password" type="password" required 
                   {...form.register("password")} /> */}
                    </div>
                    <Button type="submit" className="w-full mt-5">
                      Login
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a href="/signup" className="underline underline-offset-4">
                      Sign up
                    </a>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
