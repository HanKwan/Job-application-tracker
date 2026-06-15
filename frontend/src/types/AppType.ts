export interface AppItem {
    id: number;
    companyName: string;
    position: string;
    status: string;
    applicationDate: string;
    note: string;
}

export interface createApplicationType {
    companyName: string;
    position: string;
    status: string;
    applicationDate: string;
    note: string;
}