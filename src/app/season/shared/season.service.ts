import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseObject, Lookup } from 'src/app/shared/common-entities.model';
import { Season, SeasonsQuery} from './season.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {

  totalSeasons = 0

  constructor(private http: HttpClient) { }

  fetchSeasons() {
    return this.http.get<ResponseObject<Season[]>>(`${environment.baseUrl}/seasons/adminget`)
      .pipe(
        map(res => {
          if (res.success) { return res.data }
        })
      )
  }

  querySeasons(params: SeasonsQuery) {
    return this.http.post<ResponseObject<Season[]>>(`${environment.baseUrl}/seasons/adminquery`, params)
      .pipe(
        map(res => {
          if (res.success) {
            this.totalSeasons = res.total
            return res.data
          }
        })
      )
  }

  queryActiveSeasonsMap(params: any) {
    return this.http.post<ResponseObject<Season[]>>(`${environment.baseUrl}/seasons/queryactivemap`, params)
      .pipe(
        map(res => {
          if (res.success) {
            return res.data
          }
        })
      )
  }

  querySeasonsStats(params: any) {
    return this.http.post<ResponseObject<Season[]>>(`${environment.baseUrl}/seasons/querystats`, params)
      .pipe(
        map(res => {
          if (res.success) {
            return res.data
          }
        })
      )
  }

  findSeason(id: number) {
    return this.http.get<ResponseObject<Season>>(`${environment.baseUrl}/seasons/get/${id}`)
      .pipe(
        map(res => {
          if (res.success) {
            return res.data
          }
        })
      )
  }

  deleteSeason(id: number) {
    return this.http.delete<ResponseObject<Season>>(`${environment.baseUrl}/seasons/delete/${id}`)
  }

  saveSeason(params: Season) {
    if (params.id) { return this.http.put<ResponseObject<Season>>(`${environment.baseUrl}/seasons/adminput`, params) }
    return this.http.post<ResponseObject<Season>>(`${environment.baseUrl}/seasons/adminpost`, params)
  }
}
