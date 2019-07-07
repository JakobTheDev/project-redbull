/**
 * high level methodology properties saved to file for methodology list
 */
export interface MethodologyProperties {
    id: string;
    path?: string;
    name?: string;
    dateCreated?: Date;
}

/**
 * additional methodology details
 */
export interface Methodology extends MethodologyProperties {
    sections?: Array<MethodologySection>;
}

/**
 * a section within a methodology
 */
export interface MethodologySection {
    id: string;
    sectionName?: string;
    sectionNumber?: number;
    tasks?: Array<MethodologyTask>;
}

/**
 * a task within a methodology section
 */
export interface MethodologyTask {
    id: string;
    taskName?: string;
    taskNumber?: number;
}
