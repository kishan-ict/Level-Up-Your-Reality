import React from 'react';
import { cn } from '../utils';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = ({
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  children,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: 'bg-system-purple text-white hover:bg-purple-600 shadow-[0_0_15px_rgba(139,92,246,0.3)] border border-purple-400/30',
    secondary: 'bg-zinc-900 text-zinc-100 hover:bg-zinc-800 border border-zinc-700',
    outline: 'bg-transparent border border-system-purple/50 text-system-purple hover:bg-system-purple/10',
    ghost: 'bg-transparent text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900/50',
    danger: 'bg-red-900/20 text-red-500 hover:bg-red-900/40 border border-red-500/30',
  };

  const sizes = {
    sm: 'px-3 py-1 text-[10px] uppercase tracking-widest font-mono',
    md: 'px-5 py-2 text-xs uppercase tracking-widest font-mono',
    lg: 'px-8 py-3 text-sm uppercase tracking-widest font-mono',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-sm font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
};

export const Card = ({ className, children, title }: { className?: string; children: React.ReactNode; title?: string }) => (
  <div className={cn('system-card flex flex-col', className)}>
    {title && (
      <div className="mb-4 flex items-center gap-2">
        <div className="w-1 h-4 bg-system-purple shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
        <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">{title}</h3>
      </div>
    )}
    {children}
  </div>
);

export const Badge = ({ children, className, variant = 'default' }: { children: React.ReactNode; className?: string; variant?: 'default' | 'success' | 'warning' | 'error' | 'purple' }) => {
  const variants = {
    default: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    error: 'bg-red-500/10 text-red-500 border-red-500/20',
    purple: 'bg-system-purple/10 text-system-purple border-system-purple/20',
  };
  return (
    <span className={cn('px-2 py-0.5 rounded-sm text-[9px] font-mono uppercase tracking-widest border', variants[variant], className)}>
      {children}
    </span>
  );
};

export const BrutalistHeader = ({ children, className, as: Component = 'h2' }: { children: React.ReactNode; className?: string; as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }) => (
  <Component className={cn('brutalist-header', className)}>
    {children}
  </Component>
);
