interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
  showLabel?: boolean;
  color?: "success" | "primary" | "warning";
}

export default function ProgressBar({
  progress,
  className = "",
  showLabel = true,
  color = "success",
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const colors = {
    success: "bg-success",
    primary: "bg-primary",
    warning: "bg-warning",
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="progress-bar">
        <div
          className={`progress-bar-fill ${colors[color]}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-muted mt-1">
          {Math.round(clampedProgress)}% Complete
        </p>
      )}
    </div>
  );
}
