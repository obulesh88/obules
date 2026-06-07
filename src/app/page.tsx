import { CalculatorLayout } from "@/components/calculator/calculator-layout";

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4 md:py-24 flex items-center justify-center bg-[#15121C]">
      {/* Subtle Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full" />
      </div>
      
      <div className="w-full max-w-5xl relative z-10">
        <header className="mb-12 text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
            GAINGRAPH
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto font-medium">
            Elevate your financial foresight with real-time profit projections and intelligent analysis.
          </p>
        </header>

        <CalculatorLayout />
      </div>
    </main>
  );
}
