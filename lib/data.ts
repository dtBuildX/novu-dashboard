import type { Member, Project, Task, Activity, Notification, ProjectFile } from "@/types";

export const TEAM_MEMBERS: Member[] = [
  { id: "u1", name: "Alex Rivera", role: "Product Manager", email: "alex@novu.io", avatar: "AR", dept: "Product", status: "online", workload: 85 },
  { id: "u2", name: "Sam Chen", role: "Senior Engineer", email: "sam@novu.io", avatar: "SC", dept: "Engineering", status: "online", workload: 72 },
  { id: "u3", name: "Jordan Lee", role: "UI/UX Designer", email: "jordan@novu.io", avatar: "JL", dept: "Design", status: "away", workload: 60 },
  { id: "u4", name: "Morgan Kim", role: "Frontend Dev", email: "morgan@novu.io", avatar: "MK", dept: "Engineering", status: "online", workload: 90 },
  { id: "u5", name: "Casey Park", role: "Backend Dev", email: "casey@novu.io", avatar: "CP", dept: "Engineering", status: "offline", workload: 45 },
  { id: "u6", name: "Taylor Wu", role: "DevOps Engineer", email: "taylor@novu.io", avatar: "TW", dept: "Infrastructure", status: "online", workload: 55 },
  { id: "u7", name: "Riley Patel", role: "QA Engineer", email: "riley@novu.io", avatar: "RP", dept: "QA", status: "online", workload: 68 },
  { id: "u8", name: "Drew Foster", role: "Data Analyst", email: "drew@novu.io", avatar: "DF", dept: "Analytics", status: "away", workload: 40 },
  { id: "u9", name: "Blake Torres", role: "Marketing Lead", email: "blake@novu.io", avatar: "BT", dept: "Marketing", status: "online", workload: 77 },
  { id: "u10", name: "Quinn Adams", role: "Customer Success", email: "quinn@novu.io", avatar: "QA", dept: "Success", status: "online", workload: 62 },
];

export const PROJECTS: Project[] = [
  { id: "p1", title: "Novu Platform v3.0", description: "Next-gen notification infrastructure with real-time webhooks and advanced routing", members: ["u1","u2","u4"], dueDate: "2026-07-15", progress: 68, priority: "urgent", status: "in-progress", labels: ["backend","platform"], color: "#6366f1", tasks: 42, completed: 29 },
  { id: "p2", title: "Mobile App Redesign", description: "Complete UI overhaul with new design system and accessibility improvements", members: ["u3","u4","u9"], dueDate: "2026-08-01", progress: 34, priority: "high", status: "in-progress", labels: ["mobile","design"], color: "#8b5cf6", tasks: 38, completed: 13 },
  { id: "p3", title: "API Gateway Migration", description: "Migrate from legacy REST to GraphQL with improved authentication flow", members: ["u2","u5","u6"], dueDate: "2026-07-30", progress: 89, priority: "urgent", status: "review", labels: ["backend","api"], color: "#3b82f6", tasks: 24, completed: 21 },
  { id: "p4", title: "Analytics Dashboard", description: "Real-time metrics and reporting dashboard with custom chart builder", members: ["u1","u8","u4"], dueDate: "2026-09-01", progress: 22, priority: "medium", status: "todo", labels: ["frontend","analytics"], color: "#22c55e", tasks: 31, completed: 7 },
  { id: "p5", title: "Auth & Security Audit", description: "Comprehensive security review, 2FA implementation, and SOC2 compliance", members: ["u5","u6","u7"], dueDate: "2026-07-20", progress: 55, priority: "high", status: "in-progress", labels: ["security","backend"], color: "#f59e0b", tasks: 19, completed: 10 },
  { id: "p6", title: "Documentation Portal", description: "Developer docs site with interactive examples and API playground", members: ["u2","u9","u10"], dueDate: "2026-08-15", progress: 78, priority: "medium", status: "review", labels: ["docs","frontend"], color: "#ec4899", tasks: 15, completed: 12 },
  { id: "p7", title: "Customer Portal", description: "Self-service portal for billing, usage analytics, and team management", members: ["u1","u4","u10"], dueDate: "2026-10-01", progress: 10, priority: "low", status: "backlog", labels: ["frontend","product"], color: "#14b8a6", tasks: 28, completed: 3 },
  { id: "p8", title: "CI/CD Pipeline", description: "Automated deployment pipeline with canary releases and rollback support", members: ["u5","u6","u7"], dueDate: "2026-07-25", progress: 95, priority: "high", status: "done", labels: ["devops","infrastructure"], color: "#f97316", tasks: 12, completed: 11 },
];

