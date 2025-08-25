import { cn } from "@/lib/utils";

type ChatMessageProps = {
  message: string;
  fromUser?: boolean;
};

export const ChatMessage = ({ message, fromUser = false }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "max-w-sm px-4 py-2 rounded-lg text-sm mb-2",
        fromUser
          ? "bg-black text-white self-end"
          : "bg-muted text-foreground self-start"
      )}
    >
      {message}
    </div>
  );
};
