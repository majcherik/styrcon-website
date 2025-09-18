import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download } from 'lucide-react';

interface Specification {
  parameter: string;
  value: string;
  unit: string;
  standard?: string;
}

const specifications: Specification[] = [
  {
    parameter: 'Tepelná vodivosť',
    value: 'λ = 0,041',
    unit: 'W/mK',
    standard: 'EN 12667'
  },
  {
    parameter: 'Objemová hmotnosť',
    value: '115-130',
    unit: 'kg/m³',
    standard: 'EN 1602'
  },
  {
    parameter: 'Paropriepustnosť',
    value: 'μ ≤ 3',
    unit: '-',
    standard: 'EN 12086'
  },
  {
    parameter: 'Reakcia na oheň',
    value: 'A1',
    unit: '-',
    standard: 'EN 13501-1'
  },
  {
    parameter: 'Pevnosť v tlaku pri 10% deformácii',
    value: '≥ 150',
    unit: 'kPa',
    standard: 'EN 826'
  },
  {
    parameter: 'Pevnosť v ťahu kolmo na povrch',
    value: '≥ 25',
    unit: 'kPa',
    standard: 'EN 1607'
  },
  {
    parameter: 'Krátkodobá nasákavosť vodou',
    value: '< 1',
    unit: 'kg/m²',
    standard: 'EN 1609'
  },
  {
    parameter: 'Rozmerová stabilita pri 70°C',
    value: '< 1',
    unit: '%',
    standard: 'EN 1604'
  }
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

        {/* Applications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Oblasti použitia
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                <span>Zateplenie fasád rodinných a bytových domov</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                <span>Sanačné zateplenie vlhkých murív</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                <span>Tepelná izolácia priemyselných budov</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                <span>Rekonštrukcia historických objektov</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                <span>Požiarne odolné konštrukcie</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Dostupné rozmery
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Dĺžka:</span>
                <span className="font-medium">1000 mm</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Šírka:</span>
                <span className="font-medium">600 mm</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Hrúbka:</span>
                <span className="font-medium">40-200 mm</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600">Balenie:</span>
                <span className="font-medium">Podľa hrúbky</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-primary/5 rounded-lg">
              <div className="text-sm font-medium text-primary mb-1">
                Individuálne rozmery na požiadanie
              </div>
              <div className="text-xs text-slate-600">
                Kontaktujte nás pre výrobu dosiek v nestandardných rozmeroch.
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg">
            <Download className="mr-2 h-4 w-4" />
            Stiahnuť technický list PDF
          </Button>
        </div>
      </div>
    </section>
  );
}