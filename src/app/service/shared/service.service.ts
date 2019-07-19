import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseObject, Lookup } from 'src/app/shared/common-entities.model';
import { ServiceProvider, ServiceRequest, ServiceProvidersQuery, ServiceRequestsQuery, Processor, ProcessorsQuery} from './service.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestsService {

  totalServiceRequests = 0
  totalServiceProviders = 0
  totalProcessors = 0

  constructor(private http: HttpClient) { }

  fetchServiceRequests() {
    return this.http.get<ResponseObject<ServiceRequest[]>>(`${environment.baseUrl}/servicerequests/adminget`)
      .pipe(
        map(res => {
          if (res.success) { return res.data }
        })
      )
  }

  queryServiceRequests(params: ServiceRequestsQuery) {
    return this.http.post<ResponseObject<ServiceRequest[]>>(`${environment.baseUrl}/servicerequests/adminquery`, params)
      .pipe(
        map(res => {
          if (res.success) {
            this.totalServiceRequests = res.total
            return res.data
          }
        })
      )
  }

  findServiceRequest(id: number) {
    return this.http.get<ResponseObject<ServiceRequest>>(`${environment.baseUrl}/servicerequests/get/${id}`)
      .pipe(
        map(res => {
          if (res.success) {
            return res.data
          }
        })
      )
  }

  deleteServiceRequest(id: number) {
    return this.http.delete<ResponseObject<ServiceRequest>>(`${environment.baseUrl}/servicerequests/delete/${id}`)
  }

  saveServiceRequest(params: ServiceRequest) {
    if (params.id) { return this.http.put<ResponseObject<ServiceRequest>>(`${environment.baseUrl}/servicerequests/adminput`, params) }
    return this.http.post<ResponseObject<ServiceRequest>>(`${environment.baseUrl}/servicerequests/adminpost`, params)
  }

  fetchServiceProviders() {
    return this.http.get<ResponseObject<ServiceProvider[]>>(`${environment.baseUrl}/serviceproviders/adminget`)
      .pipe(
        map(res => {
          if (res.success) { return res.data }
        })
      )
  }

  queryServiceProviders(params: ServiceProvidersQuery) {
    return this.http.post<ResponseObject<ServiceProvider[]>>(`${environment.baseUrl}/serviceproviders/adminquery`, params)
      .pipe(
        map(res => {
          if (res.success) {
            this.totalServiceProviders = res.total
            return res.data
          }
        })
      )
  }

  findServiceProvider(id: number) {
    return this.http.get<ResponseObject<ServiceProvider>>(`${environment.baseUrl}/serviceproviders/get/${id}`)
      .pipe(
        map(res => {
          if (res.success) {
            return res.data
          }
        })
      )
  }

  deleteServiceProvider(id: number) {
    return this.http.delete<ResponseObject<ServiceProvider>>(`${environment.baseUrl}/serviceproviders/delete/${id}`)
  }

  saveServiceProvider(params: ServiceProvider) {
    if (params.id) { return this.http.put<ResponseObject<ServiceProvider>>(`${environment.baseUrl}/serviceproviders/adminput`, params) }
    return this.http.post<ResponseObject<ServiceProvider>>(`${environment.baseUrl}/serviceproviders/adminpost`, params)
  }

  fetchProcessors() {
    return this.http.get<ResponseObject<Processor[]>>(`${environment.baseUrl}/processors/adminget`)
      .pipe(
        map(res => {
          if (res.success) { return res.data }
        })
      )
  }

  queryProcessors(params: ProcessorsQuery) {
    return this.http.post<ResponseObject<Processor[]>>(`${environment.baseUrl}/processors/adminquery`, params)
      .pipe(
        map(res => {
          if (res.success) {
            this.totalProcessors = res.total
            return res.data
          }
        })
      )
  }

  findProcessor(id: number) {
    return this.http.get<ResponseObject<Processor>>(`${environment.baseUrl}/processors/get/${id}`)
      .pipe(
        map(res => {
          if (res.success) {
            return res.data
          }
        })
      )
  }

  deleteProcessor(id: number) {
    return this.http.delete<ResponseObject<Processor>>(`${environment.baseUrl}/processors/delete/${id}`)
  }

  saveProcessor(params: Processor) {
    if (params.id) { return this.http.put<ResponseObject<Processor>>(`${environment.baseUrl}/processors/adminput`, params) }
    return this.http.post<ResponseObject<Processor>>(`${environment.baseUrl}/processors/adminpost`, params)
  }

}
