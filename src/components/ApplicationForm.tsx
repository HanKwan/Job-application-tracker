import React, { useEffect, useState } from "react"
import type { AppItem } from "../types/AppType"
import "../css/AppForm.css"

type Props = {
    onAdd: (app: AppItem) => void
    onUpdate: (id: number, updatedApp: Partial<AppItem>) => void
    onEditClick?: AppItem | null
}

const ApplicationForm = (props: Props) => {
    const onAdd = props.onAdd
    const editingApp = props.onEditClick
    const onUpdate = props.onUpdate
    console.log(editingApp)

    const today = new Date().toLocaleDateString("sv-SE")

    const [newCompany, setNewCompany] = useState("")
    const [position, setPosition] = useState("")
    const [status, setStatus] = useState("applied")
    const [date, setDate] = useState(today)

    useEffect(() => {
            if (editingApp) {
                setNewCompany(editingApp.company)
                setPosition(editingApp.position)
                setStatus(editingApp.status)
                setDate(editingApp.date)
            }
        }, [editingApp])

    const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!newCompany || !status) return

        const newApp: AppItem = {
            id: Date.now(),
            company: newCompany,
            position,
            status,
            date: date
        }

        if (editingApp) {
            onUpdate(editingApp.id, {
                company: newCompany,
                position,
                status,
                date
            })
        } else {
            onAdd(newApp)
        }

        setNewCompany("")
        setPosition("")
        setStatus("applied")
        setDate(today)
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

            <button type="submit">{editingApp ? "Edit" : "Add"}</button>
        </form>
    )
}

export default ApplicationForm