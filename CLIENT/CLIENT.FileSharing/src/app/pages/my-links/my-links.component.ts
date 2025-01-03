import { EnExtendTimeSpan } from './../../links/shared/extend-time-span.enum';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MyLinksDataSource } from '../../links/shared/mocks/linkDataSource';
import { LinkModel } from '../../links/shared/link.model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ITimeSpan } from '../../file-items/shared/models/time-span.interface';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { EnFileType } from '../../file-items/shared/models/file-type.enum';
import { MOCK_TIME_SPANS_FUTURE } from '../../links/shared/mocks/timeSpans.mock.data';
import { AsyncPipe } from '@angular/common';
import { LinksApiService } from '../../links/shared/links-api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'my-links',
  templateUrl: './my-links.component.html',
  styleUrl: './my-links.component.scss',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    AsyncPipe,
  ],
})
export class MyLinksComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<LinkModel>;
  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;

  dataSource: MyLinksDataSource = new MyLinksDataSource(
    inject(LinksApiService),
  );

  EnFileType = EnFileType;
  EnExtendTimeSpan = EnExtendTimeSpan;

  timeSpans: ITimeSpan[] = MOCK_TIME_SPANS_FUTURE;

  displayedColumns = [
    'select',
    'name',
    'createdAt',
    'validTo',
    'visits',
    'actions',
  ];

  validToControl = new FormControl('');

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
  }

  onContextMenuAction(event: any, link: LinkModel) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { link };
    this.contextMenu.menu?.focusFirstItem('mouse');
    this.contextMenu.openMenu();
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

  extendLink(link: LinkModel, time: EnExtendTimeSpan) {
    // TODO
    alert('Extend  ' + (link.name ?? link.url));
  }

  renameLink(link: LinkModel) {
    // TODO
    alert('Rename ' + link.name);
  }

  changeLinkColor(link: LinkModel) {
    // TODO
    alert('Change color for ' + link.name);
  }

  deleteLink(link: LinkModel) {
    // TODO
    alert('Delete ' + link.name);
  }
}
