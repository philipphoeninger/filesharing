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
  ],
  templateUrl: './uploads.component.html',
  styleUrl: './uploads.component.scss',
})
export class UploadsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FileItem>;
  dataSource = new FileItemsDataSource();
  displayedColumns = ['name', 'fileSize', 'createdAt'];
  
  fileTypeControl = new FormControl('');
  fileTypeGroups = MOCK_FILE_TYPE_GROUPS;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  clearFilters() {
    this.fileTypeControl.setValue('');
  }
}
