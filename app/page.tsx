"use client"

import * as React from "react"
import { useCallback, useMemo, useRef, useState } from "react"

import { banner, footers, headers, rows } from "@/lib/templates"
import {
  replaceAll,
  replaceStrings,
  replaceStringsOnce,
  replaceStringsTwice,
} from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
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

const headersAndFooters: HeadersAndFooters = {
  Brasil: { header: headers.brasil, footer: footers.brasil },
  Perú: { header: headers.peru, footer: footers.peru },
  Colombia: { header: headers.colombia, footer: footers.colombia },
}

export default function Page() {
  const formRef = useRef<FormRef>({
    country: null,
  })

  const [nationalCount, setNationalCount] = useState(0)
  const [regionalCount, setRegionalCount] = useState(0)
  const [date, setDate] = useState<Date>()
  const [selectedCountry, setSelectedCountry] =
    useState<State["selectedCountry"]>("")
  const [hasBanner, setHasBanner] = useState(false)
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
  const [bannerLink, setBannerLink] = useState("")

  const handleSelectChange = useCallback(() => {
    const value = formRef.current.country?.innerText
    setSelectedCountry(value?.slice(0, -1) || "")
  }, [])

  const generatedTemplate = useMemo(() => {
    const totalNews = nationalCount + regionalCount
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
    // newTemplate = doubleReplace("Link", newTemplate, replacedLinks)
    newTemplate = replaceStringsTwice("Link", newTemplate, replacedLinks)
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

    for (let i = 1; i <= regionalCount; i++) {
      regionalNewsArray.push(`ASNews${i}`)
    }
    newTemplate = replaceStrings(
      "Nombre imagen",
      newTemplate,
      regionalNewsArray,
      3
    )

    // console.log(newTemplate)

    let newBanner = replaceAll(
      "País",
      banner,
      selectedCountry === "Brasil" ? "BR" : "RA"
    )
    newBanner = replaceAll(
      "Nueva Fecha",
      newBanner,
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
    newBanner = replaceAll("Link", newBanner, bannerLink)

    // console.log(newBanner)

    return (
      (header || "") +
      newTemplate +
      (hasBanner ? newBanner : "") +
      (footer || "")
    )
  }, [
    selectedCountry,
    nationalCount,
    regionalCount,
    replacedTitles,
    date,
    hasBanner,
  ])

  const regionalNews = useMemo(() => {
    const newsArray = Array.from(Array(regionalCount), (_, index) => (
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
  }, [regionalCount])

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
    <main className="container flex flex-col items-center justify-center gap-6 pt-6 pb-8 2xl:items-start 2xl:flex-row md:py-10">
      <div className="w-[620px]">
        <div className="flex flex-col gap-2 mx-auto">
          <div className="flex gap-2">
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue
                  id="country"
                  ref={(el) =>
                    (formRef.current.country = el as HTMLSpanElement)
                  }
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
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox onClick={() => setHasBanner(!hasBanner)} id="banner" />
            <label
              htmlFor="banner"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Selecciona si tiene banner
            </label>
          </div>
          {hasBanner && (
            <Input
              className="w-full"
              type="text"
              placeholder="Ingresa el link del banner"
              value={bannerLink}
              onChange={(e) => setBannerLink(e.target.value)}
            />
          )}
          <div className="flex flex-col justify-between w-full gap-4">
            <div className="flex gap-4">
              <p className="my-auto text-lg font-bold">
                Cantidad de noticias nacionales:
              </p>
              <NewsCounter onCountChange={(count) => setNationalCount(count)} />
            </div>
            <div className="flex gap-4">
              <p className="my-auto text-lg font-bold">
                Cantidad de noticias de América del sur:
              </p>
              <NewsCounter onCountChange={(count) => setRegionalCount(count)} />
            </div>
          </div>
        </div>
        <div className="grid justify-center w-full grid-cols-2 gap-2 pt-6 pb-8 md:py-10">
          {nationalNews}
          {regionalNews}
        </div>
        <div className="flex w-full gap-3">
          <Button className="w-1/2" onClick={() => replaceTittles()}>
            Guardar noticias
          </Button>
          <Button
            className="w-1/2"
            onClick={downloadTemplate}
            disabled={
              !selectedCountry ||
              !date ||
              replacedTitles.length < nationalCount + regionalCount ||
              replacedLinks.length < nationalCount + regionalCount ||
              replacedCallToAction.length < nationalCount + regionalCount
            }
          >
            Descargar plantilla
          </Button>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: generatedTemplate }} />
    </main>
  )
}
