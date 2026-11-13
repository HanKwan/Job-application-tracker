import React, { useEffect, useState } from "react"
import type { AppItem, CreateApplicationType } from "../types/AppType"
import "../css/AppForm.css"

type Props = {
    onAdd: (app: CreateApplicationType) => void
    onUpdate: (id: number, updatedApp: CreateApplicationType) => void
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

    const [companyName, setCompanyName] = useState("")
    const [position, setPosition] = useState("")
    const [status, setStatus] = useState("Applied")
    const [applicationDate, setApplicationDate] = useState(today())
    const [note, setNote] = useState("")

    useEffect(() => {
            if (editingApp) {
                setCompanyName(editingApp.companyName)
                setPosition(editingApp.position)
                setStatus(editingApp.status)
                setApplicationDate(editingApp.applicationDate?.slice(0, 10) || "");
                setNote(editingApp.note)
            }
        }, [editingApp])

    const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!companyName.trim() || !status) return;

        if (status !== "Wish List" && !applicationDate) {
            return;
        }

        const applicationData: CreateApplicationType = {
            companyName,
            position,
            status,
            note,
            applicationDate: status === "Wish List" ? null : applicationDate,
        };

        if (editingApp) {
            onUpdate(editingApp.id, applicationData);
        } else {
            onAdd(applicationData);
        }

        setCompanyName("");
        setPosition("");
        setStatus("Applied");
        setApplicationDate(today());
        setNote("");
        clearEditForm();
    };

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);

        if (newStatus === "Wish List") {
            setApplicationDate("");
        } else if (!applicationDate) {
            setApplicationDate(today());
        }
    };

    return (
        <form className="app-form" onSubmit={handleAdd}>
            <input type="text"
                    value={companyName}
                    className="company-name"
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter company's name..."/>

            <input type="text" 
                    value={position}
                    className="company-position"
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Enter position..."/>
            
            <select value={status} onChange={(e) => handleStatusChange(e.target.value)}>
                <option value="Wish List">Wish List</option>
                <option value="Applied">Applied</option>
                <option value="Screening">Screening</option>
                <option value="Interview-1">Interview-1</option>
                <option value="Interview-2">Interview-2</option>
                <option value="Interview-3">Interview-3</option>
                <option value="Final-interview">Final-interview</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
            </select>

            <input
                type="date"
                value={applicationDate}
                onChange={(e) => setApplicationDate(e.target.value)}
                required={status !== "Wish List"}
                disabled={status === "Wish List"}
            />

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