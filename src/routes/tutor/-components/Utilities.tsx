import type { Message } from "@/routes/tutor";
import { TeachingResponseCard } from "@/routes/tutor/-components/TeachingResponseCard";
import { Sparkles, Unlock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
// ─── Loading skeleton shown while AI prepares the lesson ────────────────────
export function LoadingState({ topic }: { topic?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
        <Sparkles size={24} className="text-accent animate-pulse" />
      </div>
      <p className="text-sm font-semibold text-foreground mb-1">
        Preparing your lesson…
      </p>
      <p className="text-xs text-muted">{topic ?? "Loading topic…"}</p>
      <div className="flex gap-1.5 mt-4">
        <div
          className="w-2 h-2 bg-accent rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-2 h-2 bg-accent rounded-full animate-bounce"
          style={{ animationDelay: "200ms" }}
        />
        <div
          className="w-2 h-2 bg-accent rounded-full animate-bounce"
          style={{ animationDelay: "400ms" }}
        />
      </div>
    </div>
  );
}

// ─── Nudge banner that appears once when the input unlocks ──────────────────
export function UnlockNudge({ topic }: { topic: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-green-500/8 border border-green-500/20 rounded-lg">
      <Unlock size={14} className="text-green-600 shrink-0" />
      <p className="text-xs text-green-700 font-medium">
        You're all set — ask me anything about {topic} below
      </p>
    </div>
  );
}

import type {
  CourseTutorResponse,
  FollowUpAIResponse,
} from "@/common/types/course.types";

// ─── Type Guards ───────────────────────────────────────────────────────────

function isCourseTutorResponse(
  data: CourseTutorResponse | FollowUpAIResponse,
): data is CourseTutorResponse {
  return "topic" in data && "explanation" in data;
}

function isFollowUpResponse(
  data: CourseTutorResponse | FollowUpAIResponse,
): data is FollowUpAIResponse {
  return "answer" in data && !("topic" in data);
}

// ─── Message Bubble ─────────────────────────────────────────────────────────
export function MessageBubble({ message }: { message: Message }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="chat-bubble user max-w-[80%]">
          <p className="whitespace-pre-wrap leading-relaxed">
            {message.content}
          </p>
          <p className="text-xs opacity-70 mt-2">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    );
  }

  // AI message handling
  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] w-full space-y-3">
        {/* Handle FollowUpAIResponse - plain text answer with markdown */}
        {message.structuredData &&
          isFollowUpResponse(message.structuredData) && (
            <div className="chat-bubble ai">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-accent" />
                <span className="text-xs font-semibold text-accent">
                  AI Tutor
                </span>
              </div>
              <div className="prose prose-sm prose-slate dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1
                        className="text-lg font-bold text-foreground mt-3 mb-2"
                        {...props}
                      />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2
                        className="text-base font-semibold text-foreground mt-3 mb-2"
                        {...props}
                      />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3
                        className="text-sm font-semibold text-foreground mt-2 mb-1"
                        {...props}
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <p
                        className="text-foreground/90 leading-relaxed mb-3"
                        {...props}
                      />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul
                        className="list-none space-y-2 my-2 ml-2"
                        {...props}
                      />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol
                        className="list-none space-y-2 my-2 ml-2"
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="flex items-start gap-2 text-sm text-foreground/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span className="flex-1" {...props} />
                      </li>
                    ),
                    strong: ({ node, ...props }) => (
                      <strong
                        className="font-semibold text-foreground"
                        {...props}
                      />
                    ),
                    em: ({ node, ...props }) => (
                      <em className="italic text-foreground/90" {...props} />
                    ),
                    code: ({ node, className, children, ...props }) => {
                      const inline = !className;
                      return inline ? (
                        <code
                          className="px-1.5 py-0.5 bg-accent/10 text-accent rounded text-xs font-mono"
                          {...props}>
                          {children}
                        </code>
                      ) : (
                        <code
                          className="block bg-surface p-3 rounded text-xs font-mono overflow-x-auto"
                          {...props}>
                          {children}
                        </code>
                      );
                    },
                    pre: ({ node, ...props }) => (
                      <pre
                        className="bg-surface p-3 rounded my-2 overflow-x-auto"
                        {...props}
                      />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote
                        className="border-l-4 border-accent pl-4 italic text-foreground/80 my-2"
                        {...props}
                      />
                    ),
                  }}>
                  {message.structuredData.answer}
                </ReactMarkdown>
              </div>
              <p className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          )}

        {/* Handle CourseTutorResponse - structured teaching content */}
        {message.structuredData &&
          isCourseTutorResponse(message.structuredData) && (
            <div className="flex flex-col gap-2">
              <div className="chat-bubble ai">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={14} className="text-accent" />
                  <span className="text-xs font-semibold text-accent">
                    AI Tutor
                  </span>
                </div>
                <p className="text-sm">
                  Let's start with the foundation of{" "}
                  {message.structuredData.topic.toLowerCase()}. Read through the
                  breakdown below — then feel free to ask me anything.
                </p>
              </div>
              <TeachingResponseCard data={message.structuredData} />
              <p className="text-xs text-muted ml-1">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          )}

        {/* Fallback for plain content (if neither structured data exists) */}
        {!message.structuredData && message.content && (
          <div className="chat-bubble ai">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-accent" />
              <span className="text-xs font-semibold text-accent">
                AI Tutor
              </span>
            </div>
            <p className="whitespace-pre-wrap leading-relaxed">
              {message.content}
            </p>
            <p className="text-xs opacity-70 mt-2">
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
