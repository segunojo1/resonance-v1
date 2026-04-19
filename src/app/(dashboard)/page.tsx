import { SidebarTrigger } from "@/components/ui/sidebar"

const DashboardPage = () => {
  return (
    <div className="flex "> 
    <SidebarTrigger />
    <h1 className="text-2xl font-semibold">
        Dashboard
    </h1>
    </div>
  )
}

export default DashboardPage