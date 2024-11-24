import Link from "@/components/Link/Link.jsx";
import cssClasses from "./ProjectsPage.module.scss";

export default function ProjectsPage() {
  return (
    <div className="page">
      <h2>Projects</h2>
      <ul className={cssClasses.projectsList}>
        <li><Link href="/projects/calculator">Calculator</Link></li>
        <li><Link href="/projects/connect-4">Connect 4</Link></li>
        <li><Link href="/projects/minesweeper">Minesweeper</Link></li>
        <li><Link href="/projects/password-generator">Password generator</Link></li>
        <li><Link href="/projects/snake">Snake</Link></li>
      </ul>
    </div>
  );
}
