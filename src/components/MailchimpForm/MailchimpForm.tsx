import { useRef, useState } from "react";
import useSound from "use-sound";
import TraidarStart from "../../assets/AUDIO/TraidarStart.mp3";
import styles from "./MailchimpForm.module.css";
import { useNavigate } from "react-router-dom";

/**
 * Mailchimp embedded form styled as glassmorphic bar with rounded sides
 */
export default function MailchimpForm({
  setForceHoverState,
}: {
  setForceHoverState: (state: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  // Manual timeout to reset hover state
  const manualTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Sound effect for button click; clear hover when audio ends
  const [play] = useSound(TraidarStart, {
    volume: 0.5,
    onend: () => {
      setForceHoverState(false);
    },
  });
  const navigate = useNavigate();

  /** Handle form submission manually to play sound, set hover, and navigate after sending */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("📝 handleSubmit fired");
    // Play sound and force hover state
    play();
    setForceHoverState(true);
    // Clear any existing manual timeout
    if (manualTimeoutRef.current) {
      clearTimeout(manualTimeoutRef.current);
    }
    // Reset hover state after sound duration or fallback delay
    manualTimeoutRef.current = setTimeout(() => {
      setForceHoverState(false);
      manualTimeoutRef.current = null;
    }, 8000);
    const form = e.currentTarget;
    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      mode: "no-cors",
    }).finally(() => {
      setTimeout(() => {
        navigate("/thank-you");
      }, 3000);
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      action="https://traidar.us11.list-manage.com/subscribe/post?u=c5c5a9c5507c7ffa3913a85a9&id=6ceb1b2873"
      method="post"
      className={styles.form}
      autoComplete="on"
      noValidate
    >
      <input
        type="email"
        name="EMAIL"
        id="email"
        autoComplete="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Join Waitlist
      </button>
      {/* Honeypot field for bots */}
      <div aria-hidden="true" className={styles.hiddenField}>
        <input
          type="text"
          name="b_c5c5a9c5507c7ffa3913a85a9_6ceb1b2873"
          tabIndex={-1}
          value=""
          readOnly
        />
      </div>
    </form>
  );
}
