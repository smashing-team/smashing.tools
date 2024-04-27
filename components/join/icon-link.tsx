import { cn } from "@/utils/cn";
import Link from "next/link";

export function IconLink({
  children,
  className,
  compact = false,
  icon: Icon,
  ...props
}: React.ComponentProps<typeof Link> & {
  compact?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      {...props}
      className={cn(
        className,
        "group relative isolate flex items-center rounded-full px-2 py-0.5 text-[0.8125rem]/6 font-medium text-white/30 transition-colors hover:text-yellow-300",
        compact ? "gap-x-2" : "gap-x-3"
      )}
    >
      <span className="absolute inset-0 -z-10 scale-75 rounded-full bg-white/5 opacity-0 transition group-hover:scale-100 group-hover:opacity-100" />
      {Icon && <Icon className="size-4 flex-none" />}
      <span className="self-baseline text-white">{children}</span>
    </Link>
  );
}
