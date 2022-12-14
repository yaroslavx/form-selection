import st from './select.module.css'


type SelectOption = {
    label: string
    value: string
}

type SelectProps = {
    value?: SelectOption
    onChange: (value: SelectOption | undefined) => void
    options: SelectOption[]
}
export function Select({ value, onChange, options }: SelectProps) {
    return <div className={st.container}>
        <span className={st.value}>Value</span>
        <button className={st['clear-btn']}>&times;</button>
        <div className={st.divider}></div>
        <div className={st.caret}></div>
        <ul className={st.options}>
            {options.map(option => (
                <li key={option.value} className={st.option}>{option.label}</li>
            ))}
        </ul>

    </div>
}
