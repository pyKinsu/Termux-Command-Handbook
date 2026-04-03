type NavLink = {
  name: string;
  href: string;
};

export const siteLinks: NavLink[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "All Lessons",
    href: "/Lessons",
  },
  {
    name: "About Us",
    href: "/About",
  },
];

export const externalLinks: NavLink[] = [
  {
    name: "Star Repository",
    href: "https://github.com/pyKinsu/Termux-Command-Handbook",
  },
  {
    name: "Creator",
    href: "https://github.com/pykinsu/",
  },
];
