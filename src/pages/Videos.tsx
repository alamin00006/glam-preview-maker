import { useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle, Lock, ChevronRight, SkipForward, SkipBack } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const modules = [
  {
    title: "মডিউল ১: স্কিন প্রেপারেশন",
    titleEn: "Module 1: Skin Preparation",
    videos: [
      { title: "স্কিন টাইপ বোঝা", titleEn: "Understanding Skin Types", duration: "12:30", videoId: "dQw4w9WgXcQ", free: true },
      { title: "ক্লিনজিং ও টোনিং", titleEn: "Cleansing & Toning", duration: "8:45", videoId: "dQw4w9WgXcQ", free: true },
      { title: "ময়েশ্চারাইজার ও সানস্ক্রিন", titleEn: "Moisturizer & Sunscreen", duration: "10:15", videoId: "dQw4w9WgXcQ", free: false },
    ],
  },
  {
    title: "মডিউল ২: ফাউন্ডেশন ও বেস",
    titleEn: "Module 2: Foundation & Base",
    videos: [
      { title: "প্রাইমার অ্যাপ্লিকেশন", titleEn: "Primer Application", duration: "9:20", videoId: "dQw4w9WgXcQ", free: false },
      { title: "ফাউন্ডেশন ম্যাচিং ও ব্লেন্ডিং", titleEn: "Foundation Matching & Blending", duration: "15:00", videoId: "dQw4w9WgXcQ", free: false },
      { title: "কনসিলার টেকনিক", titleEn: "Concealer Techniques", duration: "11:30", videoId: "dQw4w9WgXcQ", free: false },
    ],
  },
  {
    title: "মডিউল ৩: আই মেকআপ",
    titleEn: "Module 3: Eye Makeup",
    videos: [
      { title: "আইশ্যাডো বেসিক", titleEn: "Eyeshadow Basics", duration: "14:00", videoId: "dQw4w9WgXcQ", free: false },
      { title: "কাট ক্রিজ টেকনিক", titleEn: "Cut Crease Technique", duration: "18:20", videoId: "dQw4w9WgXcQ", free: false },
    ],
  },
  {
    title: "মডিউল ৪: কন্টুরিং ও হাইলাইটিং",
    titleEn: "Module 4: Contouring & Highlighting",
    videos: [
      { title: "ফেস শেপ অনুযায়ী কন্টুর", titleEn: "Contour by Face Shape", duration: "16:10", videoId: "dQw4w9WgXcQ", free: false },
      { title: "হাইলাইটিং মাস্টারক্লাস", titleEn: "Highlighting Masterclass", duration: "12:45", videoId: "dQw4w9WgXcQ", free: false },
    ],
  },
  {
    title: "মডিউল ৫: ব্রাইডাল মেকআপ",
    titleEn: "Module 5: Bridal Makeup",
    videos: [
      { title: "ব্রাইডাল বেস প্রেপ", titleEn: "Bridal Base Prep", duration: "20:00", videoId: "dQw4w9WgXcQ", free: false },
      { title: "কমপ্লিট ব্রাইডাল লুক", titleEn: "Complete Bridal Look", duration: "25:30", videoId: "dQw4w9WgXcQ", free: false },
    ],
  },
];

