import Calculator from "@/components/Calculator/Calculator.jsx";
import Connect4 from "@/components/Connect4/Connect4.jsx";
import Header from "@/components/Header/Header.jsx";
import Minesweeper from "@/components/Minesweeper/Minesweeper.jsx";
import PasswordGenerator from "@/components/PasswordGenerator/PasswordGenerator.jsx";
import SnakeGame from "@/components/SnakeGame/SnakeGame.jsx";
import HomePage from "@/pages/HomePage.jsx";
import ProjectsPage from "@/pages/ProjectsPage/ProjectsPage.jsx";
import ResumePage from "@/pages/ResumePage/ResumePage.jsx";
import { languageObs, updateTranslations } from "@/utils/translations/translations.service.js";
import { Route, Router } from "client-side-router";

export default function App(): DocumentFragment {
  languageObs.subscribe((language) => {
    document.documentElement.lang = language;
    updateTranslations(language);
  });
  languageObs.value = "en";

  return (
    <>
      <Header />
      <main>
        <Router
          onNavigationComplete={() => languageObs.notify()}
          baseUrl="/static-website.github.io"
          titleTransformFn={(title) => `${title} | Melvin Doucet's Website`}
        >
          <Route path="/" component={HomePage} title="Home" />
          <Route path="/projects" component={ProjectsPage} title="Projects" />
          <Route path="/cv" component={ResumePage} title="Résumé" />
          <Route path="/projects/calculator" title="Calculator" component={Calculator} />
          <Route path="/projects/connect-4" title="Connect 4" component={Connect4} />
          <Route path="/projects/minesweeper" title="Minesweeper" component={Minesweeper} />
          <Route path="/projects/password-generator" title="Password generator" component={PasswordGenerator} />
          <Route path="/projects/snake" title="Snake" component={SnakeGame} />
        </Router>
      </main>
    </>
  );
}