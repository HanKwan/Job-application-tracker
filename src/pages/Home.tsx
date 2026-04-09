import { useState } from "react"
import ApplicationForm from "../components/ApplicationForm"
import ApplicationList from "../components/ApplicationList"
import type { AppItem } from "../types/AppType"

function Home () {
    const [apps, setApps] = useState<AppItem[]>([])
    
    const handleAdd = (newApp: AppItem) => {
        setApps(prev => [...prev, newApp])
    }

    return (
        <>
            <ApplicationForm onAdd={handleAdd}/>
            <ApplicationList applications={apps}/>
        </>

    )
}

export default Home