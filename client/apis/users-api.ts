import request from 'superagent'
import { UserData, UserWithDetails } from '../../models/Users'
import { TicketData } from '../../models/Tickets'
import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

const baseUrl = '/api/v1/users'

export async function getUser(token: string) {
  const res = await request.get(baseUrl).set('Authorization', `Bearer ${token}`)

  return res.body as UserWithDetails
}

interface NewUserMutation {
  newUser: UserData
  token: string
}
interface NewTicketMutation {
  newTicket: TicketData
  token: string
}

export const useAddUser = () => {
  return useUserMutation(addUser)
}

export const useAddTicket = () => {
  return useUserMutation(addTicket)
}

const addUser = async ({
  newUser,
  token,
}: NewUserMutation): Promise<UserData> => {
  return await request
    .post('/api/v1/users')
    .set('Authorization', `Bearer ${token}`)
    .send(newUser)
    .then((res) => res.body.newUser)
}

const addTicket = async ({
  newTicket,
  token,
}: NewTicketMutation): Promise<TicketData> => {
  return await request
    .post('/api/v1/users/tickets')
    .set('Authorization', `Bearer ${token}`)
    .send(newTicket)
    .then((res) => res.body.newTicket)
}

function useUserMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] })
    },
  })

  return mutation
}
