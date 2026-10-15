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

function errorHandler(req) {
    toast.error(`Application Error - Status ${req.status}`, { position: "top-center", description: req.statusText });
    throw new Error(req.statusText);
}

export async function GET(url) {
    composeHeader();
    const req = await fetch(url, { ...(composeHeader()) });

    if (!req.ok) errorHandler(req);

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

    if (!req.ok) errorHandler(req);

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

    if (!req.ok) errorHandler(req);

    return req.json();
}

export async function DELETE(url) {
    composeHeader();
    const req = await fetch(url, {
        method: 'DELETE',
        ...(composeHeader())
    })

    if (!req.ok) errorHandler(req);

    return req.json();
}

export async function MULTIPART(url, form) {
    const req = await fetch(url, {
        method: 'POST',
        body: form,
        ...(composeHeader())
    })

    if (!req.ok) errorHandler(req);

    return req.json();
}