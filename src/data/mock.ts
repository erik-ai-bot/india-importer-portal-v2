import type {
  KPICard, Alert, BOMRow, SupplierGeo,
  Invoice, SCFRow, MarginTrend, PricingGap, CreditTrend
} from '@/types';

export const dashboardKPIs: KPICard[] = [
  { label: 'Gross Margin', value: '31.5%', sub: '▼ 1.5% below 33% target', variant: 'warning' },
  { label: 'Pricing Gap', value: '−€2.4M', sub: '▼ Linen & cotton inflation', variant: 'alert' },
  { label: 'Credit Line Used', value: '€268M', sub: 'of €400M total (67%)', variant: 'warning' },
  { label: 'Active POs', value: '1,847', sub: '8 stalled >10d', variant: 'default' },
];

export const scfKPIs: KPICard[] = [
  { label: 'Held Payments', value: '14', sub: 'Quality claim holds', variant: 'alert' },
  { label: 'Pending Approvals', value: '23', sub: 'SCF financing requests', variant: 'default' },
  { label: 'Credit Line Used', value: '€268M / €400M', sub: '67% utilised', variant: 'warning' },
  { label: 'Available Headroom', value: '€132M', sub: '33% remaining', variant: 'good' },
];

export const marginKPIs: KPICard[] = [
  { label: 'Pricing Gap (Total)', value: '−€2.4M', sub: '▼ Linen+cotton cost inflation', variant: 'alert' },
  { label: 'Current Gross Margin', value: '31.5%', sub: 'Target: 33.0%', variant: 'warning' },
  { label: 'Required Price Hike', value: '+2.8%', sub: 'to restore 33% GM', variant: 'default' },
  { label: 'RM Cost Index', value: '114.2', sub: '▲ +14.2% YoY', variant: 'default' },
];

export const geoKPIs: KPICard[] = [
  { label: 'China Exposure', value: '68%', sub: '▼ Single-point risk', variant: 'alert' },
  { label: 'EUR/CNY Delta', value: '+5.1%', sub: 'vs 12-month avg', variant: 'warning' },
  { label: 'Sea vs Rail Delta', value: '€+420/TEU', sub: 'Sea cheaper currently', variant: 'default' },
  { label: 'Bangladesh Shift Target', value: '18%', sub: 'Recommended rebalance', variant: 'good' },
];

export const alerts: Alert[] = [
  {
    id: '1',
    title: '🔴 Margin Guard — Bedding Linen',
    body: 'Replacement cost (€3.47/unit) exceeds contracted cost (€3.20/unit) by 8.4% — above the 5% threshold. Current retail prices no longer support the 33% Gross Margin target due to upstream linen inflation. Bedding category accounts for ~26% of COGS.',
    severity: 'critical',
    actions: ['Trigger Price Review', 'Reduce Promotions', 'Snooze 7d'],
  },
  {
    id: '2',
    title: '🔴 Financial Stall — 23 POs Flagged',
    body: '23 purchase orders have been in "Issued" status for more than 10 days with 0% raw material progress recorded. Lead indicator of hidden liquidity stress at factory level. Concentrated at Jiangsu and Qingdao China suppliers.',
    severity: 'critical',
    actions: ['Offer SCF Drawdown', 'View POs', 'Contact Suppliers'],
  },
  {
    id: '3',
    title: '⚠ Sourcing Continuity — Jiangsu Xinhua Textiles',
    body: 'Total active PO value for Jiangsu Xinhua Textiles is 38% above their historical 6-month average output. High risk of Working Capital Exhaustion. Jiangsu Xinhua is the #1 supplier with €38.4M annual exposure.',
    severity: 'warning',
    actions: ['Offer SCF to Jiangsu Xinhua', 'Review PO Volume', 'Snooze 14d'],
  },
  {
    id: '4',
    title: '⚠ Geo-Risk — China at 68% + EUR/CNY Rising',
    body: 'EUR spend concentration in China has reached 68% while Country Risk indicators show rising FX volatility (+5.1% EUR/CNY delta), wage inflation (+7.1%), and elevated geopolitical risk. Suez Canal disruption adds +11 days to sea transit.',
    severity: 'warning',
    actions: ['Initiate Sourcing Shift Plan', 'Expand Bangladesh Base', 'View Geo Report'],
  },
];

export const bomData: BOMRow[] = [
  { category: 'Bedding', material: 'Linen', rmWeight: '85%', contractCost: '€3.20', replacementCost: '€3.47', pricingGap: -8.4, requiredHike: '+5.1%' },
  { category: 'Home Textile', material: 'Cotton', rmWeight: '72%', contractCost: '€2.10', replacementCost: '€2.24', pricingGap: -6.7, requiredHike: '+3.9%' },
  { category: 'Towels', material: 'Cotton', rmWeight: '78%', contractCost: '€1.85', replacementCost: '€1.94', pricingGap: -4.9, requiredHike: '+2.8%' },
  { category: 'Seasonal Deco', material: 'Polyester', rmWeight: '60%', contractCost: '€4.10', replacementCost: '€4.16', pricingGap: -1.5, requiredHike: '+0.8%' },
  { category: 'DIY Tools', material: 'Steel/Plastic', rmWeight: '55%', contractCost: '€2.85', replacementCost: '€2.88', pricingGap: -1.1, requiredHike: '+0.6%' },
];

