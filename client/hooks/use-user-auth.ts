import { useQuery } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { getUser } from '../apis/users-api.ts'

import { useAddUser, useAddTicket } from '../apis/users-api.ts'

export function useUserAuth() {
  const { user, getAccessTokenSilently } = useAuth0()

  const query = useQuery({
    enabled: !!user,
    queryKey: ['current-user'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()

      return await getUser(token)
    },
  })

  return { ...query, add: useAddUser(), addTicket: useAddTicket() }
}
