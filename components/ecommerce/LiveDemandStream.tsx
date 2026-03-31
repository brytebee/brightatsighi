"use client";

import { useEffect, useRef } from "react";
import { EcommerceEvent, SKU } from "@/lib/ecommerce/simulation";

export default function LiveDemandStream({ events, skus }: { events: EcommerceEvent[], skus: SKU[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events]);

  const getEventStyle = (type: string) => {
    switch (type) {
      case "PAGE_VIEW": return "text-gray-500 border-white/5";
      case "ADD_TO_CART": return "text-blue-400 border-blue-400/20";
      case "CHECKOUT": return "text-electric-lime border-electric-lime/20";
      case "COMPETITOR_PRICE_DROP": return "text-orange-500 border-orange-500/20";
      case "COMPETITOR_OUT_OF_STOCK": return "text-purple-400 border-purple-400/20";
      default: return "text-white border-white/10";
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] border border-white/10 rounded-3xl overflow-hidden relative group">
      <div className="absolute inset-0 bg-linear-to-b from-[#ccff00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl pointer-events-none" />
      
      {/* Header */}
      <div className="shrink-0 p-4 border-b border-white/10 bg-black/50 backdrop-blur z-10 flex items-center justify-between">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-electric-lime animate-pulse" />
           Velocity Firehose
        </h3>
        <span className="text-[9px] font-mono text-gray-600">TCP://EUR-W1:443</span>
      </div>

      {/* Stream Terminal */}
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto font-mono text-[10px] space-y-3 custom-scrollbar relative z-10">
        <div className="opacity-50 text-gray-600 pb-2 border-b border-white/5 mb-4">
          [ SYSTEM INITIATED ] Listening for global e-commerce events...
        </div>
        {events.map((event) => {
           const relatedSku = skus.find(s => s.id === event.skuId);
           const ts = new Date(event.timestamp).toLocaleTimeString('en-US', { hour12: false, fractionalSecondDigits: 2 });
           
           return (
             <div key={event.id} className={`p-2.5 border-l-2 bg-white/[0.02] flex items-start gap-3 transition-colors ${getEventStyle(event.type)}`}>
               <span className="opacity-50 min-w-[70px] shrink-0">{ts}</span>
               <div className="flex flex-col gap-1 w-full">
                 <div className="flex items-center justify-between w-full">
                   <span className="font-bold tracking-widest">{event.type}</span>
                   <span className="text-[8px] opacity-70 border border-current px-1 rounded">{event.skuId.split('-')[1]}</span>
                 </div>
                 <span className="text-gray-400 text-[9px] truncate">
                   {relatedSku?.name || "Unknown SKU"} 
                   {event.type === 'CHECKOUT' ? ` • ${relatedSku?.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}` : ''}
                   {event.metadata?.newPrice ? ` • Dropped to $${event.metadata.newPrice}` : ''}
                 </span>
               </div>
             </div>
           );
        })}
      </div>
      
      {/* Grid overlay for aesthetic */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "16px 16px" }}
      />
    </div>
  );
}
