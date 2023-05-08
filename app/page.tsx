"use client"

import { useCallback, useMemo, useRef, useState } from "react"

import { footers, headers, rows } from "@/lib/templates"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FormRef {
  country: HTMLSpanElement | null
}

interface Props {}

interface State {
  selectedCountry: string
}

export default function Page(props: Props) {
  const formRef = useRef<FormRef>({
    country: null,
  })

  const [selectedCountry, setSelectedCountry] =
    useState<State["selectedCountry"]>("")

  const handleSelectChange = useCallback(() => {
    const value = formRef.current.country?.innerText
    setSelectedCountry(value || "")
  }, [])

  const generatedTemplate = useMemo(() => {
    const template =
      selectedCountry === "Brasil."
        ? headers.brasil + rows.even + footers.brasil
        : selectedCountry === "Perú."
        ? headers.peru + rows.even + footers.peru
        : selectedCountry === "Colombia."
        ? headers.colombia + rows.even + footers.colombia
        : ""

    return template
  }, [selectedCountry])

  return (
    <main className="container grid 2xl:grid-cols-2 items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="sm:w-[350px] mx-auto">
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue
              id="country"
              ref={(el) => (formRef.current.country = el as HTMLSpanElement)}
              placeholder="País del mailing"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="brasil">Brasil.</SelectItem>
              <SelectItem value="peru">Perú.</SelectItem>
              <SelectItem value="colombia">Colombia.</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div dangerouslySetInnerHTML={{ __html: generatedTemplate }} />
    </main>
  )
}
