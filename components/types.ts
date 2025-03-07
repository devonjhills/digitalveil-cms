// types.ts - Type definitions for OstMarkdown components

import React from "react";

export interface BottomBannerCTAProps {
  text: string;
  link: string;
  onClose: () => void;
}

export interface OstMarkdownProps {
  content: string;
  className?: string;
  bottomCtaText?: string;
  bottomCtaLink?: string;
  bottomCtaDelay?: number;
}

export interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export interface LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}
