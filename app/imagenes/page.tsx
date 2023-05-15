"use client"

import * as React from "react"
import { useCallback, useMemo, useRef, useState } from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FormRef {
  editorial: HTMLSpanElement | null
}

export default function Page() {
  const formRef = useRef<FormRef>({
    editorial: null,
  })
  const [selectedImage, setSelectedImage] = useState("")

  const handleSelectChange = useCallback(() => {
    const value = formRef.current.editorial?.innerText

    setSelectedImage(
      value === "Marcamos la diferencia."
        ? "marcamos-la-diferencia"
        : value === "Con la mirada en el cliente."
        ? "mirada-en-el-cliente"
        : value === "Estrategia y resultados."
        ? "estrategia-resultados"
        : value === "Next level."
        ? "next-level"
        : "carrera"
    )
  }, [])

  return (
    <main className="container flex items-center justify-center h-screen">
      <div className="w-[285px]">
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue
              id="editorial"
              ref={(el) => (formRef.current.editorial = el as HTMLSpanElement)}
              placeholder="Editorial"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="marcamos-la-diferencia">
                Marcamos la diferencia.
              </SelectItem>
              <SelectItem value="mirada-en-el-cliente">
                Con la mirada en el cliente.
              </SelectItem>
              <SelectItem value="estrategia-resultados">
                Estrategia y resultados.
              </SelectItem>
              <SelectItem value="next-level">Next level.</SelectItem>
              <SelectItem value="carrera">Carrera.com.</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="w-[285px] h-[214px] border border-1 border-black mt-4">
          <img
            src={`/${selectedImage}.png`}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </main>
  )
}
