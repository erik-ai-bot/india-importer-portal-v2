import type {
  SourcingKPI, OTDTrend, RegionalHub, Vendor,
  AlternativeSupplier, LeadTimeRow, ValueDistRow, ProcessMap,
  POWip, MacroAlert
} from '@/types/sourcing';

export const sourcingKPIs: SourcingKPI[] = [
  { label: 'On-Time Delivery', current: 88.4, target: 93, unit: '%' },
  { label: 'Avg Compliance Rating', current: 84, target: 88, unit: '/100' },
  { label: 'Avg TA Score', current: 81, target: 85, unit: '/100' },
  { label: 'Avg LF Score', current: 78, target: 83, unit: '/100' },
  { label: '1st-Inspection Pass Rate', current: 91.2, target: 94, unit: '%' },
  { label: 'Defect Rate', current: 1.8, target: 1.2, unit: '%', lowerIsBetter: true },
];

export const otdTrend: OTDTrend[] = [
  { month: 'Mar', otd: 91.8 },
  { month: 'Apr', otd: 91.4 },
  { month: 'May', otd: 91.0 },
  { month: 'Jun', otd: 90.6 },
  { month: 'Jul', otd: 90.1 },
  { month: 'Aug', otd: 89.8 },
  { month: 'Sep', otd: 89.5 },
  { month: 'Oct', otd: 89.2 },
  { month: 'Nov', otd: 88.9 },
  { month: 'Dec', otd: 88.6 },
  { month: 'Jan', otd: 88.4 },
  { month: 'Feb', otd: 88.4 },
];

export const regionalHeatmap: RegionalHub[] = [
  { region: 'China', hub: 'Shanghai / Jiangsu / Zhejiang', otd: 86.2, quality: 84, leadTime: 52, spendPct: 68 },
  { region: 'Bangladesh', hub: 'Dhaka', otd: 91.4, quality: 88, leadTime: 62, spendPct: 12 },
  { region: 'India', hub: 'Mumbai / Delhi', otd: 88.6, quality: 86, leadTime: 58, spendPct: 8 },
  { region: 'Turkey', hub: 'Istanbul / Bursa', otd: 94.2, quality: 91, leadTime: 38, spendPct: 6 },
  { region: 'Vietnam', hub: 'Hanoi / Ho Chi Minh', otd: 93.1, quality: 89, leadTime: 44, spendPct: 4 },
];

