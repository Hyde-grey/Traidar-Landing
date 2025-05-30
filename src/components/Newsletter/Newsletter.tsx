import useSound from "use-sound";
import MailchimpForm from "../MailchimpForm/MailchimpForm";
import styles from "./newsletter.module.css";

import TraidarStart from "../../assets/AUDIO/TraidarStart.mp3";

const Newsletter = ({
  setForceHoverState,
}: {
  setForceHoverState: (state: boolean) => void;
}) => {
  const [play] = useSound(TraidarStart);
  return (
    <div
      className={styles.soonContainer}
      onClick={() => {
        play();
        setForceHoverState(true);
      }}
    >
      <MailchimpForm setForceHoverState={setForceHoverState} />
    </div>
  );
};

export default Newsletter;
