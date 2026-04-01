"use client";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import type { ReactNode } from "react";

import outputs from "@/outputs";

Amplify.configure(outputs);

export function AmplifyProvider({ children }: { children: ReactNode }) {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
}