export const vendors: Vendor[] = [
  {
    id: 'SUP-001', name: 'Jiangsu Xinhua Textiles', country: 'China', city: 'Nanjing', region: 'China',
    annualVolumeEur: 38400000, spendPct: 33.1, categories: ['Linen Bedding', 'Cotton Towels', 'Bed Sheets'],
    radar: { quality: 84, leadTime: 70, otd: 81, taScore: 76, lfScore: 74, complianceRating: 83, claimRatio: 68 }
  },
  {
    id: 'SUP-002', name: 'Qingdao HomeGoods Co.', country: 'China', city: 'Qingdao', region: 'China',
    annualVolumeEur: 24600000, spendPct: 21.2, categories: ['Home Textiles', 'Curtains', 'Cushion Covers', 'Rugs'],
    radar: { quality: 87, leadTime: 74, otd: 85, taScore: 81, lfScore: 79, complianceRating: 86, claimRatio: 76 }
  },
  {
    id: 'SUP-003', name: 'Dhaka Weave Industries', country: 'Bangladesh', city: 'Dhaka', region: 'Bangladesh',
    annualVolumeEur: 14200000, spendPct: 12.2, categories: ['Cotton Towels', 'Bath Linen', 'Terry Cloth', 'Flannel'],
    radar: { quality: 88, leadTime: 82, otd: 91, taScore: 85, lfScore: 83, complianceRating: 89, claimRatio: 84 }
  },
  {
    id: 'SUP-004', name: 'Zhejiang Sunrise Mfg', country: 'China', city: 'Hangzhou', region: 'China',
    annualVolumeEur: 18800000, spendPct: 16.2, categories: ['DIY Tools', 'Garden Accessories', 'Cleaning Equipment'],
    radar: { quality: 86, leadTime: 76, otd: 88, taScore: 83, lfScore: 80, complianceRating: 87, claimRatio: 79 }
  },
  {
    id: 'SUP-005', name: 'Istanbul Textile Group', country: 'Turkey', city: 'Istanbul', region: 'Turkey',
    annualVolumeEur: 9800000, spendPct: 8.4, categories: ['Apparel Basics', 'Home Textile', 'Kitchen Linen'],
    radar: { quality: 91, leadTime: 85, otd: 94, taScore: 88, lfScore: 86, complianceRating: 92, claimRatio: 88 }
  },
  {
    id: 'SUP-006', name: 'Hanoi Garment Hub', country: 'Vietnam', city: 'Hanoi', region: 'Vietnam',
    annualVolumeEur: 6400000, spendPct: 5.5, categories: ['Embroidered Textiles', 'Table Runners', 'Seasonal Deco'],
    radar: { quality: 89, leadTime: 80, otd: 93, taScore: 86, lfScore: 84, complianceRating: 88, claimRatio: 85 }
  },
  {
    id: 'SUP-007', name: 'Shantou Meilong Toy Co.', country: 'China', city: 'Shantou', region: 'China',
    annualVolumeEur: 22400000, spendPct: 19.5, categories: ['Toys & Games', 'Stationery & Office'],
    radar: { quality: 88, leadTime: 72, otd: 86, taScore: 84, lfScore: 81, complianceRating: 87, claimRatio: 85 }
  },
  {
    id: 'SUP-008', name: 'Guangzhou Hygieia Products', country: 'China', city: 'Guangzhou', region: 'China',
    annualVolumeEur: 16800000, spendPct: 14.6, categories: ['Personal Care', 'Cleaning & Laundry'],
    radar: { quality: 91, leadTime: 80, otd: 90, taScore: 87, lfScore: 84, complianceRating: 90, claimRatio: 92 }
  },
  {
    id: 'SUP-009', name: 'Yiwu Sportex Trading Co.', country: 'China', city: 'Yiwu', region: 'China',
    annualVolumeEur: 11600000, spendPct: 10.1, categories: ['Sports & Leisure', 'Seasonal'],
    radar: { quality: 87, leadTime: 78, otd: 89, taScore: 85, lfScore: 82, complianceRating: 86, claimRatio: 88 }
  },
];

export const marketNorm: Record<string, number> = {
  quality: 85, leadTime: 78, otd: 88, taScore: 82,
  lfScore: 80, complianceRating: 85, claimRatio: 80,
};

