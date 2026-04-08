import { useState } from "react"

const ApplicationForm = () => {

    const [company, setCompany] = useState([])
    const [newCompany, setNewCompany] = useState("")

    return (
        <div className="app-form">
            <input type="text" 
                    className="company-name"
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="Enter company's name..."/>
        </div>
    )
}

export default ApplicationForm