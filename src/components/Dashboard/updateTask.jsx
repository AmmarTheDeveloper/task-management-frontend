import React from "react";
import { useAuth } from "../../context/AuthContext";
import { UpdateTaskForm } from "./updateTaskForm";
import { useParams } from "react-router-dom";

const UpdateTask = () => {
  const { user } = useAuth();
  const { id } = useParams();
  return (
    <>
      <UpdateTaskForm isAdmin={user?.role === "admin"} taskId={id} />
    </>
  );
};

export default UpdateTask;
