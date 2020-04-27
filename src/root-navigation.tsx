import * as React from 'react'

interface goBackParamsType {
  name?: string
  params?: any
}

export const isMountedRef: any = { current: false }

export const navigationRef: any = React.createRef()

export const navigationInf = () => navigationRef.current

export function navigate(name, params) {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params)
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

export function goBack<goBackParamsType>(name, params) {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.goBack(name, params)
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
