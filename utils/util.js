exports.successmessage = (message, payload = true) => {
    return {
      success: true,
      message,
      data: payload
    }
  }
  exports.errormessage = (error) => {
    return {
      success: false,
      error
    }
  }