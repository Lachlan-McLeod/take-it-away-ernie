import { useQuery } from '@tanstack/react-query'
import { getQuestionsByEventId } from '../apis/questions-api'

export default function useQuestionsByEventId(eventId: number) {
  return useQuery({
    queryKey: ['questions'],
    queryFn: () => {
      getQuestionsByEventId(eventId)
    },
  })
}
