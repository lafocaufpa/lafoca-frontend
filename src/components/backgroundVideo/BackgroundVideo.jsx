import styles from './BackgroundVideo.module.css';

const BackgroundVideo = () => {
  return (
    <div className={styles.backgroundVideo}>
      <video autoPlay loop muted>
        <source src="/assets/video/background-lafoca.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default BackgroundVideo;