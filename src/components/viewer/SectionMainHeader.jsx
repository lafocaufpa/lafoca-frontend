import styles from './SectionMainHeader.module.css';

export default function SectionMainHeader({titlePage, descriptionPage}) {
  return (
    <section className={`${styles.container}`}>
      <h1 data-aos="fade-up" data-aos-duration="3000">{titlePage}</h1>
      <p>{descriptionPage}</p>
    </section>
  );
}
