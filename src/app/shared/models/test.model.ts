import { Methodology } from 'app/shared/models/methodology.model';

export interface Test extends Methodology {
    id: string;
    name: string;
}
