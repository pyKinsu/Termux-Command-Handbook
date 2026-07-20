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

// Canonical reading order for the handbook's lessons, used to build
// previous/next navigation at the bottom of each lesson page.
export const lessonOrder: NavLink[] = [
  { name: "How to Download Termux", href: "/How-to-download-termux" },
  { name: "Basics", href: "/Basics" },
  { name: "Core Commands", href: "/Lesson1" },
  { name: "Intermediate Commands", href: "/Lesson2" },
  { name: "Advanced Commands", href: "/Lesson3" },
  { name: "Expert Commands", href: "/Lesson4" },
  { name: "Power User Commands", href: "/Lesson5" },
  { name: "Developer Commands", href: "/Lesson6" },
  { name: "System Administration", href: "/Lesson7" },
  { name: "Network Administration", href: "/Lesson8" },
  { name: "Data Management", href: "/Lesson9" },
];
