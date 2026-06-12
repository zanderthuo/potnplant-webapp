import type { ReactNode } from "react";
import logo from "../../assets/logo.jpeg";

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthLayout({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img
            src={logo}
            alt="PotnPlant"
            className="mx-auto h-24 w-24 rounded-full object-cover shadow-lg"
          />

          <h1 className="mt-4 font-display text-3xl">
            POTNPLANT
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Plant Management Portal
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <h2 className="font-display text-3xl">
            {title}
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {subtitle}
          </p>

          <div className="mt-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}