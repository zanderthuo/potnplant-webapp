import type { ReactNode } from "react";
import logo from "../../assets/logo-light.png";

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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#062d19] px-4">
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#2f7d32]/20 blur-3xl" />

      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#f4b400]/15 blur-3xl" />

      <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#c86b3c]/10 blur-3xl" />

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img
            src={logo}
            alt="PotnPlant"
            className="mx-auto h-24 w-28 object-cover"
          />

          <h1 className="mt-4 font-display text-4xl font-black tracking-[0.15em] text-[#f4b400]">
            POTPLANT
          </h1>

          <p className="mt-2 text-sm text-white/70">
            Plant Management Portal
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="font-display text-3xl text-white">
            {title}
          </h2>

          <p className="mt-2 text-sm text-white/70">
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