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
          ? "border-zinc-950 bg-zinc-950 text-white shadow-sm hover:bg-black hover:shadow-md dark:border-white dark:bg-white dark:text-[#050505] dark:shadow-none dark:hover:bg-zinc-200 dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.18)]"
          : "border-zinc-300 bg-white text-zinc-900 shadow-sm hover:border-zinc-400 hover:bg-zinc-50 hover:text-black dark:border-white/30 dark:bg-[#121215] dark:text-white dark:shadow-none dark:hover:border-white dark:hover:bg-white dark:hover:text-[#050505]"
      } ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
