import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ServiceServices } from "./service.service";


const createService = catchAsync ( async (req, res) => {
    const result = await ServiceServices.createServiceIntoDB(req.body)
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service created successfully",
        data: result,
      });
} )

const getAllServices = catchAsync ( async ( req, res ) => {
    const result = await ServiceServices.getAllServicesIntoDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Services retrieved successfully",
        data: result,
      });
} )

const getSingleService = catchAsync ( async ( req, res ) => {
    const {id} = req.params
    const result = await ServiceServices.getSingleServiceIntoDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service retrieved successfully",
        data: result,
      });
} )

const updateSingleService = catchAsync ( async ( req, res ) => {
    const {id} = req.params
    const result = await ServiceServices.updateSingleServiceIntoDB(id, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service updated successfully",
        data: result,
      });
} )

const deleteSingleService = catchAsync ( async ( req, res ) => {
    const {id} = req.params
    const result = await ServiceServices.deleteSingleServiceIntoDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service updated successfully",
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