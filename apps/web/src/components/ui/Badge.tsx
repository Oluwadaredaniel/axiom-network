import { cn } from "@/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'primary', className }: BadgeProps) {
  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    outline: 'bg-transparent text-charcoal-400 border-white/10',
  };

  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
