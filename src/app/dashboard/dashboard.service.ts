import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseObject, Lookup } from '../shared/common-entities.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getGeneralStatistics() {
    return this.http.get<ResponseObject<any>>(`${environment.baseUrl}/dashboard/generalstats`).pipe(
      map(res => {
        if (res.success) { return res.data }
      })
    )
  }

  getYearlyStatistics(year: number) {
    return this.http.get<ResponseObject<any>>(`${environment.baseUrl}/dashboard/yearlystats?year=${year}`).pipe(
      map(res => {
        if (res.success) { return res.data }
      })
    )
  }
}
