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
  optimalPrice: number;
  stock: number;
  competitorPrice: number;
  competitorStockStatus: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  velocity: number;
  healthScore: number;
}

export interface EcommerceEvent {
  id: string;
  timestamp: string;
  type: EventType;
  skuId: string;
  metadata?: {
    message: string;
    highlight?: boolean; // true = lime glow in stream
    amount?: number;
  };
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
    id: "PRD-A-01",
    name: "Product A",
    category: "ELECTRONICS",
    price: 54.99,
    optimalPrice: 49.99,
    stock: 320,
    competitorPrice: 49.99,
    competitorStockStatus: "IN_STOCK",
    velocity: 150,
    healthScore: 92,
  },
  {
    id: "PRD-B-02",
    name: "Product B",
    category: "ELECTRONICS",
    price: 32.50,
    optimalPrice: 29.99,
    stock: 85,
    competitorPrice: 30.00,
    competitorStockStatus: "IN_STOCK",
    velocity: 80,
    healthScore: 65,
  },
  {
    id: "PRD-C-03",
    name: "Product C",
    category: "ELECTRONICS",
    price: 18.99,
    optimalPrice: 19.99,
    stock: 12,
    competitorPrice: 18.00,
    competitorStockStatus: "LOW_STOCK",
    velocity: 30,
    healthScore: 20,
  },
  {
    id: "PRD-D-04",
    name: "Product D",
    category: "ELECTRONICS",
    price: 104.50,
    optimalPrice: 99.99,
    stock: 240,
    competitorPrice: 104.50,
    competitorStockStatus: "IN_STOCK",
    velocity: 120,
    healthScore: 85,
  },
  {
    id: "PRD-E-05",
    name: "Product E",
    category: "ELECTRONICS",
    price: 41.99,
    optimalPrice: 39.99,
    stock: 58,
    competitorPrice: 40.00,
    competitorStockStatus: "IN_STOCK",
    velocity: 45,
    healthScore: 40,
  },
  {
    id: "PRD-F-06",
    name: "Product F",
    category: "ELECTRONICS",
    price: 26.99,
    optimalPrice: 24.99,
    stock: 410,
    competitorPrice: 24.99,
    competitorStockStatus: "IN_STOCK",
    velocity: 140,
    healthScore: 95,
  },
];

const generateId = () => Math.random().toString(36).substr(2, 9);

