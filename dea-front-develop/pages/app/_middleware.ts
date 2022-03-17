import { NextFetchEvent } from 'next/server'
import { getCookie } from '../../utils/get-cookie';
import { parseJwt } from '../../utils/jwt-decoder';

export default async function middleware(req: any, ev: NextFetchEvent) {
    const token = getCookie(req.headers.get("cookie"), "next-auth.session-token");

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