import { useCallback, useRef, useState } from "react"

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
  buttonText: HTMLSpanElement | null
}

interface News {}

export function News() {
  const formRef = useRef<FormRef>({
    buttonText: null,
  })

  const handleSelectChange = useCallback(() => {
    console.log(formRef.current.buttonText?.innerText)
  }, [])
  return (
    <div className="flex 2xl:w-full w-[350px] flex-col items-center gap-2">
      <p className="font-bold">Noticia #</p>
      <Input
        className="w-full"
        type="text"
        placeholder="Ingresa el link de la noticia"
      />
      <Input
        className="w-full"
        type="text"
        placeholder="Ingresa el título de la noticia"
      />
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger>
          <SelectValue
            id="buttonText"
            ref={(el) => (formRef.current.buttonText = el as HTMLSpanElement)}
            placeholder="Escoge el texto del botón"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="brasil">Ver aquí</SelectItem>
            <SelectItem value="peru">Conoce más</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={() => console.log("hello")}>Guardar datos</Button>
    </div>
  )
}
