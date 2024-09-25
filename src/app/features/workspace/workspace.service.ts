import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkspaceDto } from './workspace.model';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  constructor(private http: HttpClient ) { }


  getWorkspace(): Observable<WorkspaceDto> {
    return this.http.get<WorkspaceDto>('https://localhost:7163/api/Workspace/User')      
  }

  updateWorkspace(workspaceDto : WorkspaceDto) : Observable<any>{
    return this.http.put<WorkspaceDto>('https://localhost:7163/api/Workspace',workspaceDto)
  }

  getWorkspaceByUser(userId : number): Observable<WorkspaceDto>{
    return this.http.get<WorkspaceDto>(`https://localhost:7163/api/Workspace/Admin?userId=${userId}`)
  }
  

}  





