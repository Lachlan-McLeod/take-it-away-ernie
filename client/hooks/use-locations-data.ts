import { useQuery } from '@tanstack/react-query'
import { getLocationImagesById, getLocations } from '../apis/locations-api'

export function useLocations() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: getLocations,
  })
}

export function useLocationImages(id: number) {
  return useQuery({
    queryKey: ['locationImages', Number(id)],
    queryFn: () => getLocationImagesById(id),
  })
}
