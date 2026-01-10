let audio = null;

export function startSiren() {
  if (!audio) {
    audio = new Audio("/sounds/siren.mp3");
    audio.loop = true;
  }

  audio.play().catch(() => {
    console.warn("Autoplay blocked, waiting for user gesture.");
  });
}

export function stopSiren() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}
