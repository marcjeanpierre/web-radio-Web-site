export type AdminAuth = {
        "error": boolean,
        "message": string,
        "admin": {
                "id": string,
                "firstname": string,
                "lastname": string,
                "email": string,
                "token": string,
                "refreshToken": string,
        }
}