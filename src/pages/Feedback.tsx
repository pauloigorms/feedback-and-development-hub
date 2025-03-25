
import React from "react";
import { useParams } from "react-router-dom";
import { FeedbackList } from "@/components/feedback/FeedbackList";
import { FeedbackDetail } from "@/components/feedback/FeedbackDetail";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";

const Feedback = () => {
  const { id, action } = useParams<{ id?: string; action?: string }>();
  
  if (id === "new" && action === "new") {
    return <FeedbackForm />;
  }
  
  if (id && action === "edit") {
    return <FeedbackForm />;
  }
  
  if (id) {
    return <FeedbackDetail />;
  }
  
  return <FeedbackList />;
};

export default Feedback;
