
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
  CalendarClock, 
  Edit, 
  MessageSquare, 
  ThumbsUp,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export const FeedbackDetail = () => {
  const { id } = useParams<{ id: string }>();
  const feedbackId = parseInt(id as string);
  
  // Mock feedback data
  const feedback = {
    id: feedbackId,
    employee: {
      name: "Michael Chen",
      position: "Software Engineer",
      email: "michael.chen@example.com",
      avatar: "",
    },
    date: "Jun 15, 2023",
    time: "10:30 AM - 11:30 AM",
    status: "scheduled",
    topics: [
      "Quarterly performance review",
      "Career progression discussion",
      "Current project challenges",
    ],
    notes: "Discuss recent achievements and set goals for the next quarter. Review feedback from peers and discuss areas of improvement.",
    location: "Meeting Room 3",
    previousFeedback: {
      date: "Mar 12, 2023",
      summary: "Michael demonstrated strong technical skills and teamwork. Areas for improvement include communication with non-technical stakeholders.",
    },
    actions: [
      { 
        id: 1, 
        text: "Complete React certification", 
        status: "in-progress", 
        due: "Jul 30, 2023" 
      },
      { 
        id: 2, 
        text: "Improve documentation practices", 
        status: "not-started", 
        due: "Aug 15, 2023" 
      },
    ],
  };

  const statusStyles = {
    scheduled: {
      badge: "bg-amber-100 text-amber-800 border-amber-200",
      icon: Clock,
      label: "Scheduled",
    },
    completed: {
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: ThumbsUp,
      label: "Completed",
    },
    canceled: {
      badge: "bg-rose-100 text-rose-800 border-rose-200",
      icon: AlertTriangle,
      label: "Canceled",
    },
  };

  const currentStatus = statusStyles[feedback.status as keyof typeof statusStyles];
  const StatusIcon = currentStatus.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          asChild
        >
          <Link to="/feedback">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Feedback Details</h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Session Information</CardTitle>
              <Badge 
                variant="outline" 
                className={currentStatus.badge}
              >
                <StatusIcon className="mr-1 h-3 w-3" />
                {currentStatus.label}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <UserAvatar 
                  name={feedback.employee.name} 
                  image={feedback.employee.avatar}
                  size="lg"
                />
                <div>
                  <h3 className="text-lg font-medium">{feedback.employee.name}</h3>
                  <p className="text-muted-foreground">{feedback.employee.position}</p>
                  <p className="text-sm text-muted-foreground mt-1">{feedback.employee.email}</p>
                </div>
              </div>
              
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Date & Time</p>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <CalendarClock className="h-4 w-4" />
                    <span>{feedback.date} • {feedback.time}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-muted-foreground">{feedback.location}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Topics to Discuss</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {feedback.topics.map((topic, i) => (
                    <li key={i}>{topic}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Notes</p>
                <p className="text-muted-foreground">{feedback.notes}</p>
              </div>
              
              <div className="flex justify-end">
                <Button className="gap-1">
                  <Edit className="h-4 w-4" />
                  <span>Edit Session</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Previous Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {feedback.previousFeedback ? (
                <div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <CalendarClock className="h-3.5 w-3.5" />
                    <span>{feedback.previousFeedback.date}</span>
                  </div>
                  <p>{feedback.previousFeedback.summary}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">No previous feedback available.</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Session Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Add your notes for this feedback session..."
                className="min-h-32"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Save Draft</Button>
                <Button className="gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>Complete & Send</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Action Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {feedback.actions.length > 0 ? (
                <div className="space-y-3">
                  {feedback.actions.map((action) => (
                    <div key={action.id} className="pb-2">
                      <div className="flex items-start gap-2">
                        <div 
                          className={`mt-0.5 h-2 w-2 rounded-full ${
                            action.status === "completed" 
                              ? "bg-emerald-500" 
                              : action.status === "in-progress" 
                                ? "bg-amber-500" 
                                : "bg-gray-300"
                          }`} 
                        />
                        <div className="space-y-1">
                          <p>{action.text}</p>
                          <div className="flex items-center gap-1">
                            <p className="text-xs text-muted-foreground">
                              Due: {action.due}
                            </p>
                            <Badge 
                              variant="outline" 
                              className="text-xs"
                            >
                              {action.status === "in-progress" 
                                ? "In Progress" 
                                : action.status === "completed" 
                                  ? "Completed" 
                                  : "Not Started"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Separator className="mt-2" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No action items yet.</p>
                  <Button className="mt-4 gap-1" variant="outline" size="sm">
                    <Edit className="h-3.5 w-3.5" />
                    <span>Add Action Item</span>
                  </Button>
                </div>
              )}
              
              {feedback.actions.length > 0 && (
                <Button className="w-full gap-1" variant="outline" size="sm">
                  <Edit className="h-3.5 w-3.5" />
                  <span>Add Action Item</span>
                </Button>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CalendarClock className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Next Regular 1:1</p>
                    <p className="text-sm text-muted-foreground">Jul 15, 2023 • 10:30 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarClock className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Quarterly Review</p>
                    <p className="text-sm text-muted-foreground">Sep 20, 2023 • 2:00 PM</p>
                  </div>
                </div>
                <Button className="w-full gap-1" variant="outline" size="sm">
                  <CalendarClock className="h-3.5 w-3.5" />
                  <span>Schedule New Session</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
