"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function MainNav() {
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
    </div>
  )
}