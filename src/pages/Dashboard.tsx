import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { LogOut, Play, Info, Search, Bell, User } from "lucide-react";

/**
 * Dashboard Page
 * 
 * This is the "Main Event". Once authenticated, users land here.
 * We've built a responsive, immersive movie browsing experience.
 */

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, we'd clear tokens/session here.
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-netflix-dark text-white font-sans selection:bg-netflix-red selection:text-white">
      <Navbar onLogout={handleLogout} />

      <main>
        <HeroSection />

        {/* Content Rows - Staggered for a natural feel */}
        <div className="px-6 md:px-12 -mt-20 relative z-10 pb-20 space-y-16">
          <MovieRow title="Trending Now" seed="trending" />
          <MovieRow title="Popular on Netflix" seed="popular" />
          <MovieRow title="New Releases" seed="new" />
          <MovieRow title="Watch It Again" seed="rewatch" />
        </div>
      </main>
    </div>
  );
}

// --- Sub-Components ---

/**
 * Navbar
 * Features a transparent-to-black gradient and standard Netflix navigation links.
 */
function Navbar({ onLogout }: { onLogout: () => void }) {
  return (
    <nav className="flex items-center justify-between p-4 md:p-6 px-6 md:px-12 fixed top-0 w-full z-50 bg-gradient-to-b from-black/90 to-transparent transition-colors duration-300">
      <div className="flex items-center gap-4 md:gap-10">
        <h1 className="text-netflix-red text-2xl md:text-3xl font-bold tracking-tighter cursor-pointer">
          NETFLIX
        </h1>
        
        <div className="hidden lg:flex gap-5 text-sm font-normal text-gray-200">
          {["Home", "TV Shows", "Movies", "New & Popular", "My List", "Browse by Languages"].map(link => (
            <a key={link} href="#" className="hover:text-gray-400 transition-colors">{link}</a>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <Search size={20} className="cursor-pointer hover:text-gray-300" />
        <Bell size={20} className="cursor-pointer hover:text-gray-300" />
        
        <div className="flex items-center gap-2 group cursor-pointer relative">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <User size={20} />
          </div>
          
          {/* Simple Logout Tooltip/Dropdown */}
          <button 
            onClick={onLogout}
            className="absolute top-10 right-0 hidden group-hover:flex items-center gap-2 bg-black/90 border border-gray-700 px-4 py-3 rounded text-sm font-bold hover:bg-netflix-red transition-all whitespace-nowrap shadow-xl"
          >
            <LogOut size={16} />
            Sign out of Netflix
          </button>
        </div>
      </div>
    </nav>
  );
}

/**
 * HeroSection
 * The big, bold featured content at the top of the page.
 */
function HeroSection() {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      <img 
        src="https://picsum.photos/seed/stranger-things/1920/1080" 
        alt="Featured Movie"
        className="w-full h-full object-cover brightness-[0.7]"
        referrerPolicy="no-referrer"
      />
      
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent flex flex-col justify-center px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl space-y-6"
        >
          <div className="flex items-center gap-2">
            <div className="bg-netflix-red p-1 rounded-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest">Series</span>
            </div>
            <span className="text-sm font-bold tracking-widest text-gray-300 uppercase">Original</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight">Stranger Things</h2>
          
          <p className="text-base md:text-xl text-gray-100 leading-relaxed drop-shadow-md">
            When a young boy vanishes, a small town uncovers a mystery involving secret experiments, 
            terrifying supernatural forces and one strange little girl.
          </p>

          <div className="flex gap-4 pt-2">
            <button className="flex items-center gap-3 bg-white text-black px-6 md:px-10 py-3 rounded font-bold hover:bg-gray-200 active:scale-95 transition-all shadow-lg">
              <Play fill="black" size={24} />
              Play
            </button>
            <button className="flex items-center gap-3 bg-gray-500/60 text-white px-6 md:px-10 py-3 rounded font-bold hover:bg-gray-500/40 active:scale-95 transition-all backdrop-blur-sm">
              <Info size={24} />
              More Info
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * MovieRow
 * A horizontally scrollable list of movie posters.
 */
function MovieRow({ title, seed }: { title: string; seed: string }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl md:text-2xl font-bold text-gray-100 hover:text-white cursor-pointer transition-colors inline-block">
        {title} <span className="text-netflix-red text-sm ml-2 opacity-0 hover:opacity-100 transition-opacity">Explore All &rsaquo;</span>
      </h3>
      
      <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar snap-x">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.05, zIndex: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="min-w-[200px] md:min-w-[280px] aspect-video bg-netflix-gray rounded-sm overflow-hidden cursor-pointer shadow-md snap-start relative group"
          >
            <img 
              src={`https://picsum.photos/seed/${seed}-${i}/500/280`} 
              alt="Movie Poster"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            
            {/* Subtle Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
                <Play fill="white" size={16} className="ml-1" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
