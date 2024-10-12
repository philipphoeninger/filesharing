import { DataSource } from '@angular/cdk/collections';
import { FileItem } from '../file-item.model';
import { MOCK_FILE_ITEMS } from './fileItems.mock.data';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, of as observableOf, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { compare } from '../helper/compare.function';

export class FileItemsDataSource extends DataSource<FileItem> {
  data: FileItem[] = MOCK_FILE_ITEMS;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<FileItem[]> {
    if (this.paginator && this.sort) {
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange,
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }),
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.',
      );
    }
  }

  disconnect(): void {}

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
