/**
 * high level project properties saved to file for projects list
 */
export interface ProjectProperties {
    id: string;
    path: string;
    projectNumber?: string;
    projectName?: string;
    projectTitle?: string;
    clientName?: string;
    dateCreated?: Date;
}

/**
 * additional project details stored within a project
 */
export interface Project extends ProjectProperties {
    workPackage?: string;
    businessDevelopmentName?: string;
    qualityAssuranceName?: string;
    projectLeadName?: string;
    clientSponsor?: string;
    isVAAReturned?: boolean;
}
