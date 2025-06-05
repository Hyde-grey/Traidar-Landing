import { useRef, useState } from "react";
import useSound from "use-sound";
import TraidarStart from "../../assets/AUDIO/TraidarStart.mp3";
import styles from "./MailchimpForm.module.css";
import { useNavigate } from "react-router-dom";
import { useSoundContext } from "../../context/SoundContext";

/**
 * Validates if the input string is a valid email address
 * @param email - The email string to validate
 * @returns boolean indicating if the email is valid
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Mailchimp embedded form styled as glassmorphic bar with rounded sides
 */
export default function MailchimpForm({
  setForceHoverState,
}: {
  setForceHoverState: (state: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAmbientPlaying, handleSoundComplete } = useSoundContext();
  // Manual timeout to reset hover state
  const manualTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Sound effect for button click; clear hover when audio ends
  const [play] = useSound(TraidarStart, {
    html5: true,
    volume: 0.5,
    onend: () => {
      setForceHoverState(false);
      handleSoundComplete();
    },
  });
  const navigate = useNavigate();

  /** Handle form submission manually to play sound, set hover, and navigate after sending */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidEmail(email)) return;

    setIsSubmitting(true);
    console.log("📝 handleSubmit fired");
    // Only play sound if ambient sound is not playing
    if (!isAmbientPlaying) {
      play();
    }
    setForceHoverState(true);
    // Clear any existing manual timeout
    if (manualTimeoutRef.current) {
      clearTimeout(manualTimeoutRef.current);
    }
    // Reset hover state and submitting flag after sound duration or fallback delay
    manualTimeoutRef.current = setTimeout(() => {
      setForceHoverState(false);
      setIsSubmitting(false);
      manualTimeoutRef.current = null;
    }, 0);
    const form = e.currentTarget;
    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      mode: "no-cors",
    }).finally(() => {
      setTimeout(() => {
        navigate("/thank-you");
      }, 0);
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
      <button
        type="submit"
        className={styles.button}
        disabled={isSubmitting || !isValidEmail(email)}
      >
        {isSubmitting ? "Joining..." : "Join Waitlist"}
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
