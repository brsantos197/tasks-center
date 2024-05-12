"use client";

import { Button } from "@tasks-center/ui/components/ui/button";
import { Input } from "@tasks-center/ui/components/ui/input";
import { Label } from "@tasks-center/ui/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const AuthForm = () => {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="ml-auto inline-block text-sm underline"
          >
            Forgot your password?
          </Link>
        </div>
        <Input id="password" type="password" required />
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
      <Button
        variant="outline"
        className="w-full gap-2"
        onClick={() => signIn("google")}
      >
        <FcGoogle />
        Login with Google
      </Button>

      <Button variant="outline" className="w-full gap-2">
        <FaGithub />
        Login with Github
      </Button>
    </div>
  );
};
