export interface AppItem {
    id: number;
    companyName: string;
    position: string;
    status: string;
    applicationDate: string;
    note: string;
}

export interface CreateApplicationType {
    companyName: string;
    position: string;
    status: string;
    applicationDate: string;
    note: string;
}