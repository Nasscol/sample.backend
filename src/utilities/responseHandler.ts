import { Response } from "express";
/*
standard success response*/

export const successResponse = (
    res: Response,
    message: string,
    data: any = null,
    statusCode : number = 200
) => {
    return res.status(statusCode).json({
        success : true,
        message,
        data
    })
}
/*
standard error response/message
*/
export const errorResponse = (
    res: Response,
    message: string,
    data: any = null,
    statusCode : number = 500
) => {
    return res.status(statusCode).json({
        success:false,
        message,
         error: process.env.NODE_ENV === 'production' ? undefined : Error,
    })
}
//Error message 404 for issue not found

export const errorResponse2 = (
    res: Response,
    message: string,
    data: any = null,
    statusCode: number = 404
) => {
    return res.status(statusCode).json({
        success: false,
        message,
        error: process.env.NODE_ENV === 'production' ? undefined : Error,
    })
}