type DecorationProps = {
  className?: string;
};

export function DotGrid({ className = "" }: DecorationProps) {
  return (
    <div
      aria-hidden="true"
      className={`grid grid-cols-5 gap-2 ${className}`}
    >
      {Array.from({ length: 25 }, (_, index) => (
        <span key={index} className="size-1.5 rounded-full bg-current" />
      ))}
    </div>
  );
}

export function WaveLines({ className = "" }: DecorationProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="-60 -60 560 380"
      fill="none"
      preserveAspectRatio="none"
    >
      {Array.from({ length: 7 }, (_, index) => (
        <path
          key={index}
          d="M-60 218C68 275 165 238 208 150C254 55 342 4 500 22"
          transform={`translate(0 ${index * 10 - 30})`}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

export function CornerFlowLines({ className = "" }: DecorationProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 700 440"
      fill="none"
      preserveAspectRatio="none"
    >
      {Array.from({ length: 7 }, (_, index) => (
        <path
          key={index}
          d="M-160 390C70 455 210 340 275 205C345 60 455-40 830-90"
          transform={`translate(0 ${index * 10 - 30})`}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

export function AboutFlowLines({ className = "" }: DecorationProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 1440 520"
      fill="none"
      preserveAspectRatio="none"
    >
      {Array.from({ length: 7 }, (_, index) => (
        <path
          key={index}
          d="M-180 390C100 460 240 350 360 200C500 30 940 30 1080 200C1200 350 1340 460 1620 390"
          transform={`translate(0 ${index * 10 - 30})`}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

export function SolutionContactFlowLines({ className = "" }: DecorationProps) {
  const renderFlowLines = (horizontalSpacing: number, verticalSpacing: number) =>
    Array.from({ length: 7 }, (_, index) => {
      const horizontalOffset = (index - 3) * horizontalSpacing;
      const verticalOffset = (index - 3) * verticalSpacing;

      return (
        <path
          key={index}
          d={`M-220 ${140 + verticalOffset}C-100 ${110 + verticalOffset} ${40 - horizontalOffset} 160 ${100 - horizontalOffset} 430S400 ${820 + verticalOffset} 760 ${830 + verticalOffset}S${1270 - horizontalOffset} 920 ${1300 - horizontalOffset} 1190S${1360 - horizontalOffset} 1830 1560 ${1940 + verticalOffset}`}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      );
    });

  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 1440 2000"
      fill="none"
      preserveAspectRatio="none"
    >
      <g className="sm:hidden">{renderFlowLines(42, 20)}</g>
      <g className="hidden sm:block">{renderFlowLines(22, 22)}</g>
    </svg>
  );
}

export function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
      {children}
    </p>
  );
}
