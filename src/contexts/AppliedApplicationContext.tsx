import { createContext, useContext, useEffect, useState } from "react";
import type { AppItem } from "../types/AppType";

interface AppliedContextType {
    appliedApp: AppItem[];
    addApplication: (newApplication: AppItem) => void;
    updateApplication: () => void;
}

const AppliedContext = createContext<AppliedContextType | null>(null)

export const useApplication = () => {
    const context = useContext(AppliedContext)
    if(!context) throw new Error("useApplication must be inside AppliedProvider")
    return context
}

export const AppliedProvider = ({children}: {children: React.ReactNode}) => {
    const [appliedApp, setAppliedApp] = useState<AppItem[]>([])

    console.log(appliedApp);
    

    

    const addApplication = (newApplication: AppItem) => {
        setAppliedApp(prev => [...prev, newApplication])
    }

    const updateApplication = () => {}

    return (
        <AppliedContext.Provider value={{appliedApp, addApplication, updateApplication}}>
            {children}
        </AppliedContext.Provider>
    )
}