import cssClasses from "./ProjectsPage.module.scss";

export default function ProjectsPage() {
  return (
    <div className="page">
      <h2>Projects</h2>
      <ul className={cssClasses.projectsList}>
        <li><a href="/projects/calculator">Calculator</a></li>
        <li><a href="/projects/connect-4">Connect 4</a></li>
        <li><a href="/projects/minesweeper">Minesweeper</a></li>
        <li><a href="/projects/password-generator">Password generator</a></li>
        <li><a href="/projects/snake">Snake</a></li>
      </ul>
    </div>
  );
}
