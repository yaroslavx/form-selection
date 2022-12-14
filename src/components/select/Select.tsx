import styles from './select.module.css'


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
    return <div className={styles.container}>

    </div>
}
