import * as React from "react"
import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const animatedButtonVariants = cva(
  "relative inline-flex items-center overflow-hidden font-medium transition-all duration-400 disabled:pointer-events-none disabled:opacity-50 group",
  {
    variants: {
      variant: {
        default:
          "text-primary border-2 border-primary hover:text-white hover:bg-gray-50",
        primary:
          "text-white bg-primary border-2 border-primary hover:bg-primary/90",
        outline:
          "text-primary border-2 border-primary hover:text-white",
        ghost:
          "text-primary border-2 border-transparent hover:text-white hover:border-primary",
      },
      size: {
        default: "px-6 py-2.5 text-base rounded-lg",
        sm: "px-4 py-2 text-sm rounded-md",
        lg: "px-8 py-2.5 text-lg rounded-full",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface AnimatedButtonProps
  extends Omit<React.ComponentProps<"button">, "href">,
    VariantProps<typeof animatedButtonVariants> {
  href?: string
  hideArrow?: boolean
  icon?: React.ReactNode
}

function AnimatedButton({
  className,
  variant,
  size,
  href,
  hideArrow = false,
  icon,
  children,
  ...props
}: AnimatedButtonProps) {
  // Determine if this should show arrow based on size
  const showArrow = !hideArrow && size !== "icon"

  const buttonClassName = cn(animatedButtonVariants({ variant, size, className }))

  const content = (
    <>
      {/* Animated background fill - bounces up from bottom */}
      <span className="absolute left-0 block w-full h-0 transition-all bg-primary opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease" />

      {/* Arrow icon that slides in from right */}
      {showArrow && (
        <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
          {icon || <ArrowRight className="w-5 h-5" strokeWidth={2} />}
        </span>
      )}

      {/* Content with text shift on hover */}
      <span className={cn(
        "relative transition-all duration-400",
        showArrow && "pr-6"
      )}>
        {children}
      </span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={buttonClassName}>
        {content}
      </Link>
    )
  }

  return (
    <button className={buttonClassName} {...props}>
      {content}
    </button>
  )
}

export { AnimatedButton, animatedButtonVariants }
