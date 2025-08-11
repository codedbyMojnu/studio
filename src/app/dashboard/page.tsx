import { Header } from "@/components/header";
import { DailyLogger } from "@/components/dashboard/daily-logger";
import { WisdomChart } from "@/components/dashboard/wisdom-chart";
import { AiSuggestions } from "@/components/dashboard/ai-suggestions";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CategoryBreakdownChart } from "@/components/dashboard/category-breakdown-chart";
import { LifetimeStatsChart } from "@/components/dashboard/lifetime-stats-chart";

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background/80">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-3">
             <Card className="border-2 border-primary/50 bg-primary/5">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl text-primary">Welcome Back</CardTitle>
                    <CardDescription className="text-base">
                        Your journey of a thousand miles begins with a single step. What will you practice today?
                    </CardDescription>
                </CardHeader>
             </Card>
          </div>

          <div className="lg:col-span-2">
            <WisdomChart />
          </div>

          <div className="flex flex-col gap-6">
            <DailyLogger />
            <AiSuggestions />
          </div>

          <div className="lg:col-span-3 grid md:grid-cols-2 gap-6">
            <CategoryBreakdownChart />
            <LifetimeStatsChart />
          </div>
        </div>
      </main>
    </>
  );
}
