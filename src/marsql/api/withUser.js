import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import sql from "@/lib/sql";
import { getFirebaseAuth } from "@/lib/login";

export default async function withUser(options, cb) {
    const auth = getFirebaseAuth();
    let identity;
    let user;

    try {
        // Create a cookieStore to have access to the cookies
        const cookieStore = await cookies();

        // The cookie's name is an environment variable
        const session = cookieStore.get(process.env.FIREBASE_SESSION);

        // Store the identity to use it in the database lookup. It has UID (firebase ID) and email
        identity = await auth.verifySessionCookie(session?.value);
    } catch (e) {
        return NextResponse.json({}, { status: 401, statusText: e.message });
    }

    /*
    try {
        // Never create user here, that will be taken care of in the login flow
        [user] = await sql`
            select * from auth.users
            where email = ${identity.email}
            limit 1`;
        if (!user || !user.active) throw new Error;
    } catch (e) {
        return NextResponse.json({}, { status: 401, statusText: 'No user found!' });
    }
*/

    let unit_id = null;
    let body;


    if (options.request) {
        unit_id = options.request.headers.get('q_unit') || null;
        try {
            body = await options.request.json();
        } catch (e) {

        }
    }


    let trx;
    const { trx: useTransaction } = options;

    try {
        if (useTransaction) {
            trx = await sql.reserve();
            await trx`BEGIN`;
            await trx`SELECT set_config('app.current_user_id', ${user._id}, true)`;
        }

        // General error catcher for all error coming from the callback
        const res = await cb({ user, user_id: user._id, unit_id, sql, trx, body });
        if (useTransaction) await trx`COMMIT`;

        return NextResponse.json(res);
    } catch (e) {
        if (useTransaction) await trx`ROLLBACK`;
        console.log('*** ERROR:', e.message)
        if (process.env.NODE_ENV === 'development') console.log(e);
        return NextResponse.json({
            message: e.message,
            code: e.code,
            detail: e.detail,
            hint: e.hint,
            routine: e.routine
        }, { status: 500, statusText: e.message ?? "Undefined Server Error" });
    } finally {
        if (useTransaction) await trx.release();
    }
}



