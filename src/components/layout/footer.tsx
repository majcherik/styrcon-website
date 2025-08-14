import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  ico: string;
  dic: string;
  icDph: string;
}

const companyInfo: CompanyInfo = {
  name: 'E-MA SK s.r.o.',
  address: 'Adresa bude doplnená',
  phone: '+421 XXX XXX XXX',
  email: 'info@e-ma-sk.com',
  ico: 'XXXXXXXX',
  dic: 'XXXXXXXXXX',
  icDph: 'SKXXXXXXXXXX'
};

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="text-xl font-bold text-white mb-4">
              STYRCON
            </div>
            <div className="text-sm text-slate-400 mb-2">
              E-MA SK s.r.o.
            </div>
            
            <p className="text-sm mb-4">
              E-MA SK s.r.o. - komerčný a exportný partner pre STYRCON tepelnoizolačné dosky. 
              Výrobca: Styrcon s.r.o.
            </p>
            
            <div className="space-y-2 text-sm">
              <p>{companyInfo.address}</p>
              <p>
                <Link href={`tel:${companyInfo.phone}`} className="hover:text-white transition-colors">
                  {companyInfo.phone}
                </Link>
              </p>
              <p>
                <Link href={`mailto:${companyInfo.email}`} className="hover:text-white transition-colors">
                  {companyInfo.email}
                </Link>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Rýchle odkazy</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/styrcon-produkt" className="hover:text-white transition-colors">
                  STYRCON Produkt
                </Link>
              </li>
              <li>
                <Link href="/projekty" className="hover:text-white transition-colors">
                  Projekty
                </Link>
              </li>
              <li>
                <Link href="/na-stiahnutie" className="hover:text-white transition-colors">
                  Na stiahnutie
                </Link>
              </li>
              <li>
                <Link href="/aktuality" className="hover:text-white transition-colors">
                  Aktuality
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Právne informácie</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ochrana-osobnych-udajov" className="hover:text-white transition-colors">
                  Ochrana osobných údajov
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/obchodne-podmienky" className="hover:text-white transition-colors">
                  Obchodné podmienky
                </Link>
              </li>
            </ul>
            
            <div className="mt-4 text-xs space-y-1">
              <p>IČO: {companyInfo.ico}</p>
              <p>DIČ: {companyInfo.dic}</p>
              <p>IČ DPH: {companyInfo.icDph}</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} E-MA SK s.r.o. Všetky práva vyhradené.
          </p>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0 text-xs text-slate-400">
            <span>Výrobca: Styrcon s.r.o.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}