import Toast from 'react-native-simple-toast'

export const showErrors = (data) => {
  let errorToDisplay = ''
  const { error, message } = data

  if (error) {
    if (error?.base) {
      errorToDisplay = processError(error?.base)
    } else {
      if (typeof error === 'string') {
        errorToDisplay = error
      } else {
        errorToDisplay = processError(Object.keys(error).map(key => {
          return [`${key} ${processError(error[key])}`]
        }))
      }
    }
  } else if (message) {
    errorToDisplay = message
  }

  Toast.showWithGravity(errorToDisplay, Toast.LONG, Toast.BOTTOM)
}

const processError = (obj) => {
  if (Array.isArray(obj)) {
    return obj.join()
  } else {
    return obj
  }
}

export default Toast
