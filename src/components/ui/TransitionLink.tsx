'use client';

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type TransitionLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps;

// Global resolver tracker to communicate between TransitionLink and the pathname listener
let pendingResolve: (() => void) | null = null;

if (typeof window !== "undefined") {
  (window as any).__resolveViewTransition = () => {
    if (pendingResolve) {
      pendingResolve();
      pendingResolve = null;
    }
  };
}

export default function TransitionLink({
  href,
  children,
  className,
  id,
  style,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    const documentWithTransition = document as any;

    if (typeof window !== "undefined" && "startViewTransition" in document) {
      e.preventDefault();

      if (pendingResolve) {
        pendingResolve();
      }

      documentWithTransition.startViewTransition(() => {
        return new Promise<void>((resolve) => {
          pendingResolve = resolve;

          // Fallback timeout in case navigation doesn't change pathname
          const timeoutId = setTimeout(() => {
            if (pendingResolve === resolve) {
              resolve();
              pendingResolve = null;
            }
          }, 1500);

          startTransition(() => {
            router.push(href.toString());
          });
        });
      });
    }
  };

  return (
    <Link
      href={href}
      className={className}
      id={id}
      style={style}
      onClick={handleTransition}
      {...props}
    >
      {children}
    </Link>
  );
}
