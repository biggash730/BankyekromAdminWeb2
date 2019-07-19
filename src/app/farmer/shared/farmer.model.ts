import { ModelQuery } from 'src/app/shared/common-entities.model';

export interface Farmer {
    id: number
    phoneNumber: string
    name: string
    reference: string
    dateOfBirth: Date
    gender: string
    town: string
    residentialAddress: string
    areaId: number
    isActive: boolean
    isDeleted: boolean
    ghanaPostGps: string
    area: any
    farms: any[]
}

export interface Farm {
    id: number
    code: string
    name: string
    reference: string
    town: string
    location: string
    longitude: number
    latitude: number
    numberOfAcres: number
    farmerId: number
    isDeleted: boolean
    ghanaPostGps: string
    farmer: any
    requests: any[]
    seasons: any[]
}

export interface FarmersQuery extends ModelQuery {
    id: number
    phoneNumber: string
    name: string
    reference: string
    gender: string
    town: string
    residentialAddress: string
    areaId: number
    isActive: boolean
    ghanaPostGps: string
}

export interface FarmsQuery extends ModelQuery {
    id: number
    code: string
    name: string
    reference: string
    town: string
    location: string
    longitude: number
    latitude: number
    numberOfAcres: number
    farmerId: number
    isDeleted: boolean
    ghanaPostGps: string,
    size: number
}
