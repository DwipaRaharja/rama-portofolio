import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type WindowCardProps<T extends ElementType = "article"> = {
  as?: T;
  children: ReactNode;
  badge?: ReactNode;
  badgePulse?: boolean;
  title?: string;
  dotSize?: "sm" | "md";
  interactive?: boolean;
  className?: string;
  headerClassName?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "title">;

export function WindowCard<T extends ElementType = "article">({
  as,
  children,
  badge,
  badgePulse = true,
  title,
  dotSize = "sm",
  interactive = true,
  className = "",
  headerClassName = "",
  ...props
}: WindowCardProps<T>) {
  const Component = as || "article";
  const dotSizeClass = dotSize === "md" ? "size-2.5" : "size-2";

  return (
    <Component
      className={`overflow-hidden rounded-xl border border-zinc-200/90 bg-white text-zinc-950 transition-all duration-300 dark:border-white/12 dark:bg-[#0e0e11] dark:text-white ${
        interactive
          ? "surface-transition will-change-transform hover:-translate-y-1.5 hover:border-zinc-350 hover:bg-white hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] dark:hover:border-white/30 dark:hover:bg-[#131317] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(255,255,255,0.03)]"
          : ""
      } ${className}`}
      {...props}
    >
      {/* Window Mockup Topbar */}
      <div
        className={`flex items-center justify-between border-b border-zinc-200 bg-[#f4f5f8] px-3.5 py-2.5 transition-colors duration-300 dark:border-white/10 dark:bg-[#111115] ${headerClassName}`}
      >
        {/* macOS Style Traffic Light Dots */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span
            className={`${dotSizeClass} rounded-full bg-[#ff5f56] shadow-[0_0_5px_rgba(255,95,86,0.35)]`}
          />
          <span
            className={`${dotSizeClass} rounded-full bg-[#ffbd2e] shadow-[0_0_5px_rgba(255,189,46,0.35)]`}
          />
          <span
            className={`${dotSizeClass} rounded-full bg-[#27c93f] shadow-[0_0_5px_rgba(39,201,63,0.35)]`}
          />
        </div>

        {/* Optional Title */}
        {title && (
          <p className="font-mono text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
            {title}
          </p>
        )}

        {/* Right Badge */}
        {badge && (
          typeof badge === "string" ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-700 dark:border-white/15 dark:bg-white/[0.04] dark:text-zinc-300">
              {badgePulse && (
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse dark:bg-emerald-400" />
              )}
              {badge}
            </span>
          ) : (
            badge
          )
        )}
      </div>

      {children}
    </Component>
  );
}
