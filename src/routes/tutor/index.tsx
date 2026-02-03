import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Send, Lock } from "lucide-react";

import Button from "@/components/Button";
import Input from "@/components/Input";
import CenterTutorHeaderDiv from "@/routes/tutor/-components/CenterTutorHeaderDiv";
import RightTutorHeaderDiv from "@/routes/tutor/-components/RightTutorHeaderDiv";
import {
  LoadingState,
  MessageBubble,
  UnlockNudge,
} from "@/routes/tutor/-components/Utilities";
import { courseClient } from "@/common/api/course/client";
import type {
  CourseTutorResponse,
  FollowUpAIResponse,
} from "@/common/types/course.types";
import { GenericErrorComponent } from "@/components/GenericErrorComponent";

// ─── Route ────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/tutor/")({
  staticData: {
    header: {
      right: <RightTutorHeaderDiv />,
      center: <CenterTutorHeaderDiv />,
    },
    showHeader: true,
  },
  component: MiniTutorPage,
});

// ─── Types ─────────────────────────────────────────────────────────────────

export interface Message {
  id: string;
  role: "user" | "ai";
  content?: string;
  /**
   * structuredData is intentionally a discriminated union:
   * - CourseTutorResponse: initial teaching payload (one‑time)
   * - FollowUpAIResponse: follow‑up answers during chat phase
   */
  structuredData?: CourseTutorResponse | FollowUpAIResponse;
  timestamp: Date;
}

type SessionPhase = "loading" | "teaching" | "chat" | "error";

// ─── Helpers ───────────────────────────────────────────────────────────────

function generateFollowUps(data: CourseTutorResponse): string[] {
  const pills: string[] = [];

  pills.push("Can you explain that in simpler terms?");

  if (data.workedExamples?.length > 0) {
    pills.push("Walk me through the first example step by step");
  }

  if (data.keyConcepts?.length > 0) {
    pills.push("Which of these concepts is the hardest to master?");
  }

  pills.push(`Quiz me on ${data.topic}`);

  return pills;
}

// ─── Page ──────────────────────────────────────────────────────────────────

function MiniTutorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [topic, setTopic] = useState("");
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<SessionPhase>("loading");
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ─── Generate teaching job ──────────────────────────────────────────────

  const generateTeachingMutation = useMutation({
    mutationFn: () =>
      courseClient.generateTeachingContent({
        topicId: "64f572ac-03e3-42d2-b81e-0baf063738b7",
        userId: "dummy-user-id",
      }),
    onSuccess: (res) => {
      setConversationId(res.data.conversationId);
    },
    onError: (error) => {
      console.log(error);
      setPhase("error");
    },
  });

  const jobId = generateTeachingMutation.data?.data.jobId;

  // ─── Poll worker job (typed, declarative) ───────────────────────────────
  const POLLING_DELAY = 15_000;
  const POLLING_INTERVAL = 2_000;

  const jobQuery = useQuery({
    enabled: Boolean(jobId),
    queryKey: ["teaching-job", jobId],
    queryFn: () => courseClient.getJobData(jobId!),
    retry: false,
    refetchInterval: (query) => {
      const hasData = Boolean(query.state.data);

      if (hasData) return false;

      const timeSinceFirstFetch =
        Date.now() - (query.state.dataUpdatedAt || Date.now());

      // Wait 15s before polling starts
      if (timeSinceFirstFetch < POLLING_DELAY) {
        return POLLING_DELAY - timeSinceFirstFetch;
      }

      return POLLING_INTERVAL;
    },
  });

  // ─── React to job query errors ──────────────────────────────────────────
  // FIX: Move error handling to useEffect to prevent render-time state updates
  useEffect(() => {
    if (jobQuery.isError) {
      setPhase("error");
    }
  }, [jobQuery.isError]);

  // ─── React to job completion ────────────────────────────────────────────

  useEffect(() => {
    if (!jobQuery.data?.data.courseTitle) return;

    const lesson = jobQuery.data.data;

    setMessages([
      {
        id: "initial-teaching",
        role: "ai",
        structuredData: lesson,
        timestamp: new Date(),
      },
    ]);

    setTopic(lesson.topic);
    setFollowUps(generateFollowUps(lesson));
    setPhase("teaching");
  }, [jobQuery.data?.data]);

  // ─── Follow-up mutation ─────────────────────────────────────────────────

  const followUpMutation = useMutation({
    mutationFn: (question: string) =>
      courseClient.askFollowUpQuestion({
        question,
        conversationId: conversationId!,
        userId: "dummy-user-id",
      }),
    onMutate: () => {
      setIsTyping(true);
    },
    onSuccess: (res) => {
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "ai",
        structuredData: res.data, // FollowUpAIResponse
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    },
    onError: () => {
      setIsTyping(false);
    },
  });

  // ─── Effects ─────────────────────────────────────────────────────────────

  useEffect(() => {
    generateTeachingMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, phase, isTyping]);

  useEffect(() => {
    if (phase === "teaching") {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // ─── Derived UI state ────────────────────────────────────────────────────

  const isGenerating =
    generateTeachingMutation.isPending || jobQuery.isFetching;

  const isInputLocked = phase === "loading" || isGenerating;

  const teachingData = messages.find((m) => m.structuredData)
    ?.structuredData as CourseTutorResponse | undefined;

  // ─── Send message ────────────────────────────────────────────────────────

  const sendMessage = useCallback(
    (content: string) => {
      if (!content.trim() || isInputLocked || !conversationId) return;

      if (phase === "teaching") setPhase("chat");

      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      followUpMutation.mutate(content.trim());
    },
    [isInputLocked, phase, conversationId, followUpMutation],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickAction = useCallback(
    (action: string) => {
      sendMessage(action);
    },
    [sendMessage],
  );

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="container max-w-4xl py-6">
          <div className="space-y-4">
            {phase === "loading" && <LoadingState topic={topic} />}
            {phase === "error" && generateTeachingMutation.isError && (
              <GenericErrorComponent
                error={generateTeachingMutation.error}
                onRetry={() => generateTeachingMutation.mutate()}
              />
            )}

            {phase === "error" && jobQuery.isError && (
              <GenericErrorComponent
                error={jobQuery.error}
                onRetry={() => jobQuery.refetch()}
              />
            )}

            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="chat-bubble ai">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-accent rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 bg-accent rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                    <span className="text-sm text-muted ml-2">
                      AI is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}

            {phase === "teaching" && teachingData && (
              <div className="flex flex-col gap-3">
                <UnlockNudge topic={topic} />
                <p className="text-sm text-muted">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  {followUps.map((pill, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickAction(pill)}
                      className="px-4 py-2 bg-surface-elevated hover:bg-primary/5 border border-border hover:border-primary rounded-lg text-sm text-foreground transition-all">
                      {pill}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <div className="bg-surface border-t border-border sticky bottom-0">
        <div className="container max-w-4xl py-4">
          {isInputLocked && (
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Lock size={12} className="text-muted" />
              <p className="text-xs text-muted">
                Read the lesson first — your input will unlock shortly
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="flex-1">
              <Input
                ref={inputRef}
                type="text"
                placeholder={
                  isInputLocked
                    ? "Waiting for your lesson…"
                    : teachingData
                      ? `Ask me anything about ${topic}…`
                      : "Ask a question or request help..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isInputLocked || followUpMutation.isPending}
                className="w-full"
              />
            </div>
            <Button
              type="submit"
              disabled={!input.trim() || isInputLocked || isTyping}
              size="md">
              <Send size={20} />
            </Button>
          </form>

          <p className="text-xs text-muted mt-2 text-center">
            The AI tutor provides explanations but won't complete assignments
            for you
          </p>
        </div>
      </div>
    </div>
  );
}

export default MiniTutorPage;
