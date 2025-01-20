"use client";

import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Link,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MuiCard from "@mui/material/Card";

import SignInGoogle from "@/components/SigninGoogle";
import SignInGithub from "@/components/SigninGithub";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(1),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage("Registration successful!");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        const error = await res.json();
        setMessage(error.error || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("An error occurred during registration.");
    }
  };

  return (
    <SignUpContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        {/* <Typography>Enter your information to create an account</Typography> */}

        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <TextField
            fullWidth
            variant="outlined"
            id="username"
            placeholder="John Doe"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            fullWidth
            variant="outlined"
            id="email"
            type="email"
            placeholder="me@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            variant="outlined"
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
          <TextField
            variant="outlined"
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </FormControl>
        <Button
          sx={{ textTransform: "capitalize" }}
          type="submit"
          fullWidth
          variant="contained"
        >
          Sign up
        </Button>
        {message && <p className="text-center mt-2">{message}</p>}
        <Divider>or</Divider>
        <SignInGoogle />
        <SignInGithub />
        <Typography sx={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link href="/login" variant="body2" sx={{ alignSelf: "center" }}>
            Sign in
          </Link>
        </Typography>
      </Card>
    </SignUpContainer>
  );
}
