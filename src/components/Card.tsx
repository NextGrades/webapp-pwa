import type { ReactNode } from "react";

type CardVariant = "default" | "primary" | "success" | "warning" | "danger";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  variant?: CardVariant;
}

export default function Card({
  children,
  className = "",
  hover = false,
  onClick,
  variant = "default",
}: CardProps) {
  const hoverStyles = hover
    ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer"
    : "";

  const variantStyles: Record<CardVariant, string> = {
    default: "bg-surface border border-border text-foreground",

    primary: "bg-primary border border-primary text-white [&_*]:text-white",

    success: "bg-green-600 border border-green-600 text-white [&_*]:text-white",

    warning: "bg-yellow-400 border border-yellow-400 text-foreground",

    danger: "bg-red-600 border border-red-600 text-white [&_*]:text-white",
  };

  return (
    <div
      className={`
        rounded-lg p-4 sm:p-6 shadow-md transition-all duration-200
        ${variantStyles[variant]}
        ${hoverStyles}
        ${className}
      `}
      onClick={onClick}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <div className={`mb-3 sm:mb-4 ${className}`}>{children}</div>;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className = "" }: CardTitleProps) {
  return (
    <h3
      className={`text-lg sm:text-xl font-display font-semibold text-foreground ${className}`}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({
  children,
  className = "",
}: CardDescriptionProps) {
  return (
    <p className={`text-xs sm:text-sm text-muted mt-1 ${className}`}>
      {children}
    </p>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={className}>{children}</div>;
}
