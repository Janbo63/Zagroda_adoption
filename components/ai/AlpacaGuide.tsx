
'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AlpacaGuide() {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (!isMounted) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">

            {/* Chat Window */}
            <div className={cn(
                "bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-magical-gold/30 w-80 md:w-96 mb-4 transition-all duration-300 origin-bottom-right pointer-events-auto overflow-hidden flex flex-col",
                isOpen ? "opacity-100 scale-100 h-[500px]" : "opacity-0 scale-95 h-0"
            )}>
                {/* Header */}
                <div className="bg-gradient-to-r from-magical-pasture to-green-600 p-4 flex items-center justify-between text-white">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-magical-gold">
                            {/* Placeholder Avatar */}
                            <span className="text-2xl">🦙</span>
                        </div>
                        <div>
                            <h3 className="font-heading font-bold text-lg leading-tight">Alfie</h3>
                            <p className="text-xs text-green-100">Farm Guide</p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.length === 0 && (
                        <div className="text-center text-gray-500 mt-8">
                            <p className="text-4xl mb-2">👋</p>
                            <p>Hi! I'm Alfie. Ask me anything about the farm!</p>
                        </div>
                    )}
                    {messages?.map((m: any) => (
                        <div key={m.id} className={cn("flex w-full", m.role === 'user' ? "justify-end" : "justify-start")}>
                            <div className={cn(
                                "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                                m.role === 'user'
                                    ? "bg-magical-pasture text-white rounded-br-none"
                                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                            )}>
                                {m.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2 rounded-bl-none shadow-sm">
                                <span className="animate-pulse">...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex gap-2">
                    <input
                        className="flex-1 bg-gray-100 border-0 rounded-full px-4 text-sm focus:ring-2 focus:ring-magical-pasture/50 outline-none"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask Alfie..."
                    />
                    <Button type="submit" size="icon" variant="magical" className="rounded-full h-10 w-10 shrink-0" disabled={isLoading || !input?.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>

            {/* Toggle Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                size="lg"
                className={cn(
                    "rounded-full h-16 w-16 shadow-xl border-4 border-white pointer-events-auto transition-transform hover:scale-110",
                    isOpen ? "bg-gray-400 hover:bg-gray-500 rotate-90" : "bg-gradient-to-r from-magical-gold to-orange-400"
                )}
            >
                {isOpen ? <X className="h-8 w-8 text-white" /> : <img src="/images/alfie-head.png" onError={(e) => { if (e.currentTarget.parentElement) e.currentTarget.parentElement.innerHTML = '💬' }} className="w-full h-full object-cover" />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                    </span>
                )}
            </Button>
        </div>
    );
}
