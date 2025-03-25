
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/Card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Grip, Plus, Trash, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PDIGoal {
  id: string;
  title: string;
  description: string;
  tasks: { id: string; description: string }[];
}

const formSchema = z.object({
  employee: z.string().min(1, {
    message: "Please select an employee",
  }),
  title: z.string().min(3, {
    message: "Title must be at least 3 characters",
  }).max(100, {
    message: "Title must be less than 100 characters",
  }),
  description: z.string().max(500, {
    message: "Description should be less than 500 characters",
  }),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }),
  goals: z.array(
    z.object({
      title: z.string().min(3, "Goal title is required"),
      description: z.string().optional(),
      tasks: z.array(
        z.object({
          description: z.string().min(3, "Task description is required"),
        })
      ).min(1, "At least one task is required"),
    })
  ).min(1, "At least one goal is required"),
});

export const PDIForm = () => {
  const [goals, setGoals] = useState<PDIGoal[]>([
    {
      id: "1",
      title: "",
      description: "",
      tasks: [{ id: "task-1", description: "" }],
    },
  ]);
  
  // Mock team members
  const teamMembers = [
    { id: "1", name: "Michael Chen", position: "Software Engineer" },
    { id: "2", name: "Sarah Williams", position: "Product Designer" },
    { id: "3", name: "David Kim", position: "Marketing Specialist" },
    { id: "4", name: "Jessica Rodriguez", position: "Customer Success" },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      goals: [
        {
          title: "",
          description: "",
          tasks: [{ description: "" }],
        },
      ],
    },
  });

  // Add a new goal
  const addGoal = () => {
    const newGoal = {
      id: `goal-${goals.length + 1}`,
      title: "",
      description: "",
      tasks: [{ id: `task-${Date.now()}`, description: "" }],
    };
    
    setGoals([...goals, newGoal]);
    
    const currentGoals = form.getValues("goals") || [];
    form.setValue("goals", [
      ...currentGoals,
      { title: "", description: "", tasks: [{ description: "" }] },
    ]);
  };

  // Remove a goal
  const removeGoal = (index: number) => {
    if (goals.length > 1) {
      const updatedGoals = [...goals];
      updatedGoals.splice(index, 1);
      setGoals(updatedGoals);
      
      const currentGoals = form.getValues("goals") || [];
      const updatedFormGoals = [...currentGoals];
      updatedFormGoals.splice(index, 1);
      form.setValue("goals", updatedFormGoals);
    }
  };

  // Add a new task to a goal
  const addTask = (goalIndex: number) => {
    const updatedGoals = [...goals];
    updatedGoals[goalIndex].tasks.push({
      id: `task-${Date.now()}-${goalIndex}`,
      description: "",
    });
    setGoals(updatedGoals);
    
    const currentGoals = form.getValues("goals") || [];
    const updatedFormGoals = [...currentGoals];
    updatedFormGoals[goalIndex].tasks.push({ description: "" });
    form.setValue("goals", updatedFormGoals);
  };

  // Remove a task from a goal
  const removeTask = (goalIndex: number, taskIndex: number) => {
    if (goals[goalIndex].tasks.length > 1) {
      const updatedGoals = [...goals];
      updatedGoals[goalIndex].tasks.splice(taskIndex, 1);
      setGoals(updatedGoals);
      
      const currentGoals = form.getValues("goals") || [];
      const updatedFormGoals = [...currentGoals];
      updatedFormGoals[goalIndex].tasks.splice(taskIndex, 1);
      form.setValue("goals", updatedFormGoals);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // TODO: Handle form submission
  };

  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle>Create Development Plan</CardTitle>
        <CardDescription>
          Set up a new Individual Development Plan (PDI) for a team member
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="employee"
                render={({ field }) => (
                  <FormItem className="col-span-full md:col-span-1">
                    <FormLabel>Team Member</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a team member" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teamMembers.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name} - {member.position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-full md:col-span-1">
                    <FormLabel>PDI Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Leadership Development Plan" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a brief description of this development plan and its objectives..."
                      className="min-h-24 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Separator />
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Development Goals</h3>
                <Button
                  type="button"
                  onClick={addGoal}
                  variant="outline"
                  size="sm"
                  className="gap-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Goal</span>
                </Button>
              </div>
              
              {goals.map((goal, goalIndex) => (
                <div 
                  key={goal.id} 
                  className="border rounded-lg p-4 space-y-4 bg-card animate-fade-in"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <Grip className="h-4 w-4 text-muted-foreground" />
                      <span>Goal {goalIndex + 1}</span>
                    </h4>
                    {goals.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeGoal(goalIndex)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <FormField
                    control={form.control}
                    name={`goals.${goalIndex}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Goal Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Improve leadership skills" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`goals.${goalIndex}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Goal Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide details about this development goal..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-2">
                    <FormLabel>Tasks</FormLabel>
                    <FormDescription>
                      Break down this goal into specific, actionable tasks
                    </FormDescription>
                    
                    <div className="space-y-2">
                      {goal.tasks.map((task, taskIndex) => (
                        <div 
                          key={task.id} 
                          className="flex items-center gap-2"
                        >
                          <FormField
                            control={form.control}
                            name={`goals.${goalIndex}.tasks.${taskIndex}.description`}
                            render={({ field }) => (
                              <FormItem className="flex-1 space-y-0">
                                <FormControl>
                                  <Input 
                                    placeholder="e.g., Complete leadership training course" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          {goal.tasks.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeTask(goalIndex, taskIndex)}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      type="button"
                      onClick={() => addTask(goalIndex)}
                      variant="outline"
                      size="sm"
                      className="mt-2 w-full justify-center border-dashed"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      <span>Add Task</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit">Create PDI</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
