import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DocumentDto } from './document.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  getDocumentsByFolder(folderId: number,pageNumber: number, pageSize: number): Observable<DocumentDto[]>{
   
    return this.http.get<DocumentDto[]>(`https://localhost:7163/api/Document/Folder/${folderId}?pageNumber=${pageNumber}&pageSize=${pageSize}`) ;
  }

  getDocumentById(documentId: number): Observable<DocumentDto>{
   
    return this.http.get<DocumentDto>(`https://localhost:7163/api/Document/Metadata/${documentId}`) ;
  }

  getDocumentOfUser(folderId:number , userId: number){
    return this.http.get<boolean>(`https://localhost:7163/api/Document/User?folderId=${folderId}&userId=${userId}`) ;
  }

  previewDocument(documentId: number) {
    return this.http.get(`https://localhost:7163/api/Document/Preview/${documentId}`, {
      responseType: 'blob'
    });
  }
  
  DownloadDocument(documentId: number) {
    return this.http.get(`https://localhost:7163/api/Document/download/${documentId}`, {
      responseType: 'blob'
    }).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = ''; 
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    });
  }

  updateDocument(documentId : number , documentName : string):Observable<any>{
    return this.http.put<any>
    (`https://localhost:7163/api/Document/update?documentId=${documentId}&documentName=${documentName}`
      ,{})  ;
  }

  uploadDocument(documentUpload : any){
    return this.http.post('https://localhost:7163/api/Document/upload',documentUpload) ;
  }

  deleteDocument(documentId : number){
    return this.http.delete(`https://localhost:7163/api/Document/${documentId}`);
  }

}
