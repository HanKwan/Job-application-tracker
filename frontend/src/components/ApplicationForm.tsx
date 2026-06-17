import React, { useEffect, useState } from "react"
import type { AppItem, createApplicationType } from "../types/AppType"
import "../css/AppForm.css"

type Props = {
    onAdd: (app: createApplicationType) => void
    onUpdate: (id: number, updatedApp: createApplicationType) => void
    onEditClick?: AppItem | null
    onClearEdit: () => void
}

const ApplicationForm = (props: Props) => {
    const onAdd = props.onAdd
    const editingApp = props.onEditClick
    const onUpdate = props.onUpdate
    console.log(editingApp)

    const clearEditForm = props.onClearEdit

    const today = () => new Date().toISOString().split("T")[0]

    const [newCompany, setNewCompany] = useState("")
    const [position, setPosition] = useState("")
    const [status, setStatus] = useState("Applied")
    const [applicationDate, setApplicationDate] = useState(today)
    const [note, setNote] = useState("")

    useEffect(() => {
            if (editingApp) {
                setNewCompany(editingApp.companyName)
                setPosition(editingApp.position)
                setStatus(editingApp.status)
                setApplicationDate(editingApp.applicationDate?.slice(0, 10) || today)
                setNote(editingApp.note)
            }
        }, [editingApp])

    const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!newCompany || !status) return

        const newApp: createApplicationType = {
            // id: Date.now(),  // spring will generate the id
            companyName: newCompany,
            position,
            status,
            note,
            applicationDate,
        }

        if (editingApp) {
            onUpdate(editingApp.id, {
                companyName: newCompany,
                position,
                status,
                note,
                applicationDate,
            })
        } else {
            onAdd(newApp)
        }

        setNewCompany("")
        setPosition("")
        setStatus("applied")
        setApplicationDate(today)
        setNote("")
        clearEditForm()
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
                <option value="Applied">Applied</option>
                <option value="Interview-1">Interview-1</option>
                <option value="Interview-2">Interview-2</option>
                <option value="Interview-3">Interview-3</option>
                <option value="Final-interview">Final-interview</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
            </select>

            <input type="date" 
                    value={applicationDate}
                    onChange={(e) => setApplicationDate(e.target.value)}/>

            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Notes..."
            />

            <button type="submit">{editingApp ? "Edit" : "Add"}</button>
        </form>
    )
}

export default ApplicationForm