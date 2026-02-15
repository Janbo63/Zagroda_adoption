
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils'; // Assuming utilities exist

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Rooms', href: '/rooms' },
        { name: 'Activities', href: '/activities' },
        { name: 'Shop', href: '/shop' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header
            className={cn(
                'fixed top-0 z-50 w-full transition-all duration-300',
                scrolled
                    ? 'bg-white/70 backdrop-blur-md shadow-sm border-b border-white/20'
                    : 'bg-transparent'
            )}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className={cn("text-2xl font-heading font-bold", scrolled ? "text-primary-800" : "text-white")}>
                        Alpaca<span className="text-magical-gold">Farm</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-magical-gold",
                                scrolled ? "text-gray-700" : "text-white/90"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button variant="magical" size="sm">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Book Now
                    </Button>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <X className={scrolled ? 'text-gray-800' : 'text-white'} />
                    ) : (
                        <Menu className={scrolled ? 'text-gray-800' : 'text-white'} />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-200 p-4 absolute w-full shadow-lg animate-in slide-in-from-top-5">
                    <nav className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-base font-medium text-gray-800 hover:text-magical-gold"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button variant="magical" className="w-full">
                            Book Your Stay
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    );
}
