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
import { Plus, Search } from "lucide-react";
import { ProgressIndicator } from "@/components/common/ProgressIndicator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAvatar } from "@/components/common/UserAvatar";

interface PDIItem {
  id: number;
  employee: {
    name: string;
    position: string;
    avatar?: string;
  };
  title: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "draft";
  progress: number;
  goals: number;
  completedGoals: number;
}

export const PDIList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const pdis: PDIItem[] = [
    {
      id: 1,
      employee: {
        name: "Michael Chen",
        position: "Software Engineer",
      },
      title: "Technical Leadership Development",
      startDate: "Jan 15, 2023",
      endDate: "Dec 31, 2023",
      status: "active",
      progress: 45,
      goals: 5,
      completedGoals: 2,
    },
    {
      id: 2,
      employee: {
        name: "Sarah Williams",
        position: "Product Designer",
      },
      title: "UX Specialization and Leadership",
      startDate: "Feb 1, 2023",
      endDate: "Jan 31, 2024",
      status: "active",
      progress: 30,
      goals: 4,
      completedGoals: 1,
    },
    {
      id: 3,
      employee: {
        name: "David Kim",
        position: "Marketing Specialist",
      },
      title: "Marketing Analytics Skills Development",
      startDate: "Mar 10, 2023",
      endDate: "Mar 10, 2024",
      status: "active",
      progress: 60,
      goals: 3,
      completedGoals: 2,
    },
    {
      id: 4,
      employee: {
        name: "Jessica Rodriguez",
        position: "Customer Success",
      },
      title: "Leadership and Management Training",
      startDate: "Dec 1, 2022",
      endDate: "Nov 30, 2023",
      status: "active",
      progress: 75,
      goals: 6,
      completedGoals: 5,
    },
    {
      id: 5,
      employee: {
        name: "Alex Johnson",
        position: "UX Researcher",
      },
      title: "Research Methodologies Mastery",
      startDate: "May 15, 2023",
      endDate: "May 15, 2024",
      status: "draft",
      progress: 0,
      goals: 4,
      completedGoals: 0,
    },
  ];

  const filteredPDIs = pdis.filter((pdi) =>
    pdi.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pdi.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activePDIs = filteredPDIs.filter((pdi) => pdi.status === "active");
  const draftPDIs = filteredPDIs.filter((pdi) => pdi.status === "draft");
  const completedPDIs = filteredPDIs.filter((pdi) => pdi.status === "completed");

  const statusStyles = {
    active: "bg-emerald-100 text-emerald-800 border-emerald-200",
    draft: "bg-amber-100 text-amber-800 border-amber-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
  };

  const PDICard = ({ pdi }: { pdi: PDIItem }) => (
    <Card className="animate-fade-in">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar 
              name={pdi.employee.name} 
              image={pdi.employee.avatar}
              size="md"
            />
            <div>
              <h3 className="font-medium">{pdi.employee.name}</h3>
              <p className="text-sm text-muted-foreground">
                {pdi.employee.position}
              </p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={statusStyles[pdi.status]}
          >
            {pdi.status.charAt(0).toUpperCase() + pdi.status.slice(1)}
          </Badge>
        </div>
        
        <h4 className="mt-3 text-lg font-medium">{pdi.title}</h4>
        
        <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
          <span>Period: {pdi.startDate} - {pdi.endDate}</span>
        </div>
        
        <div className="mt-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{pdi.completedGoals}/{pdi.goals} goals</span>
          </div>
          <ProgressIndicator 
            value={pdi.progress} 
            max={100} 
            size="md"
          />
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button asChild variant="ghost" size="sm">
            <Link to={`/pdi/${pdi.id}`}>
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
          Individual Development Plans
        </h2>
        <p className="text-muted-foreground">
          Create and manage development plans for your team members.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or title..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Button asChild className="gap-1">
          <Link to="/pdi/new/new">
            <Plus className="h-4 w-4" />
            <span>Create New PDI</span>
          </Link>
        </Button>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">
            Active
            {activePDIs.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activePDIs.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="draft">
            Drafts
            {draftPDIs.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {draftPDIs.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-4">
          {activePDIs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No active PDIs</h3>
              <p className="text-muted-foreground mt-1">
                Create a new PDI to get started with development planning.
              </p>
              <Button asChild className="mt-4 gap-1">
                <Link to="/pdi/new/new">
                  <Plus className="h-4 w-4" />
                  <span>Create New PDI</span>
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {activePDIs.map((pdi) => (
                <PDICard key={pdi.id} pdi={pdi} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="draft" className="mt-4">
          {draftPDIs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No draft PDIs</h3>
              <p className="text-muted-foreground mt-1">
                Draft PDIs will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {draftPDIs.map((pdi) => (
                <PDICard key={pdi.id} pdi={pdi} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          {completedPDIs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No completed PDIs</h3>
              <p className="text-muted-foreground mt-1">
                Completed PDIs will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {completedPDIs.map((pdi) => (
                <PDICard key={pdi.id} pdi={pdi} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
