import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { LinkModel } from '../../links/shared/link.model';
import { MyLinksDataSource } from '../../links/shared/mocks/linkDataSource';
import { EnFileType } from '../../file-items/shared/models/file-type.enum';
import { EnExtendTimeSpan } from '../../links/shared/extend-time-span.enum';
import { MOCK_TIME_SPANS_FUTURE } from '../../links/shared/mocks/timeSpans.mock.data';
import { ITimeSpan } from '../../file-items/shared/models/time-span.interface';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EnTimeSpan } from '../../file-items/shared/models/time-span.enum';
import { MOCK_TIME_SPANS } from '../../file-items/shared/mocks/timeSpans.mock.data';
import { LinksApiService } from '../../links/shared/links-api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shared',
  standalone: true,
  imports: [
    MatDividerModule,
    MatIconModule,
    DatePipe,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    AsyncPipe,
  ],
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.scss',
})
export class SharedComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<LinkModel>;
  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;

  dataSource: MyLinksDataSource = new MyLinksDataSource(
    inject(LinksApiService),
  );

  displayedColumns = [
    'select',
    'name',
    'validTo',
    'lastChanged',
    'createdAt',
    'owner',
    'actions',
  ];

  EnFileType = EnFileType;
  EnExtendTimeSpan = EnExtendTimeSpan;

  timeSpanControl = new FormControl('');
  timeSpanControlCreated = new FormControl('');
  validToControl = new FormControl('');

  timeSpans: ITimeSpan[] = MOCK_TIME_SPANS;
  timeSpansFuture: ITimeSpan[] = MOCK_TIME_SPANS_FUTURE;

  contextMenuPosition = { x: '0px', y: '0px' };

  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<LinkModel>(
    this.allowMultiSelect,
    this.initialSelection,
  );

  constructor(private linkApiService: LinksApiService) {}

  ngAfterViewInit(): void {
    this.dataSource = new MyLinksDataSource(this.linkApiService);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  clearFilters() {
    this.validToControl.setValue('');
    this.timeSpanControl.setValue('');
    this.timeSpanControlCreated.setValue('');
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.value.length;
    return numSelected == numRows;
  }

  toggleAllRows() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data
          .pipe(
            map((links) => links.forEach((row) => this.selection.select(row))),
          )
          .subscribe();
  }

  onContextMenuAction(event: any, link: LinkModel) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { link };
    this.contextMenu.menu?.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  onTimeSpanFilterChanged(event: MatSelectChange) {
    // filter by time span
    let selection: number = event.value.value;
    switch (selection) {
      case EnTimeSpan.Today:
        let today = new Date();
        // this.filtered;
        break;
      case EnTimeSpan.Yesterday:
        // filter by yesterday
        break;
      case EnTimeSpan.Last7Days:
        // filter by last 7 days
        break;
      case EnTimeSpan.Last30Days:
        // filter by last 30 days
        break;
      case EnTimeSpan.ThisYear:
        // filter by this year
        break;
      case EnTimeSpan.LastYear:
        // filter by last year
        break;
      default:
        // no filter
        break;
    }
  }
}
