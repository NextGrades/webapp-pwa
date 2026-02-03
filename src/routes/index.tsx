import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { ChevronRight, GraduationCap, CheckCircle, Target } from "lucide-react";
import Button from "../components/Button";
import { Link } from "@tanstack/react-router";


export const Route = createFileRoute("/")({
  staticData: {
    showHeader: false,
  },
  component: LandingPage,
});

// Placeholder illustration components
const Illustration1 = () => (
  <svg
    viewBox="0 0 280 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full">
    {/* Classroom/Learning scene */}
    <circle cx="140" cy="140" r="120" fill="url(#grad1)" opacity="0.1" />
    <rect
      x="80"
      y="100"
      width="120"
      height="80"
      rx="8"
      fill="var(--color-primary)"
      opacity="0.2"
    />
    <circle
      cx="140"
      cy="140"
      r="40"
      fill="var(--color-primary)"
      opacity="0.3"
    />
    <GraduationCap className="w-20 h-20 text-primary absolute inset-0 m-auto" />
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--color-primary)" />
        <stop offset="100%" stopColor="var(--color-accent)" />
      </linearGradient>
    </defs>
  </svg>
);

const Illustration2 = () => (
  <svg
    viewBox="0 0 280 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full">
    {/* Validation/Check scene */}
    <circle cx="140" cy="140" r="120" fill="url(#grad2)" opacity="0.1" />
    <rect
      x="70"
      y="110"
      width="60"
      height="80"
      rx="6"
      fill="var(--color-accent)"
      opacity="0.2"
    />
    <rect
      x="150"
      y="110"
      width="60"
      height="80"
      rx="6"
      fill="var(--color-accent)"
      opacity="0.2"
    />
    <circle
      cx="140"
      cy="140"
      r="45"
      fill="var(--color-success)"
      opacity="0.2"
    />
    <CheckCircle className="w-20 h-20 text-success absolute inset-0 m-auto" />
    <defs>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--color-accent)" />
        <stop offset="100%" stopColor="var(--color-success)" />
      </linearGradient>
    </defs>
  </svg>
);

const Illustration3 = () => (
  <svg
    viewBox="0 0 280 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full">
    {/* Progress/Achievement scene */}
    <circle cx="140" cy="140" r="120" fill="url(#grad3)" opacity="0.1" />
    <path
      d="M80 180 L100 150 L120 160 L140 120 L160 140 L180 100 L200 120"
      stroke="var(--color-success)"
      strokeWidth="4"
      fill="none"
      opacity="0.3"
    />
    <circle
      cx="140"
      cy="140"
      r="40"
      fill="var(--color-primary)"
      opacity="0.2"
    />
    <Target className="w-20 h-20 text-primary absolute inset-0 m-auto" />
    <defs>
      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--color-primary)" />
        <stop offset="100%" stopColor="var(--color-success)" />
      </linearGradient>
    </defs>
  </svg>
);

const ONBOARDING_SLIDES = [
  {
    id: 1,
    title: "Welcome to NextGrades",
    description:
      "Your AI-powered study companion for acing university exams with confidence",
    illustration: <Illustration1 />,
    imagePath: "/images/illustration-one.svg",
    bgColor: "from-primary/5 to-primary/10",
  },
  {
    id: 2,
    title: "Student-Validated Courses",
    imagePath: "/images/illustration-two.svg",
    description:
      "Access courses uploaded and validated by students, ensuring accuracy with your curriculum",
    illustration: <Illustration2 />,
    bgColor: "from-accent/5 to-success/10",
  },
  {
    id: 3,
    title: "Track Your Progress",
    imagePath: "/images/grouped-three.svg",
    description:
      "Monitor your performance, identify weak areas, and watch your scores improve over time",
    illustration: <Illustration3 />,
    bgColor: "from-success/5 to-primary/10",
  },
];

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  const handleNext = () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    setCurrentSlide(ONBOARDING_SLIDES.length - 1);
  };

  // Swipe gesture handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handleBack();
    }
  };

  const isLastSlide = currentSlide === ONBOARDING_SLIDES.length - 1;
  const slide = ONBOARDING_SLIDES[currentSlide];

  return (
    <div className="min-h-screen bg-white flex justify-center items-center flex-col overflow-hidden">
      {/* Main Content with Swipe */}
      <div
        ref={containerRef}
        className="w-full md:w-100 lg:w-120 flex-1 flex flex-col items-center justify-center px-6 py-12 relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}>
        {/* Skip Button */}
        {!isLastSlide && (
          <div className="absolute top-6 right-6 z-10">
            <button
              onClick={handleSkip}
              className="text-sm text-muted hover:text-primary transition-colors font-semibold px-3 py-1.5">
              Skip
            </button>
          </div>
        )}
        {/* Illustration Container with Animation */}
        <div className="w-full mb-8">
          <div
            className={` mx-auto  flex items-center justify-center transition-all duration-500 relative overflow-hidden`}
            style={{
              animation: "slideIn 0.5s ease-out",
            }}>
            <img
              src={slide.imagePath}
              alt={slide.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2 mb-10">
          {ONBOARDING_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-primary" : "bg-muted/30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Content with Animation */}
        <div
          className="w-full text-left px-2 mb-12"
          style={{
            animation: "fadeIn 0.5s ease-out 0.2s both",
          }}>
          <h1 className="text-[32px] leading-tight font-display font-bold text-foreground mb-4">
            {slide.title}
          </h1>
          <p className="text-base text-muted leading-relaxed">
            {slide.description}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="w-full px-2">
          <div className="flex items-center gap-3">
            {currentSlide > 0 && (
              <Button
                variant="ghost"
                onClick={handleBack}
                className="h-12 text-base"
                size="lg">
                Back
              </Button>
            )}

            {isLastSlide ? (
              <Link
                to="/courses"
                search={{
                  page: 1,
                  limit: 10,
                }}
                className="flex-1">
                <Button className="w-full h-12 text-base" size="lg">
                  Proceed
                  <ChevronRight size={20} className="ml-1" />
                </Button>
              </Link>
            ) : (
              <Button
                onClick={handleNext}
                className={`h-12 text-base ${currentSlide === 0 ? "w-full" : "flex-1"}`}
                size="lg">
                Next
                <ChevronRight size={20} className="ml-1" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pb-8 px-6">
        <p className="text-center text-xs text-muted font-medium">
          © 2025 NextGrades • AI-Powered Exam Prep
        </p>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
