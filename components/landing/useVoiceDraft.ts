'use client';

import { useEffect, useRef, useState } from 'react';

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<{
    isFinal: boolean;
    0: { transcript: string };
  }>;
};

function getSpeechRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === 'undefined') return null;
  const speechWindow = window as Window & {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition || null;
}

function pickRecorderMime() {
  if (typeof MediaRecorder === 'undefined') return '';
  const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'];
  return types.find((type) => MediaRecorder.isTypeSupported(type)) ?? '';
}

function joinDraft(base: string, spoken: string) {
  const prefix = base.trim();
  const next = spoken.trim();
  if (!prefix) return next;
  if (!next) return prefix;
  return `${prefix} ${next}`;
}

export function useVoiceDraft(
  draft: string,
  setDraft: (value: string) => void,
  isDe: boolean,
  disabled: boolean
) {
  const [recording, setRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const draftRef = useRef(draft);
  const baseRef = useRef('');
  const spokenRef = useRef('');
  const sessionFinalRef = useRef('');
  const keepListeningRef = useRef(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  useEffect(() => {
    return () => {
      keepListeningRef.current = false;
      recognitionRef.current?.abort();
      if (recorderRef.current?.state === 'recording') recorderRef.current.stop();
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const L = (en: string, de: string) => (isDe ? de : en);

  const stopTracks = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const transcribeRecording = async (blob: Blob) => {
    if (blob.size < 800) {
      setVoiceError(
        L(
          'I could not hear anything. Please try again and speak a little longer.',
          'Ich habe nichts gehört. Versuche es erneut und sprich etwas länger.'
        )
      );
      return;
    }

    setTranscribing(true);
    try {
      const extension = blob.type.includes('mp4') ? 'm4a' : 'webm';
      const form = new FormData();
      form.append('audio', blob, `answer.${extension}`);
      form.append('locale', isDe ? 'de' : 'en');

      const response = await fetch('/api/story-transcribe', {
        method: 'POST',
        body: form,
      });
      const result = (await response.json()) as {
        success?: boolean;
        text?: string;
        message?: string;
      };

      if (result.success && result.text) {
        setDraft(joinDraft(baseRef.current, result.text));
        setVoiceError(null);
        return;
      }

      setVoiceError(
        result.message ||
          L(
            'Voice could not be turned into text right now. You can type instead.',
            'Die Stimme konnte gerade nicht in Text umgewandelt werden. Du kannst stattdessen tippen.'
          )
      );
    } catch {
      setVoiceError(
        L(
          'Voice could not be turned into text right now. You can type instead.',
          'Die Stimme konnte gerade nicht in Text umgewandelt werden. Du kannst stattdessen tippen.'
        )
      );
    } finally {
      setTranscribing(false);
    }
  };

  const startBrowserSpeech = () => {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) return false;

    const recognition = new Ctor();
    recognition.lang = isDe ? 'de-DE' : 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let sessionFinal = '';
      let interim = '';
      for (let i = 0; i < event.results.length; i += 1) {
        const piece = event.results[i][0]?.transcript ?? '';
        if (event.results[i].isFinal) sessionFinal += `${piece} `;
        else interim += piece;
      }
      sessionFinalRef.current = sessionFinal.trim();
      const live = joinDraft(joinDraft(spokenRef.current, sessionFinal), interim);
      if (live || spokenRef.current) {
        setDraft(joinDraft(baseRef.current, live));
        setVoiceError(null);
      }
    };

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        keepListeningRef.current = false;
        setRecording(false);
        setVoiceError(
          L(
            'Microphone access was blocked. Allow the microphone and try again.',
            'Der Mikrofonzugriff wurde blockiert. Erlaube das Mikrofon und versuche es erneut.'
          )
        );
        return;
      }
      if (event.error === 'no-speech' && !spokenRef.current && !sessionFinalRef.current) {
        setVoiceError(
          L(
            'I could not hear anything. Please try again and speak a little longer.',
            'Ich habe nichts gehört. Versuche es erneut und sprich etwas länger.'
          )
        );
      }
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      spokenRef.current = joinDraft(spokenRef.current, sessionFinalRef.current);
      sessionFinalRef.current = '';
      if (spokenRef.current) {
        setDraft(joinDraft(baseRef.current, spokenRef.current));
      }
      if (keepListeningRef.current) {
        startBrowserSpeech();
      } else {
        setRecording(false);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    return true;
  };

  const startRecorder = async () => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setVoiceError(
        L(
          'This browser cannot use the microphone. Please type your answer, or open Chrome or Edge.',
          'Dieser Browser kann das Mikrofon nicht nutzen. Bitte tippe deine Antwort, oder öffne Chrome oder Edge.'
        )
      );
      return false;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;
    const mimeType = pickRecorderMime();
    const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
    chunksRef.current = [];
    recorderRef.current = recorder;
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
      recorderRef.current = null;
      stopTracks();
      setRecording(false);
      void transcribeRecording(blob);
    };
    recorder.start();
    return true;
  };

  const stopListening = () => {
    keepListeningRef.current = false;
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
      return;
    }
    stopTracks();
    setRecording(false);
  };

  const startListening = async () => {
    if (disabled || recording || transcribing) return;
    setVoiceError(null);
    baseRef.current = draftRef.current.trim();
    spokenRef.current = '';
    sessionFinalRef.current = '';

    try {
      if (startBrowserSpeech()) {
        keepListeningRef.current = true;
        setRecording(true);
        return;
      }

      keepListeningRef.current = true;
      const started = await startRecorder();
      if (started) setRecording(true);
    } catch {
      keepListeningRef.current = false;
      stopTracks();
      setRecording(false);
      setVoiceError(
        L(
          'Microphone access was blocked. Allow the microphone and try again.',
          'Der Mikrofonzugriff wurde blockiert. Erlaube das Mikrofon und versuche es erneut.'
        )
      );
    }
  };

  const toggleListening = () => {
    if (recording) {
      stopListening();
      return;
    }
    void startListening();
  };

  return {
    recording,
    transcribing,
    voiceError,
    toggleListening,
  };
}
