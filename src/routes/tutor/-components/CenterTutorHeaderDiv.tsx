import { Sparkles } from "lucide-react";

const CenterTutorHeaderDiv = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
        <Sparkles className="text-accent" size={20} />
      </div>
      <div>
        <h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
          Mini Tutor
        </h1>
        <p className="text-sm text-muted">Circuit Analysis Fundamentals</p>
      </div>
    </div>
  );
};

export default CenterTutorHeaderDiv;