export const alternativeSuppliers: AlternativeSupplier[] = [
  { id: 'ALT-001', name: 'Chittagong Textile Park', country: 'Bangladesh', city: 'Chittagong', region: 'South Asia', matchScore: 92, spareCap: 85000, otd: 94, qualityScore: 90, productDNA: ['Linen', 'Cotton', 'Home Textile'], yearsExp: 10, status: 'Shortlisted', certifications: ['ISO 9001', 'OEKO-TEX', 'amfori BSCI'] },
  { id: 'ALT-002', name: 'Coimbatore Mills', country: 'India', city: 'Coimbatore', region: 'South Asia', matchScore: 88, spareCap: 62000, otd: 91, qualityScore: 87, productDNA: ['Cotton', 'Linen', 'Bedding'], yearsExp: 15, status: 'Available', certifications: ['ISO 9001', 'GOTS', 'BSCI'] },
  { id: 'ALT-003', name: 'Cairo Cotton Mills', country: 'Egypt', city: 'Cairo', region: 'North Africa', matchScore: 84, spareCap: 48000, otd: 89, qualityScore: 88, productDNA: ['Cotton', 'Linen', 'Bedding'], yearsExp: 22, status: 'Available', certifications: ['ISO 9001', 'OEKO-TEX', 'GOTS'] },
  { id: 'ALT-004', name: 'Izmir Weave Group', country: 'Turkey', city: 'Izmir', region: 'Turkey', matchScore: 89, spareCap: 38000, otd: 95, qualityScore: 92, productDNA: ['Home Textile', 'Linen', 'Cotton'], yearsExp: 12, status: 'Shortlisted', certifications: ['ISO 9001', 'GOTS', 'OEKO-TEX'] },
  { id: 'ALT-005', name: 'Suzhou Textile Park', country: 'China', city: 'Suzhou', region: 'China', matchScore: 91, spareCap: 120000, otd: 88, qualityScore: 89, productDNA: ['Home Textile', 'Bedding', 'Polyester'], yearsExp: 18, status: 'Under Review', certifications: ['ISO 9001', 'OEKO-TEX'] },
  { id: 'ALT-006', name: 'Lahore Fabric House', country: 'Pakistan', city: 'Lahore', region: 'South Asia', matchScore: 78, spareCap: 42000, otd: 86, qualityScore: 84, productDNA: ['Cotton', 'Towels', 'Bath Linen'], yearsExp: 8, status: 'Available', certifications: ['ISO 9001', 'BSCI'] },
  { id: 'ALT-007', name: 'Ho Chi Minh Textiles', country: 'Vietnam', city: 'Ho Chi Minh', region: 'Southeast Asia', matchScore: 85, spareCap: 55000, otd: 92, qualityScore: 88, productDNA: ['Apparel', 'Seasonal Deco', 'Linen'], yearsExp: 9, status: 'Available', certifications: ['WRAP', 'ISO 9001', 'OEKO-TEX'] },
  { id: 'ALT-008', name: 'Casablanca Weave Co.', country: 'Morocco', city: 'Casablanca', region: 'North Africa', matchScore: 80, spareCap: 28000, otd: 91, qualityScore: 86, productDNA: ['Cotton', 'Home Textile'], yearsExp: 11, status: 'Available', certifications: ['BSCI', 'ISO 9001'] },
];

export const leadTimes: LeadTimeRow[] = [
  { category: 'Textile & Bedding', days: 62, target: 55, bottleneck: 'Spinning' },
  { category: 'Home & Deco', days: 58, target: 55, bottleneck: 'Dyeing' },
  { category: 'Seasonal', days: 48, target: 45, bottleneck: 'Sewing' },
  { category: 'Personal Care', days: 36, target: 40, bottleneck: null },
  { category: 'DIY & Garden', days: 34, target: 40, bottleneck: null },
  { category: 'Toys & Games', days: 42, target: 45, bottleneck: null },
  { category: 'Stationery & Office', days: 28, target: 35, bottleneck: null },
  { category: 'Cleaning & Laundry', days: 30, target: 38, bottleneck: null },
  { category: 'Sports & Leisure', days: 38, target: 42, bottleneck: null },
  { category: 'Food & Candy', days: 22, target: 30, bottleneck: null },
];

export const valueDistribution: ValueDistRow[] = [
  { category: 'Home & Deco', valueEur: 880000000, pct: 20.0 },
  { category: 'Textile & Bedding', valueEur: 660000000, pct: 15.0 },
  { category: 'DIY & Garden', valueEur: 528000000, pct: 12.0 },
  { category: 'Toys & Games', valueEur: 440000000, pct: 10.0 },
  { category: 'Stationery & Office', valueEur: 440000000, pct: 10.0 },
  { category: 'Cleaning & Laundry', valueEur: 352000000, pct: 8.0 },
  { category: 'Personal Care', valueEur: 352000000, pct: 8.0 },
  { category: 'Food & Candy', valueEur: 308000000, pct: 7.0 },
  { category: 'Sports & Leisure', valueEur: 220000000, pct: 5.0 },
  { category: 'Seasonal', valueEur: 220000000, pct: 5.0 },
];

