/**
 * Data fetching layer — uses Supabase if configured, falls back to mock data.
 */
import { supabase, isMockMode } from './supabase';
import * as mock from '@/data/mock';
import type { KPICard, Alert, BOMRow, SupplierGeo, Invoice, SCFRow, MarginTrend, CreditTrend } from '@/types';

async function fetchOrMock<T>(
  table: string,
  mockData: T[],
  orderBy?: string,
  extra?: (q: any) => any
): Promise<T[]> {
  if (isMockMode || !supabase) return mockData;
  let q = supabase.from(table).select('*');
  if (orderBy) q = q.order(orderBy);
  if (extra) q = extra(q);
  const { data, error } = await q;
  if (error || !data) return mockData;
  return data as T[];
}

export async function getKPIs(section: string): Promise<KPICard[]> {
  const rows = await fetchOrMock(
    'kpi_snapshots',
    section === 'dashboard' ? mock.dashboardKPIs
      : section === 'margin' ? mock.marginKPIs
      : section === 'geo' ? mock.geoKPIs
      : mock.scfKPIs,
    'sort_order',
    (q) => q.eq('section', section)
  );
  return rows.map((r: any) => ({
    label: r.label,
    value: r.value,
    sub: r.sub,
    variant: r.variant,
  }));
}

export async function getBOMData(): Promise<BOMRow[]> {
  const rows = await fetchOrMock('bom_data', mock.bomData);
  return rows.map((r: any) => ({
    category: r.category,
    material: r.material,
    rmWeight: r.rm_weight ?? r.rmWeight,
    contractCost: r.contract_cost ?? r.contractCost,
    replacementCost: r.replacement_cost ?? r.replacementCost,
    pricingGap: Number(r.pricing_gap ?? r.pricingGap),
    requiredHike: r.required_hike ?? r.requiredHike,
  }));
}

export async function getSupplierGeo(): Promise<SupplierGeo[]> {
  const rows = await fetchOrMock('supplier_geo', mock.supplierGeo);
  return rows.map((r: any) => ({
    country: r.country,
    percentage: Number(r.percentage),
    wageInflation: r.wage_inflation ?? r.wageInflation,
    fxDelta: r.fx_delta ?? r.fxDelta,
    geopolitical: r.geopolitical,
    risk: r.risk,
  }));
}

export async function getInvoices(): Promise<Invoice[]> {
  const rows = await fetchOrMock('invoices', mock.invoices);
  return rows.map((r: any) => ({
    id: r.id,
    supplier: r.supplier,
    poRef: r.po_ref ?? r.poRef,
    amount: r.amount,
    dueDate: r.due_date ?? r.dueDate,
    status: r.status,
    scf: r.scf,
  }));
}

export async function getSCFSuppliers(): Promise<SCFRow[]> {
  const rows = await fetchOrMock('scf_suppliers', mock.scfSuppliers, 'sort_order');
  return rows.map((r: any) => ({
    supplier: r.supplier,
    amount: Number(r.amount),
    amountLabel: r.amount_label ?? r.amountLabel,
  }));
}

export async function getAlerts(): Promise<Alert[]> {
  const rows = await fetchOrMock(
    'alerts',
    mock.alerts,
    undefined,
    (q) => q.eq('is_active', true)
  );
  return rows.map((r: any) => ({
    id: r.id,
    title: r.title,
    body: r.body,
    severity: r.severity,
    actions: r.actions ?? [],
  }));
}

export async function getMarginTrend(): Promise<MarginTrend[]> {
  const rows = await fetchOrMock('margin_trend', mock.marginTrend, 'sort_order');
  return rows.map((r: any) => ({
    month: r.month,
    margin: Number(r.margin),
    target: Number(r.target),
  }));
}

export async function getCreditTrend(): Promise<CreditTrend[]> {
  const rows = await fetchOrMock('credit_trend', mock.creditTrend, 'sort_order');
  return rows.map((r: any) => ({
    month: r.month,
    used: Number(r.used),
    limit: Number(r.credit_limit ?? r.limit),
  }));
}

export async function getSuppliers(): Promise<import('@/data/suppliers').Supplier[]> {
  if (isMockMode || !supabase) {
    return (await import('@/data/suppliers')).suppliers;
  }

  const { data: suppData, error: suppErr } = await supabase
    .from('suppliers')
    .select('*')
    .order('id');

  if (suppErr || !suppData || suppData.length === 0) {
    return (await import('@/data/suppliers')).suppliers;
  }

  const { data: factData } = await supabase
    .from('supplier_factories')
    .select('*, factory_catalog(*)')
    .order('sort_order');

  return suppData.map((s: any) => {
    const factories = (factData || [])
      .filter((f: any) => f.supplier_id === s.id)
      .map((f: any) => ({
        name: f.name,
        country: f.country,
        ownership: f.ownership,
        otd: f.otd,
        workers: f.workers,
        machines: f.machines,
        leadTime: f.lead_time,
        annualOutput: f.annual_output,
        firstPassRate: f.first_pass_rate,
        defectRate: f.defect_rate,
        thirdPartyQA: f.third_party_qa,
        auditScore: f.audit_score,
        certifications: f.certifications,
        catalog: (f.factory_catalog || [])
          .sort((a: any, b: any) => a.sort_order - b.sort_order)
          .map((c: any) => ({
            name: c.name,
            desc: c.description,
            price: c.price,
            moq: c.moq,
          })),
      }));

    return {
      id: s.id,
      name: s.name,
      country: s.country,
      city: s.city,
      lat: Number(s.lat),
      lng: Number(s.lng),
      address: s.address,
      products: s.products,
      productionCapacity: s.production_capacity,
      annualSpend: s.annual_spend,
      certificates: s.certificates,
      riskLevel: s.risk_level as 'Low' | 'Medium' | 'High' | 'Critical',
      contactName: s.contact_name,
      contactEmail: s.contact_email,
      established: s.established,
      employees: s.employees,
      purchaseVolume: s.purchase_volume,
      radarActual: s.radar_actual,
      radarNorm: s.radar_norm,
      certCoverage: s.cert_coverage,
      kpiScores: s.kpi_scores,
      incidentHistory: s.incident_history,
      incidentCauses: s.incident_causes,
      factoryMatrix: s.factory_matrix,
      factories,
    };
  });
}
