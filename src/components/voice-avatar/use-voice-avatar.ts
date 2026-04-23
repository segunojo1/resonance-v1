import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";

export function useVoiceAvatar(seed: string) {
    return useMemo(() => {
        return createAvatar(GlassWater, {
            seed,
            size: 128
        }).toDataUri();
    }, [seed]);
};