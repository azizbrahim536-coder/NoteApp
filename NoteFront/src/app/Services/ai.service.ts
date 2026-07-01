import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Note } from '../Entity/Note';

export interface AiSummaryResponse {
  summary: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private readonly apiUrl =
    'http://localhost:5000/api/ai';

  constructor(private http: HttpClient) {}

  summarizeNote(note: Note): Observable<AiSummaryResponse> {
    return this.http.post<AiSummaryResponse>(
      `${this.apiUrl}/summarize`,
      {
        title: note.title,
        content: note.content
      }
    );
  }
}
