import { toast } from "sonner"

let unit_id;

export function registerUnit(unit) {
    unit_id = unit;

}

function composeHeader() {
    return {
        headers: {
            "q_unit": unit_id ?? ""
        }
    }
}

export async function GET(url) {
    composeHeader();
    const req = await fetch(url, { ...(composeHeader()) });

    if (!req.ok) {
        // throw new Error(await req.text());
        toast.error(`Application Error - Status ${req.status}`, { position: "top-center", description: req.statusText });
        throw new Error;
        return null;
    }

    return req.json();
}

export async function POST(url, body, signal) {
    composeHeader();
    const req = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        signal,
        ...(composeHeader())
    })

    if (!req.ok) {
        toast.error(`Application Error - Status ${req.status}`, { position: "top-center", description: req.statusText });
        throw new Error;

        return null;
        throw new Error(await req.text());
    }

    return req.json();
}

export async function PUT(url, body, signal) {
    composeHeader();
    const req = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        signal,
        ...(composeHeader())
    })

    if (!req.ok) {
        toast.error(`Application Error - Status ${req.status}`, { position: "top-center", description: req.statusText });
        throw new Error;

        return null;
        throw new Error(await req.text());
    }

    return req.json();
}

export async function DELETE(url) {
    composeHeader();
    const req = await fetch(url, {
        method: 'DELETE',
        ...(composeHeader())
    })

    if (!req.ok) {
        toast.error(`Application Error - Status ${req.status}`, { position: "top-center", description: req.statusText });
        throw new Error;

        return null;
        throw new Error(await req.text());
    }

    return req.json();
}

export async function MULTIPART(url, form) {
    const req = await fetch(url, {
        method: 'POST',
        body: form,
        ...(composeHeader())
    })
    console.warn(req.ok);
    if (!req.ok) {
        toast.error(`Application Error - Status ${req.status}`, { position: "top-center", description: req.statusText });
        throw new Error;

        return null;
        throw new Error(await req.text());
    }

    return req.json();
}