import ApplicationItem from "./ApplicationItem"
import type { AppItem } from "../types/AppType"

interface ApplicationProps {
    applications: AppItem[]
}

const ApplicationList = ({ applications }: ApplicationProps) => {

    return (
        <div>
            <div>
                <span>Company</span>
                <span>Position</span>
                <span>Status</span>
                <span>Date</span>
                <span>Actions</span>
            </div>
            {applications.map(app => <ApplicationItem key={app.id} app={app}/>)}
        </div>
    )

}

export default ApplicationList