export const processMaps: ProcessMap[] = [
  { category: 'Bedding', steps: ['Raw Material', 'Spinning', 'Dyeing', 'Weaving', 'Finishing', 'QC', 'Packing', 'Shipping'], bottleneck: 'Spinning' },
  { category: 'Home Textile', steps: ['Raw Material', 'Spinning', 'Dyeing', 'Weaving', 'Sewing', 'QC', 'Packing', 'Shipping'], bottleneck: 'Dyeing' },
  { category: 'DIY Tools', steps: ['Raw Material', 'Stamping', 'Assembly', 'Coating', 'QC', 'Packing', 'Shipping'], bottleneck: 'Assembly' },
];

export const poWip: POWip[] = [
  { id: 'PO-2026-4412', supplier: 'Jiangsu Xinhua Textiles', product: 'Linen Bedding Set Q2', valueEur: 1840000, dueDate: '2026-03-12', status: 'Overdue', daysOverdue: 8 },
  { id: 'PO-2026-4381', supplier: 'Qingdao HomeGoods Co.', product: 'Home Textile Bundle', valueEur: 1420000, dueDate: '2026-03-09', status: 'Overdue', daysOverdue: 11 },
  { id: 'PO-2026-4356', supplier: 'Dhaka Weave Industries', product: 'Cotton Towel Lot', valueEur: 820000, dueDate: '2026-03-18', status: 'Overdue', daysOverdue: 2 },
  { id: 'PO-2026-4471', supplier: 'Zhejiang Sunrise Mfg', product: 'DIY Spring Range', valueEur: 2140000, dueDate: '2026-03-28', status: 'At Risk', daysOverdue: 0 },
  { id: 'PO-2026-4489', supplier: 'Jiangsu Xinhua Textiles', product: 'Summer Bedding Range', valueEur: 980000, dueDate: '2026-04-01', status: 'At Risk', daysOverdue: 0 },
  { id: 'PO-2026-4502', supplier: 'Istanbul Textile Group', product: 'Kitchen Linen Spring', valueEur: 720000, dueDate: '2026-04-05', status: 'On Track', daysOverdue: 0 },
  { id: 'PO-2026-4518', supplier: 'Hanoi Garment Hub', product: 'Easter Deco Collection', valueEur: 480000, dueDate: '2026-04-08', status: 'On Track', daysOverdue: 0 },
  { id: 'PO-2026-4534', supplier: 'Zhejiang Sunrise Mfg', product: 'Garden Tools Q2', valueEur: 1260000, dueDate: '2026-04-15', status: 'On Track', daysOverdue: 0 },
];

export const macroAlerts: MacroAlert[] = [
  {
    id: 'MAC-001',
    type: 'Tariff',
    severity: 'high',
    region: 'EU',
    title: 'EU CBAM — Textile Import Tariff Pressure',
    description: 'EU Carbon Border Adjustment Mechanism adds est. 2.8–4.2% to carbon-intensive textile imports from non-EU countries effective Q3 2026. Action sources ~82% of textiles from outside EU. Estimated annual impact: €48–72M on COGS.',
    action: 'Audit supplier ESG ratings; accelerate sourcing shift to lower-carbon regions (Turkey, Morocco). Model retail price increases for most-affected SKUs.',
  },
  {
    id: 'MAC-002',
    type: 'Logistics',
    severity: 'high',
    region: 'Global',
    title: 'Red Sea / Suez Canal Disruption — +11 Day Transit',
    description: 'Ongoing Houthi attacks force sea freight rerouting via Cape Horn. Shanghai→Rotterdam extended from 28 to 39 days. Current sea freight premium: +€420/TEU vs pre-crisis. Action has ~1,400 containers in transit at any given time.',
    action: 'Accelerate Rail (China–Europe) bookings for high-value time-sensitive lines. Evaluate air freight for Easter seasonal stock at risk.',
  },
  {
    id: 'MAC-003',
    type: 'Geopolitical',
    severity: 'medium',
    region: 'China',
    title: 'China–EU Trade Tension: Tariff Risk on Consumer Goods',
    description: 'Proposed EU retaliatory tariffs of 15–25% on Chinese consumer goods in response to EV subsidies dispute may extend to non-food retail goods. Action sources 68% from China.',
    action: 'Develop 3-year China de-risking roadmap. Target 15% volume shift to Bangladesh and India by 2027.',
  },
];
