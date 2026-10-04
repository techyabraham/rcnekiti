import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type SharedProps = { children: ReactNode; variant?: "primary" | "secondary" | "quiet"; className?: string };
type LinkButtonProps = SharedProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { children, variant = "primary", className = "", ...rest } = props;
  const classes = `button button--${variant} ${className}`.trim();
  if ("href" in props && props.href) {
    const { href, target, rel, ...anchorProps } = rest as Omit<LinkButtonProps, keyof SharedProps>;
    const isExternal = href.startsWith("https://") || href.startsWith("http://") || href.startsWith("tel:");
    const safeTarget = target ?? (isExternal ? "_blank" : undefined);
    const safeRel = rel ?? (safeTarget === "_blank" ? "noopener noreferrer" : undefined);
    if (isExternal) return <a className={classes} href={href} target={safeTarget} rel={safeRel} {...anchorProps}>{children}</a>;
    return <Link className={classes} href={href} {...anchorProps}>{children}</Link>;
  }
  return <button className={classes} {...(rest as Omit<NativeButtonProps, keyof SharedProps>)}>{children}</button>;
}
