import React, { forwardRef, Children, isValidElement, cloneElement } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import MessageLoading from "./message-loading";
import { Button } from "@/components/ui/button";

// ChatBubble
const chatBubbleVariant = cva("flex gap-2 max-w-[60%] items-end relative group", {
  variants: {
    variant: {
      received: "self-start",
      sent: "self-end flex-row-reverse",
    },
    layout: {
      default: "",
      ai: "max-w-full w-full items-center",
    },
  },
  defaultVariants: {
    variant: "received",
    layout: "default",
  },
});

const ChatBubble = forwardRef(function ChatBubble({ className, variant, layout, children, ...props }, ref) {
  return (
    <div
      className={cn(chatBubbleVariant({ variant, layout, className }), "relative group")}
      ref={ref}
      {...props}
    >
      {Children.map(children, (child) =>
        isValidElement(child) && typeof child.type !== "string"
          ? cloneElement(child, { variant, layout })
          : child
      )}
    </div>
  );
});

// ChatBubbleAvatar
function ChatBubbleAvatar({ src, fallback, className }) {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt="Avatar" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}

// ChatBubbleMessage
const chatBubbleMessageVariants = cva("p-4", {
  variants: {
    variant: {
      received: "bg-secondary text-secondary-foreground rounded-r-lg rounded-tl-lg",
      sent: "bg-primary text-primary-foreground rounded-l-lg rounded-tr-lg",
    },
    layout: {
      default: "",
      ai: "border-t w-full rounded-none bg-transparent",
    },
  },
  defaultVariants: {
    variant: "received",
    layout: "default",
  },
});

const ChatBubbleMessage = forwardRef(function ChatBubbleMessage(
  { className, variant, layout, isLoading = false, children, ...props },
  ref
) {
  return (
    <div
      className={cn(
        chatBubbleMessageVariants({ variant, layout, className }),
        "break-words max-w-full whitespace-pre-wrap"
      )}
      ref={ref}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <MessageLoading />
        </div>
      ) : (
        children
      )}
    </div>
  );
});

// ChatBubbleTimestamp
function ChatBubbleTimestamp({ timestamp, className, ...props }) {
  return (
    <div className={cn("text-xs mt-2 text-right", className)} {...props}>
      {timestamp}
    </div>
  );
}

// ChatBubbleAction
function ChatBubbleAction({ icon, onClick, className, variant = "ghost", size = "icon", ...props }) {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={onClick}
      {...props}
    >
      {icon}
    </Button>
  );
}

// ChatBubbleActionWrapper
const ChatBubbleActionWrapper = forwardRef(function ChatBubbleActionWrapper(
  { variant, className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 flex opacity-0 group-hover:opacity-100 transition-opacity duration-200",
        variant === "sent"
          ? "-left-1 -translate-x-full flex-row-reverse"
          : "-right-1 translate-x-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
  chatBubbleVariant,
  chatBubbleMessageVariants,
  ChatBubbleAction,
  ChatBubbleActionWrapper,
};