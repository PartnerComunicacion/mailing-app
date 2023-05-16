"use client"

import * as React from "react"
import { useCallback, useMemo, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  const [selectedImage, setSelectedImage] = useState("mirada-en-el-cliente")
  const [pickedImage, setPickedImage] = useState<string | undefined>("")

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
      <div className="w-[285px] flex flex-col gap-4">
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
        <div className="w-[285px] h-[214px] border border-1 border-black relative">
          <img
            src={pickedImage}
            className="z-10 object-contain max-w-full max-h-full"
          />
          <img
            src={`/${selectedImage}.png`}
            className="absolute top-0 left-0 z-20 object-contain max-w-full max-h-full"
          />
        </div>
        <Input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              const file = e.target.files[0]
              const reader = new FileReader()
              reader.onloadend = () => {
                setPickedImage(reader.result?.toString())
              }
              reader.readAsDataURL(file)
            } else {
              setPickedImage("")
            }
          }}
          accept="image/*"
        />
      </div>
    </main>
  )
}
