"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Compass, LayoutDashboard, BookOpenText, User as UserIcon, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/wisdom-templates", label: "Wisdom Templates", icon: BookOpenText },
  { href: "/dashboard/profile", label: "Profile", icon: UserIcon },
];

export function Header({ title }: { title: string }) {
  const pathname = usePathname();

  return (
    <header className="flex h-20 items-center justify-between gap-4 border-b bg-card px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <nav className="flex flex-col h-full">
              <div className="flex items-center justify-center h-20 border-b">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <Compass className="w-8 h-8 text-primary" />
                  <h1 className="text-2xl font-headline font-bold">Wisdom Compass</h1>
                </Link>
              </div>
              <div className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => (
                  <Link key={item.label} href={item.href} className="block">
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
              </div>
              <div className="p-4 border-t">
                <Link href="/login">
                    <Button variant="ghost" className="w-full justify-start text-base h-12">
                        <LogOut className="mr-3 h-5 w-5" />
                        Logout
                    </Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">{title}</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="user avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/login">Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
