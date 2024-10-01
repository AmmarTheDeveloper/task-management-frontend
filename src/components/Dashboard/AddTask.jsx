import React from "react";
import { TaskForm } from "./TaskForm";
import { useAuth } from "../../context/AuthContext";

const AddTask = () => {
  const { user } = useAuth();
  return (
    <>
      <TaskForm isAdmin={user.role == "admin"} />
    </>
  );
};

export default AddTask;
