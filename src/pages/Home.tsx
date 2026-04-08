import ApplicationForm from "../components/ApplicationForm"
import ApplicationList from "../components/ApplicationList"
import type { AppItem } from "../types/AppType"

function Home () {

    const applications: AppItem[] = [
    {
        id: 1,
        company: "Google",
        position: "Frontend Dev",
        status: "Applied",
        date: "2026-04-06"
    }
    ]


    return (
        <>
            <ApplicationForm />
            <ApplicationList applications={applications}/>
        </>

    )
}

export default Home