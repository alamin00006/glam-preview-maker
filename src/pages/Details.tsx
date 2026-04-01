import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Clock, Users, BookOpen, Award, PlayCircle, Download,
  MessageCircle, Video, MapPin, Heart, Palette, Scissors
} from "lucide-react";
import recordedImg from "@/assets/recorded-course.jpg";
import physicalImg from "@/assets/physical-course.jpg";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Navbar";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const Details = () => (
  <>
    <Navbar />
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-dark">
        <div className="container mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <p className="text-hot-pink font-body text-sm tracking-[0.3em] uppercase mb-3 font-medium">Course Details</p>
            <h1 className="text-4xl md:text-6xl font-display text-primary-foreground mb-6">
              কোর্সের <em className="italic text-hot-pink">বিস্তারিত</em>
            </h1>
            <p className="text-primary-foreground/70 font-body text-lg max-w-2xl mx-auto leading-relaxed">
              Nigar Fashion World এর প্রফেশনাল মেকআপ কোর্স সম্পর্কে বিস্তারিত জানুন।
            </p>
          </motion.div>
        </div>
      </section>

      {/* Two Courses Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-pink font-body text-sm tracking-[0.3em] uppercase mb-3 font-medium">Two Options</p>
            <h2 className="text-3xl md:text-4xl font-display text-foreground">
              দুই ধরনের <em className="italic text-pink">কোর্স</em>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Recorded */}
            <motion.div {...fadeUp} className="flex flex-col">
              <img src={recordedImg} alt="Recorded Course" className="rounded-2xl shadow-lg mb-6 h-64 object-cover" loading="lazy" width={800} height={600} />
              <div className="flex items-center gap-2 mb-3">
                <Video className="w-5 h-5 text-pink" />
                <h3 className="font-display text-2xl text-foreground">রেকর্ডেড ভিডিও কোর্স</h3>
              </div>
              <p className="text-pink font-body text-sm font-medium mb-4">Recorded Video Course</p>
              <div className="space-y-3 text-muted-foreground font-body text-sm leading-relaxed">
                <p>ঘরে বসে নিজের সুবিধামতো সময়ে প্রফেশনাল মেকআপ শিখুন। আমাদের HD ভিডিও লেসনগুলো ধাপে ধাপে সবকিছু শেখায়।</p>
                <p>লাইফটাইম এক্সেস পাবেন — একবার কিনলে সারাজীবন দেখতে পারবেন। মোবাইল বা কম্পিউটার যেকোনো ডিভাইস থেকে।</p>
                <p><strong className="text-foreground">কাদের জন্য:</strong> যারা বাসায় বসে শিখতে চান, যাদের ক্লাসে যাওয়ার সময় নেই, যারা নিজের পেসে শিখতে চান।</p>
              </div>
            </motion.div>

            {/* Physical */}
            <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="flex flex-col">
              <img src={physicalImg} alt="Physical Course" className="rounded-2xl shadow-lg mb-6 h-64 object-cover" loading="lazy" width={800} height={600} />
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-pink" />
                <h3 className="font-display text-2xl text-foreground">ফিজিক্যাল কোর্স</h3>
              </div>
              <p className="text-pink font-body text-sm font-medium mb-4">Physical / Hands-on Course</p>
              <div className="space-y-3 text-muted-foreground font-body text-sm leading-relaxed">
                <p>সরাসরি ক্লাসে এসে হাতে-কলমে মেকআপ শিখুন। এক্সপার্ট ট্রেইনার পার্সোনালি গাইড করবেন।</p>
                <p>প্র্যাকটিস মেটেরিয়াল সরবরাহ করা হবে। ছোট ব্যাচ সাইজ তাই প্রতিটি স্টুডেন্ট ব্যক্তিগত মনোযোগ পাবেন।</p>
                <p><strong className="text-foreground">কাদের জন্য:</strong> যারা হাতে-কলমে শিখতে চান, ক্যারিয়ার হিসেবে মেকআপ শুরু করতে চান, পার্লার খুলতে চান।</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-pink-light">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "৫০+", label: "ভিডিও লেসন", icon: PlayCircle },
              { num: "৫০০+", label: "গ্র্যাজুয়েট", icon: Users },
              { num: "৪.৯★", label: "রেটিং", icon: Heart },
              { num: "২", label: "কোর্স টাইপ", icon: BookOpen },
            ].map((s, i) => (
              <motion.div key={s.label} {...fadeUp} transition={{ delay: i * 0.1 }} className="text-center">
                <s.icon className="w-8 h-8 text-pink mx-auto mb-3" />
                <p className="text-3xl font-display text-foreground">{s.num}</p>
                <p className="text-muted-foreground font-body text-sm mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-pink font-body text-sm tracking-[0.3em] uppercase mb-3 font-medium">Curriculum</p>
            <h2 className="text-3xl md:text-4xl font-display text-foreground">
              কি কি <em className="italic text-pink">শেখানো</em> হয়
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Palette, title: "স্কিন প্রেপ ও ফাউন্ডেশন", titleEn: "Skin Prep & Foundation", desc: "স্কিন টাইপ বোঝা, প্রাইমার, ফাউন্ডেশন ম্যাচিং, কনসিলার টেকনিক।" },
              { icon: Scissors, title: "আই মেকআপ", titleEn: "Eye Makeup Mastery", desc: "আইশ্যাডো ব্লেন্ডিং, কাট ক্রিজ, স্মোকি আই, আইলাইনার স্টাইল।" },
              { icon: Heart, title: "লিপস ও কন্টুরিং", titleEn: "Lips & Contouring", desc: "লিপ লাইনার, ওম্ব্রে লিপস, ফেস কন্টুরিং, হাইলাইটিং।" },
              { icon: Award, title: "ব্রাইডাল মেকআপ", titleEn: "Bridal Makeup", desc: "ব্রাইডাল কনসালটেশন, লং-ওয়্যার টেকনিক, পার্টি মেকআপ।" },
              { icon: Download, title: "প্রোডাক্ট নলেজ", titleEn: "Product Knowledge", desc: "বাজেট ও হাই-এন্ড প্রোডাক্ট গাইড, ব্রাশ ব্যবহার, হাইজিন।" },
              { icon: MessageCircle, title: "বিজনেস গাইড", titleEn: "Business Guide", desc: "পার্লার সেটআপ, প্রাইসিং, সোশ্যাল মিডিয়া মার্কেটিং, ক্লায়েন্ট ম্যানেজমেন্ট।" },
            ].map((m, i) => (
              <motion.div
                key={m.title}
                {...fadeUp}
                transition={{ delay: i * 0.05 }}
                className="bg-blush rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 border border-pink-light"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-pink-light flex items-center justify-center">
                    <m.icon className="w-5 h-5 text-pink" />
                  </div>
                  <div>
                    <h3 className="font-display text-base text-foreground">{m.title}</h3>
                    <p className="text-pink font-body text-xs">{m.titleEn}</p>
                  </div>
                </div>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-blush">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-pink font-body text-sm tracking-[0.3em] uppercase mb-3 font-medium">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-display text-foreground">
              সাধারণ <em className="italic text-pink">প্রশ্নোত্তর</em>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: "আগে থেকে কিছু জানতে হবে?", a: "না! একদম বিগিনার থেকে শুরু করা যাবে। ধাপে ধাপে সবকিছু শেখানো হবে।" },
              { q: "রেকর্ডেড কোর্সে কতদিন এক্সেস পাবো?", a: "লাইফটাইম এক্সেস। একবার কিনলে সারাজীবন দেখতে পারবেন, ফিউচার আপডেটসহ।" },
              { q: "কি কি প্রোডাক্ট লাগবে?", a: "কোর্সের শুরুতেই প্রোডাক্ট লিস্ট দেওয়া হবে। বাজেট ফ্রেন্ডলি অপশনও আছে।" },
              { q: "ফিজিক্যাল কোর্সে ব্যাচ সাইজ কত?", a: "সর্বোচ্চ ৫-৮ জন। যাতে প্রতিটি স্টুডেন্ট পার্সোনাল অ্যাটেনশন পায়।" },
              { q: "কিস্তিতে পেমেন্ট করা যাবে?", a: "হ্যাঁ! ফিজিক্যাল কোর্সে ২ কিস্তিতে পেমেন্ট করার সুবিধা আছে।" },
              { q: "সার্টিফিকেট পাবো?", a: "হ্যাঁ, কোর্স শেষে সার্টিফিকেট দেওয়া হবে।" },
            ].map((faq, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.05 }} className="bg-card rounded-2xl p-6 border border-pink-light">
                <h3 className="font-display text-base text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark text-center">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-5xl font-display text-primary-foreground mb-4">
              আজই শুরু করুন!
            </h2>
            <p className="text-primary-foreground/70 font-body text-lg mb-8 max-w-lg mx-auto">
              ৫০০+ স্টুডেন্ট ইতিমধ্যে আমাদের কোর্স করে সফল হয়েছে। আপনার পালা!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.facebook.com/NigarFashionWorld"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-pink text-primary-foreground font-body font-semibold text-sm tracking-wider uppercase rounded-full hover:bg-hot-pink transition-colors duration-300 shadow-lg"
              >
                ভর্তি হোন — Enroll Now
              </a>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-8 py-4 border border-primary-foreground/30 text-primary-foreground font-body text-sm tracking-wider uppercase rounded-full hover:bg-primary-foreground/10 transition-colors duration-300"
              >
                হোম পেজে যান
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </main>
  </>
);

export default Details;
