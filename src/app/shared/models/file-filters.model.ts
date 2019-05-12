import { FileFilter } from 'electron';
import { environment } from 'environments/environment';

export const fileFilters: Array<FileFilter> = [
    {
        name: `${environment.applicationName} file`,
        extensions: [`${environment.fileExtension}`]
    }
];
