
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/Card";
import { UserAvatar } from "@/components/common/UserAvatar";
import { 
  ArrowLeft, 
  Calendar, 
  Check, 
  CheckCircle2, 
  ChevronDown,
  ChevronUp,
  Edit, 
  Plus, 
  Trash
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

export const PDIDetail = () => {
  const { id } = useParams<{ id: string }>();
  const pdiId = parseInt(id as string);
  
  // Mock PDI data
  const pdi = {
    id: pdiId,
    employee: {
      name: "Michael Chen",
      position: "Software Engineer",
      email: "michael.chen@example.com",
      avatar: "",
    },
    title: "Technical Leadership Development",
    description: "Focus on developing technical leadership skills, improving architecture design capabilities, and enhancing team mentoring abilities.",
    startDate: "Jan 15, 2023",
    endDate: "Dec 31, 2023",
    status: "active",
    progress: 45,
    goals: [
      {
        id: 1,
        title: "Improve system architecture skills",
        description: "Develop expertise in designing scalable and maintainable software architectures.",
        status: "in-progress",
        tasks: [
          { id: 1, description: "Complete Advanced System Design course", completed: true },
          { id: 2, description: "Lead architecture design for a new feature", completed: false },
          { id: 3, description: "Document architecture patterns used in current projects", completed: true },
        ],
      },
      {
        id: 2,
        title: "Enhance leadership capabilities",
        description: "Develop skills to effectively lead technical teams and mentor junior developers.",
        status: "in-progress",
        tasks: [
          { id: 4, description: "Complete Leadership Fundamentals training", completed: true },
          { id: 5, description: "Mentor two junior engineers", completed: false },
          { id: 6, description: "Lead weekly technical discussions", completed: false },
        ],
      },
      {
        id: 3,
        title: "Expand technical expertise",
        description: "Broaden knowledge in cloud technologies and serverless architectures.",
        status: "not-started",
        tasks: [
          { id: 7, description: "Get AWS Certified Solutions Architect certification", completed: false },
          { id: 8, description: "Build a serverless application", completed: false },
          { id: 9, description: "Conduct a workshop on cloud best practices", completed: false },
        ],
      },
      {
        id: 4,
        title: "Improve public speaking skills",
        description: "Develop confidence and skills in presenting technical concepts to various audiences.",
        status: "completed",
        tasks: [
          { id: 10, description: "Join Toastmasters or similar group", completed: true },
          { id: 11, description: "Present at a team meeting", completed: true },
          { id: 12, description: "Create and deliver a technical workshop", completed: true },
        ],
      },
      {
        id: 5,
        title: "Contribute to the technical community",
        description: "Share knowledge through writing and speaking engagements.",
        status: "not-started",
        tasks: [
          { id: 13, description: "Write technical blog posts", completed: false },
          { id: 14, description: "Speak at a local meetup", completed: false },
          { id: 15, description: "Contribute to open source projects", completed: false },
        ],
      },
    ],
    feedbacks: [
      {
        id: 1,
        date: "Apr 15, 2023",
        content: "Michael has made significant progress on architecture skills. The system design course completion is already showing impact in his current project work. He should continue to focus on leadership aspects and consider more hands-on mentoring opportunities.",
        author: "Emma Thompson, Engineering Manager",
      },
      {
        id: 2,
        date: "Jul 30, 2023",
        content: "Good progress on the leadership front. Michael has successfully begun mentoring two junior engineers and has received positive feedback. Recommended to increase focus on public speaking skills in the next quarter.",
        author: "Emma Thompson, Engineering Manager",
      },
    ],
    nextReview: "Oct 15, 2023",
  };

  const completedTasks = pdi.goals.reduce(
    (acc, goal) => acc + goal.tasks.filter((task) => task.completed).length,
    0
  );
  
  const totalTasks = pdi.goals.reduce(
    (acc, goal) => acc + goal.tasks.length,
    0
  );

  const statusStyles = {
    active: {
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      label: "Active",
    },
    draft: {
      badge: "bg-amber-100 text-amber-800 border-amber-200",
      label: "Draft",
    },
    completed: {
      badge: "bg-blue-100 text-blue-800 border-blue-200",
      label: "Completed",
    },
  };

  const goalStatusStyles = {
    completed: {
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      icon: CheckCircle2,
      label: "Completed",
    },
    "in-progress": {
      color: "text-amber-600",
      bg: "bg-amber-100",
      icon: Calendar,
      label: "In Progress",
    },
    "not-started": {
      color: "text-slate-600",
      bg: "bg-slate-100",
      icon: Calendar,
      label: "Not Started",
    },
  };

  const currentStatus = statusStyles[pdi.status as keyof typeof statusStyles];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          asChild
        >
          <Link to="/pdi">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Development Plan</h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{pdi.title}</CardTitle>
              <Badge 
                variant="outline" 
                className={currentStatus.badge}
              >
                {currentStatus.label}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <UserAvatar 
                  name={pdi.employee.name} 
                  image={pdi.employee.avatar}
                  size="lg"
                />
                <div>
                  <h3 className="text-lg font-medium">{pdi.employee.name}</h3>
                  <p className="text-muted-foreground">{pdi.employee.position}</p>
                  <p className="text-sm text-muted-foreground mt-1">{pdi.employee.email}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Description</p>
                <p className="text-muted-foreground">{pdi.description}</p>
              </div>
              
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                <div>
                  <p className="text-sm font-medium mb-1">Start Date</p>
                  <p className="text-muted-foreground">{pdi.startDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">End Date</p>
                  <p className="text-muted-foreground">{pdi.endDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Next Review</p>
                  <p className="text-muted-foreground">{pdi.nextReview}</p>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium mb-1">Overall Progress</p>
                  <p className="text-sm">
                    {completedTasks}/{totalTasks} tasks completed
                  </p>
                </div>
                <Progress value={(completedTasks / totalTasks) * 100} className="h-2" />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                >
                  <Trash className="h-4 w-4" />
                  <span>Delete</span>
                </Button>
                <Button 
                  size="sm" 
                  className="gap-1"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Plan</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Development Goals</span>
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Add Goal</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="space-y-4">
                {pdi.goals.map((goal, index) => {
                  const goalStatus = goalStatusStyles[goal.status as keyof typeof goalStatusStyles];
                  const StatusIcon = goalStatus.icon;
                  const completedTasksCount = goal.tasks.filter(t => t.completed).length;
                  const progress = Math.round((completedTasksCount / goal.tasks.length) * 100);
                  
                  return (
                    <AccordionItem key={goal.id} value={goal.id.toString()}>
                      <AccordionTrigger className="py-4 hover:no-underline">
                        <div className="flex items-start text-left gap-3 flex-1">
                          <div className={`mt-0.5 rounded-full h-4 w-4 ${goalStatus.bg} ${goalStatus.color} flex items-center justify-center flex-shrink-0`}>
                            <StatusIcon className="h-3 w-3" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-medium">{goal.title}</h4>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant="outline" 
                                className="text-xs"
                              >
                                {goalStatus.label}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {completedTasksCount}/{goal.tasks.length} tasks completed
                              </span>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-4">
                        <div className="space-y-4 pl-7">
                          <p className="text-muted-foreground text-sm">{goal.description}</p>
                          
                          <Progress value={progress} className="h-1.5" />
                          
                          <div className="border rounded-md divide-y">
                            {goal.tasks.map((task) => (
                              <div key={task.id} className="p-3 flex items-start gap-3">
                                <Checkbox 
                                  checked={task.completed} 
                                  className="mt-0.5"
                                />
                                <div className="space-y-1">
                                  <p className={task.completed ? "line-through text-muted-foreground" : ""}>
                                    {task.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                            <div className="p-3">
                              <Button variant="ghost" size="sm" className="gap-1 w-full justify-center border border-dashed">
                                <Plus className="h-3.5 w-3.5" />
                                <span>Add Task</span>
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              Edit Goal
                            </Button>
                            {goal.status !== "completed" && (
                              <Button size="sm" className="gap-1">
                                <Check className="h-3.5 w-3.5" />
                                <span>Mark as Completed</span>
                              </Button>
                            )}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Feedback</span>
                <Button size="sm" variant="outline" className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Add</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pdi.feedbacks.length > 0 ? (
                <div className="space-y-4">
                  {pdi.feedbacks.map((feedback, index) => (
                    <div key={feedback.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{feedback.date}</h4>
                      </div>
                      <p className="text-sm">{feedback.content}</p>
                      <p className="text-xs text-muted-foreground">— {feedback.author}</p>
                      {index < pdi.feedbacks.length - 1 && (
                        <Separator className="my-2" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No feedback yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Related Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-secondary/50 rounded-md p-3">
                  <h4 className="font-medium">Leadership Resources</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Access leadership development courses and materials.
                  </p>
                  <Button className="mt-2 w-full" variant="outline" size="sm">
                    Browse Materials
                  </Button>
                </div>
                
                <div className="bg-secondary/50 rounded-md p-3">
                  <h4 className="font-medium">Technical Mentorship Guide</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Guidelines and best practices for effective technical mentoring.
                  </p>
                  <Button className="mt-2 w-full" variant="outline" size="sm">
                    View Guide
                  </Button>
                </div>
                
                <div className="bg-secondary/50 rounded-md p-3">
                  <h4 className="font-medium">System Architecture Courses</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Recommended courses for improving system design skills.
                  </p>
                  <Button className="mt-2 w-full" variant="outline" size="sm">
                    View Courses
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
