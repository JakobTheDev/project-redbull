import { Methodology, MethodologyProperties } from 'app/shared/models/methodology.model';

// new methodology actions
export class NewMethodology {
    static readonly type: string = '[Methodology] New Methodology';
    constructor(readonly payload: { path: string }) {}
}

export class NewMethodologySection {
    static readonly type: string = '[Methodology] New Methodology Section';
    constructor() {}
}

export class NewMethodologyTask {
    static readonly type: string = '[Methodology] New Methodology Task';
    constructor() {}
}

// load methodology actions
export class LoadMethodology {
    static readonly type: string = '[Methodology] Load Methodology';
    constructor(readonly payload: { methodologyProperties: MethodologyProperties }) {}
}

// update methodology actions
export class UpdateMethodology {
    static readonly type: string = '[Methodology] Update Methodology';
    constructor(readonly payload: { methodology: Methodology }) {}
}

// load methodology list actions
export class LoadMethodologyList {
    static readonly type: string = '[Methodology] Load Methodology List';
    constructor() {}
}

// update methodology list actions
export class UpdateMethodologyList {
    static readonly type: string = '[Methodology] Update Methodology List';
    constructor(readonly pauload: { methodologyList: Methodology }) {}
}
