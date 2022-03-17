import { NextRequest } from 'next/server'
import { getCookie } from '../utils/get-cookie';
import { parseJwt } from '../utils/jwt-decoder';

const noAuthRoutes = [
    'login',
    'register'
]

export const middleware = async (req: NextRequest) => {
    const cookie = req.headers.get('cookie');
    const referer = req.headers.get('referer') || "";
    const path = req.nextUrl.pathname;
    if (!cookie?.includes("next-auth.session-token") && (path === "/")) {
        return Response.redirect("/login");
    } else if (cookie?.includes("next-auth.session-token") && (path === "/")) {
        const token = getCookie(req.headers.get("cookie") as any, "next-auth.session-token");
        if (!token) {
            return Response.redirect("/api/auth/signout");
        }

        const { user = null } = parseJwt(token);

        if (!user) {
            return Response.redirect("/api/auth/signout");
        }

        const { userType = null } = user;

        if (!userType || userType !== 2) {
            return Response.redirect("/admin");
        }
    }
    if (!cookie?.includes("next-auth.session-token") && !referer.includes("login") && !path.includes("login")) {
        let matches = null;
        for (let route of noAuthRoutes) {
            matches = !referer.includes(route) && !path.includes(route);
            if (matches) {
                break;
            }
        }
        if (!matches)
            return Response.redirect("/login");
    }
}