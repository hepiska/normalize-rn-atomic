import * as React from 'react'
import { StackActions } from '@react-navigation/native'

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

export function replace(name, params) {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted

    navigationRef.current.replace(name, params)
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

export function dispatch(params) {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted

    navigationRef.current.dispatch(params)
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

export function goBack<goBackParamsType>(name?: string, params?: any) {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.goBack(name, params)
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

export function push<goBackParamsType>(name, params) {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    const pushAction = StackActions.push(name, params)
    navigationRef.current.dispatch(pushAction)
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
