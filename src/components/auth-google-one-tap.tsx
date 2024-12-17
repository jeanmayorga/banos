"use client";

import { CredentialResponse } from "google-one-tap";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

import { createClient } from "@/utils/supabase/client";

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export function AuthGoogleOneTap() {
  const supabase = createClient();
  const router = useRouter();

  const generateNonce = async (): Promise<string[]> => {
    const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
    const encoder = new TextEncoder();
    const encodedNonce = encoder.encode(nonce);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encodedNonce);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedNonce = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    return [nonce, hashedNonce];
  };

  useEffect(() => {
    async function initializeGoogleOneTap() {
      console.log("Initializing Google One Tap");

      window.addEventListener("load", async () => {
        const [nonce, hashedNonce] = await generateNonce();

        window.google.accounts.id.initialize({
          client_id: "728851830906-vo7klorai6p5nejtoaa0tvdh5p14vm1b.apps.googleusercontent.com",
          callback: async (response: CredentialResponse) => {
            try {
              console.log({ response });
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: "google",
                token: response.credential,
                nonce,
              });

              if (error) throw error;

              window.location.replace("/account");
            } catch (error) {
              console.error("Error logging in with Google One Tap", error);
            }
          },
          nonce: hashedNonce,
          // with chrome's removal of third-party cookiesm, we need to use FedCM instead (https://developers.google.com/identity/gsi/web/guides/fedcm-migration)
          use_fedcm_for_prompt: true,
        });
        window.google.accounts.id.prompt();
      });
    }
    initializeGoogleOneTap();
    return () => window.removeEventListener("load", initializeGoogleOneTap);
  }, []);

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" />
      <div id="oneTap" className="fixed right-0 top-0 z-[100]" />
    </>
  );
}
