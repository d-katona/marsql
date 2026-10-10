"use client";

import { usePathname, useRouter } from "next/navigation";
import { join } from "path";

export default function useNavigation() {
    const router = useRouter();
    const path = usePathname();

    function back() {
        router.push(join(path, ".."));
    }
    function reslug(slug) {
        router.replace(join(path, "..", slug));
    }
    function goto(slug) {
        router.push(join(path, slug));
    }

    return { back, reslug, goto }

}