import About from '@home/Main/About/About';
import Projects from '@home/Main/Projects/Projects';
import Results from '@home/Main/Results/Results';
import Team from '@home/Main/Team/Team';

export default function Main() {
  return (
    <main>
      <About/>
      <Team/>
      <Results/>
      <Projects/>
    </main>
  );
}