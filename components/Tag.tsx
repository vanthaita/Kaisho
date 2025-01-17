import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import React from "react";
interface TagProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode; 
}

export default function Tag(props: TagProps) {
    const {className, children, ...otherProps} = props
    return (
        <div  className={twMerge("inline-block border border-lime-400 gap-2 text-lime-400 px-3 py-1 rounded-full uppercase items-center", className)} {...otherProps}>
            <span>✶</span>
            <span className="text-sm">{children}</span>
        </div>
    )
}