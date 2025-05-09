
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { VolumeIcon, PauseIcon, PlayIcon, StopIcon } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface TextToSpeechProps {
  text: string;
}

export default function TextToSpeech({ text }: TextToSpeechProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(false);

  // Check if speech synthesis is supported
  useEffect(() => {
    const supported = 'speechSynthesis' in window;
    setIsSupported(supported);

    if (supported) {
      // Get initial voices
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        setSelectedVoice(availableVoices[0].name);
      }

      // Handle dynamic voice loading (Chrome specific)
      window.speechSynthesis.onvoiceschanged = () => {
        const newVoices = window.speechSynthesis.getVoices();
        setVoices(newVoices);
        if (newVoices.length > 0 && !selectedVoice) {
          setSelectedVoice(newVoices[0].name);
        }
      };
    }

    // Clean up on unmount
    return () => {
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Prepare text for speaking by cleaning up markdown, etc.
  const prepareTextForSpeech = (rawText: string) => {
    // Remove markdown symbols and other non-readable content
    let cleanText = rawText
      .replace(/#+\s/g, '') // Remove headers
      .replace(/\*\*/g, '')  // Remove bold markers
      .replace(/\*/g, '')    // Remove italic markers
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace links with just their text
      .replace(/!\[[^\]]+\]\([^)]+\)/g, '') // Remove image references
      .replace(/```[^`]*```/g, '') // Remove code blocks
      .replace(/`([^`]+)`/g, '$1') // Remove inline code formatting
      .replace(/\n\n/g, '. ') // Replace double newlines with period and space
      .replace(/\n/g, ' '); // Replace single newlines with space
    
    return cleanText;
  };

  const speakText = () => {
    if (!isSupported) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(prepareTextForSpeech(text));
    
    // Set voice if available
    if (selectedVoice) {
      const voice = voices.find(v => v.name === selectedVoice);
      if (voice) utterance.voice = voice;
    }
    
    // Set rate and volume
    utterance.rate = rate;
    utterance.volume = volume;
    
    // Handle events
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      setIsPaused(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeech = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeSpeech = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowControls(!showControls)}
        title="Text-to-Speech"
        className="flex items-center gap-2"
      >
        <VolumeIcon className="h-4 w-4" />
        <span className="sr-only md:not-sr-only md:inline-block">Listen</span>
      </Button>
      
      {showControls && (
        <div className="absolute right-0 top-12 z-50 bg-background border rounded-md shadow-lg p-4 w-80">
          <div className="space-y-4">
            <h3 className="font-medium">Text-to-Speech Options</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Voice</label>
              <select 
                className="w-full border rounded p-1"
                value={selectedVoice || ''}
                onChange={(e) => setSelectedVoice(e.target.value)}
              >
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Speed: {rate}x</label>
              <Slider 
                value={[rate]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={(values) => setRate(values[0])}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Volume: {Math.round(volume * 100)}%</label>
              <Slider 
                value={[volume]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={(values) => setVolume(values[0])}
              />
            </div>
            
            <div className="flex justify-center space-x-2">
              {!isSpeaking ? (
                <Button size="sm" onClick={speakText}>
                  <PlayIcon className="h-4 w-4 mr-1" /> Play
                </Button>
              ) : isPaused ? (
                <Button size="sm" onClick={resumeSpeech}>
                  <PlayIcon className="h-4 w-4 mr-1" /> Resume
                </Button>
              ) : (
                <Button size="sm" onClick={pauseSpeech}>
                  <PauseIcon className="h-4 w-4 mr-1" /> Pause
                </Button>
              )}
              
              {isSpeaking && (
                <Button variant="outline" size="sm" onClick={stopSpeech}>
                  <StopIcon className="h-4 w-4 mr-1" /> Stop
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
