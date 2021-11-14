import { Component, Input, OnInit } from '@angular/core';
import { FilesService } from '../files.service';

@Component({
  selector: 'files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  answer = '';

  constructor(private filesService: FilesService) { }

  ngOnInit(): void { }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  getAnswer(whichPath: string): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        this.filesService.getAnswer(this.currentFile, whichPath).subscribe(
          (event: any) => {
            this.answer = event.message;
          },
          (err: any) => {
            if (err.error && err.error.message) {
              this.answer = "error: " + err.error.message;
            }
            else {
              this.answer = 'error!!';
            }
          });
      }
    }
  }

}
