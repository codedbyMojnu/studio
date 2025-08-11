"use client";

import { useState } from 'react';
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CustomWisdomForm } from "@/components/dashboard/custom-wisdom-form";
import type { WisdomEntry } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { PlusCircle } from 'lucide-react';

export default function ProfilePage() {
  const [customWisdoms, setCustomWisdoms] = useState<WisdomEntry[]>([]);
  const { toast } = useToast();

  const handleAddCustomWisdom = (newWisdom: Omit<WisdomEntry, 'id' | 'isCustom'>) => {
    const newEntry = {
      ...newWisdom,
      id: `custom-${Date.now()}`,
      isCustom: true,
    }
    setCustomWisdoms(prev => [...prev, newEntry]);
    toast({
      title: "Wisdom Added",
      description: `"${newWisdom.title}" has been added to your entries.`
    });
  }

  return (
    <>
      <Header title="Profile" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background/80">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Personal Information</CardTitle>
              <CardDescription>Update your account details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Compass User" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="user@example.com" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline">Custom Wisdom Entries</CardTitle>
                <CardDescription>Your personalized wisdom collection.</CardDescription>
              </div>
              <CustomWisdomForm onSave={handleAddCustomWisdom}>
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add New
                </Button>
              </CustomWisdomForm>
            </CardHeader>
            <CardContent>
              {customWisdoms.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customWisdoms.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">{entry.title}</TableCell>
                        <TableCell>
                            <Badge variant="outline">{entry.category}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center text-muted-foreground py-10">
                  <p>You haven't added any custom wisdom yet.</p>
                  <p className="text-sm">Click "Add New" to create your first entry.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
