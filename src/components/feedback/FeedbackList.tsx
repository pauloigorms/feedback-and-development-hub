
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/Card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, MessageSquare, Plus, Search, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAvatar } from "@/components/common/UserAvatar";
import { format } from "date-fns";

interface FeedbackSession {
  id: number;
  employee: {
    name: string;
    position: string;
    avatar?: string;
  };
  date: Date;
  timeSlot: string;
  location: string;
  topics: string[];
  notes?: string;
  status: "scheduled" | "completed" | "cancelled";
}

export const FeedbackList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock feedback data
  const feedbackSessions: FeedbackSession[] = [
    {
      id: 1,
      employee: {
        name: "Michael Chen",
        position: "Software Engineer",
      },
      date: new Date(2023, 10, 15),
      timeSlot: "10:30 AM - 11:30 AM",
      location: "Meeting Room 1",
      topics: ["Performance review", "Current projects", "Career goals"],
      notes: "Discuss recent achievements and upcoming challenges",
      status: "scheduled",
    },
    {
      id: 2,
      employee: {
        name: "Sarah Williams",
        position: "Product Designer",
      },
      date: new Date(2023, 10, 18),
      timeSlot: "2:30 PM - 3:30 PM",
      location: "Virtual (Zoom)",
      topics: ["Design systems", "Collaboration with engineering", "Professional development"],
      status: "scheduled",
    },
    {
      id: 3,
      employee: {
        name: "David Kim",
        position: "Marketing Specialist",
      },
      date: new Date(2023, 10, 10),
      timeSlot: "9:00 AM - 10:00 AM",
      location: "Coffee Shop",
      topics: ["Campaign performance", "Quarterly goals"],
      status: "completed",
    },
    {
      id: 4,
      employee: {
        name: "Jessica Rodriguez",
        position: "Customer Success",
      },
      date: new Date(2023, 10, 22),
      timeSlot: "1:00 PM - 2:00 PM",
      location: "Meeting Room 3",
      topics: ["Client relationships", "Process improvements", "Team collaboration"],
      status: "scheduled",
    },
  ];

  const filteredSessions = feedbackSessions.filter((session) =>
    session.employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const upcomingSessions = filteredSessions.filter((session) => session.status === "scheduled");
  const completedSessions = filteredSessions.filter((session) => session.status === "completed");
  const cancelledSessions = filteredSessions.filter((session) => session.status === "cancelled");

  const statusStyles = {
    scheduled: "bg-emerald-100 text-emerald-800 border-emerald-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  const FeedbackCard = ({ session }: { session: FeedbackSession }) => (
    <Card className="animate-fade-in">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar 
              name={session.employee.name} 
              image={session.employee.avatar}
              size="md"
            />
            <div>
              <h3 className="font-medium">{session.employee.name}</h3>
              <p className="text-sm text-muted-foreground">
                {session.employee.position}
              </p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={statusStyles[session.status]}
          >
            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
          </Badge>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{format(session.date, "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{session.timeSlot}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{session.location}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Topics to Discuss</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {session.topics.map((topic, index) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {topic}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button asChild variant="ghost" size="sm">
            <Link to={`/feedback/${session.id}`}>
              View details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">
          1:1 Feedback Sessions
        </h2>
        <p className="text-muted-foreground">
          Schedule and manage feedback sessions with your team members.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Button asChild className="gap-1">
          <Link to="/feedback/new/new">
            <Plus className="h-4 w-4" />
            <span>New Feedback Session</span>
          </Link>
        </Button>
      </div>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming
            {upcomingSessions.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {upcomingSessions.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
            {completedSessions.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {completedSessions.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-4">
          {upcomingSessions.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No upcoming sessions</h3>
              <p className="text-muted-foreground mt-1">
                Schedule a new feedback session with a team member.
              </p>
              <Button asChild className="mt-4 gap-1">
                <Link to="/feedback/new/new">
                  <Plus className="h-4 w-4" />
                  <span>New Feedback Session</span>
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {upcomingSessions.map((session) => (
                <FeedbackCard key={session.id} session={session} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          {completedSessions.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No completed sessions</h3>
              <p className="text-muted-foreground mt-1">
                Completed sessions will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {completedSessions.map((session) => (
                <FeedbackCard key={session.id} session={session} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="cancelled" className="mt-4">
          {cancelledSessions.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No cancelled sessions</h3>
              <p className="text-muted-foreground mt-1">
                Cancelled sessions will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {cancelledSessions.map((session) => (
                <FeedbackCard key={session.id} session={session} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
