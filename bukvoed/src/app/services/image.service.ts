import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'https://pixabay.com/api/';

  constructor(private http: HttpClient) {}

  searchImage(query: string): Observable<string | null> {
    const params = {
      key: environment.pixabayApiKey,
      q: query,
      lang: 'ru',
      image_type: 'photo',
      per_page: 3
    };

    return this.http.get<PixabayResponse>(this.apiUrl, { params }).pipe(
      map(response => {
        if (response && response.hits && response.hits.length > 0) {
          return response.hits[0].webformatURL;
        }
        return null;
      }),
      catchError(() => of(null))
    );
  }
}
