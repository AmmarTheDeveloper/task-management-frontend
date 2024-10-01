import {
  CircleUser,
  List,
  ListCheck,
  ListIcon,
  Menu,
  Notebook,
  Package2,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link to="/" className="text-xl font-semibold text-nowrap">
          Task Management
        </Link>

        <Link
          to="/dashboard"
          className="text-muted-foreground transition-colors hover:text-foreground text-nowrap"
        >
          Dashboard
        </Link>

        {user?.role === "admin" && (
          <>
            {/* <Link
              to="/users"
              className="text-muted-foreground transition-colors hover:text-foreground text-nowrap"
            >
              Users
            </Link> */}
          </>
        )}

        <Link
          to="/dashboard/tasks"
          className="text-muted-foreground transition-colors hover:text-foreground text-nowrap"
        >
          Tasks
        </Link>

        <Link
          to="/dashboard/task/add"
          className="text-muted-foreground transition-colors hover:text-foreground text-nowrap"
        >
          Add Task
        </Link>
        <Link
          to="/dashboard/task/report"
          className="text-muted-foreground transition-colors hover:text-foreground text-nowrap"
        >
          Task Report
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link to="#" className=" text-lg font-semibold">
              Task Management
            </Link>
            <Link to="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>

            {user?.role === "admin" && (
              <>
                {/* <Link
                  to="/dashboard/users"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Users
                </Link> */}
              </>
            )}

            <Link
              to="/dashboard/tasks"
              className="text-muted-foreground hover:text-foreground"
            >
              Tasks
            </Link>

            <Link
              to="/dashboard/task/add"
              className="text-muted-foreground hover:text-foreground"
            >
              Add Task
            </Link>
            <Link
              to="/dashboard/task/report"
              className="text-muted-foreground hover:text-foreground"
            >
              Task Report
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="flex-1"></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full text-[12px]"
            >
              {user.username.slice(0, 2).toUpperCase()}
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
