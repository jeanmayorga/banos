"use client";

import Image from "next/image";

import { signInWithGoogle } from "@/app/services/auth.services";

import { AuthGoogleOneTap } from "./auth-google-one-tap";
import { Container } from "./container";
import { GoogleIcon } from "./icon-google";
import { Paper } from "./paper";
import { Button } from "./ui/button";

export function AuthSignIn() {
  async function handleAuthWithGoogle() {
    await signInWithGoogle();
  }

  return (
    <Container className="my-8 md:my-28">
      <Paper className="grid gap-8 p-8 px-4 md:grid-cols-2 md:p-12">
        <div className="border-b border-dashed border-gray-200 px-4 pb-8 dark:border-gray-700 md:border-b-0 md:border-r md:py-8">
          <h1 className="mb-2 text-2xl font-medium leading-none tracking-tight text-gray-700 dark:text-white md:text-4xl">
            Mi cuenta
          </h1>
          <p className="leading-none text-gray-500 dark:text-gray-200">
            Selecciona una cuenta para gestionar tus tickets y reservas de manera rápida y sencilla.
          </p>
        </div>
        <div className="flex items-center">
          <Button
            variant="secondary"
            className="w-full rounded-full"
            onClick={() => handleAuthWithGoogle()}
          >
            <GoogleIcon />
            Ingresar con tu cuenta de Google
          </Button>
        </div>
      </Paper>
      <AuthGoogleOneTap />
    </Container>
  );
}
