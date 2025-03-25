
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
} from "@/components/common/Card";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, Edit, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface FeedbackItem {
  id: number;
  employee: {
    name: string;
    position: string;
    avatar?: string;
  };
  date: string;
  status: "scheduled" | "completed" | "canceled";
  notes?: string;
}

export const FeedbackList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Mock feedback data
  const feedbacks: FeedbackItem[] = [
    {
      id: 1,
      employee: {
        name: "Michael Chen",
        position: "Software Engineer",
      },
      date: "Jun 15, 2023 · 10:30 AM",
      status: "scheduled",
      notes: "Quarterly performance review and goal setting session",
    },
    {
      id: 2,
      employee: {
        name: "Sarah Williams",
        position: "Product Designer",
      },
      date: "Jun 12, 2023 · 2:00 PM",
      status: "completed",
      notes: "Monthly check-in and project discussion",
    },
    {
      id: 3,
      employee: {
        name: "David Kim",
        position: "Marketing Specialist",
      },
      date: "Jun 10, 2023 · 11:00 AM",
      status: "completed",
      notes: "Career development and skill improvement discussion",
    },
    {
      id: 4,
      employee: {
        name: "Jessica Rodriguez",
        position: "Customer Success",
      },
      date: "Jun 8, 2023 · 3:30 PM",
      status: "canceled",
      notes: "Monthly performance review",
    },
    {
      id: 5,
      employee: {
        name: "Alex Johnson",
        position: "UX Researcher",
      },
      date: "Jun 20, 2023 · 1:00 PM",
      status: "scheduled",
      notes: "Project feedback and upcoming sprint planning",
    },
  ];

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesSearch = feedback.employee.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || feedback.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const upcomingFeedbacks = filteredFeedbacks.filter(
    (f) => f.status === "scheduled"
  );
  const pastFeedbacks = filteredFeedbacks.filter(
    (f) => f.status === "completed" || f.status === "canceled"
  );

  const statusStyles = {
    scheduled: "bg-amber-100 text-amber-800 border-amber-200",
    completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
    canceled: "bg-rose-100 text-rose-800 border-rose-200",
  };

  const FeedbackCard = ({ feedback }: { feedback: FeedbackItem }) => (
    <Card className="animate-fade-in">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar 
              name={feedback.employee.name} 
              image={feedback.employee.avatar}
              size="md"
            />
            <div>
              <h3 className="font-medium">{feedback.employee.name}</h3>
              <p className="text-sm text-muted-foreground">
                {feedback.employee.position}
              </p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={statusStyles[feedback.status]}
          >
            {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
          </Badge>
        </div>
        
        <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
          <CalendarClock className="h-3.5 w-3.5" />
          <span>{feedback.date}</span>
        </div>
        
        {feedback.notes && (
          <p className="mt-3 text-sm border-t pt-3">{feedback.notes}</p>
        )}
        
        <div className="mt-4 flex justify-end">
          <Button asChild variant="ghost" size="sm" className="gap-1">
            <Link to={`/feedback/${feedback.id}`}>
              <Edit className="h-3.5 w-3.5" />
              <span>View details</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Feedback 1:1</h2>
        <p className="text-muted-foreground">
          Schedule and manage one-on-one feedback sessions with your team members.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          <span>New Feedback</span>
        </Button>
      </div>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming
            {upcomingFeedbacks.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {upcomingFeedbacks.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="past">
            Past Sessions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4">
          {upcomingFeedbacks.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No upcoming feedback sessions</h3>
              <p className="text-muted-foreground mt-1">
                Schedule a new feedback session with your team members.
              </p>
              <Button className="mt-4 gap-1">
                <Plus className="h-4 w-4" />
                <span>Schedule Feedback</span>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {upcomingFeedbacks.map((feedback) => (
                <FeedbackCard key={feedback.id} feedback={feedback} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          {pastFeedbacks.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No past feedback sessions</h3>
              <p className="text-muted-foreground mt-1">
                Past feedback sessions will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {pastFeedbacks.map((feedback) => (
                <FeedbackCard key={feedback.id} feedback={feedback} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
