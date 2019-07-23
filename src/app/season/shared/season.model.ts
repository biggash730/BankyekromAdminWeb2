import { ModelQuery } from 'src/app/shared/common-entities.model';

export interface Season {
    id: number
    reference: string
    farmId: string
    farm: any
    isActive: boolean
    datePlanted: Date
    projectedHarvestDate: Date
    harvestDate: any
    varietyId: number
    variety: any
    notes: string
    expectedQuantity: number
    actualQuantity: number
    farmCode: string
    town: string
    longitude: number
    latitude: number
    numberOfAcres: number
    ghanaPostGps: string
    district: string
    region: string
}

export interface SeasonsQuery extends ModelQuery {
    id: number
    farmId: number
    varietyId: number
    town: string
    farmCode: number
    regionId: number
    districtId: number
}
