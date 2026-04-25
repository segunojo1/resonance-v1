import { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "@/trpc/routers/_app";
import { VOICE_CATEGORY_LABELS } from "../voice-categories";
import { Button } from "@/components/ui/button";

export type VoiceItem = inferRouterOutputs<AppRouter>["voices"]["getAll"]["custom"][number]

interface VoiceCardProps {
    voice: VoiceItem;
};

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

function parseLanguage(locale: string) {
    const [country] = locale.split("-");

    if (!country) return { flag: "", name: locale };

    const flag = [...country.toUpperCase()]
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");

    const region = regionNames.of(country) ?? country

    return { flag, region };
}


export function VoiceCard({voice}: VoiceCardProps) {
    const isLoading = false;

    const { flag, region } = parseLanguage(voice.language);

    const audioSrc = `/api/voices/${encodeURIComponent(voice.id)}`;

    return (
        <div className="relative h-24 w-20 shrink-0 lg:h-30 lg:w-24">
            <div className="absolute left-0 top-0 h-24 w-10 border-r bg-muted/50 lg:h-30 lg:w-12">
               <div>
                   <VoiceAvatar
                   seed={voice.id}
                   name={voice.name}
                   className="size-14 border-[1.5px] border-white shadow-xs lg:size-18"
                   />
               </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1.5 lg:gap-3">
                <div className="flex items-center gap-1.5 line-clamp-1 text-sm font-medium tracking-tight">
                    {voice.name}
                    <span className="size-1 shrink-0 rounded-full bg-muted-foreground/50" />
                    <span className="text-[#327c88]">
                        {VOICE_CATEGORY_LABELS[voice.category]}
                    </span>

                </div>

                <p className="text-xs text-muted-foreground line-clamp-1 ">
                    {voice.description}
                </p>

                <p className="flex items-center gap-1 text-xs">
                    <span className="shrink-0">{flag}</span>
                    <span className="truncate font-medium">{region}</span>
                </p>
            </div>

            <div className="ml-1 flex shrink-0 items-center gap-1 lg:ml-3 lg:gap-2">
                <Button
                variant="outline"
                size="icon-sm"
                className="rounded-full"
                onClick={() => {}}
                disabled={isLoading}
                >
                    {isLoading ? (
                        <Spinner className="size-4" />
                    ) : isPlaying ? (
                        <Pause className="size-4" />
                    ) : (
                        <Play className="size-4" />
                    )}
                </Button>
            </div>
        </div>
    )
}