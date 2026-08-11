import { LuAppWindow, LuChartArea, LuLayers } from "react-icons/lu";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export const links: NavLink[] = [
  {
    href: "/add-job",
    label: "add Job",
    icon: <LuLayers />,
  },
  {
    href: "/jobs",
    label: "jobs",
    icon: <LuAppWindow />,
  },
  {
    href: "/stats",
    label: "stats",
    icon: <LuChartArea />,
  },
];
