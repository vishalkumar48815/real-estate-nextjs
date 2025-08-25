import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const ChatHeader = () => (
  <div className="flex items-center justify-between px-4 py-2 border-b">
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback>SD</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">Sofia Davis</p>
        <p className="text-xs text-muted-foreground">m@example.com</p>
      </div>
    </div>
    <button className="text-xl font-bold rounded-full w-6 h-6 flex items-center justify-center border">
      +
    </button>
  </div>
);
