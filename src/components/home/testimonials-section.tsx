import { Star, Quote } from "lucide-react";
import { Carousel } from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Business Owner",
    location: "Keetmanshoop",
    role: "Retail Security Client",
    text: "Omuringa Investment CC has provided reliable security for our premises. Their guards are professional, punctual, and well-trained. We feel much safer.",
    rating: 5,
    initial: "B",
    color: "bg-brand-700",
  },
  {
    name: "Event Organiser",
    location: "Namibia",
    role: "Event Security Client",
    text: "We hired Omuringa for our corporate event and they exceeded expectations. Excellent crowd management and professional conduct throughout.",
    rating: 5,
    initial: "E",
    color: "bg-gold-600",
  },
  {
    name: "Training Graduate",
    location: "Keetmanshoop",
    role: "Academy Graduate",
    text: "The 3-week training programme was intensive and thorough. I gained both theoretical knowledge and practical skills. I'm now employed as a security officer.",
    rating: 5,
    initial: "T",
    color: "bg-green-700",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-brand-700 font-bold text-xs uppercase tracking-widest mb-3 bg-brand-50 px-3 py-1 rounded-full">
            What People Say
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Client Testimonials
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Trusted by businesses and individuals across Namibia.
          </p>
        </div>

        <Carousel autoPlay autoPlayInterval={6000}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col max-w-xl mx-auto"
            >
              {/* Quote icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-brand-200" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold-400 text-gold-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className={`w-11 h-11 ${t.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-sm">{t.initial}</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role} · {t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
