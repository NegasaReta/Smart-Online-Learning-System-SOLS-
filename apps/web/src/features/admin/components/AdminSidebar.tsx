import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  CalendarDays,
  CheckSquare,
  UsersRound,
  BarChart3,
  LineChart,
  UserCog,
  HelpCircle,
  LogOut,
  ChevronDown,
  UserCircle,
  ClipboardCheck,
  LayoutGrid,
  ClipboardList,
  FileText,
  MessageSquare,
  Megaphone,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

type NavItem = {
  key: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  to?: string;
  badge?: number;
  children?: { label: string; to: string }[];
};

const items: NavItem[] = [
  { key: "dashboard",      label: "Dashboard",        icon: LayoutDashboard, to: "/admin/dashboard" },
  { key: "teachers",       label: "Teachers",          icon: GraduationCap,   to: "/admin/teachers" },
  { key: "parents",        label: "Parents",           icon: Users,           to: "/admin/parents" },
  { key: "courses",        label: "Courses",           icon: BookOpen,        to: "/admin/courses" },
  { key: "enrollments",    label: "Enrollments",       icon: ClipboardList,   to: "/admin/enrollments" },
  { key: "calendar",       label: "Calendar",          icon: CalendarDays,    to: "/admin/calendar" },
  { key: "tasks",          label: "Tasks",             icon: CheckSquare,     to: "/admin/tasks" },
  { key: "students",       label: "Students",          icon: UsersRound,      to: "/admin/students" },
  { key: "attendance",     label: "Attendance",        icon: ClipboardCheck,  to: "/admin/attendance" },
  { key: "exams",          label: "Exams",             icon: FileText,        to: "/admin/exams" },
  { key: "reports",        label: "Reports",           icon: BarChart3,       to: "/admin/reports" },
  { key: "announcements",  label: "Announcements",     icon: Megaphone,       to: "/admin/announcements", badge: 2 },
  { key: "messages",       label: "Messages",          icon: MessageSquare,   to: "/admin/messages",      badge: 5 },
  { key: "userManagement", label: "User Management",   icon: UserCog,         to: "/admin/users" },
  { key: "analytics",      label: "Analytics & Usage", icon: LineChart,       to: "/admin/analytics" },
  { key: "managePages",    label: "Manage Pages",      icon: LayoutGrid,      to: "/admin/manage-pages" },
  { key: "account",        label: "Account",           icon: UserCircle,      to: "/admin/account" },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 flex-col border-r border-ink-200 bg-white px-3 py-5 md:flex">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 pb-6">
        <span className="flex size-9 items-center justify-center rounded-xl bg-violet-600">
          <GraduationCap className="size-5 text-white" aria-hidden />
        </span>
        <span className="text-lg font-bold tracking-tight text-ink-900">
          EduSmart K-12
        </span>
      </div>

      {/* Navigation — scrollable */}
      <nav className="flex flex-col gap-0.5 overflow-y-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) =>
          item.children ? (
            <CollapseGroup
              key={item.key}
              item={item}
              pathname={location.pathname}
            />
          ) : (
            <NavLink
              key={item.key}
              to={item.to!}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-ink-700 hover:bg-violet-50 hover:text-violet-700"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className="size-[18px] shrink-0" aria-hidden />
                  <span className="flex-1">{item.label}</span>
                  {item.badge ? (
                    <span className={`ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${isActive ? "bg-white/25 text-white" : "bg-violet-100 text-violet-700"}`}>
                      {item.badge}
                    </span>
                  ) : null}
                </>
              )}
            </NavLink>
          ),
        )}
      </nav>

      {/* Footer */}
      <div className="mt-auto flex flex-col gap-0.5 border-t border-ink-100 pt-3">
        <a
          href="#"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-700 transition hover:bg-ink-100"
        >
          <HelpCircle className="size-[18px]" aria-hidden />
          Help Center
        </a>
        <a
          href="/login"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-700 transition hover:bg-ink-100"
        >
          <LogOut className="size-[18px]" aria-hidden />
          Logout
        </a>
      </div>
    </aside>
  );
}

function CollapseGroup({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const isChildActive = item.children?.some((c) =>
    pathname.startsWith(c.to),
  );
  const [open, setOpen] = useState(!!isChildActive);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
          isChildActive
            ? "bg-violet-50 text-violet-700"
            : "text-ink-700 hover:bg-violet-50 hover:text-violet-700"
        }`}
      >
        <item.icon className="size-[18px] shrink-0" aria-hidden />
        <span className="flex-1 text-left">{item.label}</span>
        <ChevronDown
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open && (
        <div className="ml-8 mt-0.5 flex flex-col gap-0.5">
          {item.children!.map((child) => (
            <NavLink
              key={child.to}
              to={child.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "text-violet-700 font-semibold"
                    : "text-ink-500 hover:text-ink-900"
                }`
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
