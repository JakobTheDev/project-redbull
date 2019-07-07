import { Methodology } from 'app/shared/models/methodology.model';

// new methodology actions
export class NewMethodology {
    static readonly type: string = '[Methodology] New Methodology';
    constructor(readonly payload: { path: string }) {}
}

export class NewMethodologySection {
    static readonly type: string = '[Methodology] New Methodology Section';
}

export class NewMethodologyTask {
    static readonly type: string = '[Methodology] New Methodology Task';
}

// load methodology actions
export class LoadMethodology {
    static readonly type: string = '[Methodology] Load Methodology';
    constructor(readonly payload: { id: string }) {}
}

// load methodology list actions
export class LoadMethodologyList {
    static readonly type: string = '[Methodology] Load Methodology List';
}

// update methodology list actions
export class UpdateMethodologyList {
    static readonly type: string = '[Methodology] Update Methodology List';
    constructor(readonly payload: { methodology: Methodology }) {}
}
