import { Methodology } from 'app/shared/models/methodology.model';

export interface Test extends Methodology {
    // details about the test
    id: string;
    name: string;
    // track whether tree view is expanded
    expanded: string;
}
