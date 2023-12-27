import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constants/http_status";


export default (req: any, res: any, next: any) => {
    const token = req.headers.access_token as string;
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        console.error("JWT_SECRET is not defined in the environment variables.");
        return res.status(HTTP_UNAUTHORIZED).send();
    }

    try {
        const decodedUser = verify(token, jwtSecret);
        req.user = decodedUser;
        return next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        res.status(HTTP_UNAUTHORIZED).send();
    }
}