export const TASKS: Task[] = [
  { id: "t1", title: "Design new onboarding flow", description: "Create wireframes and prototypes for the redesigned onboarding experience", projectId: "p2", assignee: "u3", priority: "high", status: "in-progress", dueDate: "2026-07-05", tags: ["design","ux"], comments: 8, attachments: 3, subtasks: [{done:true,text:"Research competitors"},{done:true,text:"Create wireframes"},{done:false,text:"User testing"}] },
  { id: "t2", title: "Implement webhook retry logic", description: "Add exponential backoff and dead letter queue for failed webhook deliveries", projectId: "p1", assignee: "u2", priority: "urgent", status: "review", dueDate: "2026-07-03", tags: ["backend","reliability"], comments: 12, attachments: 1, subtasks: [{done:true,text:"Design retry strategy"},{done:true,text:"Implement backoff"},{done:true,text:"Add DLQ"},{done:false,text:"Load testing"}] },
  { id: "t3", title: "GraphQL schema design", description: "Define comprehensive GraphQL schema for the new API gateway", projectId: "p3", assignee: "u5", priority: "urgent", status: "done", dueDate: "2026-06-28", tags: ["api","architecture"], comments: 5, attachments: 2, subtasks: [{done:true,text:"Analyze current REST API"},{done:true,text:"Design types"},{done:true,text:"Code review"}] },
  { id: "t4", title: "Set up Prometheus monitoring", description: "Configure Prometheus and Grafana for infrastructure monitoring", projectId: "p5", assignee: "u6", priority: "high", status: "todo", dueDate: "2026-07-10", tags: ["devops","monitoring"], comments: 3, attachments: 0, subtasks: [{done:false,text:"Install Prometheus"},{done:false,text:"Configure exporters"},{done:false,text:"Create dashboards"}] },
  { id: "t5", title: "Write API documentation", description: "Document all public API endpoints with examples and response schemas", projectId: "p6", assignee: "u2", priority: "medium", status: "in-progress", dueDate: "2026-07-15", tags: ["docs","api"], comments: 4, attachments: 5, subtasks: [{done:true,text:"Auth endpoints"},{done:true,text:"Notification endpoints"},{done:false,text:"Webhook endpoints"},{done:false,text:"Review"}] },
  { id: "t6", title: "Mobile push notification support", description: "Integrate Firebase Cloud Messaging for iOS and Android push notifications", projectId: "p1", assignee: "u4", priority: "high", status: "todo", dueDate: "2026-07-20", tags: ["mobile","notifications"], comments: 6, attachments: 1, subtasks: [{done:false,text:"FCM integration"},{done:false,text:"iOS certificates"},{done:false,text:"Android setup"},{done:false,text:"Testing"}] },
  { id: "t7", title: "Implement dark mode", description: "Add system-aware dark mode with manual toggle and localStorage persistence", projectId: "p2", assignee: "u4", priority: "medium", status: "done", dueDate: "2026-06-25", tags: ["frontend","ux"], comments: 9, attachments: 0, subtasks: [{done:true,text:"Design tokens"},{done:true,text:"Component updates"},{done:true,text:"Testing"}] },
  { id: "t8", title: "SQL query optimization", description: "Identify and optimize slow database queries causing performance bottlenecks", projectId: "p3", assignee: "u5", priority: "urgent", status: "in-progress", dueDate: "2026-07-08", tags: ["backend","performance"], comments: 7, attachments: 2, subtasks: [{done:true,text:"Profile slow queries"},{done:false,text:"Add indexes"},{done:false,text:"Benchmark"}] },
  { id: "t9", title: "User permissions system", description: "Role-based access control with custom permission sets per workspace", projectId: "p5", assignee: "u5", priority: "high", status: "backlog", dueDate: "2026-07-25", tags: ["security","backend"], comments: 2, attachments: 0, subtasks: [{done:false,text:"Define roles"},{done:false,text:"Implement RBAC"},{done:false,text:"Admin UI"}] },
  { id: "t10", title: "Recharts dashboard widgets", description: "Build reusable chart components for the analytics dashboard", projectId: "p4", assignee: "u4", priority: "medium", status: "todo", dueDate: "2026-07-30", tags: ["frontend","charts"], comments: 1, attachments: 0, subtasks: [{done:false,text:"Area chart"},{done:false,text:"Bar chart"},{done:false,text:"Pie chart"}] },
  { id: "t11", title: "CI pipeline for monorepo", description: "GitHub Actions workflow with caching, parallel jobs, and artifact publishing", projectId: "p8", assignee: "u6", priority: "high", status: "done", dueDate: "2026-06-20", tags: ["devops","ci"], comments: 11, attachments: 3, subtasks: [{done:true,text:"Workflow setup"},{done:true,text:"Caching"},{done:true,text:"Artifact publishing"}] },
  { id: "t12", title: "Customer success onboarding", description: "Create guided onboarding checklist and tooltips for new customers", projectId: "p7", assignee: "u10", priority: "low", status: "backlog", dueDate: "2026-09-01", tags: ["product","ux"], comments: 0, attachments: 0, subtasks: [{done:false,text:"Define milestones"},{done:false,text:"Create tooltips"},{done:false,text:"Analytics"}] },
];

