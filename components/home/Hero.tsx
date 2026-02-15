
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 h-full w-full object-cover"
                poster="/images/hero-poster.jpg" // Fallback image needed
            >
                <source src="/videos/hero-alpaca-run.mp4" type="video/mp4" />
                {/* Fallback to image if video fails or not supported */}
                <img
                    src="/images/hero-poster.jpg"
                    alt="Alpacas grazing in a sunlit field"
                    className="h-full w-full object-cover"
                />
            </video>

            {/* Overlay Gradient for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

            {/* Magical Sparkles (CSS Animation would be better, but basic for now) */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Placeholder for particle effects */}
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
                <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight drop-shadow-lg mb-6 animate-fade-in-up">
                    Welcome to the <span className="text-magical-gold">Magical Pasture</span>
                </h1>

                <p className="max-w-2xl text-lg md:text-xl font-light mb-8 drop-shadow-md animate-fade-in-up delay-100">
                    Where real alpaca adventures meet a touch of enchantment.
                    Experience nature, relaxation, and furry friends like never before.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
                    <Button size="lg" variant="magical" className="text-lg px-8">
                        <Sparkles className="mr-2 h-5 w-5" />
                        Book Your Magical Stay
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                        Meet the Herd <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="h-10 w-6 rounded-full border-2 border-white/50 flex justify-center pt-2">
                    <div className="h-2 w-1 bg-white rounded-full animate-scroll-down" />
                </div>
            </div>
        </section>
    );
}
