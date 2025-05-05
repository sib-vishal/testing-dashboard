import React, { forwardRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function ChatInput({ className, ...props }, ref) {
  return (
    <Textarea
      autoComplete="off"
      ref={ref}
      name="message"
      className={cn(
        "px-4 py-3 max-h-40 h-full bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md flex items-center resize-none",
        className
      )}
      {...props}
    />
  );
}

const ForwardedChatInput = forwardRef(ChatInput);
ForwardedChatInput.displayName = "ChatInput";

export { ForwardedChatInput as ChatInput };
