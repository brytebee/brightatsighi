import { useState, useEffect, useCallback } from "react";

export type EventType =
  | "PAGE_VIEW"
  | "ADD_TO_CART"
  | "CHECKOUT"
  | "COMPETITOR_PRICE_DROP"
  | "COMPETITOR_OUT_OF_STOCK";

export interface SKU {
  id: string;
  name: string;
  category: "ELECTRONICS" | "APPAREL" | "HOME" | "GROCERY";
  price: number;
  stock: number;
  competitorPrice: number;
  competitorStockStatus: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  velocity: number; // Simulated page views per minute
  healthScore: number; // 0-100 heuristic score
}

export interface EcommerceEvent {
  id: string;
  timestamp: string;
  type: EventType;
  skuId: string;
  metadata?: any;
}

export interface ArbitrageAlert {
  id: string;
  skuId: string;
  timestamp: string;
  type: "OPPORTUNITY" | "RISK";
  message: string;
  action: string;
}

const INITIAL_SKUS: SKU[] = [
  {
    id: "SKU-9901-ELC",
    name: "Sony WH-1000XM5",
    category: "ELECTRONICS",
    price: 348.0,
    stock: 210,
    competitorPrice: 349.0,
    competitorStockStatus: "IN_STOCK",
    velocity: 45,
    healthScore: 88,
  },
  {
    id: "SKU-4421-APP",
    name: "Nike Air Force 1",
    category: "APPAREL",
    price: 110.0,
    stock: 8,
    competitorPrice: 105.0,
    competitorStockStatus: "IN_STOCK",
    velocity: 120,
    healthScore: 42,
  },
  {
    id: "SKU-1123-ELC",
    name: "Apple iPad Pro 12.9",
    category: "ELECTRONICS",
    price: 1099.0,
    stock: 54,
    competitorPrice: 1099.0,
    competitorStockStatus: "LOW_STOCK",
    velocity: 85,
    healthScore: 91,
  },
  {
    id: "SKU-8822-HOM",
    name: "Dyson V15 Detect",
    category: "HOME",
    price: 749.0,
    stock: 120,
    competitorPrice: 700.0,
    competitorStockStatus: "IN_STOCK",
    velocity: 30,
    healthScore: 65,
  },
];

const generateId = () => Math.random().toString(36).substr(2, 9);

export function useEcommerceSimulation(intervalMs = 1500) {
  const [skus, setSkus] = useState<SKU[]>(INITIAL_SKUS);
  const [events, setEvents] = useState<EcommerceEvent[]>([]);
  const [alerts, setAlerts] = useState<ArbitrageAlert[]>([]);
  const [globalMetrics, setGlobalMetrics] = useState({
    activeCarts: 142,
    gmvVelocity: 42500, // $ per hour
    arbitrageOpportunities: 0,
  });

  const generateEvent = useCallback(() => {
    setSkus((currentSkus) => {
      let nextSkus = [...currentSkus];
      const targetSkuIndex = Math.floor(Math.random() * nextSkus.length);
      const sku = nextSkus[targetSkuIndex];

      // Define probability matrix for this simulation tick
      const rand = Math.random();
      let type: EventType = "PAGE_VIEW";
      let metadata: any = {};

      if (rand > 0.95 && sku.competitorStockStatus !== "OUT_OF_STOCK") {
        type = "COMPETITOR_OUT_OF_STOCK";
        nextSkus[targetSkuIndex] = { ...sku, competitorStockStatus: "OUT_OF_STOCK" };
      } else if (rand > 0.85) {
        type = "COMPETITOR_PRICE_DROP";
        const dropAmount = Math.floor(sku.competitorPrice * 0.05); // 5% drop
        nextSkus[targetSkuIndex] = { ...sku, competitorPrice: sku.competitorPrice - dropAmount };
        metadata = { previousPrice: sku.competitorPrice, newPrice: sku.competitorPrice - dropAmount };
      } else if (rand > 0.7) {
        type = "CHECKOUT";
        if (sku.stock > 0) {
          nextSkus[targetSkuIndex] = { ...sku, stock: sku.stock - 1 };
          setGlobalMetrics(prev => ({ ...prev, gmvVelocity: prev.gmvVelocity + sku.price, activeCarts: Math.max(0, prev.activeCarts - 1) }));
        }
      } else if (rand > 0.4) {
        type = "ADD_TO_CART";
        setGlobalMetrics(prev => ({ ...prev, activeCarts: prev.activeCarts + 1 }));
      }

      // Check Heuristics
      const newAlerts: ArbitrageAlert[] = [];
      const updatedSku = nextSkus[targetSkuIndex];

      // 1. Arbitrage Opportunity (Competitor out of stock, we have stock)
      if (type === "COMPETITOR_OUT_OF_STOCK" && updatedSku.stock > 50) {
        newAlerts.push({
          id: generateId(),
          skuId: updatedSku.id,
          timestamp: new Date().toISOString(),
          type: "OPPORTUNITY",
          message: `${updatedSku.name} is restock-constrained at competitors.`,
          action: "Increase Price +8%",
        });
      }

      // 2. Pricing Risk (Competitor dropped price significantly below ours)
      if (type === "COMPETITOR_PRICE_DROP" && updatedSku.price > updatedSku.competitorPrice * 1.05) {
        newAlerts.push({
          id: generateId(),
          skuId: updatedSku.id,
          timestamp: new Date().toISOString(),
          type: "RISK",
          message: `Competitor undercutting ${updatedSku.name} by >5%.`,
          action: "Price Match Recommended",
        });
      }

      // 3. Demand Surge (High velocity, low stock)
      if (type === "CHECKOUT" && updatedSku.stock < 10 && updatedSku.velocity > 100) {
        newAlerts.push({
          id: generateId(),
          skuId: updatedSku.id,
          timestamp: new Date().toISOString(),
          type: "RISK",
          message: `Critical stockout risk for ${updatedSku.name}. GMV velocity loss imminent.`,
          action: "Trigger Emergency PO",
        });
      }

      if (newAlerts.length > 0) {
        setAlerts(prev => [...newAlerts, ...prev].slice(0, 10)); // keep last 10
        setGlobalMetrics(prev => ({ ...prev, arbitrageOpportunities: prev.arbitrageOpportunities + newAlerts.filter(a => a.type === "OPPORTUNITY").length }));
      }

      // Update Health Score heuristically
      nextSkus[targetSkuIndex].healthScore = Math.max(
        0,
        Math.min(100, (updatedSku.stock > 20 ? 40 : 10) + (updatedSku.price <= updatedSku.competitorPrice ? 30 : 0) + (updatedSku.competitorStockStatus === "OUT_OF_STOCK" ? 30 : 0))
      );

      const newEvent: EcommerceEvent = {
        id: generateId(),
        timestamp: new Date().toISOString(),
        type,
        skuId: sku.id,
        metadata,
      };

      setEvents((prev) => [newEvent, ...prev].slice(0, 50)); // Keep last 50 events for the stream

      return nextSkus;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(generateEvent, intervalMs);
    return () => clearInterval(timer);
  }, [generateEvent, intervalMs]);

  return { skus, events, alerts, globalMetrics };
}
