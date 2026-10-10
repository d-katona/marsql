"use client";

export default function Form({ children, form }) {
    return <form className="contents" onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
    }}>{children}
        <button type="submit" className="hidden"></button>
    </form>
}