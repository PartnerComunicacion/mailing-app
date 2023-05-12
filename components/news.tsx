import { useCallback, useRef, useState } from "react";



import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";





interface FormRef {
  buttonText: HTMLSpanElement | null
}

interface News {
  number: number
  type: string
  onTitleChange: (title: string) => void
  onLinkChange: (link: string) => void
  onCallToActionChange: (callToAction: string) => void
}

export function News({
  type,
  number,
  onTitleChange,
  onLinkChange,
  onCallToActionChange,
}: News) {
  const formRef = useRef<FormRef>({
    buttonText: null,
  })
  const [newsTitle, setNewsTitle] = useState("")
  const [newsLink, setNewsLink] = useState("")
  const [newsCallToAction, setNewsCallToAction] = useState("")

  const handleSelectChange = useCallback(() => {
    // console.log(formRef.current.buttonText?.innerText)
    onCallToActionChange(formRef.current.buttonText?.innerText || "")
  }, [])

  return (
    <div className="flex 2xl:w-[250px] w-[350px] flex-col items-center gap-2">
      <p className="font-bold">
        Noticia {type} {number + 1}
      </p>
      <Input
        className="w-full"
        type="text"
        placeholder="Ingresa el link de la noticia"
        value={newsLink}
        onChange={(e) => {
          setNewsLink(e.target.value)
          onLinkChange(e.target.value) // llamar a la función del padre con el nuevo valor del link
        }}
      />
      <Input
        className="w-full"
        type="text"
        placeholder="Ingresa el título de la noticia"
        value={newsTitle} // agregar el valor del título
        onChange={(e) => {
          setNewsTitle(e.target.value)
          onTitleChange(e.target.value)
        }} // actualizar el valor del título al cambiar
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
            <SelectItem value="Ver aquí">Ver aquí</SelectItem>
            <SelectItem value="Conoce más">Conoce más</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}