import { Component, inject, ViewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTable } from '@angular/material/table';
import { FileItem } from '../../file-items/shared/models/file-item.model';
import { FileItemsDataSource } from '../../file-items/shared/mocks/fileItemDataSource';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MOCK_FILE_TYPE_GROUPS } from '../../file-items/shared/mocks/fileTypeGroups.mock.data';
import { ITimeSpan } from '../../file-items/shared/models/time-span.interface';
import { MOCK_TIME_SPANS } from '../../file-items/shared/mocks/timeSpans.mock.data';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FileItemsApiService } from '../../file-items/shared/fileItems-api.service';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditFileItemModalComponent } from '../../file-items/shared/dialogs/edit-file-item-modal/edit-file-item-modal.component';
import { EnFileAction } from '../../file-items/shared/models/file-action-type.enum';

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
    MatCheckboxModule,
    AsyncPipe,
  ],
  templateUrl: './uploads.component.html',
  styleUrl: './uploads.component.scss',
})
export class UploadsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FileItem>;
  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;

  dataSource: FileItemsDataSource = new FileItemsDataSource(
    inject(FileItemsApiService),
  );
  displayedColumns = ['select', 'name', 'fileSize', 'lastChanged', 'actions'];

  fileTypeControl = new FormControl('');
  fileTypeGroups = MOCK_FILE_TYPE_GROUPS;

  timeSpanControl = new FormControl('');
  timeSpans: ITimeSpan[] = MOCK_TIME_SPANS;

  contextMenuPosition = { x: '0px', y: '0px' };

  EnFileAction = EnFileAction;

  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<FileItem>(
    this.allowMultiSelect,
    this.initialSelection,
  );

  constructor(
    private fileItemApiService: FileItemsApiService,
    private dialog: MatDialog,
  ) {}

  ngAfterViewInit(): void {
    this.dataSource = new FileItemsDataSource(this.fileItemApiService);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  clearFilters() {
    this.fileTypeControl.setValue('');
    this.timeSpanControl.setValue('');
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.value.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data
          .pipe(
            map((fileItems) => {
              fileItems?.forEach((row) => this.selection.select(row));
            }),
          )
          .subscribe();
  }

  onContextMenuAction(event: any, file: FileItem) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { file: file };
    this.contextMenu.menu?.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  editFileItem(action: EnFileAction, fileItem?: FileItem) {
    const dialogRef = this.dialog.open(EditFileItemModalComponent, {
      data: fileItem ? { name: fileItem.name, color: '', action } : { action },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      console.log(result);
    });
  }

  uploadFile() {}

  uploadFolder() {}

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

  deleteFile(file: FileItem) {
    // TODO
    alert('Delete ' + file.name);
  }
}
