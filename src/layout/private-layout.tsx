import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/kanban/ThemeToggle";
import { ProfileDropdown } from "@/components/profile-dropdown";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {

    const userTokens = useSelector((state: any) => state?.user.tokens);
    const navigate = useNavigate();

    useEffect(() => {
      if (!userTokens?.access) {
        navigate("/login");
      }
    }, [userTokens, navigate]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="w-full flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
<div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            <ProfileDropdown />

</div>
          </div>
        </header>
        <div className="flex flex-grow-1 flex-shrink-1 flex-basis-auto flex-col gap-4 p-4 pt-0 relative">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default PrivateLayout;