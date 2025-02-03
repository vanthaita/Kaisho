import { cn } from "@/lib/utils";

export function Loader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <div className="relative flex h-12 w-12 items-center justify-center">
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-lime-400 border-t-transparent border-l-transparent"></div>
        <div className="h-8 w-8 rounded-full bg-lime-400/30"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}