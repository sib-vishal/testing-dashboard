import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { NavUser } from "../nav-user";

export default function DashboardLayout({ children }) {
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <header className=" w-full flex items-center justify-between py-2 px-3 bg-sidebar">
          <SidebarTrigger />
          <div className="flex items-center space-x-4">
            <NavUser user={data.user} onlyAvtaar />
          </div>
        </header>
        {children}
      </main>
    </SidebarProvider>
  );
}
