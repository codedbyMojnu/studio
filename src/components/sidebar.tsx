
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, LayoutDashboard, BookOpenText, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/wisdom-templates", label: "Wisdom Templates", icon: BookOpenText },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-col h-screen bg-card text-card-foreground border-r border-border hidden md:flex">
      <div className="flex items-center justify-center h-20 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Compass className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-headline font-bold">Wisdom Compass</h1>
        </Link>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <Button
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start text-base h-12",
                pathname === item.href && "bg-primary/10 text-primary font-semibold"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
         <Link href="/login">
            <Button variant="ghost" className="w-full justify-start text-base h-12">
                <LogOut className="mr-3 h-5 w-5" />
                Logout
            </Button>
        </Link>
      </div>
    </aside>
  );
}
