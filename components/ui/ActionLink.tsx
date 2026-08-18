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
          ? "border-black bg-black text-white hover:bg-black/85"
          : "border-black bg-white text-black hover:bg-black hover:text-white"
      } ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
