import Dropdown from "@/components/Dropdown/Dropdown.jsx";
import cssClasses from "./Nav.module.scss";
import Link from "@/components/Link/Link.jsx";

export default function Nav() {
  return (
    <nav className={cssClasses.nav}>
      <ul>
        <li>
          <Link href="/" className={cssClasses.navLink}>Home</Link>
        </li>
        <li>
          <Dropdown>
            <Link href="/projects" className={cssClasses.navLink}>Projects</Link>
            <div className={cssClasses.projectLinks}>
              <Link href="/projects/calculator">Calculator</Link>
              <Link href="/projects/connect-4">Connect 4</Link>
              <Link href="/projects/minesweeper">Minesweeper</Link>
              <Link href="/projects/password-generator">Password generator</Link>
              <Link href="/projects/snake">Snake</Link>
            </div>
          </Dropdown>
        </li>
        <li>
          <Link href="/cv" className={cssClasses.navLink}>CV</Link>
        </li>
      </ul>
    </nav>
  );
}