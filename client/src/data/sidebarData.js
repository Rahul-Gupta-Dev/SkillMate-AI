import {
  LayoutDashboard,
  Brain,
  CalendarDays,
  ClipboardList,
  BarChart3,
  BookOpen,
  User,
} from "lucide-react";

export default [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    title: "AI Tutor",
    path: "/ai-tutor",
    icon: Brain,
  },
  {
    id: 3,
    title: "Study Plan",
    path: "/study-plan",
    icon: CalendarDays,
  },
  {
    id: 4,
    title: "Quiz",
    path: "/quiz",
    icon: ClipboardList,
  },
  {
    id: 5,
    title: "Progress",
    path: "/progress",
    icon: BarChart3,
  },
  {
    id: 6,
    title: "Resources",
    path: "/resources",
    icon: BookOpen,
  },
 
  {
    id: 7,
    title: "Profile",
    path: "/profile",
    icon: User,
  },
];