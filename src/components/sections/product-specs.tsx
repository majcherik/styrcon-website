import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download } from 'lucide-react';

interface Specification {
  parameter: string;
  value: string;
  unit: string;
  standard?: string;
}

interface PackagingData {
  thickness: number;
  weight: number;
  piecesPerPallet: number;
  m2PerPallet: number;
}

const specifications: Specification[] = [
  {
    parameter: 'Rozmery: dĺžka, šírka',
    value: '900 x 450',
    unit: 'mm',
    standard: 'EN822'
  },
  {
    parameter: 'Rozmery: hrúbka',
    value: '30 - 150',
    unit: 'mm',
    standard: 'EN823'
  },
  {
    parameter: 'Objemová hmotnosť',
    value: '200',
    unit: 'kg.m³',
    standard: 'EN1602+AC'
  },
  {
    parameter: 'Reakcia na oheň',
    value: 'A2-s1, d0',
    unit: '-',
    standard: 'EN13501-1'
  },
  {
    parameter: 'Faktor difúzneho odporu μ',
    value: '9',
    unit: '-',
    standard: 'EN12086'
  },
  {
    parameter: 'Súčiniteľ tepelnej vodivosti λ',
    value: '0,047',
    unit: 'W·K⁻¹·m⁻¹',
    standard: 'EN12667'
  },
  {
    parameter: 'Pevnosť v tlaku pri 10% stlačení',
    value: '180',
    unit: 'kPa',
    standard: 'EN826'
  },
  {
    parameter: 'Pevnosť v ťahu',
    value: '80',
    unit: 'kPa',
    standard: 'EN1607+AC'
  },
  {
    parameter: 'Pevnosť v ohybe',
    value: '170',
    unit: 'kPa',
    standard: 'EN12089'
  },
  {
    parameter: 'Rozmerová stabilita (70°C, 90% vlh)',
    value: '±0,5',
    unit: '%',
    standard: 'EN1604+AC'
  }
];

const packagingData: PackagingData[] = [
  { thickness: 30, weight: 3.4, piecesPerPallet: 150, m2PerPallet: 60.0 },
  { thickness: 40, weight: 3.6, piecesPerPallet: 129, m2PerPallet: 51.6 },
  { thickness: 50, weight: 4.0, piecesPerPallet: 108, m2PerPallet: 43.2 },
  { thickness: 60, weight: 4.9, piecesPerPallet: 90, m2PerPallet: 36.0 },
  { thickness: 70, weight: 5.6, piecesPerPallet: 78, m2PerPallet: 31.2 },
  { thickness: 80, weight: 6.5, piecesPerPallet: 69, m2PerPallet: 27.6 },
  { thickness: 90, weight: 7.2, piecesPerPallet: 63, m2PerPallet: 25.2 },
  { thickness: 100, weight: 8.0, piecesPerPallet: 57, m2PerPallet: 22.8 },
  { thickness: 120, weight: 9.6, piecesPerPallet: 48, m2PerPallet: 19.2 },
  { thickness: 140, weight: 10.8, piecesPerPallet: 42, m2PerPallet: 16.8 },
  { thickness: 150, weight: 12.3, piecesPerPallet: 39, m2PerPallet: 15.6 }
];


export function ProductSpecs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Technické parametre
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            STYRCON dosky spĺňajú najprísnejšie európske normy a štandardy 
            pre tepelnoizolačné materiály.
          </p>
        </div>

        <Card className="overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-4 font-semibold text-slate-900">Parameter</th>
                  <th className="text-left p-4 font-semibold text-slate-900">Hodnota</th>
                  <th className="text-left p-4 font-semibold text-slate-900">Jednotka</th>
                  <th className="text-left p-4 font-semibold text-slate-900">Norma</th>
                </tr>
              </thead>
              <tbody>
                {specifications.map((spec, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-slate-900">{spec.parameter}</td>
                    <td className="p-4 text-slate-700 font-medium">{spec.value}</td>
                    <td className="p-4 text-slate-600">{spec.unit}</td>
                    <td className="p-4 text-slate-600">{spec.standard || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Dimensions Card */}
        <div className="mb-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Dostupné rozmery
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Dĺžka:</span>
                <span className="font-medium">900 mm</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Šírka:</span>
                <span className="font-medium">450 mm</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600">Hrúbka:</span>
                <span className="font-medium">30 - 150 mm</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Packaging Table */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Styrcon dosky (1m² = 2,5ks)
          </h3>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left p-4 font-semibold">Hrúbka dosky (mm)</th>
                    <th className="text-left p-4 font-semibold">Hmotnosť dosky (kg)</th>
                    <th className="text-left p-4 font-semibold">Počet ks/paleta</th>
                    <th className="text-left p-4 font-semibold">m²/paleta</th>
                  </tr>
                </thead>
                <tbody>
                  {packagingData.map((item, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-slate-900">{item.thickness}</td>
                      <td className="p-4 text-slate-700">{item.weight.toFixed(1)}</td>
                      <td className="p-4 text-slate-700">{item.piecesPerPallet}</td>
                      <td className="p-4 text-slate-700">{item.m2PerPallet.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

       
      </div>
    </section>
  );
}