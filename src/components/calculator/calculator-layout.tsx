"use client"

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IndianRupee, TrendingUp, Zap, Info, Loader2 } from "lucide-react";
import { formatINR } from "@/lib/formatters";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { generateStrategicGrowthNarrative } from "@/ai/flows/strategic-growth-narrative-flow";

export function CalculatorLayout() {
  const [amount, setAmount] = useState<number>(1000);
  const [multiplier, setMultiplier] = useState<number>(1.75);
  const [narrative, setNarrative] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const finalAmount = useMemo(() => amount * multiplier, [amount, multiplier]);
  const profit = useMemo(() => finalAmount - amount, [amount, multiplier]);

  const isValid = amount > 0 && multiplier > 0;

  const handleGenerateNarrative = async () => {
    if (!isValid) return;
    setIsGenerating(true);
    try {
      const result = await generateStrategicGrowthNarrative({
        amount,
        multiplier,
        finalAmount,
        profit
      });
      setNarrative(result.narrative);
    } catch (error) {
      console.error("Failed to generate narrative", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="glass-morphism border-none shadow-2xl overflow-hidden group">
          <div className="h-1.5 w-full bg-gradient-to-r from-primary to-accent" />
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl flex items-center gap-2">
              <Zap className="text-primary w-6 h-6" />
              GainGraph
            </CardTitle>
            <CardDescription className="text-muted-foreground/80">
              Precision multiplier analysis for digital assets and investments.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="amount" className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                <IndianRupee className="w-4 h-4" />
                Investment Amount (₹)
              </Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  placeholder="e.g. 1000"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="bg-background/50 border-border/50 h-14 text-xl focus:ring-primary focus:border-primary transition-all rounded-xl pl-4"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="multiplier" className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                Growth Multiplier (x)
              </Label>
              <div className="relative">
                <Input
                  id="multiplier"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 1.75"
                  value={multiplier || ''}
                  onChange={(e) => setMultiplier(Number(e.target.value))}
                  className="bg-background/50 border-border/50 h-14 text-xl focus:ring-primary focus:border-primary transition-all rounded-xl pl-4"
                />
              </div>
            </div>

            <Button 
              onClick={handleGenerateNarrative}
              disabled={!isValid || isGenerating}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all active:scale-[0.98]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Growth...
                </>
              ) : (
                "Generate Strategic Insight"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output Section */}
        <div className="space-y-6">
          <Card className="glass-morphism border-none shadow-2xl relative overflow-hidden">
            <CardContent className="pt-8 space-y-8">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Total Profit</p>
                <h2 className="text-6xl font-black text-accent drop-shadow-[0_0_15px_rgba(96,136,255,0.4)]">
                  <AnimatedNumber 
                    value={profit} 
                    formatter={formatINR} 
                  />
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/40 rounded-2xl border border-white/5">
                  <p className="text-xs text-muted-foreground mb-1 uppercase font-medium">Final Value</p>
                  <p className="text-xl font-bold text-foreground">
                     <AnimatedNumber value={finalAmount} formatter={formatINR} />
                  </p>
                </div>
                <div className="p-4 bg-muted/40 rounded-2xl border border-white/5">
                  <p className="text-xs text-muted-foreground mb-1 uppercase font-medium">Return Rate</p>
                  <p className="text-xl font-bold text-foreground">
                     {multiplier.toFixed(2)}x
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Narrative Section */}
          <Card className={`glass-morphism border-none shadow-xl transition-all duration-700 ${narrative ? 'opacity-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
             <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                       <Info className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-primary uppercase tracking-wider">Strategic Insight</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed italic">
                      "{narrative}"
                    </p>
                  </div>
                </div>
             </CardContent>
          </Card>
        </div>
      </div>

      <div className="pt-12 text-center text-xs text-muted-foreground/40 font-medium tracking-tighter uppercase">
        GainGraph v1.0 • Precision Growth Logic Enabled
      </div>
    </div>
  );
}
