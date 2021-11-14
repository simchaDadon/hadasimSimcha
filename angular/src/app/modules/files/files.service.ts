import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) {
  }

  getAnswer(file: File, whichPath: string): Observable<void> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<void>(`http://localhost:5000/${whichPath}`, formData);
  }
}