import { useState } from 'react';
import { useSpring, animated} from 'react-spring';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styles from './Accordion.module.css';
import Image from 'next/image';

export const Accordion = ({ title, text, Icon }) => {
  const [open, setOpen] = useState(false);
  const [iconOpen, setIconOpen] = useState(true);
  let toggleHandler = () => {
    setOpen(!open);
  };

  const openAnimation = useSpring({
    from: { opacity: '0', maxHeight: '25px', },
    to: { opacity: '1', maxHeight: open ? '310px' : '77px' },
    onRest: () => { setIconOpen(!iconOpen); },
    config: { duration: '100' }
  });

  const iconAnimation = useSpring({
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
    },

    config: { duration: '120' }
  });

  const borderAn = useSpring({
    from: {
      borderBottomStyle: 'none',
    },
    to: {
      borderBottomWidth: '1px',
      borderBottomStyle: open ? 'solid' : 'none',
      borderBottomColor: 'rgba(101, 101, 101, 0.5)',
      paddingBottom: '7px'
    },
    config: { duration: '300' }
  });

  return (
    <animated.div className={styles.accordion__item} style={openAnimation} data-aos="fade-up" data-aos-duration="1600" >
      <animated.div className={styles.accordion__header} style={borderAn} onClick={toggleHandler} >
        <Image src={Icon} alt='' priority/>
        <h4>{title}</h4>
        <animated.i style={iconAnimation}>
          {iconOpen ? <RemoveIcon style={{ fontSize: 30 }} className={styles.iconAccordion} /> : <AddIcon style={{ fontSize: 30 }} className={styles.iconAccordion} />}
        </animated.i>
      </animated.div>
      <p className={styles.accordion__content} style={{ whiteSpace: 'pre-line' }}>{text}</p>
    </animated.div>
  );
};
