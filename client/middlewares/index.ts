import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";

// Store
import { saveErrorAuth } from "../redux/states/auth";

export const unAuthenticatedMiddleware: Middleware =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        if (isRejectedWithValue(action) && action.payload.status === 401) {
            console.log("MiddleWare UnAuthorized - UnAuthenticated ", {
                status: action.payload.status,
                response: action.payload,
            });
            dispatch(
                saveErrorAuth({
                    status: action.payload.status,
                    message: action.payload.data.message,
                })
            );
        }

        return next(action);
    };

// error: {
//      data: {message: 'Unauthorized'},
//      status: 401
// }

// error: {
//      data: {message: 'The incoming token has expired'}
//      status: 401
// }
