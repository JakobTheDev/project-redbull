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
    expanded: string;
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
    // details about the section
    id: string;
    name?: string;
    number?: number;
    tasks?: Array<MethodologyTask>;
    // track whether tree view is expanded
    expanded: string;
}

/**
 * a task within a methodology section
 */
export interface MethodologyTask {
    // details about the task
    id: string;
    name?: string;
    number?: number;
    // track whether tree view is expanded
    expanded: string;
}
