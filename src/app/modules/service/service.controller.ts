import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ServiceServices } from "./service.service";


const createService = catchAsync ( async (req, res) => {
    const result = await ServiceServices.createServiceIntoDB(req.body)
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Service created successfully",
        data: result,
      });
} )

const getAllServices = catchAsync ( async ( req, res ) => {
    const result = await ServiceServices.getAllServicesIntoDB()

    sendResponse(res, {
        success: result[0] ? true : false,
        statusCode: result[0] ? httpStatus.OK : httpStatus.NOT_FOUND,
        message: result[0] ? "Services retrieved successfully" : "No Data Found",
        data: result,
      });
} )

const getSingleService = catchAsync ( async ( req, res ) => {
    const {id} = req.params
    const result = await ServiceServices.getSingleServiceIntoDB(id)

      sendResponse(res, {
        success: result ? true : false,
        statusCode: result ? httpStatus.OK : httpStatus.NOT_FOUND,
        message: result ? "Service retrieved successfully" : "No Data Found",
        data: result === null? [] : result ,
      });
} )

const updateSingleService = catchAsync ( async ( req, res ) => {
    const {id} = req.params
    const result = await ServiceServices.updateSingleServiceIntoDB(id, req.body)

      sendResponse(res, {
        success: result ? true : false,
        statusCode: result ? httpStatus.OK : httpStatus.NOT_FOUND,
        message: result ? "Service updated successfully" : "No Data Found",
        data: result,
      });
} )

const deleteSingleService = catchAsync ( async ( req, res ) => {
    const {id} = req.params
    const result = await ServiceServices.deleteSingleServiceIntoDB(id)

      sendResponse(res, {
        success: result ? true : false,
        statusCode: result ? httpStatus.OK : httpStatus.NOT_FOUND,
        message: result ? "Service deleted successfully" : "No Data Found",
        data: result,
      });
} )

export const ServiceControllers = {
    createService,
    getAllServices,
    getSingleService,
    updateSingleService,
    deleteSingleService
}