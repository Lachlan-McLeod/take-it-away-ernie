import { useQuery } from '@tanstack/react-query'

import {
  getAllAvatars,
  useAddAvatar,
  useAddAvatarFile,
} from '../apis/avatars-api'

export function useAvatars() {
  const query = useQuery({
    queryKey: ['avatars'],
    queryFn: getAllAvatars,
  })

  return { ...query, add: useAddAvatar(), addFile: useAddAvatarFile() }
}
