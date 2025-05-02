import { useQuery } from '@tanstack/react-query'

import { getAllQuestions } from '../apis/questions-api'

export default function useQuestions() {
  return useQuery({
    queryKey: ['questions'],
    queryFn: getAllQuestions,
  })
}
