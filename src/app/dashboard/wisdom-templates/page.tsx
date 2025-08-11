import { Header } from "@/components/header";
import { GLOBAL_WISDOM_ENTRIES } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function WisdomTemplatesPage() {
  return (
    <>
      <Header title="Wisdom Templates" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background/80">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Global Wisdom Library</CardTitle>
            <CardDescription>
              Explore these foundational wisdom entries that are available to all users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[150px]">Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {GLOBAL_WISDOM_ENTRIES.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.title}</TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{entry.category}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
