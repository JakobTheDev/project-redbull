// new test actions
export class NewTest {
    static readonly type: string = '[Test] New Test';
}

export class SelectTest {
    static readonly type: string = '[Test] Select Test';
    constructor(readonly payload: { id: string }) {}
}

export class SelectSection {
    static readonly type: string = '[Test] Select Section';
    constructor(readonly payload: { id: string }) {}
}

/**
 * task actions
 */
export class SelectTask {
    static readonly type: string = '[Test] Select Task';
    constructor(readonly payload: { id: string }) {}
}

export class UpdateTaskNotes {
    static readonly type: string = '[Test] Update Task Notes';
    constructor(readonly payload: { id: string; testNotes: string }) {}
}
