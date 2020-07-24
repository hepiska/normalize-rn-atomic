import { useEffect, useState } from 'react'

import { request } from '@utils/services'

export const useuserReferrals = (refCode?: string) => {
  const [refUser, setRefuser] = useState(null)
  useEffect(() => {
    request({ url: '/users/referrals/' + refCode, method: 'GET' }).then(res => {
      setRefuser(res.data.data)
    })
  }, [])
  return [refUser]
}