export const supplierGeo: SupplierGeo[] = [
  { country: 'China', percentage: 68, wageInflation: '+7.1%', fxDelta: '+5.1%', geopolitical: 'High', risk: 'Critical' },
  { country: 'Bangladesh', percentage: 12, wageInflation: '+3.8%', fxDelta: '+2.2%', geopolitical: 'Low', risk: 'Medium' },
  { country: 'India', percentage: 8, wageInflation: '+4.2%', fxDelta: '+3.1%', geopolitical: 'Low', risk: 'Medium' },
  { country: 'Turkey', percentage: 6, wageInflation: '+28.4%', fxDelta: '+41.2%', geopolitical: 'Medium', risk: 'Critical' },
  { country: 'Vietnam', percentage: 4, wageInflation: '+5.1%', fxDelta: '+1.8%', geopolitical: 'Low', risk: 'Medium' },
  { country: 'Pakistan', percentage: 2, wageInflation: '+8.2%', fxDelta: '+12.1%', geopolitical: 'Medium', risk: 'Medium' },
];

export const invoices: Invoice[] = [
  { id: 'INV-2026-1841', supplier: 'Jiangsu Xinhua Textiles', poRef: 'PO-2026-1104', amount: '€920,000', dueDate: 'Apr 8', status: 'Pending', scf: 'Eligible' },
  { id: 'INV-2026-1756', supplier: 'Qingdao HomeGoods Co.', poRef: 'PO-2026-1067', amount: '€645,000', dueDate: 'Mar 31', status: 'Overdue', scf: 'Eligible' },
  { id: 'INV-2026-1712', supplier: 'Dhaka Weave Industries', poRef: 'PO-2026-1049', amount: '€312,000', dueDate: 'Mar 25', status: 'On Hold', scf: 'N/A' },
  { id: 'INV-2026-1698', supplier: 'Istanbul Textile Group', poRef: 'PO-2026-1041', amount: '€487,000', dueDate: 'Apr 15', status: 'Approved', scf: 'Active' },
  { id: 'INV-2026-1681', supplier: 'Hanoi Garment Hub', poRef: 'PO-2026-1038', amount: '€180,000', dueDate: 'Apr 12', status: 'Processing', scf: 'N/A' },
];

export const scfSuppliers: SCFRow[] = [
  { supplier: 'Jiangsu Xinhua Textiles', amount: 28400, amountLabel: '€28.4M' },
  { supplier: 'Qingdao HomeGoods Co.', amount: 19200, amountLabel: '€19.2M' },
  { supplier: 'Zhejiang Sunrise Mfg', amount: 14800, amountLabel: '€14.8M' },
  { supplier: 'Guangzhou Poly Products', amount: 11600, amountLabel: '€11.6M' },
  { supplier: 'Others', amount: 82000, amountLabel: '€82.0M' },
];

export const marginTrend: MarginTrend[] = [
  { month: 'Oct', margin: 33.2, target: 33.0 },
  { month: 'Nov', margin: 32.8, target: 33.0 },
  { month: 'Dec', margin: 32.1, target: 33.0 },
  { month: 'Jan', margin: 31.9, target: 33.0 },
  { month: 'Feb', margin: 31.7, target: 33.0 },
  { month: 'Mar', margin: 31.5, target: 33.0 },
];

export const pricingGaps: PricingGap[] = [
  { category: 'Bedding', gap: -8.4 },
  { category: 'Home Textile', gap: -6.7 },
  { category: 'Towels', gap: -4.9 },
  { category: 'Seasonal Deco', gap: -1.5 },
  { category: 'DIY Tools', gap: -1.1 },
];

export const creditTrend: CreditTrend[] = [
  { month: 'Oct', used: 198, limit: 400 },
  { month: 'Nov', used: 215, limit: 400 },
  { month: 'Dec', used: 234, limit: 400 },
  { month: 'Jan', used: 248, limit: 400 },
  { month: 'Feb', used: 261, limit: 400 },
  { month: 'Mar', used: 268, limit: 400 },
];

export const geoChartData = supplierGeo.map(s => ({
  name: s.country,
  value: s.percentage,
}));

export const scfUtilizationTrend = [
  { month: 'Oct', utilized: 198, headroom: 202, pct: 49.5 },
  { month: 'Nov', utilized: 215, headroom: 185, pct: 53.75 },
  { month: 'Dec', utilized: 234, headroom: 166, pct: 58.5 },
  { month: 'Jan', utilized: 248, headroom: 152, pct: 62.0 },
  { month: 'Feb', utilized: 261, headroom: 139, pct: 65.25 },
  { month: 'Mar', utilized: 268, headroom: 132, pct: 67.0 },
];
