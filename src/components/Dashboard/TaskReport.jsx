import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";
import useTask from "../../hooks/useTask";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TaskReport() {
  const { fetchReport, reports, reportLoading } = useTask();
  const { user, fetchUsers } = useAuth();
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    assignedUser: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchReport(filters);
  }, [filters]);

  useEffect(() => {
    if (user.role === "admin") {
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

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(reports, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tasks.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  if (reportLoading) return <div>Loading...</div>;

  return (
    <div className="m-5 border">
      <h2 className="text-xl font-semibold mb-4 my-2 text-center">
        Task Report
      </h2>

      <div className="mb-4 flex space-x-4 p-3 flex-wrap items-center">
        <Select
          value={filters.status}
          onValueChange={(val) => handleFilterChange("status", val)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.assignedUser}
          onValueChange={(val) => handleFilterChange("assignedUser", val)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Assigned User" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All users</SelectItem>
            {assignedUsers.map((user) => (
              <SelectItem key={user._id} value={user._id}>
                {user.username}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <label>Start Date:</label>
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => handleFilterChange("startDate", e.target.value)}
          className="border p-2 h-9 rounded"
        />
        <label>End Date: </label>
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => handleFilterChange("endDate", e.target.value)}
          className="border p-2 h-9 rounded"
        />
        <Button onClick={handleDownloadJSON} className="mb-4">
          Download Report
        </Button>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.length === 0 ? (
            <TableRow>
              <TableCell colSpan="7" className="text-center text-md">
                No tasks found
              </TableCell>
            </TableRow>
          ) : (
            reports.map((report) => (
              <TableRow key={report._id}>
                <TableCell className="font-medium whitespace-nowrap">
                  {report.title}
                </TableCell>
                <TableCell>{report.description}</TableCell>
                <TableCell>
                  {new Date(report.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{report.status}</TableCell>
                <TableCell>
                  {report.createdBy._id === user._id
                    ? "You"
                    : report.createdBy.username}
                </TableCell>
                <TableCell>
                  {report.assignedUser._id === user._id
                    ? "You"
                    : report.assignedUser.username}
                </TableCell>
                <TableCell>{report.priority}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
