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
      className={`overflow-hidden rounded-xl border border-white/12 bg-[#0e0e11] text-white ${
        interactive
          ? "surface-transition will-change-transform hover:-translate-y-1.5 hover:border-white/30 hover:bg-[#131317] hover:shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(255,255,255,0.03)]"
          : ""
      } ${className}`}
      {...props}
    >
      {/* Window Mockup Topbar */}
      <div
        className={`flex items-center justify-between border-b border-white/10 bg-[#111115] px-3.5 py-2.5 ${headerClassName}`}
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
          <p className="font-mono text-[11px] font-semibold text-zinc-400">
            {title}
          </p>
        )}

        {/* Right Badge */}
        {badge && (
          typeof badge === "string" ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-300">
              {badgePulse && (
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
