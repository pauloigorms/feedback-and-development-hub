import React from "react";
import { useParams } from "react-router-dom";
import { ProfileForm } from "@/components/profile/ProfileForm";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/Card";
import { UserAvatar } from "@/components/common/UserAvatar";
import { CalendarClock, Edit, Mail, Phone, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfileDetail = () => {
  const user = {
    name: "Alice Johnson",
    position: "Engineering Manager",
    department: "Product Development",
    email: "alice.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatar: "",
    joinDate: "March 15, 2020",
    bio: "Experienced engineering manager with 10+ years in software development. Focused on building high-performing teams and delivering user-centered products.",
    skills: ["Leadership", "Agile Methodologies", "Product Strategy", "Team Building", "Software Architecture"],
    manager: {
      name: "Robert Chen",
      position: "VP of Engineering",
      email: "robert.chen@example.com",
      avatar: "",
    },
    directReports: [
      {
        name: "Michael Chen",
        position: "Senior Software Engineer",
        avatar: "",
      },
      {
        name: "Sarah Williams",
        position: "Product Designer",
        avatar: "",
      },
      {
        name: "David Kim",
        position: "Marketing Specialist",
        avatar: "",
      },
      {
        name: "Jessica Rodriguez",
        position: "Customer Success",
        avatar: "",
      },
    ],
    recentFeedback: [
      {
        date: "Jun 15, 2023",
        with: "Michael Chen",
        summary: "Quarterly performance review and goal setting session",
      },
      {
        date: "Jun 12, 2023",
        with: "Sarah Williams",
        summary: "Monthly check-in and project discussion",
      },
    ],
    upcomingFeedback: [
      {
        date: "Jul 15, 2023",
        with: "David Kim",
        summary: "Monthly performance check-in",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">
          View and manage your profile information
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Personal Information</CardTitle>
              <Button variant="outline" size="sm" className="gap-1" asChild>
                <a href="/profile/edit">
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </a>
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-3">
                  <UserAvatar 
                    name={user.name} 
                    image={user.avatar}
                    size="lg"
                    className="h-24 w-24"
                  />
                  <Button variant="outline" size="sm" className="gap-1">
                    <Edit className="h-3.5 w-3.5" />
                    <span>Change</span>
                  </Button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-muted-foreground">{user.position}</p>
                  </div>
                  
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Department</p>
                      <p>{user.department}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Location</p>
                      <p>{user.location}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Phone</p>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <p>{user.phone}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Join Date</p>
                      <div className="flex items-center gap-2">
                        <CalendarClock className="h-4 w-4" />
                        <p>{user.joinDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Bio</h4>
                  <p className="text-muted-foreground">{user.bio}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Skills & Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="bg-secondary/50 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Manager</h3>
                  <div className="flex items-center gap-3">
                    <UserAvatar 
                      name={user.manager.name} 
                      image={user.manager.avatar}
                      size="md"
                    />
                    <div>
                      <h4 className="font-medium">{user.manager.name}</h4>
                      <p className="text-sm text-muted-foreground">{user.manager.position}</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Direct Reports ({user.directReports.length})</h3>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    {user.directReports.map((report, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <UserAvatar 
                          name={report.name} 
                          image={report.avatar}
                          size="sm"
                        />
                        <div>
                          <h4 className="font-medium">{report.name}</h4>
                          <p className="text-xs text-muted-foreground">{report.position}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="pt-4">
                  {user.upcomingFeedback.length > 0 ? (
                    <div className="space-y-4">
                      {user.upcomingFeedback.map((feedback, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{feedback.date}</h4>
                          </div>
                          <p className="text-sm">With: {feedback.with}</p>
                          <p className="text-sm text-muted-foreground">{feedback.summary}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No upcoming feedback sessions</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="recent" className="pt-4">
                  {user.recentFeedback.length > 0 ? (
                    <div className="space-y-4">
                      {user.recentFeedback.map((feedback, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{feedback.date}</h4>
                          </div>
                          <p className="text-sm">With: {feedback.with}</p>
                          <p className="text-sm text-muted-foreground">{feedback.summary}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No recent feedback sessions</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              
              <Button className="w-full mt-4" variant="outline" size="sm">
                View All Sessions
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 text-left mb-1"
                >
                  <User className="h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span>Personal Information</span>
                    <span className="text-xs text-muted-foreground">
                      Update your profile details
                    </span>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 text-left mb-1"
                >
                  <Mail className="h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span>Email Preferences</span>
                    <span className="text-xs text-muted-foreground">
                      Manage notification settings
                    </span>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 text-left"
                >
                  <CalendarClock className="h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span>Availability</span>
                    <span className="text-xs text-muted-foreground">
                      Set your working hours
                    </span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const { action } = useParams<{ action?: string }>();
  
  if (action === "edit") {
    return <ProfileForm />;
  }
  
  return <ProfileDetail />;
};

export default Profile;
