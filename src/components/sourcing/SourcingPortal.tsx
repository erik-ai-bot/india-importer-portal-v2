'use client';

import { useState } from 'react';
import { useTheme } from '@/components/ui/ThemeContext';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ReferenceLine, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import {
  sourcingKPIs, otdTrend, regionalHeatmap, vendors, marketNorm,
  alternativeSuppliers, leadTimes, valueDistribution, processMaps,
  poWip, macroAlerts,
} from '@/data/mockSourcing';
import type { POWip } from '@/types/sourcing';

type SourcingSection = 'overview' | 'matrix' | 'resilience' | 'dna' | 'pipeline';

const SOURCING_NAV = [
  { id: 'overview', label: 'Global Overview', icon: '📊' },
  { id: 'matrix', label: 'Supplier Matrix', icon: '🔶' },
  { id: 'resilience', label: 'Resilience Engine', icon: '🛡️' },
  { id: 'dna', label: 'Product DNA', icon: '🔬' },
  { id: 'pipeline', label: 'Pipeline Health', icon: '📦' },
] as const;

const CHART_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

const kpiStatusColor = (current: number, target: number, lowerIsBetter = false) => {
  const good = lowerIsBetter ? current <= target : current >= target;
  const warn = lowerIsBetter ? current <= target * 1.2 : current >= target * 0.95;
  if (good) return 'text-emerald-400';
  if (warn) return 'text-yellow-400';
  return 'text-red-400';
};