const Videos = () => {
  const { user } = useAuth();
  const hasPurchased = user?.purchasedCourses.includes("recorded");
  const [activeVideo, setActiveVideo] = useState(modules[0].videos[0]);
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);

  const canWatch = (free: boolean) => free || hasPurchased;

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-28 pb-6 bg-dark">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-2 font-medium">Recorded Course</p>
              <h1 className="font-display text-3xl md:text-4xl text-primary-foreground">
                রেকর্ডেড ভিডিও <em className="italic text-gold">কোর্স</em>
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="bg-background py-8">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Video Player */}
              <div className="lg:col-span-2">
                <motion.div
                  key={activeVideo.videoId + activeVideo.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-2xl overflow-hidden shadow-xl bg-dark aspect-video mb-4"
                >
                  {canWatch(activeVideo.free) ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${activeVideo.videoId}`}
                      title={activeVideo.titleEn}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center px-6">
                      <Lock className="w-12 h-12 text-pink/50 mb-4" />
                      <p className="text-primary-foreground font-display text-xl mb-2">লক করা ভিডিও</p>
                      <p className="text-primary-foreground/60 font-body text-sm mb-4">এই ভিডিও দেখতে কোর্সটি কিনুন</p>
                      <Link
                        to="/payment?course=recorded"
                        className="px-6 py-3 bg-pink text-primary-foreground font-body font-semibold text-sm rounded-full hover:bg-hot-pink transition-colors"
                      >
                        কোর্স কিনুন — ৳২,৯৯৯
                      </Link>
                    </div>
                  )}
                </motion.div>
                <h2 className="font-display text-xl text-foreground mb-1">{activeVideo.title}</h2>
                <p className="text-muted-foreground font-body text-sm mb-4">{activeVideo.titleEn} — {activeVideo.duration}</p>

                {/* Prev / Next buttons */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      const allVideos = modules.flatMap((m) => m.videos);
                      const idx = allVideos.findIndex((v) => v.title === activeVideo.title);
                      if (idx > 0) {
                        const prev = allVideos[idx - 1];
                        if (canWatch(prev.free)) {
                          setActiveVideo(prev);
                          const modIdx = modules.findIndex((m) => m.videos.includes(prev));
                          setActiveModuleIdx(modIdx);
                        }
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-pink-light text-foreground font-body text-sm hover:bg-blush transition-colors disabled:opacity-40"
                    disabled={modules.flatMap((m) => m.videos).findIndex((v) => v.title === activeVideo.title) === 0}
                  >
                    <SkipBack className="w-4 h-4" />
                    Previous
                  </button>
                  <span className="text-muted-foreground font-body text-xs">
                    {modules.flatMap((m) => m.videos).findIndex((v) => v.title === activeVideo.title) + 1} / {modules.flatMap((m) => m.videos).length}
                  </span>
                  <button
                    onClick={() => {
                      const allVideos = modules.flatMap((m) => m.videos);
                      const idx = allVideos.findIndex((v) => v.title === activeVideo.title);
                      if (idx < allVideos.length - 1) {
                        const next = allVideos[idx + 1];
                        if (canWatch(next.free)) {
                          setActiveVideo(next);
                          const modIdx = modules.findIndex((m) => m.videos.includes(next));
                          setActiveModuleIdx(modIdx);
                        }
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink text-primary-foreground font-body text-sm font-semibold hover:bg-hot-pink transition-colors disabled:opacity-40"
                    disabled={modules.flatMap((m) => m.videos).findIndex((v) => v.title === activeVideo.title) === modules.flatMap((m) => m.videos).length - 1}
                  >
                    Next
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sidebar playlist */}
              <div className="bg-card rounded-2xl border border-pink-light p-4 max-h-[600px] overflow-y-auto">
                <h3 className="font-display text-lg text-foreground mb-4">কোর্স প্লেলিস্ট</h3>
                <div className="space-y-4">
                  {modules.map((mod, mi) => (
                    <div key={mod.title}>
                      <button
                        onClick={() => setActiveModuleIdx(activeModuleIdx === mi ? -1 : mi)}
                        className="flex items-center justify-between w-full text-left mb-2"
                      >
                        <div>
                          <p className="font-body text-sm font-semibold text-foreground">{mod.title}</p>
                          <p className="text-muted-foreground font-body text-xs">{mod.titleEn}</p>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${activeModuleIdx === mi ? 'rotate-90' : ''}`} />
                      </button>
                      {activeModuleIdx === mi && (
                        <div className="space-y-1 ml-2">
                          {mod.videos.map((v) => (
                            <button
                              key={v.title}
                              onClick={() => canWatch(v.free) && setActiveVideo(v)}
                              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-colors ${
                                activeVideo.title === v.title
                                  ? "bg-pink/10 border border-pink/30"
                                  : "hover:bg-blush"
                              } ${!canWatch(v.free) ? "opacity-60" : ""}`}
                            >
                              {canWatch(v.free) ? (
                                <PlayCircle className="w-4 h-4 text-pink shrink-0" />
                              ) : (
                                <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="font-body text-sm text-foreground truncate">{v.title}</p>
                                <p className="text-muted-foreground font-body text-xs">{v.duration}</p>
                              </div>
                              {v.free && (
                                <span className="text-xs font-body text-green-600 bg-green-100 px-2 py-0.5 rounded-full shrink-0">Free</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <FooterSection />
      </main>
    </>
  );
};

export default Videos;
