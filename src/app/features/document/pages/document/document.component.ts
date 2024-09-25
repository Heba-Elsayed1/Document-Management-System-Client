import { Component, inject, OnInit } from '@angular/core';
import { DocumentDto } from '../../document.model';
import { ActivatedRoute, Params } from '@angular/router';
import { DocumentService } from '../../document.service';
import { CommonModule } from '@angular/common';
import { UpdateDocumentComponent } from './update-document/update-document.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadDocumentComponent } from "./upload-document/upload-document.component";
import { DocumentUploadDto } from '../../upload-document.model';
import { AuthServiceService } from '../../../../core/auth/auth.service.service';
import { UserService } from '../../../user/user.service';
import { Router } from '@angular/router';
import { DeleteComponent } from '../../../../shared/components/delete/delete.component';

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [CommonModule, UploadDocumentComponent],
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss'
})
export class DocumentComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private documentService: DocumentService,
    private authService: AuthServiceService, private userService: UserService,
    private router: Router) { }

  folderId: number = 0;
  isShared: boolean = false;
  documents: DocumentDto[] = [];
  isUser: boolean = false;
  isUserDocument: boolean = false;
  pageNumber=1;
  pageSize=7;

  ngOnInit(): void {
    this.isUser = this.authService.isUser();
    this.activatedRoute.params.subscribe((res: Params) => {
      this.folderId = res['id'];
    });

    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      this.isShared = queryParams['isShared'] === 'true';

    });
    this.viewDocuments();
    this.checkUser();
  }

  viewDocuments() {
    this.documentService.getDocumentsByFolder(this.folderId,this.pageNumber,this.pageSize).subscribe({
      next: documentsData => {
        this.documents = documentsData;
      },
      error: err => {}
    })
  }

  onPageChange(newPage: number){
    this.pageNumber= newPage ;
    this.viewDocuments();
  }

  previewDocument(documentId: number) {
    this.documentService.previewDocument(documentId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    })
  }

  downloadDocument(documentId: number) {
    this.documentService.DownloadDocument(documentId);

  }

  updateDocument(docuemntId: number, docuemntName: string) {
    this.documentService.updateDocument(docuemntId, docuemntName).subscribe({
      next: result => {
        this.documentService.getDocumentById(docuemntId).subscribe({
          next: documentdata => {
            let willUpdatedDocument = this.documents.find(d => d.id == docuemntId);
            if (willUpdatedDocument) {
              willUpdatedDocument.name = documentdata.name;
            }
          }
        })

      },
      error: err => {
        console.log(err.error);
      }
    })
  }

  uploadDocument(documentUpload: DocumentUploadDto) {

    const formData = new FormData();
    formData.append('FolderId', documentUpload.folderId.toString());
    formData.append('File', documentUpload.file);

    this.documentService.uploadDocument(formData).subscribe({
      next: result => {
        this.viewDocuments();
      },
      error: err => { console.log(err.error); }
    })
  }

  deleteDocument(documentId: number) {
    this.documentService.deleteDocument(documentId).subscribe({
      next: result => {
        this.documents = this.documents.filter(d => d.id != documentId);
      }
    })
  }

  private modalService = inject(NgbModal);
  openUpdate(document: DocumentDto) {
    const modalRef = this.modalService.open(UpdateDocumentComponent, {
      backdrop: 'static',
      keyboard: false
    });

    modalRef.componentInstance.name = document.name;

    modalRef.result.then((result => {
      if (result) {
        this.updateDocument(document.id, result);
      }
    }),
      error => {
        console.log("there is an error");
      }
    );
  }

  openUpload() {
    const modalRef = this.modalService.open(UploadDocumentComponent, {
      backdrop: 'static',
      keyboard: false
    });

    modalRef.componentInstance.folderId = this.folderId;

    modalRef.result.then((result => {
      if (result) {
        this.uploadDocument(result);
      }
    }),
      error => {
        console.log("there is an error");
      }
    );
  }

  openDelete(DocumentName : string , DocumentId: number) {
    const modalRef = this.modalService.open(DeleteComponent, {
      backdrop: 'static',
      keyboard: false
    });

    modalRef.componentInstance.name = DocumentName;

    modalRef.result.then((result => {
      if (result) {
        this.deleteDocument(DocumentId);
      }
    }),
      error => {
        console.log("there is an error");
      }
    );
  }


  checkUser() {
    this.userService.getUser().subscribe({
      next: userData => {
        this.documentService.getDocumentOfUser(this.folderId, userData.id).subscribe({
          next: isUserDocument => {
            this.isUserDocument = isUserDocument;
          },
          error: err => {
          }
        })
      }
    })
  }

}
