'use client';

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useTransition } from "react";

type TransitionLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps;

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
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const documentWithTransition = document as unknown as {
      startViewTransition: (callback: () => Promise<void> | void) => {
        ready: Promise<void>;
        finished: Promise<void>;
        updateCallbackDone: Promise<void>;
      };
    };

    if (typeof window !== "undefined" && "startViewTransition" in document) {
      e.preventDefault();
      documentWithTransition.startViewTransition(() => {
        return new Promise<void>((resolve) => {
          startTransition(() => {
            router.push(href.toString());
            // Yield back to browser main loop so Next has a moment to render the layout shift
            setTimeout(resolve, 80);
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
