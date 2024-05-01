import Image from 'next/image';
import styles from './Accordion.module.css';
import { useState } from 'react';

export default function Accordion({data}) {

  const [selected, setSelected] = useState(null);

  const toggle = (key) => {
    if(selected === key ) {
      return setSelected(null);
    }
    
    setSelected(key);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.accordion}>

        {data.map((item, key) => (
          <div  data-aos="fade-up" data-aos-duration="2000" key={key}className={styles.item} onClick={() => toggle(key)}>
            <div className={styles.title}>
              <Image className={styles.icon} src={item.icon} alt=''/> 
              <h4>{item.title}</h4>
              <span className={styles.button}>{selected === key ? '-' : '+'}</span>
            </div>
            <div className={selected === key ? styles.contentShow : styles.content}>{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}