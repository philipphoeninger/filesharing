import { computed, Injectable, signal } from '@angular/core';
import { FileSharingAppState } from './fileSharing-app-state.interface';
import { createEffect } from './create-effect';
import { tap } from 'rxjs/operators';
import { DirectoryPathModel } from '../../file-items/shared/models/directory-path.interface';

@Injectable({ providedIn: 'root' })
export class FileSharingStore {
  private readonly state: FileSharingAppState = {
    $navigationPath: signal<DirectoryPathModel[] | null>(null),
    $loadingCounter: signal<number>(0),
  } as const;

  readonly $navigationPath = this.state.$navigationPath.asReadonly();
  readonly $loadingCounter = this.state.$loadingCounter.asReadonly();
  readonly $getNavigationPath = computed(() => {
    return this.$navigationPath()?.sort((a, b) => {
      return a.sortId > b.sortId ? -1 : 1;
    });
  });
  readonly $isLoading = computed(() => !!this.$loadingCounter());

  constructor() {}

  /*
   * Actions
   */
  public updateNavigationPath(path: DirectoryPathModel[] | null) {
    this._updateNavigationPath(path);
  }
  // -- End Actions

  /*
   * Effects
   */
  private _updateNavigationPath = createEffect<DirectoryPathModel[] | null>(
    (_) =>
      _.pipe(
        tap((path: DirectoryPathModel[] | null) => {
          if (!path) {
            this.state.$navigationPath.set(null);
            return;
          }
          this.state.$navigationPath.set(path);
        }),
      ),
  );
  // -- End Effects
}
