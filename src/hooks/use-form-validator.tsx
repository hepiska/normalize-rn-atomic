import { useState, useCallback, useEffect } from 'react'
import { splitCamelCaseToString } from '@utils/helpers'

interface extraPropsType {
  onChangeCallback: (disabled, state) => void
}

export const useFormValidator = (
  schema,
  callback,
  reduxProps?: any,
  extraProps?: extraPropsType,
) => {
  const stateSchema = Object.assign(
    {},
    ...Object.keys(schema).map(key => ({
      [key]: {
        value: reduxProps
          ? reduxProps.reduxState[key]
          : schema[key].initialValue
          ? schema[key].initialValue
          : '',
        error: '',
      },
    })),
  )
  const [state, setState] = useState(stateSchema)
  const [disable, setDisable] = useState(true)
  const [isDirty, setIsDirty] = useState(false)
  const [customError, setCustomError] = useState(null)

  const validateState = useCallback(() => {
    const hasErrorInState = Object.keys(schema).some(key => {
      const isInputFieldRequired = schema[key].required
      const stateValue = state[key].value
      const stateError = state[key].error
      return stateError || (isInputFieldRequired && !stateValue)
    })

    return hasErrorInState
  }, [state, schema])

  const validate = ({ name, value }) => {
    let error = ''
    if (schema[name].required) {
      if (!value) {
        error =
          schema[name].message ||
          `${schema[name].label || splitCamelCaseToString(name)} must be filled`
      }
    }

    if (schema[name].pattern && typeof schema[name].pattern === 'object') {
      if (
        value &&
        schema[name].pattern.regEx &&
        !schema[name].pattern.regEx.test(value)
      ) {
        error = schema[name].pattern.message
      }

      if (value && typeof schema[name].pattern.condition === 'function') {
        if (schema[name].pattern.condition(value, state) === false) {
          error = schema[name].pattern.message
        }
      } else if (value && typeof schema[name].pattern.condition === 'boolean') {
        if (!schema[name].pattern.condition) {
          error = schema[name].pattern.message
        }
      }
    }

    if (customError && customError[name]) {
      error = customError[name].error
    }

    setState(prevState => ({
      ...prevState,
      [name]: { value, error },
    }))
  }

  const handleOnChange = useCallback(
    name => value => {
      setIsDirty(true)
      validate({ name, value })
    },
    [schema],
  )

  const setFieldError = useCallback(
    ({ field, pattern }) => {
      let error = ''
      if (pattern.condition) {
        error = pattern.message
      }
      setCustomError(prevState => ({
        ...prevState,
        [field]: {
          value: state[field].value,
          error: error,
        },
      }))
      setState(prevState => ({
        ...prevState,
        [field]: {
          value: state[field].value,
          error: error,
        },
      }))
    },
    [state],
  )

  const handleOnSubmit = useCallback(() => {
    let isValid = false

    if (!validateState()) {
      isValid = true
    } else {
      setIsDirty(true)
      Object.keys(state).map(key => {
        return validate({ name: key, value: state[key].value })
      })
    }

    callback({ isValid, state })
  }, [state])

  useEffect(() => {
    setDisable(true)
  }, [])

  useEffect(() => {
    if (isDirty) {
      setDisable(validateState())
    }
    if (extraProps && extraProps.onChangeCallback) {
      extraProps.onChangeCallback(validateState(), state)
    }
  }, [state, isDirty])

  return { state, disable, handleOnChange, handleOnSubmit, setFieldError }
}
