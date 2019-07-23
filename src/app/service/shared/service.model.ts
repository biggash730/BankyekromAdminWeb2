import { ModelQuery } from 'src/app/shared/common-entities.model';

export interface ServiceRequest {
    id: number
    farmId: number
    serviceDate: string
    notes: string
    serviceId: number
    charge: number
    status: string
    assignedToId: number
    service: any
    assignedTo: any
    farm: any
}
export interface ServiceRequestsQuery extends ModelQuery {
    id: number
    farmId: number
    serviceId: number
    status: string
    assignedToId: number
    code: string
    regionId: number
    districtId: number
    town: string
    phoneNumber: string
}

export interface ServiceProvider {
    id: number
    contactPerson: string
    name: string
    reference: string
    phoneNumber: string
    email: string
    address: string
    town: string
    longitude: number
    latitude: number
    districtId: number
    isActive: number
    isDeleted: boolean
    ghanaPostGps: string
    district: any
    services: any[]
}
export interface ServiceProvidersQuery extends ModelQuery {
    id: number
    contactPerson: string
    name: string
    reference: string
    phoneNumber: string
    email: string
    address: string
    town: string
    longitude: number
    latitude: number
    regionId: number
    districtId: number
    isActive: number
    ghanaPostGps: string
}

export interface Processor {
    id: number
    contactPerson: string
    name: string
    reference: string
    phoneNumber: string
    email: string
    address: string
    town: string
    longitude: number
    latitude: number
    districtId: number
    isActive: number
    isDeleted: boolean
    ghanaPostGps: string
    district: any
}
export interface ProcessorsQuery extends ModelQuery {
    id: number
    contactPerson: string
    name: string
    reference: string
    phoneNumber: string
    email: string
    address: string
    town: string
    longitude: number
    latitude: number
    regionId: number
    districtId: number
    isActive: number
    ghanaPostGps: string
}
