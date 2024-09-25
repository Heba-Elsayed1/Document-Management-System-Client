import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentUploadDto } from '../../../upload-document.model';

@Component({
  selector: 'app-upload-document',
  standalone: true,
  imports: [],
  templateUrl: './upload-document.component.html',
  styleUrl: './upload-document.component.scss'
})
export class UploadDocumentComponent {
  file: File | null = null;
  documentUploadDto: DocumentUploadDto = {
    folderId: 0,
    file: {} as File
  };

  constructor(protected activeModal: NgbActiveModal) { }
  @Input({ required: true }) folderId: number = 0;

  handleUpload() {
    if (!this.file) {
      return;
    }
    this.documentUploadDto = {
      folderId: this.folderId,
      file: this.file
    };
    this.activeModal.close(this.documentUploadDto);
  }

  handleClose() {
    this.activeModal.close();
  }

  onChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
    }
  }

}
