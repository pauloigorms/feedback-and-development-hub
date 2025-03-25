
import React from "react";
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
  CardTitle 
} from "@/components/common/Card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  employee: z.string().min(1, {
    message: "Por favor, selecione um colaborador",
  }),
  date: z.date({
    required_error: "Por favor, selecione uma data",
  }),
  timeSlot: z.string().min(1, {
    message: "Por favor, selecione um horário",
  }),
  location: z.string().min(1, {
    message: "Por favor, forneça uma localização",
  }),
  notes: z.string().max(500, {
    message: "Notas devem ter menos de 500 caracteres",
  }),
  topics: z.array(z.string()).min(1, {
    message: "Adicione pelo menos um tópico para discussão",
  }),
});

export const FeedbackForm = () => {
  const [topics, setTopics] = React.useState<string[]>([]);
  const [newTopic, setNewTopic] = React.useState("");
  
  // Mock team members
  const teamMembers = [
    { id: "1", name: "Michael Chen", position: "Engenheiro de Software" },
    { id: "2", name: "Sarah Williams", position: "Designer de Produto" },
    { id: "3", name: "David Kim", position: "Especialista em Marketing" },
    { id: "4", name: "Jessica Rodriguez", position: "Sucesso do Cliente" },
  ];
  
  // Mock time slots
  const timeSlots = [
    "9:00 - 10:00",
    "10:30 - 11:30",
    "13:00 - 14:00",
    "14:30 - 15:30",
    "16:00 - 17:00",
  ];
  
  // Mock locations
  const locations = [
    "Sala de Reunião 1",
    "Sala de Reunião 2",
    "Sala de Reunião 3",
    "Virtual (Zoom)",
    "Virtual (Teams)",
    "Cafeteria",
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
      topics: [],
    },
  });

  const addTopic = () => {
    if (newTopic.trim() && !topics.includes(newTopic.trim())) {
      const updatedTopics = [...topics, newTopic.trim()];
      setTopics(updatedTopics);
      form.setValue("topics", updatedTopics);
      setNewTopic("");
    }
  };

  const removeTopic = (topic: string) => {
    const updatedTopics = topics.filter(t => t !== topic);
    setTopics(updatedTopics);
    form.setValue("topics", updatedTopics);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // TODO: Handle form submission
  };

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle>Agendar Sessão de Feedback</CardTitle>
        <CardDescription>
          Crie uma nova sessão de feedback 1:1 com um membro da equipe
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="employee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Membro da Equipe</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um membro da equipe" />
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
            
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data</FormLabel>
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
                              <span>Selecione uma data</span>
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
                          disabled={(date) =>
                            date < new Date() || date.getDay() === 0 || date.getDay() === 6
                          }
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
                name="timeSlot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um horário" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma localização" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
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
              name="topics"
              render={() => (
                <FormItem>
                  <FormLabel>Tópicos para Discussão</FormLabel>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          placeholder="Adicione um tópico para discussão"
                          value={newTopic}
                          onChange={(e) => setNewTopic(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTopic();
                            }
                          }}
                        />
                      </FormControl>
                      <Button 
                        type="button" 
                        onClick={addTopic}
                        variant="outline"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {topics.length > 0 ? (
                        topics.map((topic, index) => (
                          <Badge key={index} variant="secondary" className="p-2">
                            {topic}
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon" 
                              className="h-4 w-4 ml-1" 
                              onClick={() => removeTopic(topic)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Nenhum tópico adicionado. Adicione alguns tópicos para discussão na sessão.
                        </p>
                      )}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas de Preparação</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Adicione notas de preparação ou pontos de discussão..."
                      className="min-h-32 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Estas notas serão visíveis apenas para você.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
              <Button type="submit">Agendar Sessão</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
