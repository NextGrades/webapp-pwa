interface SkeletonProps {
  className?: string;
  variant?: "text" | "rectangular" | "circular";
  width?: string;
  height?: string;
}

export default function Skeleton({
  className = "",
  variant = "rectangular",
  width,
  height,
}: SkeletonProps) {
  const variantStyles = {
    text: "h-4 rounded",
    rectangular: "rounded-lg",
    circular: "rounded-full",
  };

  const style = {
    width: width || undefined,
    height: height || undefined,
  };

  return (
    <div
      className={`skeleton ${variantStyles[variant]} ${className}`}
      style={style}
    />
  );
}

// Course Card Skeleton
export function CourseCardSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-md">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Skeleton width="60%" height="28px" className="mb-2" />
            <Skeleton width="80%" height="20px" />
          </div>
          <Skeleton variant="rectangular" width="80px" height="24px" />
        </div>
        <div className="space-y-2">
          <Skeleton width="70%" height="16px" />
          <Skeleton width="50%" height="16px" />
          <Skeleton width="60%" height="16px" />
        </div>
      </div>
    </div>
  );
}

// Dashboard Card Skeleton
export function DashboardCardSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-md">
      <Skeleton width="70%" height="24px" className="mb-4" />
      <Skeleton width="100%" height="8px" className="mb-2" />
      <Skeleton width="40%" height="16px" />
    </div>
  );
}