// ── Overview Section ─────────────────────────────────────────────────────────
function OverviewSection() {
  const [benchmark, setBenchmark] = useState(95);

  return (
    <>
      {/* Insight Banner */}
      <div className="mb-5 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg border-l-4 border-l-yellow-500">
        <span className="text-yellow-400 text-xs font-semibold">⚠ STRATEGIC INSIGHT — </span>
        <span className="text-yellow-300 text-xs">Global OTD has drifted 3% below the 95% Benchmark. Regional analysis identifies the Vietnam hub as the primary driver due to recent port congestion.</span>
      </div>

      {/* KPI Cards — 2 cols on mobile, 6 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
        {sourcingKPIs.map(kpi => (
          <div key={kpi.label} className="bg-[#1e2535] border border-slate-700 rounded-lg p-3">
            <p className="text-[10px] text-slate-400 mb-1 leading-tight">{kpi.label}</p>
            <p className={`text-xl font-bold ${kpiStatusColor(kpi.current, kpi.target, kpi.lowerIsBetter)}`}>
              {kpi.current}{kpi.unit}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">Target: {kpi.target}{kpi.unit}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* OTD Trend */}
        <Card title="OTD % — 12-Month Trend" dot="yellow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] text-slate-400">Benchmark: <span className="text-blue-400 font-bold">{benchmark}%</span></span>
            <input
              type="range" min={80} max={100} value={benchmark}
              onChange={e => setBenchmark(Number(e.target.value))}
              className="w-28 accent-blue-500"
            />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={otdTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} />
              <YAxis domain={[80, 100]} tick={{ fill: '#64748b', fontSize: 10 }} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ background: '#1e2535', border: '1px solid #2d3748', borderRadius: 6 }} />
              <ReferenceLine y={benchmark} stroke="#ef4444" strokeDasharray="5 3" label={{ value: `${benchmark}%`, fill: '#ef4444', fontSize: 10 }} />
              <Line dataKey="otd" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="OTD %" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Regional Heatmap */}
        <Card title="Regional Performance Heatmap" dot="red">
          <div className="overflow-x-auto">
            <table className="w-full text-xs mt-1 min-w-[360px]">
              <thead>
                <tr className="border-b border-slate-700">
                  {['Region', 'Hub', 'OTD %', 'Quality', 'Lead Time', 'Spend %'].map(h => (
                    <th key={h} className="text-left py-1.5 px-1.5 text-[10px] text-slate-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {regionalHeatmap.map(row => (
                  <tr key={row.region} className="border-b border-slate-700/50">
                    <td className="py-2 px-1.5 font-medium">{row.region}</td>
                    <td className="py-2 px-1.5 text-slate-400 text-[10px]">{row.hub}</td>
                    <td className="py-2 px-1.5">
                      <Pill variant={row.otd >= 93 ? 'green' : row.otd >= 88 ? 'yellow' : 'red'}>{row.otd}%</Pill>
                    </td>
                    <td className="py-2 px-1.5 text-slate-300">{row.quality}</td>
                    <td className="py-2 px-1.5 text-slate-300">{row.leadTime}d</td>
                    <td className="py-2 px-1.5 text-slate-300">{row.spendPct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}

// ── Supplier Matrix Section ───────────────────────────────────────────────────
const RADAR_DIMS = [
  { key: 'quality', label: 'Quality' },
  { key: 'leadTime', label: 'Lead Time' },
  { key: 'otd', label: 'OTD %' },
  { key: 'taScore', label: 'TA Score' },
  { key: 'lfScore', label: 'LF Score' },
  { key: 'complianceRating', label: 'Compliance' },
  { key: 'claimRatio', label: 'Claim Ratio' },
];

function SupplierMatrixSection() {
  const [selectedId, setSelectedId] = useState('SUP-001');
  const selected = vendors.find(v => v.id === selectedId) || vendors[0];

  const radarData = RADAR_DIMS.map(d => ({
    dimension: d.label,
    [selected.name]: selected.radar[d.key as keyof typeof selected.radar],
    'Market Norm': marketNorm[d.key],
  }));

  const totalVolume = vendors.reduce((s, v) => s + v.annualVolumeEur, 0);

  return (
    <>
      <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 border-l-4 border-l-amber-500 rounded-lg">
        <span className="text-amber-400 text-xs font-semibold">⚠ STRATEGIC INSIGHT — </span>
        <span className="text-amber-300 text-xs">Zhejiang cluster's OTD is 5% below Market Norm despite high Quality scores. Corrective action required to prevent Q4 shipment delays.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Radar Chart */}
        <Card title="7-Dimension Performance Radar" dot="blue">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] text-slate-400">Vendor:</span>
            <select
              value={selectedId}
              onChange={e => setSelectedId(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
            >
              {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#2d3748" />
              <PolarAngleAxis dataKey="dimension" tick={{ fill: '#64748b', fontSize: 10 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#475569', fontSize: 9 }} />
              <Radar name={selected.name} dataKey={selected.name} stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="Market Norm" dataKey="Market Norm" stroke="#64748b" fill="#64748b" fillOpacity={0.08} strokeWidth={1.5} strokeDasharray="4 3" />
              <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
              <Tooltip contentStyle={{ background: '#1e2535', border: '1px solid #2d3748', borderRadius: 6 }} />
            </RadarChart>
          </ResponsiveContainer>
          {/* Score diff rows */}
          <div className="mt-3 space-y-1.5">
            {RADAR_DIMS.map(d => {
              const val = selected.radar[d.key as keyof typeof selected.radar];
              const norm = marketNorm[d.key];
              const diff = val - norm;
              return (
                <div key={d.key} className="flex items-center gap-2 text-xs">
                  <span className="w-24 text-slate-400 text-[10px]">{d.label}</span>
                  <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${val}%` }} />
                  </div>
                  <span className="w-6 text-right text-slate-300">{val}</span>
                  <span className={`w-8 text-right text-[10px] font-semibold ${diff >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {diff >= 0 ? '+' : ''}{diff}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Geographic Distribution */}
        <Card title="Geographic Distribution & Order Exposure" dot="yellow">
          <div className="overflow-x-auto">
            <table className="w-full text-xs min-w-[360px]">
              <thead>
                <tr className="border-b border-slate-700">
                  {['Vendor', 'Location', 'Annual €', 'Spend %', 'Categories'].map(h => (
                    <th key={h} className="text-left py-1.5 px-1.5 text-[10px] text-slate-400 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vendors.map(v => (
                  <tr
                    key={v.id}
                    onClick={() => setSelectedId(v.id)}
                    className={`border-b border-slate-700/50 cursor-pointer transition-colors ${
                      selectedId === v.id ? 'bg-blue-500/10' : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <td className="py-2 px-1.5 font-medium">{v.name}</td>
                    <td className="py-2 px-1.5 text-slate-400">{v.city}</td>
                    <td className="py-2 px-1.5 text-slate-300">€{(v.annualVolumeEur/1000000).toFixed(1)}M</td>
                    <td className="py-2 px-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(v.annualVolumeEur/totalVolume)*100}%` }} />
                        </div>
                        <span className="text-slate-400 text-[10px]">{v.spendPct}%</span>
                      </div>
                    </td>
                    <td className="py-2 px-1.5">
                      <div className="flex flex-wrap gap-0.5">
                        {v.categories.map(c => (
                          <span key={c} className="bg-slate-700 text-slate-300 px-1 py-0.5 rounded text-[9px]">{c}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 p-2 bg-slate-700/50 rounded text-xs text-slate-400">
            Total Supply Base: <span className="text-white font-semibold">€{(totalVolume/1000000).toFixed(1)}M</span> across {vendors.length} strategic vendors
          </div>
        </Card>
      </div>
    </>
  );
}

// ── Resilience Engine Section ─────────────────────────────────────────────────
const PRODUCT_CATEGORIES = ['All', 'Linen', 'Cotton', 'Polyester', 'Home Textile', 'Apparel'];

function ResilienceSection() {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [minScore, setMinScore] = useState(70);
  const [chinaDisruption, setChinaDisruption] = useState(false);

  const filtered = alternativeSuppliers
    .filter(s => categoryFilter === 'All' || s.productDNA.includes(categoryFilter))
    .filter(s => s.matchScore >= minScore)
    .filter(s => !chinaDisruption || s.country !== 'China')
    .sort((a, b) => b.matchScore - a.matchScore);

  return (
    <>
      <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 border-l-4 border-l-emerald-500 rounded-lg">
        <span className="text-emerald-400 text-xs font-semibold">🛡️ RESILIENCE INSIGHT — </span>
        <span className="text-emerald-300 text-xs">In a China disruption scenario, Hanoi Garment Hub is identified as the #1 alternative with a 94% match score and 50,000 units/month spare capacity.</span>
      </div>

      {/* Filters */}
      <Card title="Alternative Sourcing Filter Engine">
        <div className="flex flex-wrap items-end gap-3 mb-4">
          <div>
            <label className="text-[10px] text-slate-400 uppercase block mb-1">Product DNA</label>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
            >
              {PRODUCT_CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 uppercase block mb-1">
              Min Match Score: <span className="text-blue-400 font-bold">{minScore}%</span>
            </label>
            <input type="range" min={60} max={99} value={minScore}
              onChange={e => setMinScore(Number(e.target.value))}
              className="w-32 accent-blue-500" />
          </div>
          <button
            onClick={() => setChinaDisruption(!chinaDisruption)}
            className={`px-3 py-2 rounded text-xs font-semibold border transition-colors ${
              chinaDisruption
                ? 'bg-red-500 text-white border-red-500'
                : 'bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20'
            }`}
          >
            {chinaDisruption ? '🚨 Disruption Mode ON' : '🔴 Simulate China Disruption'}
          </button>
        </div>

        {chinaDisruption && (
          <div className="mb-4 p-2 bg-red-500/10 border border-red-500/30 rounded text-xs text-red-300">
            Disruption simulation active — showing only non-China alternatives. {filtered.length} viable suppliers identified.
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[560px]">
            <thead>
              <tr className="border-b border-slate-700">
                {['#', 'Supplier', 'Location', 'Match Score', 'Spare Cap', 'OTD %', 'Quality', 'Product DNA', 'Status'].map(h => (
                  <th key={h} className="text-left py-1.5 px-1.5 text-[10px] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, idx) => (
                <tr key={s.id} className="border-b border-slate-700/50 hover:bg-white/[0.02]">
                  <td className="py-2 px-1.5 text-slate-500">{idx + 1}</td>
                  <td className="py-2 px-1.5 font-medium">
                    {idx === 0 && chinaDisruption && <span className="mr-1 bg-blue-500 text-white text-[9px] px-1 rounded">#1</span>}
                    {s.name}
                  </td>
                  <td className="py-2 px-1.5 text-slate-400">{s.city}, {s.country}</td>
                  <td className="py-2 px-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 h-1.5 bg-slate-700 rounded-full">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${s.matchScore}%` }} />
                      </div>
                      <span className={`font-bold text-[11px] ${s.matchScore >= 90 ? 'text-emerald-400' : s.matchScore >= 80 ? 'text-blue-400' : 'text-slate-300'}`}>{s.matchScore}%</span>
                    </div>
                  </td>
                  <td className="py-2 px-1.5 text-slate-300">{s.spareCap.toLocaleString()}/mo</td>
                  <td className="py-2 px-1.5 text-slate-300">{s.otd}%</td>
                  <td className="py-2 px-1.5 text-slate-300">{s.qualityScore}</td>
                  <td className="py-2 px-1.5">
                    <div className="flex flex-wrap gap-0.5">
                      {s.productDNA.map(p => <span key={p} className="bg-slate-700 text-slate-300 px-1 py-0.5 rounded text-[9px]">{p}</span>)}
                    </div>
                  </td>
                  <td className="py-2 px-1.5">
                    <Pill variant={s.status === 'Shortlisted' ? 'blue' : s.status === 'Available' ? 'green' : 'yellow'}>{s.status}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

// ── Product DNA Section ───────────────────────────────────────────────────────
function ProductDNASection() {
  return (
    <>
      <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 border-l-4 border-l-blue-500 rounded-lg">
        <span className="text-blue-400 text-xs font-semibold">🔬 STRATEGIC INSIGHT — </span>
        <span className="text-blue-300 text-xs">Home Textile lead times have drifted to 65 days. Bottleneck identified in raw material spinning. Recommend buffer stock for core Linen SKUs.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Lead Time Chart */}
        <Card title="Lead Time Variance by Category" dot="yellow">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={leadTimes} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" horizontal={false} />
              <XAxis type="number" domain={[0, 80]} tick={{ fill: '#64748b', fontSize: 10 }} tickFormatter={v => `${v}d`} />
              <YAxis type="category" dataKey="category" tick={{ fill: '#64748b', fontSize: 10 }} width={80} />
              <Tooltip contentStyle={{ background: '#1e2535', border: '1px solid #2d3748', borderRadius: 6 }} formatter={(v) => [`${v} days`]} />
              <ReferenceLine x={50} stroke="#f59e0b" strokeDasharray="5 3" label={{ value: 'Target 50d', fill: '#f59e0b', fontSize: 10 }} />
              <Bar dataKey="days" radius={[0, 4, 4, 0]}>
                {leadTimes.map((entry, i) => (
                  <Cell key={i} fill={entry.days > entry.target ? '#ef4444' : '#3b82f6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Value Distribution */}
        <Card title="Value Distribution by Product Family" dot="blue">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={valueDistribution} dataKey="valueEur" nameKey="category"
                cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {valueDistribution.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 10, color: '#94a3b8' }} />
              <Tooltip contentStyle={{ background: '#1e2535', border: '1px solid #2d3748', borderRadius: 6 }}
                formatter={(v) => [`€${(Number(v)/1000000).toFixed(1)}M`]} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Process Maps */}
      <Card title="Process Mapping — Bottleneck Analysis">
        <div className="space-y-5 mt-1">
          {processMaps.map(pm => (
            <div key={pm.category}>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="font-medium text-sm">{pm.category}</span>
                {pm.bottleneck && (
                  <span className="text-[10px] bg-red-500/15 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full">
                    Bottleneck: {pm.bottleneck}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-0">
                {pm.steps.map((step, i) => (
                  <div key={step} className="flex items-center">
                    <div className={`px-2.5 py-1 rounded text-[10px] font-medium border ${
                      step === pm.bottleneck
                        ? 'bg-red-500/15 border-red-500/50 text-red-400 ring-1 ring-red-500/40'
                        : 'bg-slate-700/50 border-slate-600 text-slate-300'
                    }`}>
                      {step === pm.bottleneck && '⚠ '}{step}
                    </div>
                    {i < pm.steps.length - 1 && (
                      <div className="w-4 h-px bg-slate-600 mx-0.5" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-500 mt-5">⚠ Red steps indicate identified production bottlenecks requiring attention.</p>
      </Card>
    </>
  );
}

// ── Pipeline Health Section ───────────────────────────────────────────────────
const poRowBg = (status: POWip['status']) => {
  if (status === 'Overdue') return 'bg-red-500/5 border-l-2 border-l-red-500';
  if (status === 'At Risk') return 'bg-yellow-500/5 border-l-2 border-l-yellow-500';
  return 'border-l-2 border-l-emerald-500';
};

function PipelineSection() {
  const overdue = poWip.filter(p => p.status === 'Overdue');
  const atRisk = poWip.filter(p => p.status === 'At Risk');
  const overdueValue = overdue.reduce((s, p) => s + p.valueEur, 0);

  return (
    <>
      {/* Summary KPIs — 2 cols mobile, 4 desktop */}
      <div className="mb-5 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Overdue POs', value: overdue.length.toString(), sub: `€${(overdueValue/1000).toFixed(0)}k at risk`, variant: 'alert' as const },
          { label: 'At Risk POs', value: atRisk.length.toString(), sub: 'Require monitoring', variant: 'warning' as const },
          { label: 'On Track', value: (poWip.length - overdue.length - atRisk.length).toString(), sub: 'POs on schedule', variant: 'good' as const },
          { label: 'Projected Delay', value: '+12 days', sub: 'Combined disruption impact', variant: 'default' as const },
        ].map(k => (
          <div key={k.label} className={`bg-[#1e2535] border rounded-lg p-3 border-l-4 ${
            k.variant === 'alert' ? 'border-l-red-500 border-slate-700' : k.variant === 'warning' ? 'border-l-yellow-500 border-slate-700' : k.variant === 'good' ? 'border-l-emerald-500 border-slate-700' : 'border-l-slate-600 border-slate-700'
          }`}>
            <p className="text-[10px] text-slate-400 mb-0.5">{k.label}</p>
            <p className={`text-xl font-bold ${k.variant === 'alert' ? 'text-red-400' : k.variant === 'warning' ? 'text-yellow-400' : k.variant === 'good' ? 'text-emerald-400' : 'text-slate-200'}`}>{k.value}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* PO WIP Table */}
      <Card title="PO WIP Risk Center" dot="red">
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[560px]">
            <thead>
              <tr className="border-b border-slate-700">
                {['PO ID', 'Supplier', 'Product', 'Value', 'Due Date', 'Status', 'Action'].map(h => (
                  <th key={h} className="text-left py-1.5 px-2 text-[10px] text-slate-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {poWip.map(po => (
                <tr key={po.id} className={`border-b border-slate-700/50 ${poRowBg(po.status)}`}>
                  <td className="py-2 px-2 font-mono text-[10px] text-slate-400">{po.id}</td>
                  <td className="py-2 px-2 font-medium">{po.supplier}</td>
                  <td className="py-2 px-2 text-slate-400">{po.product}</td>
                  <td className="py-2 px-2 font-medium">€{(po.valueEur/1000).toFixed(0)}k</td>
                  <td className="py-2 px-2 text-slate-400">{po.dueDate}</td>
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-1.5">
                      <Pill variant={po.status === 'Overdue' ? 'red' : po.status === 'At Risk' ? 'yellow' : 'green'}>{po.status}</Pill>
                      {po.daysOverdue > 0 && <span className="text-red-400 text-[10px]">{po.daysOverdue}d late</span>}
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <button className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      po.status === 'Overdue' ? 'bg-red-500/15 text-red-400 border border-red-500/30' :
                      po.status === 'At Risk' ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30' :
                      'bg-slate-700 text-slate-300 border border-slate-600'
                    }`}>
                      {po.status === 'Overdue' ? '→ Escalate' : po.status === 'At Risk' ? '→ Review' : '→ View'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Logistics Monitor */}
        <Card title="Landed Cost Logistics Monitor" dot="yellow">
          <div className="space-y-3 mt-1">
            {[
              { mode: '🚢 Sea', cost: 850, days: 28, impact: '+8d Red Sea', disrupted: true },
              { mode: '🚂 Rail', cost: 1200, days: 18, impact: 'None', disrupted: false },
              { mode: '✈️ Air', cost: 4800, days: 3, impact: 'None', disrupted: false },
            ].map(l => (
              <div key={l.mode} className={`p-3 rounded-lg border ${l.disrupted ? 'bg-red-500/8 border-red-500/30' : 'bg-slate-700/30 border-slate-700'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{l.mode}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${l.disrupted ? 'bg-red-500/15 text-red-400' : 'bg-emerald-500/15 text-emerald-400'}`}>
                    {l.disrupted ? 'Disrupted' : 'Normal'}
                  </span>
                </div>
                <p className="text-lg font-bold text-slate-200">€{l.cost.toLocaleString()}<span className="text-xs font-normal text-slate-400">/TEU</span></p>
                <p className="text-xs text-slate-400 mt-0.5">{l.days} days transit</p>
                {l.disrupted && <p className="text-xs text-red-400 mt-0.5 font-medium">{l.impact}</p>}
              </div>
            ))}
          </div>
        </Card>

        {/* Macro Alerts */}
        <Card title="Regional Macro-Alerts" dot="red">
          <div className="space-y-2.5 mt-1">
            {macroAlerts.map(alert => (
              <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                alert.severity === 'high' ? 'bg-red-500/8 border-l-red-500' :
                alert.severity === 'medium' ? 'bg-yellow-500/8 border-l-yellow-500' :
                'bg-blue-500/8 border-l-blue-500'
              }`}>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span>{alert.severity === 'high' ? '🔴' : alert.severity === 'medium' ? '🟡' : '🔵'}</span>
                  <span className="font-semibold text-xs">{alert.title}</span>
                  <Pill variant={alert.severity === 'high' ? 'red' : alert.severity === 'medium' ? 'yellow' : 'blue'}>{alert.type}</Pill>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">{alert.description}</p>
                <p className="text-[10px] text-slate-500 mt-1"><strong>Action:</strong> {alert.action}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

// ── Theme Toggle Button ───────────────────────────────────────────────────────
function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="px-2 md:px-3 py-1 rounded-lg text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600 transition-colors"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

// ── Main SourcingPortal Component ─────────────────────────────────────────────
export function SourcingPortal({ onSwitchPersona }: { onSwitchPersona?: () => void }) {
  const [active, setActive] = useState<SourcingSection>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sectionTitles: Record<SourcingSection, string> = {
    overview: 'Global Command — Performance Overview',
    matrix: 'Supplier & Factory Performance Matrix',
    resilience: 'Alternative Sourcing & Resilience Engine',
    dna: 'Product DNA & Process Intelligence',
    pipeline: 'Pipeline Health & Macro Intelligence',
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — hidden on mobile, slide-in when open */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-52 bg-[#161b27] border-r border-slate-700 flex flex-col flex-shrink-0
        transform transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:z-auto
      `}>
        <div className="px-4 py-5 border-b border-slate-700 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Sourcing Head</h2>
            <p className="text-xs text-slate-500 mt-0.5">Supply Chain Intelligence</p>
          </div>
          <button
            className="md:hidden text-slate-400 hover:text-slate-200 p-1"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          <p className="px-4 pt-2 pb-1 text-[10px] text-slate-500 uppercase tracking-widest">Modules</p>
          {SOURCING_NAV.map(item => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id as SourcingSection); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-all border-l-[3px] ${
                active === item.id
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500'
                  : 'text-slate-400 border-transparent hover:bg-emerald-500/5 hover:text-slate-200'
              }`}
            >
              <span className="text-base w-4 text-center">{item.icon}</span>
              <span className="flex-1 text-left">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="px-4 py-3 border-t border-slate-700 text-[10px] text-slate-500">
          Last sync: 2 min ago · OTD 91.2%
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar */}
        <header className="bg-[#161b27] border-b border-slate-700 px-4 md:px-6 py-3 flex items-center justify-between flex-shrink-0 gap-2">
          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger — mobile only */}
            <button
              className="md:hidden text-slate-400 hover:text-slate-200 flex-shrink-0"
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="min-w-0">
              <h1 className="text-sm md:text-base font-semibold truncate">{sectionTitles[active]}</h1>
              <p className="text-xs text-slate-400 hidden sm:block">As of March 20, 2026 · Fiscal Q1 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <ThemeToggleButton />
            <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={onSwitchPersona}
                className="px-2 md:px-3 py-1 rounded text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                💼 <span className="hidden sm:inline">CFO</span>
              </button>
              <button
                className="px-2 md:px-3 py-1 rounded text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
              >
                🤵 <span className="hidden sm:inline">Sourcing Head</span>
              </button>
            </div>
            <span className="hidden sm:inline px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/15 text-red-400">🔴 3 POs Overdue</span>
            <span className="hidden sm:inline px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500/15 text-yellow-400">⚠ 2 At Risk</span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400">● Live</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-3 md:p-5">
          {active === 'overview' && <OverviewSection />}
          {active === 'matrix' && <SupplierMatrixSection />}
          {active === 'resilience' && <ResilienceSection />}
          {active === 'dna' && <ProductDNASection />}
          {active === 'pipeline' && <PipelineSection />}
        </main>
      </div>
    </div>
  );
}
