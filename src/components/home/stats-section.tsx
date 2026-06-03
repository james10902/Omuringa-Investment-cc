import { Shield, GraduationCap, Briefcase, Users, Award, Clock } from "lucide-react";

const stats = [
  { icon: Shield, value: "6+", label: "Security Services", sub: "Static, patrol, event & more", color: "from-brand-700 to-brand-900" },
  { icon: GraduationCap, value: "3-Week", label: "Training Programme", sub: "Intensive & certified", color: "from-gold-600 to-gold-800" },
  { icon: Briefcase, value: "5+", label: "Business Services", sub: "Design, events, accounting & more", color: "from-brand-600 to-brand-800" },
  { icon: Award, value: "100%", label: "Certified Graduates", sub: "Upon successful completion", color: "from-gold-500 to-gold-700" },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-brand-950 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-5 sm:p-6 text-center transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">{stat.value}</div>
              <div className="text-gold-400 font-semibold text-sm mb-1">{stat.label}</div>
              <div className="text-brand-400 text-xs leading-tight">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
