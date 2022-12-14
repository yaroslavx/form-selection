import { useEffect, useRef, useState } from 'react'
import st from './select.module.css'

export type SelectOption = {
    label: string
    value: string | number
}

type MultipleSelectProps = {
    multiple: true
    value: SelectOption[]
    onChange: (value: SelectOption[]) => void
}

type SingleSelectProps = {
    multiple?: false
    value?: SelectOption
    onChange: (value: SelectOption | undefined) => void
}

type SelectProps = {
    options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps)

export function Select({ multiple, value, onChange, options }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    function clearOptions() {
        multiple ? onChange([]) : onChange(undefined)
    }

    function selectOption(option: SelectOption) {
        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter(value => value !== option))
            } else {
                onChange([...value, option])
            }
        } else {
            if (option !== value) onChange(option)
        }
    }

    function isOptionSelected(option: SelectOption) {
        return multiple ? value.includes(option) : option === value
    }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0)
    }, [open])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.target != containerRef.current) return

            switch (e.code) {
                case "Enter":
                case "Space":
                    setIsOpen(prev => !prev)
                    if (isOpen) selectOption(options[highlightedIndex])
                    break
                case "ArrowUp":
                case "ArrowDown": {
                    if (!isOpen) {
                        setIsOpen(true)
                        break
                    }
                    const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
                    if (newValue >= 0 && newValue < options.length) {
                        setHighlightedIndex(newValue)
                    }
                    break
                }
                case "Escape":
                    setIsOpen(false)
                    break
            }
        }
        containerRef.current?.addEventListener("keydown", handler)

        return () => {
            containerRef.current?.removeEventListener("keydown", handler)

        }
    }, [isOpen, highlightedIndex, options])

    return <div ref={containerRef} onBlur={() => setIsOpen(false)} onClick={() => setIsOpen(prev => !prev)} tabIndex={0} className={st.container}>
        <span className={st.value}>{multiple ? value.map(v =>
            <button key={v.value} onClick={e => {
                e.stopPropagation()
                selectOption(v)
            }}
                className={st['option-badge']}>{v.label}
                <span className={st['remove-btn']}>&times;</span></button>
        ) : value?.label}</span>
        <button
            onClick={e => {
                e.stopPropagation()
                clearOptions()
            }}
            className={st['clear-btn']}>&times;</button>
        <div className={st.divider}></div>
        <div className={st.caret}></div>
        <ul className={`${st.options} ${isOpen ? st.show : ''}`}>
            {options.map((option, index) => (
                <li
                    onClick={() => {
                        selectOption(option)
                    }}
                    key={option.value}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`
                    ${st.option} 
                    ${isOptionSelected(option) ? st.selected : ''} 
                    ${index === highlightedIndex ? st.highlighted : ''}`
                    }>
                    {option.label}
                </li>
            ))}
        </ul>

    </div>
}
