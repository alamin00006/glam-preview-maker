import { motion } from "framer-motion";
import { Video, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import recordedImg from "@/assets/recorded-course.jpg";
import physicalImg from "@/assets/physical-course.jpg";

const courses = [
  {
    icon: Video,
    tag: "Online",
    title: "রেকর্ডেড ভিডিও কোর্স",
    subtitle: "Recorded Video Course",
    desc: "ঘরে বসে নিজের সুবিধামতো সময়ে প্রফেশনাল মেকআপ শিখুন। লাইফটাইম এক্সেস পাবেন সব ভিডিওতে।",
    descEn: "Learn professional makeup at your own pace from home. Get lifetime access to all video lessons.",
    image: recordedImg,
    highlights: ["৫০+ HD ভিডিও লেসন", "লাইফটাইম এক্সেস", "মোবাইল থেকে দেখুন", "সার্টিফিকেট"],
  },
  {
    icon: MapPin,
    tag: "In-Person",
    title: "ফিজিক্যাল কোর্স",
    subtitle: "Physical / Hands-on Course",
    desc: "সরাসরি ক্লাসে এসে হাতে-কলমে মেকআপ শিখুন। প্র্যাকটিক্যাল ট্রেনিং এবং পার্সোনাল গাইডেন্স পাবেন।",
    descEn: "Learn makeup hands-on in our physical classroom. Get practical training and personal guidance.",
    image: physicalImg,
    highlights: ["হাতে-কলমে ট্রেনিং", "পার্সোনাল গাইডেন্স", "প্র্যাকটিস মেটেরিয়াল", "সার্টিফিকেট"],
  },
];

const CoursesSection = () => (
  <section id="courses" className="py-24 bg-blush">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-pink font-body text-sm tracking-[0.3em] uppercase mb-3 font-medium">Our Courses</p>
        <h2 className="text-3xl md:text-5xl font-display text-foreground">
          আপনার জন্য <em className="italic text-pink">সঠিক কোর্স</em> বেছে নিন
        </h2>
        <p className="text-muted-foreground font-body mt-3">Choose the right course for you</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {courses.map((course, i) => (
          <motion.div
            key={course.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-pink-light"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={course.image}
                alt={course.subtitle}
                className="w-full h-full object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold text-dark font-body text-xs font-semibold rounded-full uppercase tracking-wider">
                  <course.icon className="w-3.5 h-3.5" />
                  {course.tag}
                </span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-display text-2xl text-foreground mb-1">{course.title}</h3>
              <p className="text-pink font-body text-sm font-medium mb-4">{course.subtitle}</p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-2">{course.desc}</p>
              <p className="text-muted-foreground/70 font-body text-xs leading-relaxed mb-6">{course.descEn}</p>
              
              <div className="grid grid-cols-2 gap-2 mb-6">
                {course.highlights.map((h) => (
                  <span key={h} className="text-xs font-body text-foreground bg-pink-light px-3 py-1.5 rounded-full text-center">
                    {h}
                  </span>
                ))}
              </div>

              <Link
                to="/details"
                className="inline-flex items-center gap-2 text-pink font-body text-sm font-semibold hover:text-hot-pink transition-colors group"
              >
                বিস্তারিত দেখুন
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CoursesSection;
