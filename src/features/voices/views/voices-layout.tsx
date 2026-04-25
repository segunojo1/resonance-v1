import { PageHeader } from "@/components/page-header"

export function VoicesLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <PageHeader title="Voices"/>
            {children}
        </div>
    )
}