import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
import { FileSharingStore } from '../../core/store/fileSharing.store';

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
    inject(FileSharingStore),
    this.paginator,
    this.sort,
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
    protected store: FileSharingStore,
    private fileItemApiService: FileItemsApiService,
    private dialog: MatDialog,
  ) {}

  ngAfterViewInit(): void {
    this.dataSource = new FileItemsDataSource(
      this.store,
      this.paginator,
      this.sort,
      this.fileItemApiService,
    );
    this.table.dataSource = this.dataSource;
    let path = this.store.$getNavigationPath();
    if (!path) {
      this.dataSource.getFileItems().subscribe();
      return;
    }
    let lastPath = path.reduce((prev, current) =>
      prev.sortId > current.sortId ? prev : current,
    );
    this.dataSource.getFileItemById(lastPath.fileItemId).subscribe();
  }

  clearFilters() {
    this.fileTypeControl.setValue('');
    this.timeSpanControl.setValue('');
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  onContextMenuAction(event: any, file: FileItem) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { file: file };
    this.contextMenu.menu?.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  onGetFileItem(fileItemId: number) {
    let clickedFileItem =
      this.dataSource.currentFileItem?.fileItems?.$values.find(
        (x) => x.id === fileItemId,
      );
    if (!clickedFileItem) {
      this.selection.clear();
      this.store.updateNavigationPath(null);
      this.dataSource.getFileItemById(fileItemId).subscribe();
      return;
    }
    if (!clickedFileItem.isFolder) return;
    this.selection.clear();
    this.dataSource.getFileItemById(clickedFileItem.id).subscribe();
  }

  onGetFileItems() {
    this.selection.clear();
    this.store.updateNavigationPath(null);
    this.dataSource.getFileItems().subscribe();
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
