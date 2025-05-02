import request from 'superagent'
import { AvatarData } from '../../models/Avatars'
import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

const baseUrl = '/api/v1/avatars'

export const getAllAvatars = async () => {
  const res = await request.get(baseUrl)

  return res.body
}

interface NewAvatarMutation {
  newAvatar: AvatarData
  token: string
}

interface NewCustomAvatarMutation {
  newAvatar: FormData
  token: string
}

export const useAddAvatar = () => {
  return useAvatarMutation(addAvatar)
}

export const useAddAvatarFile = () => {
  return useAvatarMutation(addAvatarFile)
}

const addAvatar = async ({
  newAvatar,
  token,
}: NewAvatarMutation): Promise<AvatarData> => {
  return await request
    .post(baseUrl)
    .set('Authorization', `Bearer ${token}`)
    .send(newAvatar)
    .then((res) => res.body.newAvatar)
}

const addAvatarFile = async ({ newAvatar, token }: NewCustomAvatarMutation) => {
  const results = await request
    .post(baseUrl)
    .set('Authorization', `Bearer ${token}`)
    .send(newAvatar)

  return results.body
}

function useAvatarMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['avatars'] })
    },
  })

  return mutation
}
