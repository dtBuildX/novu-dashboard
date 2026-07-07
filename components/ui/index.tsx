"use client";

import { X, Check, AlertCircle, ArrowUp, ArrowDown } from "lucide-react";
import type { Priority, Status, MemberStatus } from "@/types";
import { PRIORITY_CONFIG, STATUS_CONFIG, AVATAR_COLORS } from "@/constants";

// ── Avatar ────────────────────────────────────────────────────────
interface AvatarProps {
  seed?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  online?: MemberStatus | null;
  className?: string;
}

const SIZES = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-xl",
};

const STATUS_DOT: Record<MemberStatus, string> = {
  online: "bg-emerald-400",
  away: "bg-amber-400",
  offline: "bg-gray-400",
};

export function Avatar({ seed = "", size = "md", online = null, className = "" }: AvatarProps) {
  const colorIndex = seed ? seed.charCodeAt(0) % AVATAR_COLORS.length : 0;
  return (
    <div className={`relative inline-flex flex-shrink-0 ${className}`}>
      <div className={`${SIZES[size]} ${AVATAR_COLORS[colorIndex]} rounded-full flex items-center justify-center font-semibold text-white`}>
        {seed}
      </div>
      {online !== null && (
        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-900 ${STATUS_DOT[online]}`} />
      )}
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────
interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "brand" | "success" | "warning" | "danger" | "info" | "purple";
  size?: "xs" | "sm";
}

const BADGE_VARIANTS = {
  default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  brand:   "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  danger:  "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  info:    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  purple:  "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
};

export function Badge({ children, variant = "default", size = "sm" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${BADGE_VARIANTS[variant]} ${size === "xs" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-0.5"}`}>
      {children}
    </span>
  );
}

// ── ProgressBar ───────────────────────────────────────────────────
interface ProgressBarProps {
  value: number;
  color?: string;
  height?: number;
  className?: string;
}

export function ProgressBar({ value, color = "#6366f1", height = 6, className = "" }: ProgressBarProps) {
  return (
    <div className={`w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden ${className}`} style={{ height }}>
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = "", hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm ${hover ? "hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 cursor-pointer transition-all duration-200" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// ── Button ────────────────────────────────────────────────────────
interface ButtonProps {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
  size?: "xs" | "sm" | "md" | "lg";
  icon?: React.ElementType;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const BTN_VARIANTS = {
  primary:   "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm",
  secondary: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
  ghost:     "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
  danger:    "bg-red-600 hover:bg-red-700 text-white",
  success:   "bg-emerald-600 hover:bg-emerald-700 text-white",
};

const BTN_SIZES = {
  xs: "text-xs px-2.5 py-1.5 gap-1",
  sm: "text-xs px-3 py-2 gap-1.5",
  md: "text-sm px-4 py-2 gap-2",
  lg: "text-base px-5 py-2.5 gap-2",
};

export function Button({ children, variant = "primary", size = "md", icon: Icon, onClick, className = "", disabled = false, type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 ${BTN_VARIANTS[variant]} ${BTN_SIZES[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {Icon && <Icon size={size === "lg" ? 18 : 15} />}
      {children}
    </button>
  );
}

// ── StatCard ──────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon: React.ElementType;
  color: string;
  sub?: string;
}

export function StatCard({ label, value, change, icon: Icon, color, sub }: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          {sub && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{sub}</p>}
        </div>
        <div className="p-2.5 rounded-xl" style={{ backgroundColor: color + "20" }}>
          <Icon size={20} style={{ color }} />
        </div>
      </div>
      {change !== undefined && (
        <div className="mt-3 flex items-center gap-1">
          {change >= 0
            ? <ArrowUp size={13} className="text-emerald-500" />
            : <ArrowDown size={13} className="text-red-500" />}
          <span className={`text-xs font-medium ${change >= 0 ? "text-emerald-600" : "text-red-600"}`}>{Math.abs(change)}%</span>
          <span className="text-xs text-gray-400">vs last week</span>
        </div>
      )}
    </Card>
  );
}

// ── PriorityBadge ─────────────────────────────────────────────────
export function PriorityBadge({ priority }: { priority: Priority }) {
  const cfg = PRIORITY_CONFIG[priority];
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full" style={{ color: cfg.color, backgroundColor: cfg.bg }}>
      <span className="text-[10px]">{cfg.icon}</span>{cfg.label}
    </span>
  );
}

// ── StatusBadge ───────────────────────────────────────────────────
export function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full" style={{ color: cfg.color, backgroundColor: cfg.bg }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
      {cfg.label}
    </span>
  );
}

// ── Modal ─────────────────────────────────────────────────────────
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const MODAL_SIZES = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };

export function Modal({ open, onClose, title, children, size = "md" }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full ${MODAL_SIZES[size]} max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ── Toast ─────────────────────────────────────────────────────────
interface ToastItem { id: number; message: string; type: "success" | "error" | "info" }

export function ToastContainer({ toasts, removeToast }: { toasts: ToastItem[]; removeToast: (id: number) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div key={t.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium min-w-[280px] ${t.type === "success" ? "bg-emerald-600" : t.type === "error" ? "bg-red-600" : "bg-gray-900"}`}>
          {t.type === "success" ? <Check size={16} /> : <AlertCircle size={16} />}
          {t.message}
          <button onClick={() => removeToast(t.id)} className="ml-auto opacity-70 hover:opacity-100"><X size={14} /></button>
        </div>
      ))}
    </div>
  );
}
