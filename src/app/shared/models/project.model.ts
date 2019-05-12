export interface Project {
    path: string;
    clientName?: string;
    projectNumber?: string;
    projectName?: string;
    workPackage?: string;
    businessDevelopmentName?: string;
    qualityAssuranceName?: string;
    projectLeadName?: string;
    clientSponsor?: string;
    isVAAReturned?: boolean;
}

/**
 * high level project properties saved to file for projects list
 */
export interface ProjectProperties {
    path: string;
    projectNumber?: string;
    projectName?: string;
    clientName?: string;
    dateCreated?: Date;
}
