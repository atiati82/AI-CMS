import { cn } from "@/lib/utils";

interface AndaraIconProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 56,
};

export function AndaraIcon({ size = "md", className }: AndaraIconProps) {
  const pixelSize = sizeMap[size];
  const gradientId = `andara-grad-${Math.random().toString(36).slice(2, 7)}`;
  
  return (
    <svg 
      width={pixelSize} 
      height={pixelSize} 
      viewBox="0 0 100 100" 
      className={cn("shrink-0", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c0963b" />
          <stop offset="23%" stopColor="#ce9e26" />
          <stop offset="41%" stopColor="#f2c76c" />
          <stop offset="59%" stopColor="#e0b655" />
          <stop offset="77%" stopColor="#fdf8d0" />
          <stop offset="100%" stopColor="#e9c882" />
        </linearGradient>
      </defs>
      
      <g transform="translate(50, 50)">
        <polygon 
          points="0,-42 36.4,-21 36.4,21 0,42 -36.4,21 -36.4,-21" 
          fill={`url(#${gradientId})`}
          stroke="#fdf8d0"
          strokeWidth="1"
          opacity="0.95"
        />
        
        <line x1="0" y1="-42" x2="0" y2="42" stroke="#fdf8d0" strokeWidth="0.8" opacity="0.6" />
        <line x1="-36.4" y1="-21" x2="36.4" y2="21" stroke="#fdf8d0" strokeWidth="0.8" opacity="0.6" />
        <line x1="-36.4" y1="21" x2="36.4" y2="-21" stroke="#fdf8d0" strokeWidth="0.8" opacity="0.6" />
        
        <polygon 
          points="0,-28 24.2,-14 24.2,14 0,28 -24.2,14 -24.2,-14" 
          fill="none"
          stroke="#fdf8d0"
          strokeWidth="1"
          opacity="0.7"
        />
        
        <polygon 
          points="0,-14 12.1,-7 12.1,7 0,14 -12.1,7 -12.1,-7" 
          fill="#fdf8d0"
          opacity="0.5"
        />
      </g>
    </svg>
  );
}

export function AndaraLogo({ 
  size = "md", 
  showTagline = false,
  className 
}: { 
  size?: "sm" | "md" | "lg"; 
  showTagline?: boolean;
  className?: string;
}) {
  const textSizeMap = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };
  
  const taglineSizeMap = {
    sm: "text-[8px]",
    md: "text-[10px]",
    lg: "text-xs",
  };
  
  const iconSizeMap = {
    sm: "sm" as const,
    md: "md" as const,
    lg: "lg" as const,
  };

  return (
    <div className={cn("flex items-center gap-2", className)} data-testid="andara-logo">
      <AndaraIcon size={iconSizeMap[size]} />
      <div className="flex flex-col">
        <span className={cn(
          "font-display font-bold tracking-tight leading-none andara-text-gold-gradient",
          textSizeMap[size]
        )}>
          ANDARA <span className="text-muted-foreground font-light">IONIC</span>
        </span>
        {showTagline && (
          <span className={cn(
            "text-muted-foreground tracking-wider uppercase",
            taglineSizeMap[size]
          )}>
            Primordial Ionic Sulfate Minerals
          </span>
        )}
      </div>
    </div>
  );
}

export default AndaraIcon;
