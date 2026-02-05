import Button from "@/components/Button";
import type { Message } from "@/routes/tutor/$topicId";
import { Download } from "lucide-react";

const RightTutorHeaderDiv = ({ messages }: { messages?: Message }) => {
  console.log(messages);
  function exportChat(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={exportChat}>
        <Download size={16} className="mr-1" />
        Export
      </Button>
      <Button variant="neutral" size="sm">
        End Session
      </Button>
    </div>
  );
};

export default RightTutorHeaderDiv;
