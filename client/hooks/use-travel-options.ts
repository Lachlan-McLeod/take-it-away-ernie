import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getTravelOptions } from '../apis/locations-api'
import { TravelSelections } from '../../models/Locations'

export function useTravelOptions(selections: TravelSelections) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (selections: TravelSelections) =>
      getTravelOptions(selections),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['travelOptions', selections] })
    },
  })
}
