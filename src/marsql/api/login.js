import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import getFirebaseAuth from "./firebase";
import loginAction from "@/lib/login-action";

export async function login(request) {
    let user;
    try {
        const auth = getFirebaseAuth();
        const cookieStore = await cookies();
        const body = await request.json();
        const token = body.stsTokenManager.accessToken;
        const identity = await auth.verifyIdToken(token);

        try {
            user = await loginAction({ identity, sql, body });
        } catch (e) {
            return NextResponse.json({}, { status: 401, statusText: 'Inactive User' });
        }

        const sessionCookie = await auth.createSessionCookie(token, {
            expiresIn: 60 * 60 * 24 * 5 * 1000, // 5 days
        });

        cookieStore.set(process.env.FIREBASE_SESSION, sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 5,
        });

        return NextResponse.json({ email: user.email });
    }
    catch (e) {
        return NextResponse.json({}, { status: 500, statusText: e.message });
    }
}

