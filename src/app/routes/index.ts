import { Router } from "express"
import { UserRouters } from "../modules/user/user.route"
import { ServiceRouters } from "../modules/service/service.route"
import { SlotRoutes } from "../modules/solt/slot.route"
import { BookingRoutes } from "../modules/booking/booking.route"
import { AuthRouters } from "../modules/Auth/auth.route"


const router = Router()

const moduleRoutes = [
     // {
        // path: '/users',
        // route: UserRouters
    // },
    {
        path: '/',
        route: UserRouters
    },
    {
        path: '/',
        route: ServiceRouters
    },
    {
        path: '/',
        route: SlotRoutes
    },
    {
        path: '/',
        route: BookingRoutes
    },
    {
        path: '/',
        route: AuthRouters
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router