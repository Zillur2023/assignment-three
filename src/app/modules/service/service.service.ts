import { IService } from "./service.interface"
import Service from "./service.mode"


const createServiceIntoDB = async ( payload:IService ) => {
 
    const result = await Service.create(payload)

    return result
}

const getAllServicesIntoDB = async ( ) => {
    const result = await Service.find({ isDeleted: { $ne: true } })

    return result
}

const getSingleServiceIntoDB = async ( id: string ) => {
    const result = await Service.findOne({
        $and: [
            { _id: id },
            { isDeleted: { $ne: true } }
        ]
    });

    return result
}

const updateSingleServiceIntoDB = async ( id: string, payload: IService ) => {
     const result = await Service.findByIdAndUpdate(id, payload, { new:true})

     return result 
}

const deleteSingleServiceIntoDB = async ( id: string ) => {
    const result = await Service.findByIdAndUpdate(id, { isDeleted: true }, { new: true })

    return result
}



export const ServiceServices = {
    createServiceIntoDB,
    getAllServicesIntoDB,
    getSingleServiceIntoDB,
    updateSingleServiceIntoDB,
    deleteSingleServiceIntoDB
}

