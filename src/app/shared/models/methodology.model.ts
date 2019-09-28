/**
 * high level methodology properties saved to file for methodology list
 */
export interface MethodologyProperties {
    // details about the methodology
    id: string;
    name: string;
    path?: string;
    dateCreated?: Date;
    // track whether tree view is expanded
    expanded?: string;
}

/**
 * additional methodology details
 */
export interface Methodology extends MethodologyProperties {
    sections?: Array<MethodologySection>;
    methodologyNotes?: string;
    testNotes?: string;
}

/**
 * a section within a methodology
 */
export interface MethodologySection {
    // details about the section
    id: string;
    name?: string;
    number?: number;
    methodologyNotes?: string;
    testNotes?: string;
    tasks?: Array<MethodologyTask>;
    // track whether tree view is expanded
    expanded?: string;
}

/**
 * a task within a methodology section
 */
export interface MethodologyTask {
    // details about the task
    id: string;
    name?: string;
    number?: number;
    methodologyNotes?: string;
    testNotes?: string;
    // track whether tree view is expanded
    expanded?: string;
}
