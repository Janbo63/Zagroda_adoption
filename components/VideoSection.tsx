'use client';

import { motion } from 'framer-motion';

const VIDEO_ID = 'x2O-3kYXi_A';

/**
 * VideoSection — embedded YouTube video (privacy-enhanced mode via youtube-nocookie.com)
 * GDPR-friendly: no cookies set until user clicks play.
 */
export function VideoSection() {
    return (
        <section className="py-16 bg-stone-50">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Heading */}
                    <div className="text-center mb-8">
                        <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
                            See it for yourself
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Life at the farm 🦙
                        </h2>
                        <p className="text-gray-500 mt-2 text-lg">
                            A few minutes in the Karkonosze mountains with our alpacas.
                        </p>
                    </div>

                    {/* Video embed — 16:9, rounded corners */}
                    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black"
                        style={{ aspectRatio: '16 / 9' }}>
                        <iframe
                            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&color=white`}
                            title="Zagroda Alpakoterapii — Life at the alpaca farm"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                            loading="lazy"
                        />
                    </div>

                    {/* Sub-label */}
                    <p className="text-center text-sm text-gray-400 mt-4">
                        🎬 Our alpaca farm in the heart of the Sudeten mountains
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
