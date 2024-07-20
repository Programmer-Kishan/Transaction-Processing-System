import { ChangeEvent } from "react"

interface FilterProps {
    data: string[],
    handlerfn: (arg0: ChangeEvent, arg1: string) => void,
    field: string
}

const TransactionFilter = ({data, handlerfn, field}: FilterProps) => {
    return (
        <>
            <h3 className="text-xl font-poppins mb-5">Filter based on {field.toUpperCase()}</h3>
            <select 
                onChange={(e) => handlerfn(e, field)}
                className="p-1 text-lg w-full font-roboto"
            >
                <option value="">{" "}</option>
                {data?.map(val => (<option key={Math.random()} value={val}>{val}</option>))}
            </select>
        </>
    )
}

export default TransactionFilter
