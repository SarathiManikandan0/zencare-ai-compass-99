
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  sender: "user" | "ai";
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
  return (
    <div
      className={cn(
        "p-3 my-2 rounded-lg max-w-[75%]",
        sender === "user"
          ? "ml-auto mr-2 bg-gray-700 text-white"
          : "ml-2 mr-auto bg-gray-100 text-black"
      )}
    >
      {message}
    </div>
  );
};

export default ChatMessage;
