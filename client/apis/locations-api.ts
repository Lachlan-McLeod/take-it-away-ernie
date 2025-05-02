import request from 'superagent'
import { TravelSelections } from '../../models/Locations'

const baseUrl = '/api/v1/locations'

export async function getLocations() {
  const response = await request.get(baseUrl)
  return response.body
}

export async function getTravelOptions(selections: TravelSelections) {
  const response = await request.post(baseUrl).send(selections)
  return response.body
}

export async function getLocationImagesById(id: number) {
  const response = await request.get(`${baseUrl}/${id}`)
  return response.body
}
