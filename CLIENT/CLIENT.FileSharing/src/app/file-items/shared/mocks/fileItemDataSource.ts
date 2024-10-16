import { DataSource } from '@angular/cdk/collections';
import { FileItem } from '../file-item.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, merge, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { compare } from '../helper/compare.function';
import { FileItemsApiService } from '../fileItems-api.service';

export class FileItemsDataSource extends DataSource<FileItem> {
  data: BehaviorSubject<FileItem[]> = new BehaviorSubject<FileItem[]>([]);
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private fileItemsApiService: FileItemsApiService) {
    super();
  }

  /**
   * Connect this data source to the table.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<FileItem[]> {
    if (this.paginator && this.sort) {
      return merge(
        this.fileItemsApiService.getFileItems(),
        this.paginator.page,
        this.sort.sortChange,
      ).pipe(
        map((fileItems) => {
          if (fileItems instanceof Array) {
            this.data.next(fileItems);
            return this.getPagedData(this.getSortedData([...fileItems]));
          } else {
            return this.getPagedData(this.getSortedData([...this.data.value]));
          }
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
