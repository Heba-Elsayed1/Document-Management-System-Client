import { HttpClientModule } from '@angular/common/http';
import { Component, inject, Input, input, OnInit } from '@angular/core';
import { FolderDto } from '../../directory.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DirectoryService } from '../../directory.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UpdateDirectoryComponent } from './update-directory/update-directory.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../../core/auth/auth.service.service';
import { DeleteComponent } from '../../../../shared/components/delete/delete.component';



@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule],
  templateUrl: './directory.component.html',
  styleUrl: './directory.component.scss'
})
export class DirectoryComponent implements OnInit {
  @Input({ required: true }) folders: FolderDto[] = {} as FolderDto[];
  @Input({ required: true }) isShared: boolean = false as boolean;

  isVisible = true;
  isUpdated = false;
  errorMessage: string = '';
  valuesUpdated = false;
  isUser = false;
  

  constructor(private formBuilder: FormBuilder,
    private directoryService: DirectoryService, private router: Router, private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.isUser = this.authService.isUser();
  }

  UpdateFolder(form: FolderDto) {
    this.directoryService.updateFolder(form).subscribe({
      next: data => {
        this.valuesUpdated = true;
        ///1-listen to the result of http request
        /// then update the corresponding directory

        let willBeUpdatedDirectory = this.folders.find(f => f.id == form.id);
        if (willBeUpdatedDirectory)
          willBeUpdatedDirectory.name = form.name;
      },
      error: err => {
        this.errorMessage = err.error;
        console.log(err.error);
      }
    })
  }

  deleteFolder(FolderId: number) {
    this.directoryService.deleteFolder(FolderId).subscribe({
      next: data => {
        this.folders = this.folders.filter(f => f.id != FolderId)
      }
      ,
      error: err => {
        this.errorMessage = err.error;
        console.log(err.error);
      }
    })
  }
  private modalService = inject(NgbModal);
  openUpdate(folder: FolderDto) {
    const modalRef = this.modalService.open(UpdateDirectoryComponent, {
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.id = folder.id;
    modalRef.componentInstance.name = folder.name;
    modalRef.componentInstance.isPublic = folder.isPublic;

    modalRef.result.then((result => {
      if (result) {
        this.UpdateFolder(result);
      }
    }),
      error => {
        console.log("there is an error");
      }
    );
  }

  openFolder(folderId: number) {
    this.router.navigate(['/document', folderId], { queryParams: { isShared: this.isShared } });
  }

  openDelete(folderName : string , folderId: number) {
    const modalRef = this.modalService.open(DeleteComponent, {
      backdrop: 'static',
      keyboard: false
    });

    modalRef.componentInstance.name = folderName;

    modalRef.result.then((result => {
      if (result) {
        this.deleteFolder(folderId);
      }
    }),
      error => {
        console.log("there is an error");
      }
    );
  }

}
