export type Priority = "urgent" | "high" | "medium" | "low";
export type Status = "backlog" | "todo" | "in-progress" | "review" | "done";
export type MemberStatus = "online" | "away" | "offline";

export interface Member {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  dept: string;
  status: MemberStatus;
  workload: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  members: string[];
  dueDate: string;
  progress: number;
  priority: Priority;
  status: Status;
  labels: string[];
  color: string;
  tasks: number;
  completed: number;
}

export interface Subtask {
  done: boolean;
  text: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assignee: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  tags: string[];
  comments: number;
  attachments: number;
  subtasks: Subtask[];
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  type: string;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  avatar: string;
}

export interface ProjectFile {
  name: string;
  size: string;
  type: string;
  modified: string;
  user: string;
}
