import { Project } from 'app/shared/models/project.model';
import { TestStateModel } from 'app/test/store/test.state';

export interface ProjectSave {
    project: Project;
    testState: TestStateModel;
}
