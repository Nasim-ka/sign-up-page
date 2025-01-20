"use client";
import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "../components/CustomIcons";
export default function SignInGoogle() {
  return (
    <>
      <Button
        sx={{ textTransform: "capitalize" }}
        fullWidth
        variant="outlined"
        onClick={() => signIn("google")}
        startIcon={<GoogleIcon />}
      >
        continue with Google
      </Button>
     
    </>
  );
}