import React, { useState } from "react"
import type { AppItem } from "../types/AppType"
import "../css/AppForm.css"

type Props = {
    onAdd: (app: AppItem) => void
}

const ApplicationForm = (props: Props) => {
    const onAdd = props.onAdd

    const [newCompany, setNewCompany] = useState("")
    const [position, setPosition] = useState("")
    const [status, setStatus] = useState("applied")
    const [date, setDate] = useState("")

    const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!newCompany || !status) return

        const newApp: AppItem = {
            id: Date.now(),
            company: newCompany,
            position,
            status,
            date
        }

        onAdd(newApp)

        setNewCompany("")
        setPosition("")
        setStatus("applied")
        setDate("")
    }

    return (
        <form className="app-form" onSubmit={handleAdd}>
            <input type="text"
                    value={newCompany}
                    className="company-name"
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="Enter company's name..."/>

            <input type="text" 
                    value={position}
                    className="company-position"
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Enter position..."/>
            
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="reject">Reject</option>
            </select>

            <input type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}/>

            <button type="submit">Add</button>
        </form>
    )
}

export default ApplicationForm