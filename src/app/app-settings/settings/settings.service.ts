import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseObject } from '../../shared/common-entities.model';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

export class LookUps {
  static get models() {
    return [
      {label: 'Services', description: 'Add, Edit and Delete Services', name: 'services', icon: 'fa fa-list-ul'},
      {label: 'Varieties', description: 'Add, Edit and Delete Varieties', name: 'varieties', icon: 'fa fa-shopping-basket'},
      {label: 'Regions', description: 'Add, Edit and Delete Regions', name: 'regions', icon: 'fa fa-globe'},
      {label: 'Districts', description: 'Add, Edit and Delete Districts', name: 'districts', icon: 'fa fa-location-arrow'},
      {label: 'Catchment Areas', description: 'Add, Edit and Delete Areas', name: 'catchmentareas', icon: 'fa fa-map-marker'}
    ];
  }
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  model: any;
  baseApi = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  fetch(name: string) {
    return this.httpClient.get<ResponseObject<any>>(`${this.baseApi}/${name}`);
  }

  fetch2(name: string) {
    return this.httpClient.get<ResponseObject<any>>(`${this.baseApi}/${name}`).pipe(
      map(res => {
        if (res.success) { return res.data }
      })
    );
  }

  save(name: string, params: any) {
    if (params.id) { return this.httpClient.put<ResponseObject<any>>(`${this.baseApi}/${name}`, params); }
    return this.httpClient.post<ResponseObject<any>>(`${this.baseApi}/${name}`, params);
  }

  destroy(name: string, id: number) {
    return this.httpClient.delete<ResponseObject<any>>(`${this.baseApi}/${name}/delete/${id}`);
  }
}
