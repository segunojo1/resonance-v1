import { env } from "./env";
import createClient from "openapi-fetch";
import type { paths } from "@/types/chatterbox-api";

export const chatterbox = createClient<paths>({ baseUrl: env.CHATTERBOX_API_URL,
    headers: {
        "x-Api-Key": env.CHATTERBOX_API_KEY
    }
});
