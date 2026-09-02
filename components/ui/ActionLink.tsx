import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ActionLinkProps = ComponentPropsWithoutRef<"a"> & {
  children: ReactNode;
  variant?: "solid" | "outline";
};

export function ActionLink({
  children,
  className = "",
  variant = "solid",
  ...props
}: ActionLinkProps) {
  return (
    <a
      className={`interactive-transition inline-flex h-12 items-center justify-center gap-2 rounded-lg border px-5 text-sm font-bold hover:-translate-y-0.5 ${
        variant === "solid"
          ? "border-white bg-white text-[#050505] hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.18)]"
          : "border-white/30 bg-[#121215] text-white hover:border-white hover:bg-white hover:text-[#050505]"
      } ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
