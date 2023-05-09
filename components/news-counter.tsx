import { useState } from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NewsCounterProps {
  onCountChange: (count: number) => void
}

export function NewsCounter({ onCountChange }: NewsCounterProps) {
  const [count, setCount] = useState(0)

  function increment() {
    setCount(count + 1)
    onCountChange(count + 1)
  }

  function decrement() {
    if (count > 0) {
      setCount(count - 1)
      onCountChange(count - 1)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button className="w-auto h-auto p-1 rounded-full" onClick={decrement}>
        <Minus />
      </Button>
      <Input
        className="text-center w-11"
        type="text"
        placeholder="0"
        value={count}
        readOnly
      />
      <Button className="w-auto h-auto p-1 rounded-full" onClick={increment}>
        <Plus />
      </Button>
    </div>
  )
}
