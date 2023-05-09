"use client"

import * as React from "react"
import { useCallback, useMemo, useRef, useState } from "react"

import { footers, headers, rows } from "@/lib/templates"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePicker } from "@/components/date-picker"
import { NewsCounter } from "@/components/news-counter"

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

  const [nationalCount, setNationalCount] = useState<number>(0);
const [southAmericaCount, setSouthAmericaCount] = useState<number>(0);
  const [date, setDate] = useState<Date>()
  const [selectedCountry, setSelectedCountry] =
    useState<State["selectedCountry"]>("")

  const handleSelectChange = useCallback(() => {
    const value = formRef.current.country?.innerText
    setSelectedCountry(value || "")
  }, [])

  const generatedTemplate = useMemo(() => {
    const totalNews = nationalCount + southAmericaCount;
    const evenRows = Math.floor(totalNews / 2);
    const oddRows = Math.ceil((totalNews % 4) / 2);
  
    let allRows = "";
  
    for (let i = 0; i < evenRows; i++) {
      allRows += rows.even ;
    }
  
    for (let i = 0; i < oddRows; i++) {
      allRows += rows.odd ;
    }
  
    if (totalNews % 2 !== 0) {
      allRows += rows.odd;
    }
  
    const template =
      selectedCountry === "Brasil."
        ? headers.brasil + allRows+ footers.brasil
        : selectedCountry === "Perú."
        ? headers.peru +allRows+ footers.peru
        : selectedCountry === "Colombia."
        ? headers.colombia +allRows+ footers.colombia
        : "";
    
    return template;
  }, [selectedCountry, nationalCount, southAmericaCount]);
  
  function downloadTemplate() {
    const countryLetters = selectedCountry.substring(0, 2).toUpperCase()
  
    const dateFormatted = date
      ? date
          .toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-")
      : ""
  
    const filename = `${countryLetters}-${dateFormatted}.html`
  
    const template = generatedTemplate
    const element = document.createElement("a")
    const file = new Blob([template], { type: "text/html" })
    element.href = URL.createObjectURL(file)
    element.download = filename
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  function handleCountChange(count: number) {
    console.log("Count changed to:", count)
  }


  return (
    <main className="container grid items-start gap-6 pt-6 pb-8 2xl:grid-cols-2 md:py-10">
      <div className="sm:w-[350px] flex mx-auto flex-col gap-4">
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
        <DatePicker date={date} setDate={setDate} />
        <h2 className="text-lg font-bold">Noticias</h2>
        <div className="flex justify-between w-full">
          <div>
            <p className="mb-1">Nacionales</p>
            <NewsCounter onCountChange={(count) => setNationalCount(count)} />
          </div>
          <div>
            <p className="mb-1">América del sur</p>
            <NewsCounter onCountChange={(count) => setSouthAmericaCount(count)} />
          </div>
        </div>
        <Button onClick={downloadTemplate} disabled={!selectedCountry || !date}>
          Descargar plantilla
        </Button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: generatedTemplate }} />
    </main>
  )
}
