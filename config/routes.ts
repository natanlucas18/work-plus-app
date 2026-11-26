import { PathLinks } from '@/enums/path-links';
import {
  ActivityIcon,
  CalendarPlusIcon,
  CalendarRangeIcon,
  ClipboardIcon,
  IdCardLanyardIcon,
  LayoutDashboardIcon,
  LucideIcon,
  MapPinnedIcon,
} from 'lucide-react';

export type Roles = 'supervisor' | 'rh' | 'manager' | 'super_admin';

export interface AppRoute {
  label: string;
  path: string;
  icon: LucideIcon;
  roles: Roles[];
  children?: {
    label: string;
    path: string;
    icon: LucideIcon;
  };
}

export const APP_ROUTES: AppRoute[] = [
  {
    label: 'Dashboard',
    path: PathLinks.DASHBOARD,
    icon: LayoutDashboardIcon,
    roles: ['rh', 'manager', 'super_admin'],
  },
  {
    label: 'Atividades',
    path: PathLinks.ACTIVITIES,
    icon: ActivityIcon,
    roles: ['supervisor', 'rh', 'manager', 'super_admin'],
  },
  {
    label: 'Estações de trabalho',
    path: PathLinks.WORK_STATIONS,
    icon: MapPinnedIcon,
    roles: ['rh', 'manager', 'super_admin'],
  },
  {
    label: 'Funcionários',
    path: PathLinks.EMPLOYEES,
    icon: IdCardLanyardIcon,
    roles: ['rh', 'manager', 'super_admin'],
  },
  {
    label: 'Lançamentos',
    path: PathLinks.EXTRA_EARNINGS,
    icon: CalendarPlusIcon,
    roles: ['supervisor', 'rh', 'manager', 'super_admin'],
  },
  {
    label: 'Períodos de pagamento',
    path: PathLinks.PAY_PERIODS,
    icon: CalendarRangeIcon,
    roles: ['rh', 'manager', 'super_admin'],
  },
  {
    label: 'Relatórios',
    path: PathLinks.REPORTS,
    icon: ClipboardIcon,
    roles: ['rh', 'manager', 'super_admin'],
  },
];
