import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/text-to-speech")({
  component: TextToSpeechPage,
});

function TextToSpeechPage() {
  const [text, setText] = useState("");

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Text to Speech Demo</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to convert to speech..."
        className="w-full p-4 border rounded-lg mb-4 min-h-32 resize-y"
        rows={5}
      />

      <LessonPlayer lessonText={text} />

      {/* Example presets */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Quick Examples</h2>
        <div className="flex flex-wrap gap-2">
          <ExampleButton
            text="Hello! Welcome to our EdTech platform."
            onClick={setText}
          />
          <ExampleButton
            text="Photosynthesis is the process by which plants convert sunlight into energy."
            onClick={setText}
          />
          <ExampleButton
            text="The capital of Nigeria is Abuja. Lagos is the largest city."
            onClick={setText}
          />
        </div>
      </div>
    </div>
  );
}

function LessonPlayer({ lessonText }: { lessonText: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const playLesson = () => {
    if (!lessonText.trim()) {
      setError("Please enter some text first");
      return;
    }

    setError(null);

    const audio = new Audio(
      `http://localhost:7500/audio/speak?text=${encodeURIComponent(lessonText)}`
    );

    audio.onplay = () => setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => {
      setIsPlaying(false);
      setError("Failed to play audio. Is the server running?");
    };

    audio.play().catch(() => {
      setError("Failed to play audio");
      setIsPlaying(false);
    });
  };

  return (
    <div>
      <button
        onClick={playLesson}
        disabled={isPlaying || !lessonText.trim()}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors">
        {isPlaying ? "🔊 Playing..." : "🔊 Listen"}
      </button>

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
}

function ExampleButton({
  text,
  onClick,
}: {
  text: string;
  onClick: (text: string) => void;
}) {
  return (
    <button
      onClick={() => onClick(text)}
      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm truncate max-w-xs">
      {text.slice(0, 30)}...
    </button>
  );
}
