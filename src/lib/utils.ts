import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatTonnage(tons: number): string {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
  }).format(tons) + ' MT';
}

export function playAudioText(text: string, lang: 'ta' | 'en' | 'hi' = 'ta') {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Choose appropriate voice
    const voices = window.speechSynthesis.getVoices();
    if (lang === 'ta') {
      const taVoice = voices.find(v => v.lang.includes('ta') || v.lang.includes('IN'));
      if (taVoice) utterance.voice = taVoice;
      utterance.lang = 'ta-IN';
    } else if (lang === 'hi') {
      const hiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN'));
      if (hiVoice) utterance.voice = hiVoice;
      utterance.lang = 'hi-IN';
    } else {
      const enVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en'));
      if (enVoice) utterance.voice = enVoice;
      utterance.lang = 'en-IN';
    }
    
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }
}

export function stopAudioPlayback() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
