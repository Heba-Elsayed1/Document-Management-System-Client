import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { WorkspaceService } from '../workspace/workspace.service';
import { Observable } from 'rxjs';
import { FolderDto } from './directory.model';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor(private http:HttpClient, private workspaceService:WorkspaceService) {}

  getFoldersByWorkspace(workspaceId : number,pageNumber: number, pageSize: number):Observable<FolderDto[]>{
   return this.http.get<FolderDto[]>(`https://localhost:7163/api/Folder/workspace/${workspaceId}?pageNumber=${pageNumber}&pageSize=${pageSize}`) ;
  } 

  getPublicFolders(pageNumber: number, pageSize: number){
   return this.http.get<FolderDto[]>(`https://localhost:7163/api/Folder/isPublic?pageNumber=${pageNumber}&pageSize=${pageSize}`) ;
  } 

  updateFolder(Folderdto : FolderDto):Observable<any>{
   return this.http.put<FolderDto>(`https://localhost:7163/api/Folder` , Folderdto) ;
  }

  deleteFolder(folderId : number){
   return this.http.delete(`https://localhost:7163/api/Folder/${folderId}`) ;
  }

  CreateFolder(FolderName : string , isPublic: boolean){
   return this.http.post(`https://localhost:7163/api/Folder?folderName=${FolderName}&isPublic=${isPublic}`,null) ;
  }

}
