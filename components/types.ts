import { ReactNode } from "react";
import { ButtonProps } from "./ui/button";

export interface HeadingProps {
    children: ReactNode;
    id?: string;
    className?: string;
  }
  
  export interface LinkProps {
    children: ReactNode;
    href?: string;
    className?: string;
    target?: string;
    rel?: string;
  }
  
  export interface ListItemProps {
    children: ReactNode;
    className?: string;
  }
  
  export interface PreProps {
    children: ReactNode;
    className?: string;
  }
  
  export interface BlockquoteProps {
    children: ReactNode;
    className?: string;
  }
  
  export interface TableProps {
    children: ReactNode;
    className?: string;
  }
  
  export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    alt?: string;
  }
  
  export interface JohnsonBoxProps {
    children: ReactNode;
    title?: string;
  }
  
  export interface ProductCardProps {
    children: ReactNode;
    title?: string;
    badge?: string;
  }
  
  export interface CTAButtonProps extends Omit<ButtonProps, 'variant'> {
    href?: string;
    children: ReactNode;
    variant?: "default" | "secondary" | "outline" | "ghost";
  }
  
  export interface HighlightProps {
    children: ReactNode;
    title?: string;
  }
  
  export interface CardHeaderProps {
    children: ReactNode;
    subtitle?: string;
  }
  
  export interface CardFooterProps {
    children: ReactNode;
    url?: string;
  }
  
  export interface CalloutBoxProps {
    children: ReactNode;
    type?: "info" | "warning" | "success" | "error";
  }
  
  export interface ImageGalleryProps {
    images: { src: string; alt?: string }[];
  }

  export interface OstMarkdownProps {
    content: string;
    className?: string;
    bottomCtaText?: string;
    bottomCtaLink?: string;
    bottomCtaDelay?: number; // in milliseconds
  }
  
  export interface BottomBannerCTAProps {
    text: string;
    link: string;
    onClose: () => void;
  }