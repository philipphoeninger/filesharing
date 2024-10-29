import { WritableSignal } from '@angular/core';
import { DirectoryPathModel } from '../../file-items/shared/models/directory-path.interface';

export interface FileSharingAppState {
  $navigationPath: WritableSignal<DirectoryPathModel[] | null>;
  $loadingCounter: WritableSignal<number>;
}
