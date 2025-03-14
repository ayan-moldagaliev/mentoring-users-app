import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'materials-content',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
    ],
  templateUrl: './users-materials-content.component.html',
  styleUrls: ['./users-materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMaterialsContentComponent {
  public data = inject(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef<UserMaterialsContentComponent>);

  public materialLink: string = this.data.material.material_link;

  public playAudio(): void {
    const dialogRef = this.dialog.open(UserMaterialsContentComponent, {
      data: { material: this.data.material },
    });

    dialogRef
    .afterClosed()
    .subscribe()
  }

  public getVideoId(): string | null {
    const youtubeRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/;
    const match = this.materialLink.match(youtubeRegex);
    return match ? match[1] || match[2] : null;
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
