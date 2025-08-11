
"use client";

import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { processCategoryData } from "./category-breakdown-chart";
import { cn } from "@/lib/utils";

export function DangerZoneAlert() {
  const { dangerCategories } = processCategoryData();

  if (dangerCategories.length === 0) {
    return null;
  }

  return (
    <Alert variant="destructive" className={cn(
        "border-2 border-destructive/80 bg-destructive/10 text-destructive animate-pulse-slow",
        "hover:animate-none"
    )}>
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle className="font-headline text-xl">Attention Required!</AlertTitle>
      <AlertDescription>
        You are in the "danger zone" for the following categories (under 80% applied rate): 
        <span className="font-semibold"> {dangerCategories.join(", ")}</span>. 
        Focus on these areas for improvement.
      </AlertDescription>
    </Alert>
  );
}
