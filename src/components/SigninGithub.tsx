"use client";
import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { GithubIcon} from "../components/CustomIcons";
export default function SignInGithub() {
  return (
    <>
      
      <Button
        sx={{ textTransform: "capitalize" }}
        fullWidth
        variant="outlined"
        onClick={() => signIn("github")}
        startIcon={<GithubIcon />}
      >
        continue with GitHub
      </Button>
    </>
  );
}

