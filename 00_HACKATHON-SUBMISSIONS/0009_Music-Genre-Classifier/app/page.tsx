import AudioClassifier from "@/components/AudioClassifier";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/50 to-purple-950/30 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]"></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          {/* Main card */}
          <div className="backdrop-blur-2xl bg-white/[0.03] border border-white/10 rounded-2xl shadow-2xl p-8 sm:p-12 relative overflow-hidden">
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 via-transparent to-fuchsia-500/5"></div>
            
            <div className="relative z-10">
              {/* Header Section */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-sm shadow-2xl shadow-purple-500/20">
                  <span className="text-4xl filter brightness-150">🎵</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    Music Genre
                  </span>
                  <br />
                  <span className="text-white/90">Classifier</span>
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Discover the hidden patterns in your music. Our AI analyzes 
                  <span className="text-purple-400 font-medium"> genre</span>, 
                  <span className="text-fuchsia-400 font-medium"> mood</span>, and 
                  <span className="text-pink-400 font-medium"> style</span> with precision.
                </p>
              </div>

              {/* Component Container */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
                <div className="relative backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-xl p-6">
                  <AudioClassifier />
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                <div className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-300">
                  <div className="text-2xl mb-3">🎯</div>
                  <h3 className="text-white font-semibold mb-2">Accurate Analysis</h3>
                  <p className="text-gray-400 text-sm">Advanced AI models for precise genre classification</p>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-300">
                  <div className="text-2xl mb-3">⚡</div>
                  <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-gray-400 text-sm">Get results in seconds with optimized processing</p>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-300">
                  <div className="text-2xl mb-3">🔒</div>
                  <h3 className="text-white font-semibold mb-2">Privacy First</h3>
                  <p className="text-gray-400 text-sm">Your audio files are processed locally and securely</p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-16 pt-8 border-t border-white/5">
                <p className="text-center text-sm text-gray-500">
                  Powered by{" "}
                  <span className="text-purple-400 font-medium hover:text-purple-300 transition-colors">Next.js</span>
                  {" • "}
                  <span className="text-fuchsia-400 font-medium hover:text-fuchsia-300 transition-colors">Tailwind CSS</span>
                  {" • "}
                  <span className="text-pink-400 font-medium hover:text-pink-300 transition-colors">Ollama AI</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}