export const ACTIVITIES: Activity[] = [
  { id: "a1", user: "u1", action: "created project", target: "Novu Platform v3.0", time: "2m ago", type: "project" },
  { id: "a2", user: "u2", action: "completed task", target: "GraphQL schema design", time: "15m ago", type: "task" },
  { id: "a3", user: "u4", action: "commented on", target: "Design new onboarding flow", time: "32m ago", type: "comment" },
  { id: "a4", user: "u3", action: "uploaded file to", target: "Mobile App Redesign", time: "1h ago", type: "file" },
  { id: "a5", user: "u5", action: "moved task to In Progress", target: "SQL query optimization", time: "2h ago", type: "task" },
  { id: "a6", user: "u6", action: "deployed", target: "CI/CD Pipeline v2.1", time: "3h ago", type: "deploy" },
  { id: "a7", user: "u7", action: "flagged bug in", target: "Auth & Security Audit", time: "4h ago", type: "bug" },
  { id: "a8", user: "u9", action: "joined project", target: "Mobile App Redesign", time: "5h ago", type: "member" },
  { id: "a9", user: "u8", action: "generated report for", target: "Q2 Analytics", time: "6h ago", type: "report" },
  { id: "a10", user: "u1", action: "updated priority on", target: "Webhook retry logic", time: "8h ago", type: "update" },
];

export const NOTIFICATIONS: Notification[] = [
  { id: "n1", type: "mention", title: "Alex Rivera mentioned you", body: "in Design new onboarding flow", time: "5m ago", read: false, avatar: "AR" },
  { id: "n2", type: "deadline", title: "Task due tomorrow", body: "Implement webhook retry logic", time: "1h ago", read: false, avatar: "⚠️" },
  { id: "n3", type: "comment", title: "Sam Chen commented", body: "on GraphQL schema design", time: "2h ago", read: false, avatar: "SC" },
  { id: "n4", type: "assignment", title: "New task assigned", body: "SQL query optimization → Casey Park", time: "3h ago", read: true, avatar: "CP" },
  { id: "n5", type: "project", title: "Project milestone reached", body: "API Gateway Migration is 89% complete", time: "5h ago", read: true, avatar: "🎯" },
  { id: "n6", type: "comment", title: "Jordan Lee replied", body: "to your comment on Mobile App Redesign", time: "6h ago", read: true, avatar: "JL" },
];

export const FILES: ProjectFile[] = [
  { name: "Design System v2.fig", size: "24.5 MB", type: "figma", modified: "2h ago", user: "u3" },
  { name: "API Documentation.pdf", size: "3.2 MB", type: "pdf", modified: "1d ago", user: "u2" },
  { name: "Sprint Planning Q3.xlsx", size: "1.1 MB", type: "excel", modified: "2d ago", user: "u1" },
  { name: "Brand Assets.zip", size: "156 MB", type: "zip", modified: "3d ago", user: "u9" },
  { name: "Architecture Diagram.png", size: "8.4 MB", type: "image", modified: "4d ago", user: "u6" },
  { name: "Product Roadmap.pdf", size: "2.8 MB", type: "pdf", modified: "5d ago", user: "u1" },
  { name: "User Research.docx", size: "4.1 MB", type: "word", modified: "1w ago", user: "u3" },
  { name: "Performance Report.xlsx", size: "0.9 MB", type: "excel", modified: "1w ago", user: "u8" },
];

export const CHART_DATA = {
  productivity: [
    { day: "Mon", tasks: 12, completed: 9 },
    { day: "Tue", tasks: 18, completed: 15 },
    { day: "Wed", tasks: 8, completed: 6 },
    { day: "Thu", tasks: 22, completed: 19 },
    { day: "Fri", tasks: 16, completed: 14 },
    { day: "Sat", tasks: 5, completed: 5 },
    { day: "Sun", tasks: 3, completed: 3 },
  ],
  monthly: [
    { month: "Jan", tasks: 120, projects: 4 },
    { month: "Feb", tasks: 145, projects: 5 },
    { month: "Mar", tasks: 98, projects: 3 },
    { month: "Apr", tasks: 167, projects: 6 },
    { month: "May", tasks: 189, projects: 7 },
    { month: "Jun", tasks: 142, projects: 5 },
  ],
  workload: [
    { name: "Engineering", value: 45, color: "#6366f1" },
    { name: "Design", value: 20, color: "#8b5cf6" },
    { name: "QA", value: 15, color: "#3b82f6" },
    { name: "DevOps", value: 12, color: "#22c55e" },
    { name: "Others", value: 8, color: "#f59e0b" },
  ],
  trend: [
    { week: "W1", velocity: 42, goal: 50 },
    { week: "W2", velocity: 55, goal: 50 },
    { week: "W3", velocity: 48, goal: 50 },
    { week: "W4", velocity: 61, goal: 50 },
    { week: "W5", velocity: 58, goal: 55 },
    { week: "W6", velocity: 72, goal: 55 },
  ],
};

export const getMember = (id: string) => TEAM_MEMBERS.find((m) => m.id === id);
export const getProject = (id: string) => PROJECTS.find((p) => p.id === id);
