import {  TErrorMessages, TGenericErrorResponse } from "../interface/error"

const handleDuplicateError = (err: any): TGenericErrorResponse => {
    const match = err.message.match(/"([^"]*)"/)
    const extractedMesssage = match && match[1]

    const errorMessages: TErrorMessages = [
        {
            path: '',
            message: `${extractedMesssage} is already exists`
        }
    ]

    const statusCode = 400

    return {
        statusCode,
        message: 'Invalid ID',
        errorMessages
    }
}

export default handleDuplicateError;