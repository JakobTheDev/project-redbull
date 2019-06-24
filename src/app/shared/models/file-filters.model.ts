import { FileFilter } from 'electron';
import { environment } from 'environments/environment';

export const projectFileFilters: Array<FileFilter> = [
    {
        name: `${environment.applicationName} file`,
        extensions: [`${environment.projectFileExtension}`]
    }
];

export const methodologyFileFilters: Array<FileFilter> = [
    {
        name: `${environment.applicationName} methodology file`,
        extensions: ['json']
    }
];
