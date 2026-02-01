import { type ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Reusable Modal component.
 * - Closes on ESC key
 * - Closes on backdrop click
 */
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 lg:px-6 z-50"
      onClick={onClose} // backdrop click
      role="dialog"
      aria-modal="true">
      <div
        className="bg-white rounded-lg w-full max-w-4xl relative max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-sm md:text-base z-20 text-gray-400 hover:text-gray-600"
          aria-label="Close modal">
          <X className="size-4 xl:size-6 2xl:size-8 text-black" />
        </button>

        {children}
      </div>
    </div>
  );
}
