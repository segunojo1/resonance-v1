import { TextToSpeechView } from "@/features/text-to-speech/views/Text-to-speech-view"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Text to Speech"
}

export default async function TextToSpeechPage({
    searchParams
}: {
    searchParams: Promise<{ text?: string; voiceId?: string}>
}) {
    const params = await searchParams;

    return <TextToSpeechView />;
}

