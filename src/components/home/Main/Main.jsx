import About from '@home/Main/About/About';
import Projects from '@home/Main/Projects/Projects';
import Results from '@home/Main/Results/Results';
import Team from '@home/Main/Team/Team';
import Menu from '@home/Main/Menu/Menu';

export default function Main() {
  return (
    <main>
      <About/>
      <Team/>
      <Projects/>
      <Results/>
      <Menu/>
    </main>
  );
}