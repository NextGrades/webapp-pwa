import Modal from "@/components/Modal";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";


type ModalContextType = {
  open: (content: ReactNode) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

interface ModalProviderProps {
  children: ReactNode;
}

/**
 * Reusable Modal component.
 */
export function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const open = useCallback((children: ReactNode) => {
    setContent(children);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setContent(null);
  }, []);

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
      <Modal isOpen={isOpen} onClose={close}>
        {content}
      </Modal>
    </ModalContext.Provider>
  );
}

/**
 * Custom hook to control the global modal.
 *
 * @throws {Error} If used outside of a ModalProvider.
 */
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
