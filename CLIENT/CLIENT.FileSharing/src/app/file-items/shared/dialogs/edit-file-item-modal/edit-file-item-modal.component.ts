import { Component, inject, model, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FileItemEditModel } from '../../file-item-edit.model';
import { EnFileAction } from '../../file-action-type.enum';

@Component({
  selector: 'fs-edit-file-item-modal',
  templateUrl: './edit-file-item-modal.component.html',
  styleUrl: './edit-file-item-modal.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class EditFileItemModalComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditFileItemModalComponent>);
  readonly data = inject<FileItemEditModel>(MAT_DIALOG_DATA);
  readonly name = model(this.data.name);
  readonly color = model(this.data.color);
  readonly action = model(this.data.action);

  EnFileAction = EnFileAction;

  constructor() {}

  ngOnInit() {}

  testIt() {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
