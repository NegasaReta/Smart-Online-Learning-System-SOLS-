import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/clerk-react";

/**
 * Wraps the app in Clerk ONLY when a real publishable key is provided via
 * VITE_CLERK_PUBLISHABLE_KEY. Without a key we render children directly so
 * preview pages (like the student dashboard) work standalone.
 */
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export function AppClerkProvider({ children }: { children: ReactNode }) {
  if (!PUBLISHABLE_KEY) {
    return <>{children}</>;
  }
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>{children}</ClerkProvider>
  );
}
