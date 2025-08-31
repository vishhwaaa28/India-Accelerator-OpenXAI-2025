'use client';

import React from 'react';
import Meyda from 'meyda';

export default function AudioClassifier() {
  const [file, setFile] = React.useState<File | null>(null);
  const [status, setStatus] = React.useState<string>('');
  const [result, setResult] = React.useState<any>(null);
  const [audioURL, setAudioURL] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  async function onSelect(f: File) {
    if (!f) return;
    setFile(f);
    setResult(null);
    setStatus('Decoding audio...');
    setProgress(10);

    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ab = await f.arrayBuffer();
      const buffer = await ctx.decodeAudioData(ab);
      setProgress(30);

      // convert to mono
      const mono = toMono(buffer);
      setProgress(50);

      // extract features
      const frameSize = 1024;
      const hopSize = 512;
      const features: any[] = [];
      for (let i = 0; i + frameSize < mono.length; i += hopSize) {
        const frame = mono.slice(i, i + frameSize);
        const fts = Meyda.extract(
          ['mfcc', 'chroma', 'spectralCentroid', 'spectralFlatness', 'zcr', 'rms'],
          frame
        );
        if (fts) features.push(fts);
      }
      setProgress(70);

      // aggregate
      const summary = {
        mfccMean: avg(features.map(f => mean(f.mfcc))),
        spectralCentroid: avg(features.map(f => f.spectralCentroid)),
        spectralFlatness: avg(features.map(f => f.spectralFlatness)),
        zcr: avg(features.map(f => f.zcr)),
        rms: avg(features.map(f => f.rms)),
      };

      setStatus('Classifying with AI...');
      setProgress(80);
      setAudioURL(URL.createObjectURL(f));

      const r = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary, filename: f.name }),
      });

      const data = await r.json();
      setResult(data.result || data);
      setStatus('');
      setProgress(100);
      
      // Reset progress after a short delay
      setTimeout(() => setProgress(0), 1000);
    } catch (err: any) {
      console.error(err);
      setStatus('Error: ' + err.message);
      setProgress(0);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onSelect(e.dataTransfer.files[0]);
    }
  }

  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  const isProcessing = status !== '' && status !== 'Error';

  return (
    <div className="w-full space-y-8">
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onClick={() => !isProcessing && document.getElementById('fileInput')?.click()}
        className={`
          relative overflow-hidden rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300
          ${isDragging 
            ? 'border-purple-400 bg-purple-500/10 scale-105' 
            : 'border-white/20 hover:border-purple-400/50 hover:bg-white/5'
          }
          ${isProcessing ? 'cursor-not-allowed opacity-50' : ''}
        `}
      >
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-fuchsia-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          {/* Icon */}
          <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 flex items-center justify-center">
            {isProcessing ? (
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-400 border-t-transparent" />
            ) : (
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            )}
          </div>

          {/* Content */}
          {file ? (
            <div className="space-y-2">
              <p className="text-lg font-medium text-white">
                📀 {file.name}
              </p>
              <p className="text-sm text-gray-400">
                {(file.size / (1024 * 1024)).toFixed(1)} MB • {file.type}
              </p>
              {!isProcessing && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setResult(null);
                    setAudioURL(null);
                  }}
                  className="mt-2 text-sm text-purple-400 hover:text-purple-300 underline"
                >
                  Choose different file
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                Drop your audio file here
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Support for MP3, WAV, M4A, OGG and more. 
                <br />
                <span className="text-sm">Maximum file size: 50MB</span>
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                {['MP3', 'WAV', 'M4A', 'OGG', 'FLAC'].map((format) => (
                  <span key={format} className="px-2 py-1 bg-white/10 rounded-full text-gray-300">
                    {format}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <input
          id="fileInput"
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={(e) => e.target.files && onSelect(e.target.files[0])}
          disabled={isProcessing}
        />
      </div>

      {/* Progress Bar */}
      {progress > 0 && progress < 100 && (
        <div className="w-full">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">{status}</span>
            <span className="text-sm text-purple-400">{progress}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Audio Player */}
      {audioURL && (
        <div className="glass-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="mr-2">🎵</span>
            Audio Preview
          </h3>
          <audio 
            controls 
            src={audioURL} 
            className="w-full h-12 rounded-lg"
            style={{
              background: 'linear-gradient(135deg, rgb(255 255 255 / 0.1) 0%, rgb(255 255 255 / 0.05) 100%)',
            }}
          />
        </div>
      )}

      {/* Status Message */}
      {status && status.startsWith('Error') && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {status}
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="glass-card space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold gradient-text">Analysis Results</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-green-400">Complete</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Classification */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 border border-purple-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">Primary Genre</span>
                  <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                    {(result.confidence * 100).toFixed(1)}% confident
                  </span>
                </div>
                <div className="text-2xl font-bold text-white">{result.genre}</div>
              </div>

              {result.subgenres && result.subgenres.length > 0 && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-sm font-medium text-gray-300 block mb-3">Subgenres</span>
                  <div className="flex flex-wrap gap-2">
                    {result.subgenres.map((subgenre: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm border border-indigo-500/30"
                      >
                        {subgenre}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mood Analysis */}
            <div className="space-y-4">
              {result.mood && result.mood.length > 0 && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-sm font-medium text-gray-300 block mb-3">Detected Moods</span>
                  <div className="flex flex-wrap gap-2">
                    {result.mood.map((mood: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm border border-pink-500/30"
                      >
                        {mood}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Confidence Meter */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-300">Confidence Score</span>
                  <span className="text-lg font-bold text-white">{(result.confidence * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${result.confidence * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI Reasoning */}
          {result.reasoning && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50">
              <div className="flex items-center mb-3">
                <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="font-medium text-indigo-300">AI Analysis</span>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm">{result.reasoning}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// --- helpers ---
function toMono(buffer: AudioBuffer): Float32Array {
  const len = buffer.length;
  const tmp = new Float32Array(len);
  const chs = buffer.numberOfChannels;
  for (let ch = 0; ch < chs; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < len; i++) tmp[i] += data[i] / chs;
  }
  return tmp;
}

function mean(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0) / (arr.length || 1);
}

function avg(arr: number[]) {
  return mean(arr.filter(v => !isNaN(v)));
}