import styles from './SectionMainHeader.module.css';

export default function SectionMainHeader({titlePage, descriptionPage}) {
  return (
    <section className={`${styles.container}`}>
      <h1>{titlePage}</h1>
      <p>{descriptionPage}</p>
    </section>
  );
}
