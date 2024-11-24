import Dropdown from "@/components/Dropdown/Dropdown.jsx";
import cssClasses from "./Nav.module.scss";

export default function Nav() {
  return (
    <nav className={cssClasses.nav}>
      <ul>
        <li>
          <a href="/" className={cssClasses.navLink}>Home</a>
        </li>
        <li>
          <Dropdown>
            <a href="/projects" className={cssClasses.navLink}>Projects</a>
            <div className={cssClasses.projectLinks}>
              <a href="/projects/calculator">Calculator</a>
              <a href="/projects/connect-4">Connect 4</a>
              <a href="/projects/minesweeper">Minesweeper</a>
              <a href="/projects/password-generator">Password generator</a>
              <a href="/projects/snake">Snake</a>
            </div>
          </Dropdown>
        </li>
        <li>
          <a href="/cv" className={cssClasses.navLink}>CV</a>
        </li>
      </ul>
    </nav>
  );
}