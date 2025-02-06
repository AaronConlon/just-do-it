'use client'

import { Label } from '@/components/ui/label'
import ReactSelect, { MultiValue } from 'react-select'

interface Option {
  label: string
  value: string
}

interface MultiSelectProps {
  label: string
  value: Option[]
  onChange: (value: Option[]) => void
  placeholder?: string
}

export function MultiSelect({ label, value, onChange, placeholder }: MultiSelectProps) {
  const handleSelectChange = (val: MultiValue<Option>) => {
    onChange(val as Option[])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const input = (e.target as HTMLInputElement).value.trim()
      if (input) {
        const newOption = { label: input, value: input }
        onChange([...value, newOption])
        ;(e.target as HTMLInputElement).value = ''
      }
      // blur
      ;(e.target as HTMLInputElement).blur()
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <ReactSelect<Option, true>
        isMulti
        placeholder={placeholder}
        value={value}
        onChange={handleSelectChange}
        onKeyDown={handleKeyDown}
        classNames={{
          control: () => 'border-input bg-background',
          placeholder: () => 'text-muted-foreground',
          input: () => 'text-foreground',
        }}
        noOptionsMessage={() => '无选项'}
      />
    </div>
  )
}
