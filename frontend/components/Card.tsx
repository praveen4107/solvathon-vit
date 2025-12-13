export default function Card({ title, children }) {
  return (
    <div className="relative border border-cyan-500/50 p-5 bg-gradient-to-br from-purple-900/20 via-black/60 to-cyan-900/20 backdrop-blur-sm overflow-hidden group">
      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400 transition-all duration-300 group-hover:w-6 group-hover:h-6"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400 transition-all duration-300 group-hover:w-6 group-hover:h-6"></div>
      
      {/* Glitch line effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
      </div>
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-50 pointer-events-none" 
           style={{ backgroundSize: '100% 4px' }}></div>
      
      <div className="relative z-10">
        {title && (
          <h3 className="text-xl mb-3 font-oxanium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 uppercase tracking-wider">
            {title}
            <div className="h-px w-full bg-gradient-to-r from-cyan-400/50 via-purple-400/50 to-transparent mt-2"></div>
          </h3>
        )}
        <div className="text-gray-100">
          {children}
        </div>
      </div>
      
      {/* Ambient glow */}
      <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>
    </div>
  );
}