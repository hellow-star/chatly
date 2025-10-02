/**
 * Audio Service for Chatly Application
 *
 * This service handles audio notifications with proper browser autoplay policy compliance.
 * It implements an audio unlock mechanism that uses the first user interaction to initialize
 * the audio context, allowing notifications to work across all application pages.
 */

class AudioService {
  constructor() {
    this.audioContext = null;
    this.isUnlocked = false;
    this.isSoundEnabled =
      JSON.parse(localStorage.getItem("isSoundEnabled")) === true;
    this.notificationSound = null;
    this.keyStrokeSounds = [];

    // Initialize audio elements
    this._initializeAudioElements();

    // Set up user gesture detection for audio unlock
    this._setupUserGestureDetection();
  }

  /**
   * Initialize audio elements for notifications and keystrokes
   */
  _initializeAudioElements() {
    try {
      // Create notification sound element
      this.notificationSound = new Audio("/sounds/notification.mp3");
      this.notificationSound.preload = "auto";

      // Create keystroke sound elements
      this.keyStrokeSounds = [
        new Audio("/sounds/keystroke1.mp3"),
        new Audio("/sounds/keystroke2.mp3"),
        new Audio("/sounds/keystroke3.mp3"),
        new Audio("/sounds/keystroke4.mp3"),
      ];

      this.keyStrokeSounds.forEach((sound) => {
        sound.preload = "auto";
      });

      console.log("AudioService: Audio elements initialized successfully");
    } catch (error) {
      console.error("AudioService: Failed to initialize audio elements", error);
    }
  }

  /**
   * Set up event listeners to detect user gestures for audio unlock
   */
  _setupUserGestureDetection() {
    const unlockAudio = () => {
      if (this.isUnlocked) return;

      const removeListeners = () => {
        ["click", "touchstart", "keydown", "mousedown"].forEach((eventType) => {
          document.removeEventListener(eventType, unlockAudio, { once: true });
        });
      };

      try {
        this.notificationSound.muted = true;
        const unlockPromise = this.notificationSound.play();

        if (unlockPromise !== undefined) {
          unlockPromise
            .then(() => {
              this.notificationSound.pause();
              this.notificationSound.currentTime = 0;
              this.notificationSound.muted = false;
              this.isUnlocked = true;
              removeListeners(); // Remove listeners on success
              console.log("AudioService: Audio unlocked successfully");
            })
            .catch((error) => {
              this.notificationSound.muted = false;
              console.warn("AudioService: Audio unlock failed", error);
              // Don't unlock or remove listeners on failure
            });
        } else {
          // For older browsers
          this.notificationSound.muted = false;
          this.isUnlocked = true;
          removeListeners();
          console.log("AudioService: Audio unlocked (legacy browser)");
        }
      } catch (error) {
        this.notificationSound.muted = false;
        console.error("AudioService: Error during audio unlock attempt", error);
      }
    };

    // Add event listeners for various user interactions
    ["click", "touchstart", "keydown", "mousedown"].forEach((eventType) => {
      document.addEventListener(eventType, unlockAudio, { once: true });
    });

    console.log("AudioService: User gesture detection set up");
  }

  /**
   * Play notification sound
   */
  playNotificationSound() {
    if (!this.isSoundEnabled) {
      console.debug("AudioService: Sound is disabled, skipping notification");
      return;
    }

    if (!this.notificationSound) {
      console.error("AudioService: Notification sound not initialized");
      return;
    }

    try {
      // Reset audio to beginning
      this.notificationSound.currentTime = 0;

      const playPromise = this.notificationSound.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.debug(
              "AudioService: Notification sound played successfully"
            );
          })
          .catch((error) => {
            console.warn(
              "AudioService: Failed to play notification sound",
              error
            );
            // If playback fails due to autoplay policy, log but don't throw
            if (error.name === "NotAllowedError") {
              console.warn(
                "AudioService: Autoplay blocked - user interaction may be required"
              );
            }
          });
      }
    } catch (error) {
      console.error(
        "AudioService: Error attempting to play notification sound",
        error
      );
    }
  }

  /**
   * Play random keystroke sound
   */
  playRandomKeyStrokeSound() {
    if (!this.isSoundEnabled || this.keyStrokeSounds.length === 0) {
      return;
    }

    try {
      const randomSound =
        this.keyStrokeSounds[
          Math.floor(Math.random() * this.keyStrokeSounds.length)
        ];

      randomSound.currentTime = 0;
      const playPromise = randomSound.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("AudioService: Failed to play keystroke sound", error);
        });
      }
    } catch (error) {
      console.error(
        "AudioService: Error attempting to play keystroke sound",
        error
      );
    }
  }

  /**
   * Toggle sound enabled state
   */
  toggleSound() {
    this.isSoundEnabled = !this.isSoundEnabled;
    localStorage.setItem("isSoundEnabled", this.isSoundEnabled);
    console.log(
      `AudioService: Sound ${this.isSoundEnabled ? "enabled" : "disabled"}`
    );
    return this.isSoundEnabled;
  }

  /**
   * Get current sound enabled state
   */
  isSoundEnabledState() {
    return this.isSoundEnabled;
  }
}

// Create and export singleton instance
const audioService = new AudioService();
export default audioService;
