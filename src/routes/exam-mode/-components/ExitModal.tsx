import Button from "@/components/Button";
import Card from "@/components/Card";
import { useModal } from "@/context/ModalContext";


const ExitModal = () => {
  const { close } = useModal();

  const handleExit = () => {
    console.log("Exit exam");
    close();
    // navigate away if needed
  };

  return (
    <Card className="w-full">
      <h3 className="text-xl font-semibold text-foreground mb-2">Exit Exam?</h3>

      <p className="text-muted mb-6">
        Your progress will be saved. You can continue this exam later.
      </p>

      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={close}>
          Cancel
        </Button>

        <Button variant="danger" className="flex-1" onClick={handleExit}>
          Exit
        </Button>
      </div>
    </Card>
  );
};

export default ExitModal;
