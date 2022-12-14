import { useState } from "react"
import { Select, SelectOption } from "./components/select/Select"

const options = [
  { label: 'First', value: 1 },
  { label: 'Second', value: 2 },
  { label: 'Third', value: 3 },
  { label: 'Fourth', value: 4 },
  { label: 'Fifth', value: 5 },
]


function App() {
  const [mulValue, setMulValue] = useState<SelectOption[]>([])
  const [value, setValue] = useState<SelectOption | undefined>(options[0])
  return <>
    <Select multiple options={options} value={mulValue} onChange={setMulValue} />
    <br />
    <Select options={options} value={value} onChange={setValue} />
  </>
}

export default App
