import styles from './BackgroundVideo.module.css';

const BackgroundVideo = () => {
  return (
    <div className={styles.backgroundVideo}>
      <video autoPlay loop muted>
        <source src="https://lafoca-server.s3.amazonaws.com/assets/background-lafoca2.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default BackgroundVideo;
