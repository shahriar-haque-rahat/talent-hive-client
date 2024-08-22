'use server'

import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";


export async function setSession(tokenInfo) {
    cookies().set("accessToken", tokenInfo.accessToken, {
        path: "/",
        maxAge: 60 * 60, // 1 hour
    });

    cookies().set("refreshToken", tokenInfo.refreshToken, {
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
    });
}

export async function getToken(key = 'accessToken') {
    return cookies().get(key)?.value;
}

export async function getServerSession() {
    try {
        const token = await getToken();

        const secret = process.env.JWT_SECRET_KEY;

        if (!token || !secret) return null;

        const decoded = jwt.verify(token, secret);

        return decoded;
    }
    catch (error) {
        return null;
    }
}

export async function clearCookies() {
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
}
