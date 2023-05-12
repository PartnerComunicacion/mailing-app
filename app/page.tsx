"use client";

import * as React from "react";
import { useCallback, useMemo, useRef, useState } from "react";



import { footers, headers, rows } from "@/lib/templates"
import {
  replaceAll,
  replaceStrings,
  replaceStringsOnce,
  replaceStringsTwice,
} from "@/lib/utils"
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
import { News } from "@/components/news"
import { NewsCounter } from "@/components/news-counter"

interface FormRef {
  country: HTMLSpanElement | null
}

interface HeadersAndFooters {
  [key: string]: { header: string; footer: string }
}

interface State {
  selectedCountry: string
}

interface Props {}

const headersAndFooters: HeadersAndFooters = {
  Brasil: { header: headers.brasil, footer: footers.brasil },
  Perú: { header: headers.peru, footer: footers.peru },
  Colombia: { header: headers.colombia, footer: footers.colombia },
}

export default function Page(props: Props) {
  const formRef = useRef<FormRef>({
    country: null,
  })

  const [nationalCount, setNationalCount] = useState(0)
  const [southAmericaCount, setSouthAmericaCount] = useState(0)
  const [date, setDate] = useState<Date>()
  const [selectedCountry, setSelectedCountry] =
    useState<State["selectedCountry"]>("")
  const [nationalNewsTitles, setNationalNewsTitles] = useState<string[]>([])
  const [nationalNewsLinks, setNationalNewsLinks] = useState<string[]>([])
  const [nationalNewsCallToAction, setNationalNewsCallToAction] = useState<
    string[]
  >([])
  const [regionalNewsTitles, setRegionalNewsTitles] = useState<string[]>([])
  const [regionalNewsLinks, setRegionalNewsLinks] = useState<string[]>([])
  const [regionalNewsCallToAction, setRegionalCallToAction] = useState<
    string[]
  >([])

  const [replacedTitles, setReplacedTitles] = useState<string[]>([])
  const [replacedLinks, setReplacedLinks] = useState<string[]>([])
  const [replacedCallToAction, setReplacedCallToAction] = useState<string[]>([])

  const handleSelectChange = useCallback(() => {
    const value = formRef.current.country?.innerText
    setSelectedCountry(value?.slice(0, -1) || "")
  }, [])

  const generatedTemplate = useMemo(() => {
    const totalNews = nationalCount + southAmericaCount
    let allRows = ""

    if (totalNews === 1) {
      allRows += rows.odd
    } else {
      const totalRows = Math.floor(totalNews / 2)
      for (let i = 0; i < totalRows; i++) {
        allRows += rows.even
      }
      if (totalNews % 2 !== 0) {
        allRows += rows.odd
      }
    }

    const { header, footer } = headersAndFooters[selectedCountry] || {}

    let newTemplate = replaceStringsOnce("Título", allRows, replacedTitles)
    newTemplate = replaceStrings("Link", newTemplate, replacedLinks, 2)
    newTemplate = replaceStringsOnce(
      "Texto Botón",
      newTemplate,
      replacedCallToAction
    )
    newTemplate = replaceAll(
      "País",
      newTemplate,
      selectedCountry === "Brasil" ? "BR" : "RA"
    )
    newTemplate = replaceAll(
      "Nueva Fecha",
      newTemplate,
      date
        ? date
            .toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })
            .replace(/\//g, "-")
        : ""
    )

    const nationalNewsArray: string[] = []

    for (let i = 1; i <= nationalCount; i++) {
      nationalNewsArray.push(`News${i}`)
    }
    newTemplate = replaceStrings(
      "Nombre imagen",
      newTemplate,
      nationalNewsArray,
      3
    )

    const regionalNewsArray: string[] = []

    for (let i = 1; i <= southAmericaCount; i++) {
      regionalNewsArray.push(`ASNews${i}`)
    }
    newTemplate = replaceStrings(
      "Nombre imagen",
      newTemplate,
      regionalNewsArray,
      3
    )

    console.log(newTemplate)

    return (header || "") + newTemplate + (footer || "")
  }, [selectedCountry, nationalCount, southAmericaCount, replacedTitles, date])

  const regionalNews = useMemo(() => {
    const newsArray = Array.from(Array(southAmericaCount), (_, index) => (
      <News
        key={Math.floor(Math.random() * 1000) + 1}
        number={index}
        type="Regional"
        onTitleChange={(title) =>
          setRegionalNewsTitles((prevTitles) => {
            const newTitles = [...prevTitles]
            newTitles[index] = title
            return newTitles
          })
        }
        onLinkChange={(link) =>
          setRegionalNewsLinks((prevLinks) => {
            const newLinks = [...prevLinks]
            newLinks[index] = link
            return newLinks
          })
        }
        onCallToActionChange={(callToAction) =>
          setRegionalCallToAction((prevCallToAction) => {
            const newCallToAction = [...prevCallToAction]
            newCallToAction[index] = callToAction
            return newCallToAction
          })
        }
      />
    ))
    return newsArray
  }, [southAmericaCount])

  const nationalNews = useMemo(() => {
    const newsArray = Array.from(Array(nationalCount), (_, index) => (
      <News
        key={Math.floor(Math.random() * 1000) + 1}
        number={index}
        type="Nacional"
        onTitleChange={(title) =>
          setNationalNewsTitles((prevTitles) => {
            const newTitles = [...prevTitles]
            newTitles[index] = title
            return newTitles
          })
        }
        onLinkChange={(link) =>
          setNationalNewsLinks((prevLinks) => {
            const newLinks = [...prevLinks]
            newLinks[index] = link
            return newLinks
          })
        }
        onCallToActionChange={(callToAction) =>
          setNationalNewsCallToAction((prevCallToAction) => {
            const newCallToAction = [...prevCallToAction]
            newCallToAction[index] = callToAction
            return newCallToAction
          })
        }
      />
    ))
    return newsArray
  }, [nationalCount])

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

  function replaceTittles() {
    const allNewsTitles = nationalNewsTitles.concat(regionalNewsTitles)
    const allNewsLinks = nationalNewsLinks.concat(regionalNewsLinks)
    const allNewsCallToAction = nationalNewsCallToAction.concat(
      regionalNewsCallToAction
    )

    setReplacedTitles(allNewsTitles)
    setReplacedLinks(allNewsLinks)
    setReplacedCallToAction(allNewsCallToAction)
  }

  return (
    <main className="container items-start justify-around gap-6 pt-6 pb-8 md:flex md:py-10">
      <div className="w-full md:w-fit">
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
          <h2 className="text-lg font-bold text-center">Noticias</h2>
          <div className="flex justify-between w-full">
            <div>
              <p className="mb-1">Nacionales</p>
              <NewsCounter onCountChange={(count) => setNationalCount(count)} />
            </div>
            <div>
              <p className="mb-1">América del sur</p>
              <NewsCounter
                onCountChange={(count) => setSouthAmericaCount(count)}
              />
            </div>
          </div>
          <Button onClick={() => replaceTittles()}>Guardar datos</Button>
          <Button
            onClick={downloadTemplate}
            disabled={!selectedCountry || !date}
          >
            Descargar plantilla
          </Button>
        </div>
        <div className="grid justify-center w-full gap-6 pt-6 pb-8 2xl:grid-cols-2 md:py-10">
          {nationalNews}
          {regionalNews}
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: generatedTemplate }} />
    </main>
  )
}