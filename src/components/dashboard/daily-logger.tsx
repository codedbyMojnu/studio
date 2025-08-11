"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckCircle2, XCircle, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { GLOBAL_WISDOM_ENTRIES } from "@/lib/data";
import { WisdomEntry } from "@/lib/types";
import { CustomWisdomForm } from "./custom-wisdom-form";


const formSchema = z.object({
  wisdomId: z.string().nonempty({ message: "Please select a wisdom entry." }),
});

export function DailyLogger() {
  const { toast } = useToast();
  const [isFormOpen, setFormOpen] = useState(false);
  const [customWisdoms, setCustomWisdoms] = useState<WisdomEntry[]>([]);

  const allWisdoms = [...GLOBAL_WISDOM_ENTRIES, ...customWisdoms];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wisdomId: "",
    },
  });

  const handleAddCustomWisdom = (newWisdom: Omit<WisdomEntry, 'id' | 'isCustom'>) => {
    const newEntry = {
        ...newWisdom,
        id: `custom-${Date.now()}`,
        isCustom: true,
    }
    setCustomWisdoms(prev => [...prev, newEntry]);
    toast({
        title: "Wisdom Added",
        description: `"${newWisdom.title}" has been added to your custom entries.`
    });
  }

  function handleLog(status: "applied" | "missed") {
    const values = form.getValues();
    if (!values.wisdomId) {
        form.setError("wisdomId", { type: "manual", message: "Please select a wisdom entry." });
        return;
    }
    
    const wisdom = allWisdoms.find(w => w.id === values.wisdomId);
    if (wisdom) {
        toast({
            title: `Wisdom Logged: ${status === 'applied' ? 'Applied' : 'Missed'}`,
            description: `You've logged "${wisdom.title}".`,
            variant: status === 'applied' ? 'default' : 'destructive',
        });
        form.reset();
    }
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Daily Wisdom Log</CardTitle>
          <CardDescription>What wisdom did you practice today?</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="wisdomId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Wisdom</FormLabel>
                    <div className="flex gap-2">
                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Choose a wisdom to log..." />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {allWisdoms.map(wisdom => (
                                <SelectItem key={wisdom.id} value={wisdom.id}>
                                    {wisdom.title}
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <CustomWisdomForm onSave={handleAddCustomWisdom}>
                            <Button variant="outline" size="icon" type="button" aria-label="Add custom wisdom">
                                <PlusCircle className="w-5 h-5" />
                            </Button>
                        </CustomWisdomForm>
                    </div>
                     {form.formState.errors.wisdomId && <p className="text-sm font-medium text-destructive">{form.formState.errors.wisdomId.message}</p>}
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <Button onClick={() => handleLog("applied")} type="button" className="w-full bg-primary hover:bg-primary/90">
                  <CheckCircle2 className="mr-2 h-5 w-5" /> Applied
                </Button>
                <Button onClick={() => handleLog("missed")} type="button" variant="destructive" className="w-full">
                  <XCircle className="mr-2 h-5 w-5" /> Missed
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <CustomWisdomForm onSave={handleAddCustomWisdom} open={isFormOpen} onOpenChange={setFormOpen} />
    </>
  );
}
