"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="items-center hidden space-x-2 md:flex">
        <Avatar>
          <AvatarFallback className="bg-[#6cb33e] font-bold text-white">
            IN
          </AvatarFallback>
        </Avatar>
        <span className="hidden text-[#6cb33e] font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Mailing
        </Link>
        <Link
          href="/imagenes"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/imagenes")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Imágenes
        </Link>
      </nav>
    </div>
  )
}
