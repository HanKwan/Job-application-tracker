export interface AppItem {
    id: number;
    companyName: string;
    position: string;
    status: string;
    applicationDate: string | null;
    note: string;
}

export interface CreateApplicationType {
    companyName: string;
    position: string;
    status: string;
    applicationDate: string | null;
    note: string;
}