import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseObject, Lookup } from 'src/app/shared/common-entities.model';
import { Farmer, Farm, FarmersQuery, FarmsQuery} from './farmer.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  totalFarmers = 0
  totalFarms = 0

  constructor(private http: HttpClient) { }

  fetchFarmsByFamerId(farmerId: number) {
    return this.http.get<ResponseObject<Lookup[]>>(`${environment.baseUrl}/farms/getfarmerfarms?farmerId=${farmerId}`)
      .pipe(
        map(res => {
          if (res.success) { return res.data }
        })
      )
  }

  fetchFarmers() {
    return this.http.get<ResponseObject<Farmer[]>>(`${environment.baseUrl}/farmers/adminget`)
      .pipe(
        map(res => {
          if (res.success) { return res.data }
        })
      )
  }

  queryFarmers(params: FarmersQuery) {
    return this.http.post<ResponseObject<Farmer[]>>(`${environment.baseUrl}/farmers/adminquery`, params)
      .pipe(
        map(res => {
          if (res.success) {
            this.totalFarmers = res.total
            return res.data
          }
        })
      )
  }

  findFarmer(id: number) {
    return this.http.get<ResponseObject<Farmer>>(`${environment.baseUrl}/farmers/get/${id}`)
      .pipe(
        map(res => {
          if (res.success) {
            return res.data
          }
        })
      )
  }

  deleteFarmer(id: number) {
    return this.http.delete<ResponseObject<Farmer>>(`${environment.baseUrl}/farmers/delete/${id}`)
  }

  saveFarmer(params: Farmer) {
    if (params.id) { return this.http.put<ResponseObject<Farmer>>(`${environment.baseUrl}/farmers/adminput`, params) }
    return this.http.post<ResponseObject<Farmer>>(`${environment.baseUrl}/farmers/adminpost`, params)
  }

  fetchFarms() {
    return this.http.get<ResponseObject<Farm[]>>(`${environment.baseUrl}/farms/adminget`)
      .pipe(
        map(res => {
          if (res.success) { return res.data }
        })
      )
  }

  queryFarms(params: FarmsQuery) {
    return this.http.post<ResponseObject<Farm[]>>(`${environment.baseUrl}/farms/adminquery`, params)
      .pipe(
        map(res => {
          if (res.success) {
            this.totalFarms = res.total
            return res.data
          }
        })
      )
  }

  queryMapFarms(params: FarmsQuery) {
    return this.http.post<ResponseObject<Farm[]>>(`${environment.baseUrl}/farms/adminmapquery`, params)
      .pipe(
        map(res => {
          if (res.success) {
            this.totalFarms = res.total
            return res.data
          }
        })
      )
  }

  findFarm(id: number) {
    return this.http.get<ResponseObject<Farm>>(`${environment.baseUrl}/farms/get/${id}`)
      .pipe(
        map(res => {
          if (res.success) {
            return res.data
          }
        })
      )
  }

  deleteFarm(id: number) {
    return this.http.delete<ResponseObject<Farm>>(`${environment.baseUrl}/farms/delete/${id}`)
  }

  saveFarm(params: Farm) {
    if (params.id) { return this.http.put<ResponseObject<Farm>>(`${environment.baseUrl}/farms/adminput`, params) }
    return this.http.post<ResponseObject<Farm>>(`${environment.baseUrl}/farms/adminpost`, params)
  }

}
