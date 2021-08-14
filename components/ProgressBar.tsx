import styles from "../styles/ProgressBar.module.css";

interface ProgressBarProps {
  /**
   * Audio Duration
   **/
  max: number;
  /**
   * Audio current time
   **/
  value: number;
}

const ProgressBar = ({ max, value }: ProgressBarProps) => {
  return (
    <input
      className={styles.ProgressBar}
      type="range"
      name="audio-range"
      id="audio-range"
      min={0}
      max={max}
      value={value}
    />
  );
};

export default ProgressBar;
