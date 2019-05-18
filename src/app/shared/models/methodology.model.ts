import { Guid } from 'guid-typescript';

/**
 * high level methodology properties saved to file for methodology list
 */
export interface MethodologyProperties {
    id: Guid;
    path: string;
    methodologyName?: string;
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
    sectionName?: string;
}

/**
 * a task within a methodology section
 */
export interface MethodologyTask {
    taskName?: string;
}
