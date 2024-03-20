import About from './About/About';
import Projects from './Projects/Projects';
import Results from './Results/Results';
import Team from './Team/Team';

export default function Main() {
  return (
    <main>
      <About/>
      <Team/>
      {/* <Projects/> */}
      <Results/>
    </main>
  );
}