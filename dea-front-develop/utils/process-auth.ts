import { NextRequest, NextResponse } from "next/server";

export const processAuth = (req: NextRequest) => {
    const cookie = req.headers.get('cookie');
    const referer = req.headers.get('referer') || "";
    const APP_URL = process.env.NEXTAUTH_URL || "http://localhost:3000/";
    const path = req.nextUrl.pathname;
    if (!cookie?.includes("next-auth.session-token") && (referer === APP_URL || path === "/")) {
        return Response.redirect("/login");
    }
    if (!cookie?.includes("next-auth.session-token") && !referer.includes("login") && !path.includes("login")) {
        return Response.redirect("/login");
    }

}