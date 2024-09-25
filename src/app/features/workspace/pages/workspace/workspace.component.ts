import { Component, inject, OnInit } from '@angular/core';
import { WorkspaceService } from '../../workspace.service';
import { HttpClientModule } from '@angular/common/http';
import { DirectoryService } from '../../../directory/directory.service';
import { FolderDto } from '../../../directory/directory.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateWorkspaceComponent } from './update-workspace/update-workspace.component';
import { WorkspaceDto } from '../../workspace.model';
import { AuthServiceService } from '../../../../core/auth/auth.service.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DirectoryComponent } from "../../../directory/pages/directory/directory.component";
import { AddDirectoryComponent } from './add-directory/add-directory.component';


@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [HttpClientModule, FormsModule, DirectoryComponent],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent implements OnInit {
  workspaceName: string = "";
  workspaceId: number = 0;
  folders: FolderDto[] = [];
  UserId: number = 0;
  isUser = false;
  isPressed = false;
  sharedFolders: FolderDto[] = [];
  buttonValue = 'Shared folders';
  pageNumber=1;
  pageSize=4;
  sharedPageNumber=1;
  sharedPageSize=4;

  constructor(private workspaceService: WorkspaceService,
    private directoryService: DirectoryService, private authService: AuthServiceService,
    private activatedRoute: ActivatedRoute) { }

  updateWorkspace(form: WorkspaceDto) {
    this.workspaceService.updateWorkspace(form).subscribe({
      next: data => {
        this.workspaceName = form.name;
      },
      error: err => {
        console.log(err.error);
      }
    })
  }

  ngOnInit(): void {
    this.isUser = this.authService.isUser();
    this.startPage();
  }

  startPage(){
    if (this.isUser) {
      this.getWorkspaceOfUser();
    }
    else {
      this.activatedRoute.queryParams.subscribe((queryParams: Params) => { this.UserId = queryParams['userId']; });

      this.getWorkspaceByUser();
    }
  }

  onPageChange(newPage: number){
    this.pageNumber= newPage ;
    this.startPage();
  }

  getWorkspaceOfUser() {
    this.workspaceService.getWorkspace().subscribe({
      next: workspaceData => {
        this.workspaceName = workspaceData.name;
        this.workspaceId = workspaceData.id;
        this.directoryService.getFoldersByWorkspace(workspaceData.id,this.pageNumber,this.pageSize).subscribe({
          next: foldersData => {
            this.folders = foldersData;
          }
        })
      },
      error: err => {
        console.error('Error fetching workspace:', err);
      }
    });
  }

  getWorkspaceByUser() {
    this.workspaceService.getWorkspaceByUser(this.UserId).subscribe({
      next: workspaceData => {
        this.workspaceName = workspaceData.name;
        this.workspaceId = workspaceData.id;
        this.directoryService.getFoldersByWorkspace(workspaceData.id,this.pageNumber,this.pageSize).subscribe({
          next: foldersData => {
            this.folders = foldersData;
          }
        })
      },
      error: err => {
        console.error('Error fetching workspace:', err);
      }
    });
  }

  private modalService = inject(NgbModal);
  openUpdate() {
    if (this.isUser) {
      const modalRef = this.modalService.open(UpdateWorkspaceComponent, {
        backdrop: 'static',
        keyboard: false
      });

      modalRef.componentInstance.id = this.workspaceId;
      modalRef.componentInstance.name= this.workspaceName;

      modalRef.result.then((result => {
        if (result) {
          this.updateWorkspace(result);
        }
      }),
        error => {
          console.log("there is an error");
        }
      );
    }

  }

  openAddFolder() {
    const modalRef = this.modalService.open(AddDirectoryComponent, {
      backdrop: 'static',
      keyboard: false
    });

    modalRef.result.then((result => {
      if (result) {
        this.createFolder(result);
      }
    }),
      error => {
        console.log("there is an error");
      }
    );
  }

  createFolder(result: any) {
    this.directoryService.CreateFolder(result.name, result.isPublic).subscribe({
      next: result => {
        this.directoryService.getFoldersByWorkspace(this.workspaceId,this.pageNumber,this.pageSize).subscribe({
          next: directories => {
            this.folders = directories;
          }
        })
      },
      error: err => { console.log(err.error); }
    });
  }


  pressed() {
    this.getPublicFolders();
    if (this.buttonValue == 'My folders') {
      this.isPressed = false;
      this.buttonValue = 'Shared folders';
    }
    else if (this.buttonValue == 'Shared folders') {
      this.isPressed = true;
      this.buttonValue = 'My folders'
    }
  }
  getPublicFolders(){
    this.directoryService.getPublicFolders(this.sharedPageNumber,this.sharedPageSize).subscribe({
      next: folderData => {
        this.sharedFolders = folderData;
      }
    })
  }
  onSharedPageChange(newPage:number){
  this.sharedPageNumber= newPage;
   this.getPublicFolders();
  }
}