export function useEcommerceSimulation(intervalMs = 1500) {
  const [skus, setSkus] = useState<SKU[]>(INITIAL_SKUS);
  const [events, setEvents] = useState<EcommerceEvent[]>([]);
  const [alerts, setAlerts] = useState<ArbitrageAlert[]>([]);
  const [globalMetrics, setGlobalMetrics] = useState({
    revenue: 142800,
    revenueDelta: 4.3,
    profitMargin: 34.7,
    profitDelta: 1.5,
    marketShare: 23.1,
    marketShareDelta: 2.3,
    ecomIndex: 87.4,
    ecomIndexDelta: 8.2,
  });

  const generateEvent = useCallback(() => {
    setSkus((currentSkus) => {
      const nextSkus = [...currentSkus];
      const targetSkuIndex = Math.floor(Math.random() * nextSkus.length);
      const sku = nextSkus[targetSkuIndex];

      const rand = Math.random();
      let type: EventType = "PAGE_VIEW";
      let metadata: EcommerceEvent["metadata"] = { message: "", highlight: false };

      if (rand > 0.95 && sku.competitorStockStatus !== "OUT_OF_STOCK") {
        type = "COMPETITOR_OUT_OF_STOCK";
        nextSkus[targetSkuIndex] = { ...sku, competitorStockStatus: "OUT_OF_STOCK" };
        metadata = { message: `Low stock alert: ${sku.name}.`, highlight: false };
      } else if (rand > 0.85) {
        type = "COMPETITOR_PRICE_DROP";
        const dropAmount = Math.max(1, Math.floor(sku.competitorPrice * 0.05));
        const newPrice = parseFloat((sku.competitorPrice - dropAmount).toFixed(2));
        nextSkus[targetSkuIndex] = { ...sku, competitorPrice: newPrice };
        metadata = {
          message: `Price drop detected on ${sku.name}.`,
          highlight: false,
        };
      } else if (rand > 0.7) {
        type = "CHECKOUT";
        if (sku.stock > 0) {
          const qty = Math.floor(Math.random() * 3) + 1;
          const orderValue = parseFloat((sku.price * qty).toFixed(2));
          nextSkus[targetSkuIndex] = { ...sku, stock: Math.max(0, sku.stock - qty) };
          setGlobalMetrics((prev) => ({
            ...prev,
            revenue: prev.revenue + orderValue,
            revenueDelta: parseFloat((prev.revenueDelta + 0.01).toFixed(2)),
          }));
          metadata = {
            message: `Checkout completed: $${orderValue.toFixed(2)}`,
            highlight: true,
            amount: orderValue,
          };
        }
      } else if (rand > 0.55) {
        type = "CHECKOUT";
        const bulkQty = Math.floor(Math.random() * 5) + 3;
        const bulkValue = parseFloat((sku.price * bulkQty).toFixed(2));
        if (sku.stock >= bulkQty) {
          nextSkus[targetSkuIndex] = { ...sku, stock: sku.stock - bulkQty };
          setGlobalMetrics((prev) => ({
            ...prev,
            revenue: prev.revenue + bulkValue,
            revenueDelta: parseFloat((prev.revenueDelta + 0.03).toFixed(2)),
          }));
          metadata = {
            message: `Bulk purchase completed: $${bulkValue.toFixed(2)}`,
            highlight: true,
            amount: bulkValue,
          };
        }
      } else if (rand > 0.4) {
        type = "ADD_TO_CART";
        metadata = { message: `${sku.name} added to cart.`, highlight: false };
      } else if (rand > 0.25) {
        type = "PAGE_VIEW";
        const orderVal = parseFloat((sku.price * (Math.floor(Math.random() * 4) + 1)).toFixed(2));
        metadata = {
          message: `High-value order placed: $${orderVal.toFixed(2)}`,
          highlight: true,
          amount: orderVal,
        };
      } else if (rand > 0.12) {
        type = "PAGE_VIEW";
        metadata = { message: `Search for "${sku.name}".`, highlight: false };
      } else {
        type = "PAGE_VIEW";
        metadata = { message: `New user registered.`, highlight: false };
      }

      // Arbitrage alerts
      const newAlerts: ArbitrageAlert[] = [];
      const updatedSku = nextSkus[targetSkuIndex];

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

      if (type === "CHECKOUT" && updatedSku.stock < 10 && updatedSku.velocity > 100) {
        newAlerts.push({
          id: generateId(),
          skuId: updatedSku.id,
          timestamp: new Date().toISOString(),
          type: "RISK",
          message: `Critical stockout risk for ${updatedSku.name}.`,
          action: "Trigger Emergency PO",
        });
      }

      if (newAlerts.length > 0) {
        setAlerts((prev) => [...newAlerts, ...prev].slice(0, 10));
      }

      // Heuristic health score
      nextSkus[targetSkuIndex].healthScore = Math.max(
        0,
        Math.min(
          100,
          (updatedSku.stock > 20 ? 40 : 10) +
            (updatedSku.price <= updatedSku.competitorPrice ? 30 : 0) +
            (updatedSku.competitorStockStatus === "OUT_OF_STOCK" ? 30 : 0)
        )
      );

      const newEvent: EcommerceEvent = {
        id: generateId(),
        timestamp: new Date().toISOString(),
        type,
        skuId: sku.id,
        metadata,
      };

      setEvents((prev) => [newEvent, ...prev].slice(0, 50));

      return nextSkus;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(generateEvent, intervalMs);
    return () => clearInterval(timer);
  }, [generateEvent, intervalMs]);

  return { skus, events, alerts, globalMetrics };
}
