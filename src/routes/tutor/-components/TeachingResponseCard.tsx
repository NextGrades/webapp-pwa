import type { CourseTutorResponse } from "@/common/types/course.types";
import { ChevronUp, ChevronDown, Check, Copy } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export function TeachingResponseCard({ data }: { data: CourseTutorResponse }) {
  const [expandedSections, setExpandedSections] = useState({
    examples: true,
    applications: true,
  });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const copyExample = async (example: string, index: number) => {
    await navigator.clipboard.writeText(example);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="border border-border rounded-lg bg-surface-elevated overflow-hidden">
      {/* Header */}
      <div className="bg-accent/5 border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">
              {data.courseCode}: {data.courseTitle}
            </h3>
            <p className="text-sm text-muted mt-0.5">{data.topic}</p>
          </div>
          {data.level && (
            <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
              Level {data.level}
            </span>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Explanation with Markdown */}
        <div>
          <h4 className="font-medium text-foreground mb-2 text-sm">
            Explanation
          </h4>
          <div className="prose prose-sm prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-xl font-bold text-foreground mt-4 mb-2"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-lg font-semibold text-foreground mt-4 mb-2"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-base font-semibold text-foreground mt-3 mb-2"
                    {...props}
                  />
                ),
                h4: ({ node, ...props }) => (
                  <h4
                    className="text-sm font-semibold text-foreground mt-2 mb-1"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="text-foreground/90 leading-relaxed mb-3 text-sm"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-none space-y-2 my-3" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="flex items-start gap-2 text-sm text-foreground/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span {...props} />
                  </li>
                ),
                strong: ({ node, ...props }) => (
                  <strong
                    className="font-semibold text-foreground"
                    {...props}
                  />
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
              }}>
              {data.explanation}
            </ReactMarkdown>
          </div>
        </div>

        {/* Key Concepts */}
        <div>
          <h4 className="font-medium text-foreground mb-2 text-sm">
            Key Concepts
          </h4>
          <div className="space-y-2">
            {data.keyConcepts.map((concept, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-foreground/90">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    p: ({ node, ...props }) => <span {...props} />,
                    strong: ({ node, ...props }) => (
                      <strong
                        className="font-semibold text-foreground"
                        {...props}
                      />
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
                  }}>
                  {concept}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>

        {/* Worked Examples - Collapsible with Markdown */}
        {data.workedExamples.length > 0 && (
          <div className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection("examples")}
              className="w-full px-4 py-3 bg-surface hover:bg-surface-elevated flex items-center justify-between transition-colors">
              <span className="font-medium text-sm text-foreground">
                Worked Examples ({data.workedExamples.length})
              </span>
              {expandedSections.examples ? (
                <ChevronUp size={16} className="text-muted" />
              ) : (
                <ChevronDown size={16} className="text-muted" />
              )}
            </button>

            {expandedSections.examples && (
              <div className="p-4 space-y-3 bg-surface">
                {data.workedExamples.map((example, i) => (
                  <div
                    key={i}
                    className="bg-background border border-border rounded-lg p-4 relative group">
                    <button
                      onClick={() => copyExample(example, i)}
                      className="absolute top-3 right-3 p-1.5 bg-surface hover:bg-surface-elevated rounded transition-colors opacity-0 group-hover:opacity-100 z-10">
                      {copiedIndex === i ? (
                        <Check size={14} className="text-green-500" />
                      ) : (
                        <Copy size={14} className="text-muted" />
                      )}
                    </button>
                    <div className="prose prose-sm prose-slate dark:prose-invert max-w-none pr-10">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                          h1: ({ node, ...props }) => (
                            <h1
                              className="text-base font-bold text-foreground mt-2 mb-2"
                              {...props}
                            />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2
                              className="text-sm font-semibold text-foreground mt-2 mb-1"
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
                              className="text-foreground/90 leading-relaxed mb-2 text-sm"
                              {...props}
                            />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul
                              className="list-none space-y-1.5 my-2 ml-2"
                              {...props}
                            />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="flex items-start gap-2 text-sm text-foreground/90">
                              <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                              <span {...props} />
                            </li>
                          ),
                          strong: ({ node, ...props }) => (
                            <strong
                              className="font-semibold text-foreground"
                              {...props}
                            />
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
                        }}>
                        {example}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Practical Applications with Markdown */}
        {data.practicalApplications.length > 0 && (
          <div className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection("applications")}
              className="w-full px-4 py-3 bg-surface hover:bg-surface-elevated flex items-center justify-between transition-colors">
              <span className="font-medium text-sm text-foreground">
                Practical Applications
              </span>
              {expandedSections.applications ? (
                <ChevronUp size={16} className="text-muted" />
              ) : (
                <ChevronDown size={16} className="text-muted" />
              )}
            </button>

            {expandedSections.applications && (
              <div className="p-4 space-y-3 bg-surface">
                {data.practicalApplications.map((app, i) => (
                  <div
                    key={i}
                    className="prose prose-sm prose-slate dark:prose-invert max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                      components={{
                        p: ({ node, ...props }) => (
                          <p
                            className="text-foreground/90 leading-relaxed text-sm mb-2"
                            {...props}
                          />
                        ),
                        strong: ({ node, ...props }) => (
                          <strong
                            className="font-semibold text-foreground"
                            {...props}
                          />
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
                      }}>
                      {app}
                    </ReactMarkdown>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Syllabus Coverage Footer */}
        <div className="pt-3 border-t border-border">
          <div className="flex items-start gap-2 mb-2">
            <span className="text-xs font-medium text-muted">
              Syllabus Reference:
            </span>
            <span className="text-xs text-foreground/80">
              {data.syllabusReference}
            </span>
          </div>
          {data.syllabusCoverage.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {data.syllabusCoverage.map((item, i) => (
                <span
                  key={i}
                  className="inline-block bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded text-xs">
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
