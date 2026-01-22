export default function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="relative border border-cyan-500/40 p-5 bg-black/80 backdrop-blur-sm overflow-hidden group transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400 transition-all duration-300 group-hover:w-6 group-hover:h-6 opacity-60"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400 transition-all duration-300 group-hover:w-6 group-hover:h-6 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400 transition-all duration-300 group-hover:w-6 group-hover:h-6 opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400 transition-all duration-300 group-hover:w-6 group-hover:h-6 opacity-60"></div>
      
      {/* Glitch line effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" style={{ animationDelay: "0.5s" }}></div>
      </div>
      
      <div className="relative z-10">
        {title && (
          <h3 className="text-xl mb-3 font-oxanium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 uppercase tracking-wider">
            {title}
            <div className="h-px w-full bg-gradient-to-r from-cyan-400/50 via-blue-400/50 to-transparent mt-2"></div>
          </h3>
        )}
        <div className="text-gray-100">
          {children}
        </div>
      </div>
      
      {/* Ambient glow */}
      <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>
    </div>
  );
}