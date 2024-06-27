import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SlotServices } from "./slot.service";


const createSlot = catchAsync( async (req, res) => {
    const result = await SlotServices.createSlotIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Slots created successfully",
        data: result,
      });
} )

const available = catchAsync( async (req, res) => {
  const result = await SlotServices.availableIntoDB(req.query )

    sendResponse(res, {
      success: result[0] ? true : false,
      statusCode: result[0] ? httpStatus.OK : httpStatus.NOT_FOUND,
      message: result[0] ? "Available slots retrieved successfully" : "No Data Found",
      data: result,
    });
    
} )

export const SlotControllers = {
     createSlot,
     available
}