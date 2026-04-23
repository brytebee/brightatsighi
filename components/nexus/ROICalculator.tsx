"use client";

import React, { useState, useEffect } from "react";

export default function ROICalculator() {
  const [students, setStudents] = useState(300);
  const [printing, setPrinting] = useState(150000); // Termly spend
  const [adminHours, setAdminHours] = useState(70); // Hours per term spent on grading
  const [cbtCandidates, setCbtCandidates] = useState(0); // External candidates for CBT-as-a-Service

  const [annualLoss, setAnnualLoss] = useState(0);
  const [nexusSavings, setNexusSavings] = useState(0);
  const [cbtRevenue, setCbtRevenue] = useState(0);

  useEffect(() => {
    // Logic: Annual Loss = (Printing * 3 terms) + (AdminHours * 3 * HourlyRate) + (Friction/Error Cost)
    const hourlyRate = 2500; // Average cost of admin time/overtime in premium schools
    const frictionCostPerStudent = 1000; // Lost trust, manual auditing, grade expo risks
    const cbtFeePerCandidate = 5000; // Standard fee for Mock/Prep CBT service
    
    const operationalCost = (printing * 3) + (adminHours * 3 * hourlyRate);
    const riskCost = (students * frictionCostPerStudent);
    
    const totalAnnualLoss = operationalCost + riskCost;
    const nexusCost = (students * 1000 * 3) + 250000; // Estimated Diamond cost + IDT
    
    const annualCbtRevenue = (cbtCandidates * cbtFeePerCandidate * 2); // Assuming 2 mock cycles/year
    
    setAnnualLoss(totalAnnualLoss);
    setCbtRevenue(annualCbtRevenue);
    setNexusSavings((totalAnnualLoss - nexusCost) + annualCbtRevenue);
  }, [students, printing, adminHours, cbtCandidates]);

  return (
    <div className="w-full max-w-4xl mx-auto p-1 rounded-[32px] bg-gradient-to-br from-white/10 to-transparent border border-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Inputs */}
        <div className="p-8 lg:p-12 space-y-8 bg-white/[0.02]">
          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tight text-white">The Friction Auditor</h3>
            <p className="text-sm text-[#8C9EFF]/70">Calculate the hidden costs of manual school management.</p>
          </div>

          <div className="space-y-6">
            {/* Student Count */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest text-[#8C9EFF]">Enrolled Students</label>
                <span className="text-sm font-mono font-bold text-white bg-[#1A237E] px-2 py-0.5 rounded">{students}</span>
              </div>
              <input 
                type="range" min="50" max="2000" step="50" 
                value={students} onChange={(e) => setStudents(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00E676]"
              />
            </div>

            {/* Printing Spend */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest text-[#8C9EFF]">Termly Printing & Ink (₦)</label>
                <span className="text-sm font-mono font-bold text-white bg-[#1A237E] px-2 py-0.5 rounded">{printing.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="20000" max="1000000" step="10000" 
                value={printing} onChange={(e) => setPrinting(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00E676]"
              />
            </div>

            {/* Admin Hours */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest text-[#8C9EFF]">Admin Grading Hours / Term</label>
                <span className="text-sm font-mono font-bold text-white bg-[#1A237E] px-2 py-0.5 rounded">{adminHours}h</span>
              </div>
              <input 
                type="range" min="10" max="300" step="10" 
                value={adminHours} onChange={(e) => setAdminHours(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00E676]"
              />
            </div>
            {/* CBT Candidates */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest text-[#00E676]">External CBT Candidates / Year</label>
                <span className="text-sm font-mono font-bold text-white bg-[#00E676]/20 px-2 py-0.5 rounded border border-[#00E676]/30">{cbtCandidates}</span>
              </div>
              <input 
                type="range" min="0" max="1000" step="50" 
                value={cbtCandidates} onChange={(e) => setCbtCandidates(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00E676]"
              />
              <p className="text-[10px] text-[#8C9EFF]/50">Monetize your lab by hosting mock exams (JAMB/WAEC/NECO).</p>
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="p-8 lg:p-12 flex flex-col justify-center items-center text-center space-y-8 relative overflow-hidden bg-[#0d1240]/40">
          <div className="absolute top-0 right-0 p-4">
            <span className="text-[10px] font-bold tracking-widest text-[#00E676] border border-[#00E676]/30 px-2 py-1 rounded-full uppercase">Verified ROI Logic</span>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8C9EFF]/60">Operational Friction Loss</p>
            <h4 className="text-3xl lg:text-4xl font-black text-white tracking-tighter">₦{annualLoss.toLocaleString()}</h4>
          </div>

          {cbtRevenue > 0 && (
            <div className="space-y-1 py-4 border-y border-white/5 w-full">
              <p className="text-xs font-bold uppercase tracking-widest text-[#00E676]/60">New CBT-as-a-Service Revenue</p>
              <h4 className="text-3xl lg:text-4xl font-black text-[#00E676] tracking-tighter">+ ₦{cbtRevenue.toLocaleString()}</h4>
              <p className="text-[10px] text-[#00E676]/40 uppercase font-black tracking-widest">Pure Asset Income</p>
            </div>
          )}

          <div className="w-full py-8 px-6 rounded-2xl bg-[#00E676]/10 border border-[#00E676]/20 relative group transition-transform hover:scale-[1.02]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00E676] text-[#05081A] px-3 py-1 rounded-full text-[10px] font-black uppercase">Institutional Recovery</div>
            <p className="text-xs font-bold text-[#00E676]/80 mb-1">Total Annual Net Benefit</p>
            <h5 className="text-3xl font-black text-[#00E676] tracking-tighter">₦{nexusSavings > 0 ? nexusSavings.toLocaleString() : "Contact for Quote"}</h5>
          </div>

          <p className="text-[11px] text-[#8C9EFF]/60 leading-relaxed">
            Nexus transforms your school from a cost-center to a profit-engine.
            <br />Recover your time and monetize your infrastructure.
          </p>
        </div>
      </div>
    </div>
  );
}
