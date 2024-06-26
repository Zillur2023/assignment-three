import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Service from "../service/service.mode";
import Slot from "./slot.model";
import { formatDate } from "./slot.utils";
import { IAvailableSlot, ISlot } from "./slot.interface";

const createSlotIntoDB = async (payload: ISlot) => {
  const service = payload.service;
  // Fetch service duration
  const serviceData = await Service.findById(service);
  // console.log({serviceData})
  if (!serviceData) {
    throw new AppError(httpStatus.NOT_FOUND, "This service not found");
  }

  const duration = serviceData.duration; // Assume duration is in minutes

  // Convert times to minutes
  const start =
    parseInt(payload.startTime.split(":")[0]) * 60 +
    parseInt(payload.startTime.split(":")[1]);
  const end =
    parseInt(payload.endTime.split(":")[0]) * 60 +
    parseInt(payload.endTime.split(":")[1]);
  const totalDuration = end - start;
  if (!(end > start)) {
    throw new Error("endTime must geater than startTime");
  }

  let result: any = [];
  for (
    let i = 0;
    i < parseInt((totalDuration / duration).toString(), 10);
    i++
  ) {
    const slotStart = start + i * duration;
    const slotEnd = slotStart + duration;

    const slot = await Slot.create({
      service,
      date: payload.date,
      startTime: `${Math.floor(slotStart / 60)
        .toString()
        .padStart(2, "0")}:${(slotStart % 60).toString().padStart(2, "0")}`,
      endTime: `${Math.floor(slotEnd / 60)
        .toString()
        .padStart(2, "0")}:${(slotEnd % 60).toString().padStart(2, "0")}`,
      isBooked: "available",
    });

    result.push(slot);
  }

  return result;
};

// const availableIntoDB = async ( payload: Record<string, string> ) => {
const availableIntoDB = async (payload: IAvailableSlot) => {
  // const availableIntoDB = async ( date:any, serviceId:any ) => {

  let query = {};

  if (payload.serviceId) {
    const serviceData = await Service.findById(payload.serviceId);

    if (!serviceData) {
      throw new AppError(httpStatus.NOT_FOUND, "This service not found");
    }
    query = { service: payload.serviceId, isBooked: "available" };
  }
  if (payload.date) {
    query = { date: formatDate(payload.date as string), isBooked: "available" };
  }

  if (payload.date && payload.serviceId) {
    query = {
      date: formatDate(payload.date as string),
      service: payload.serviceId,
      isBooked: "available",
    };
  }

  if (Object.keys(query).length === 0) {
    // throw new AppError ( httpStatus.UNAUTHORIZED, 'Query params must need' )
    query = { isBooked: "available" };
  }

  const result = await Slot.find(query);

  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found ");
  }

  return result;
};

export const SlotServices = {
  createSlotIntoDB,
  availableIntoDB,
};
