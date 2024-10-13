import { Component, ViewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTable } from '@angular/material/table';
import { FileItem } from '../../file-items/shared/file-item.model';
import { FileItemsDataSource } from '../../file-items/shared/mocks/fileItemDataSource';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MOCK_FILE_TYPE_GROUPS } from '../../file-items/shared/mocks/fileTypeGroups.mock.data';
import { ITimeSpan } from '../../file-items/shared/time-span.interface';
import { MOCK_TIME_SPANS } from '../../file-items/shared/mocks/timeSpans.mock.data';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-uploads',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    MatDividerModule,
    DatePipe,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './uploads.component.html',
  styleUrl: './uploads.component.scss',
})
export class UploadsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FileItem>;
  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;
  dataSource = new FileItemsDataSource();
  displayedColumns = ['name', 'fileSize', 'createdAt'];

  fileTypeControl = new FormControl('');
  fileTypeGroups = MOCK_FILE_TYPE_GROUPS;

  timeSpanControl = new FormControl('');
  timeSpans: ITimeSpan[] = MOCK_TIME_SPANS;

  contextMenuPosition = { x: '0px', y: '0px' };

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  clearFilters() {
    this.fileTypeControl.setValue('');
    this.timeSpanControl.setValue('');
  }

  onContextMenuAction(event: any, file: FileItem) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { file: file };
    this.contextMenu.menu?.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  createLink(file: FileItem) {
    // TODO
    alert('Create link for ' + file.name);
  }

  downloadFile(file: FileItem) {
    // TODO
    alert('Download ' + file.name);
  }

  renameFile(file: FileItem) {
    // TODO
    alert('Rename ' + file.name);
  }

  changeFolderColor(file: FileItem) {
    // TODO
    alert('Change color for ' + file.name);
  }

  deleteFile(file: FileItem) {
    // TODO
    alert('Delete ' + file.name);
  }
}
