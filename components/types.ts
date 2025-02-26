// types.ts - Type definitions for OstMarkdown components

import React from "react";

export type HeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export type LinkProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

export type ListItemProps = {
  children: React.ReactNode;
  className?: string;
};

export type BlockquoteProps = {
  children: React.ReactNode;
  className?: string;
};

export type TableProps = {
  children: React.ReactNode;
  className?: string;
};

export type ImageProps = {
  src: string;
  alt?: string;
  className?: string;
};

export type JohnsonBoxProps = {
  children: React.ReactNode;
  title?: string;
};

export type ProductCardProps = {
  children: React.ReactNode;
  title?: string;
  badge?: string;
};

export type CTAButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
} & (
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.AnchorHTMLAttributes<HTMLAnchorElement>
);

export type HighlightProps = {
  children: React.ReactNode;
  title?: string;
};

export type CalloutBoxProps = {
  children: React.ReactNode;
  type?: "info" | "warning" | "success" | "error";
};

export type BottomBannerCTAProps = {
  text: string;
  link: string;
  onClose: () => void;
};

export type OstMarkdownProps = {
  content: string;
  className?: string;
  bottomCtaText?: string;
  bottomCtaLink?: string;
  bottomCtaDelay?: number;
};