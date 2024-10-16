import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { LinkModel } from '../link.model';
import { compare } from '../helper/compare.function';
import { LinksApiService } from '../links-api.service';

/**
 * Data source for the MyLinks view.
 */
export class MyLinksDataSource extends DataSource<LinkModel> {
  data: BehaviorSubject<LinkModel[]> = new BehaviorSubject<LinkModel[]>([]);
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private linkItemsApiService: LinksApiService) {
    super();
  }

  /**
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<LinkModel[]> {
    if (this.paginator && this.sort) {
      return merge(
        this.linkItemsApiService.getLinks(),
        this.paginator.page,
        this.sort.sortChange,
      ).pipe(
        map((linkItems) => {
          if (linkItems instanceof Array) {
            this.data.next(linkItems);
            return this.getPagedData(this.getSortedData([...linkItems]));
          }
          return this.getPagedData(this.getSortedData([...this.data.value]));
        }),
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.',
      );
    }
  }

  disconnect(): void {}

  private getPagedData(data: LinkModel[]): LinkModel[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: LinkModel[]): LinkModel[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        case 'name':
        case 'url':
          return compare(a.url, b.url, isAsc);
        case 'validTo':
          return compare(+a.validTo, +b.validTo, isAsc);
        case 'visits':
          return compare(+a.visits, +b.visits, isAsc);
        case 'createdAt':
          return compare(+a.createdAt, +b.createdAt, isAsc);
        default:
          return 0;
      }
    });
  }
}
