import { CalculatorLayout } from "@/components/calculator/calculator-layout";
import { Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4 md:py-20 flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="w-full max-w-6xl relative z-10 space-y-12">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-4">
            <Zap className="w-3 h-3 fill-current" />
            Next-Gen Analysis
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
            GAIN<span className="text-primary">GRAPH</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Unleash precision financial forecasting. Calculate growth multipliers with real-time visual feedback and AI-driven strategic narratives.
          </p>
        </header>

        <CalculatorLayout />

        <footer className="pt-8 text-center">
          <div className="inline-block px-4 py-2 rounded-xl bg-muted/30 border border-white/5 backdrop-blur-sm">
            <p className="text-xs text-muted-foreground/60 font-medium tracking-widest uppercase">
              Secure Cloud Logic • V2.0.4 • Powered by GenAI
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}