export function speakEnglish(text: string): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9;

  const voices = window.speechSynthesis.getVoices();
  const enVoice =
    voices.find((v) => v.lang.startsWith("en") && /US|GB|UK/i.test(v.lang)) ||
    voices.find((v) => v.lang.startsWith("en"));
  if (enVoice) utterance.voice = enVoice;

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
}
