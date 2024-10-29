import { DataSource } from '@angular/cdk/collections';
import { FileItem } from '../models/file-item.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, merge, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { compare } from '../helper/compare.function';
import { FileItemsApiService } from '../fileItems-api.service';
import { FileSharingStore } from '../../../core/store/fileSharing.store';

export class FileItemsDataSource extends DataSource<FileItem> {
  dataStream: BehaviorSubject<FileItem[]> = new BehaviorSubject<FileItem[]>([]);

  currentFileItem: FileItem | null = null;

  set data(d: FileItem[]) {
    this.dataStream.next(d);
  }
  get data(): FileItem[] {
    return this.dataStream.value;
  }

  constructor(
    private store: FileSharingStore,
    private paginator: MatPaginator,
    private sort: MatSort,
    private fileItemsApiService: FileItemsApiService,
  ) {
    super();
  }

  /**
   * Connect this data source to the table.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<FileItem[]> {
    const dataMutations = [
      this.dataStream,
      this.paginator.page,
      this.sort.sortChange,
    ];

    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(
      map(() => {
        if (!this.store.$getNavigationPath())
          return this.getPagedData(this.getSortedData([...this.data]));
        let fileItem = this.data[0];
        if (!fileItem) return [];
        return this.getPagedData(
          this.getSortedData([...(fileItem.fileItems?.$values ?? [])]),
        );
      }),
    );
  }

  disconnect(): void {}

  public refresh() {
    this.fileItemsApiService.getFileItems().subscribe((result) => {
      this.data = result instanceof Array ? [...result] : [result];
    });
  }

  public getFileItemById(fileItemId: number) {
    return this.fileItemsApiService.getFileItemById(fileItemId).pipe(
      map((result) => {
        this.currentFileItem = result.fileItem;
        this.data = [...(result.fileItem.fileItems?.$values || [])];
        this.store.updateNavigationPath(result.directoryPath.$values);
        return this.getPagedData(this.getSortedData(this.data));
      }),
    );
  }

  public getFileItems(): Observable<FileItem[]> {
    return this.fileItemsApiService.getFileItems().pipe(
      map((result) => {
        this.currentFileItem = null;
        this.data = result;
        return this.getPagedData(this.getSortedData([...result]));
      }),
    );
  }

  private getPagedData(data: FileItem[]): FileItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: FileItem[]): FileItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}
