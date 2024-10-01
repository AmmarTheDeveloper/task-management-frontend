import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";
import useTask from "../../hooks/useTask";
import { Link } from "react-router-dom";
import usePagination from "../../hooks/usePagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TaskList() {
  const { tasks, fetchTasks, deleteTask, loading } = useTask();
  const { pagination, handleNextPage, handlePreviousPage, setPagination } =
    usePagination(fetchTasks);
  const { user, fetchUsers } = useAuth();
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    assignedUser: "",
  });
  const [assignedUsers, setAssignedUsers] = useState([]);

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  useEffect(() => {
    async function fetchData() {
      const newPagination = await fetchTasks(
        pagination.page,
        pagination.limit,
        filters
      );
      setPagination(newPagination.pagination);
    }
    fetchData();
  }, [filters]);

  useEffect(() => {
    if (user.role == "admin") {
      fetchUsers().then((res) => {
        if (res.success) {
          setAssignedUsers(res.users);
        } else {
          console.error("Error fetching users", res.error);
          toast.error("Failed to fetch users");
        }
      });
    }
  }, [user.role]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="m-5 border">
      <h2 className="text-xl font-semibold mb-4 my-2 text-center">Task List</h2>

      <div className="mb-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 p-2">
        <Select
          value={filters.status}
          onValueChange={(val) => handleFilterChange("status", val)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.priority}
          onValueChange={(val) => handleFilterChange("priority", val)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>

        {user.role === "admin" && (
          <Select
            value={filters.assignedUser}
            onValueChange={(val) => handleFilterChange("assignedUser", val)}
            name="assignedUser"
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Users" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              {assignedUsers.map((assignedUser) => (
                <SelectItem key={assignedUser._id} value={assignedUser._id}>
                  {assignedUser.username}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {/* <Button
          onClick={() => fetchTasks(pagination.page, pagination.limit, filters)}
        >
          Apply Filters
        </Button> */}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Assigned User</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length == 0 ? (
            <TableRow>
              <TableCell colSpan="8" className="text-center text-md">
                No task found
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell className="font-medium whitespace-nowrap">
                  {task.title}
                </TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  {new Date(task.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  {task.createdBy._id == user._id
                    ? "You"
                    : task.createdBy.username}
                </TableCell>
                <TableCell>
                  {task.assignedUser._id == user._id
                    ? "You"
                    : task.assignedUser.username}
                </TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      asChild
                      type="button"
                      className="bg-blue-500 hover:bg-blue-700"
                    >
                      <Link to={"/dashboard/task/update/" + task._id}>
                        Update
                      </Link>
                    </Button>
                    <Button
                      onClick={() => deleteTask(task._id)}
                      type="button"
                      className="bg-red-500 hover:bg-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan="8">
              <div className="flex justify-center space-x-4 items-center w-full">
                <Button
                  onClick={handlePreviousPage}
                  disabled={pagination.page === 1}
                  className="bg-slate-500 hover:bg-slate-700"
                >
                  Previous
                </Button>
                <span>
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <Button
                  onClick={handleNextPage}
                  disabled={pagination.page === pagination.totalPages}
                  className="bg-slate-500 hover:bg-slate-700"
                >
                  Next
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
