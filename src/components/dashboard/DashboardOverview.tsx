
import React from "react";
import { ArrowRight, Calendar, CheckCircle2, Clock, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/common/Card";
import { ProgressIndicator } from "@/components/common/ProgressIndicator";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/common/UserAvatar";

export const DashboardOverview = () => {
  // Mock data
  const upcomingFeedbacks = [
    {
      id: 1,
      with: "Michael Chen",
      role: "Software Engineer",
      date: "Tomorrow, 10:30 AM",
      status: "upcoming",
      avatar: "",
    },
    {
      id: 2,
      with: "Sarah Williams",
      role: "Product Designer",
      date: "Friday, 2:00 PM",
      status: "upcoming",
      avatar: "",
    }
  ];

  const pdiProgress = {
    completed: 3,
    total: 5,
    dueDate: "August 30, 2023",
  };

  const recentActivities = [
    {
      id: 1,
      content: "Completed feedback session with David Kim",
      time: "Yesterday at 3:45 PM",
    },
    {
      id: 2,
      content: "Added a new PDI goal: 'Improve presentation skills'",
      time: "June 14 at 10:20 AM",
    },
    {
      id: 3,
      content: "Scheduled 1:1 feedback with Sarah Williams",
      time: "June 12 at 9:30 AM",
    }
  ];

  const statsCards = [
    {
      title: "Completed Feedbacks",
      value: "12",
      icon: CheckCircle2,
      change: "+2 this month",
      positive: true,
    },
    {
      title: "Pending Feedbacks",
      value: "3",
      icon: Clock,
      change: "-1 from last week",
      positive: true,
    },
    {
      title: "Team Members",
      value: "8",
      icon: UserCheck,
      change: "No change",
      positive: null,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-muted-foreground">
          Here's an overview of your team's feedback and development progress.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {statsCards.map((stat, i) => (
          <Card key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={cn(
                "text-xs",
                stat.positive === true && "text-emerald-500",
                stat.positive === false && "text-rose-500"
              )}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Feedback Sessions</CardTitle>
            <CardDescription>
              Your scheduled 1:1 meetings for the upcoming week
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingFeedbacks.map((feedback) => (
              <div key={feedback.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserAvatar name={feedback.with} image={feedback.avatar} size="md" />
                  <div>
                    <p className="font-medium">{feedback.with}</p>
                    <p className="text-sm text-muted-foreground">{feedback.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      <span>{feedback.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="gap-1" size="sm">
              <Link to="/feedback">
                View all
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>PDI Progress</CardTitle>
            <CardDescription>
              Your Individual Development Plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProgressIndicator 
              value={pdiProgress.completed} 
              max={pdiProgress.total} 
              size="md"
              showValue={false}
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {pdiProgress.completed}/{pdiProgress.total} completed
              </span>
              <span className="font-medium">
                {Math.round((pdiProgress.completed / pdiProgress.total) * 100)}%
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Due date</span>
              <span className="font-medium">{pdiProgress.dueDate}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="gap-1" size="sm">
              <Link to="/pdi">
                View plan
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, i) => (
              <div
                key={activity.id}
                className="flex gap-3 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  {i < recentActivities.length - 1 && (
                    <div className="absolute top-2 bottom-0 left-1/2 w-px -translate-x-1/2 bg-border" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p>{activity.content}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

function cn(...classes: (string | undefined | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}
