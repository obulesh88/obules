"use client"

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IndianRupee, TrendingUp, Zap, Info, Loader2, BarChart3, ArrowRight } from "lucide-react";
import { formatINR } from "@/lib/formatters";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { generateStrategicGrowthNarrative } from "@/ai/flows/strategic-growth-narrative-flow";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function CalculatorLayout() {
  const { toast } = useToast();
  const [amount, setAmount] = useState<number>(50000);
  const [multiplier, setMultiplier] = useState<number>(2.5);
  const [narrative, setNarrative] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const finalAmount = useMemo(() => {
    const val = amount * multiplier;
    return isNaN(val) ? 0 : val;
  }, [amount, multiplier]);

  const profit = useMemo(() => {
    const val = finalAmount - amount;
    return isNaN(val) ? 0 : val;
  }, [amount, finalAmount]);

  const chartData = useMemo(() => [
    { name: 'Initial', value: amount, color: 'hsl(var(--muted-foreground))' },
    { name: 'Profit', value: profit, color: profit >= 0 ? 'hsl(var(--primary))' : 'hsl(var(--destructive))' },
  ], [amount, profit]);

  const isValid = amount >= 0 && multiplier >= 0;

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
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "We couldn't generate a strategic narrative. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Controls - 4 cols */}
      <div className="lg:col-span-4 space-y-6">
        <Card className="glass-morphism border-none shadow-2xl overflow-hidden glow-primary">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2 text-white">
              <Zap className="text-primary w-5 h-5 fill-current" />
              Growth Parameters
            </CardTitle>
            <CardDescription className="text-muted-foreground/70">
              Configure your investment variables.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="amount" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <IndianRupee className="w-3 h-3" />
                Capital Outlay
              </Label>
              <div className="relative group">
                <Input
                  id="amount"
                  type="number"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="bg-muted/20 border-white/10 h-14 text-xl font-bold focus:ring-primary focus:border-primary transition-all rounded-xl pl-4 text-white"
                />
                <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="multiplier" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-3 h-3" />
                Multiplier Target
              </Label>
              <div className="relative group">
                <Input
                  id="multiplier"
                  type="number"
                  step="0.1"
                  value={multiplier || ''}
                  onChange={(e) => setMultiplier(Number(e.target.value))}
                  className="bg-muted/20 border-white/10 h-14 text-xl font-bold focus:ring-primary focus:border-primary transition-all rounded-xl pl-4 text-white"
                />
                <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>

            <Button 
              onClick={handleGenerateNarrative}
              disabled={!isValid || isGenerating}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm uppercase tracking-widest rounded-xl transition-all active:scale-[0.97] group"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Generate Narrative
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* AI Insight Card */}
        <Card className={`glass-morphism border-none shadow-xl transition-all duration-500 overflow-hidden ${narrative ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="mt-1 flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Info className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-black text-primary uppercase tracking-widest">AI Strategic Insight</h4>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                  {narrative}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard - 8 cols */}
      <div className="lg:col-span-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Profit Display */}
          <Card className="glass-morphism border-none shadow-2xl md:col-span-2 relative overflow-hidden glow-accent">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <BarChart3 className="w-32 h-32 text-accent" />
            </div>
            <CardContent className="pt-10 pb-12 px-10 space-y-10 relative z-10">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-black">Net Projected Profit</p>
                <h2 className="text-7xl md:text-8xl font-black text-white tracking-tighter">
                  <AnimatedNumber 
                    value={profit} 
                    formatter={formatINR} 
                  />
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 backdrop-blur-sm">
                  <p className="text-[10px] text-muted-foreground mb-2 uppercase font-black tracking-widest">Gross Value</p>
                  <p className="text-2xl font-bold text-white">
                     <AnimatedNumber value={finalAmount} formatter={formatINR} />
                  </p>
                </div>
                <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 backdrop-blur-sm">
                  <p className="text-[10px] text-muted-foreground mb-2 uppercase font-black tracking-widest">Growth Rate</p>
                  <p className="text-2xl font-bold text-primary">
                     {(multiplier || 0).toFixed(2)}x
                  </p>
                </div>
                <div className="hidden md:block p-6 bg-white/[0.03] rounded-2xl border border-white/5 backdrop-blur-sm">
                  <p className="text-[10px] text-muted-foreground mb-2 uppercase font-black tracking-widest">Efficiency</p>
                  <p className="text-2xl font-bold text-accent">
                     {multiplier > 1 ? '+' : ''}{((multiplier - 1) * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual Representation */}
          <Card className="glass-morphism border-none shadow-2xl md:col-span-2 overflow-hidden">
            <CardHeader className="pb-0">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Allocation Visualizer</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.3)" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.3)" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `₹${value / 1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: number) => [formatINR(value), 'Value']}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}