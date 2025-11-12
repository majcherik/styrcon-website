import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroVideoDialog } from '@/components/magicui/hero-video-dialog';
import { Card } from '@/components/ui/card';
import { Play, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'POLYTEX Video Galéria - Ukážky aplikácie hygienických farieb | E-MA SK',
  description: 'Pozrite si video ukážky aplikácie POLYTEX hygienických farieb. Návody na použitie, techniky aplikácie a výsledky v praxi.',
  keywords: 'polytex video, hygienické farby aplikácia, návod malování, polytex ukážky, video tutoriály farby',
};

const videos = [
  {
    id: 1,
    title: 'Ako odstrániť plesne a riasy z fasády - profesionálna renovácia fasád v 3 jednoduchých krokoch',
    youtubeUrl: 'https://youtu.be/Va6HR6jPcrE?si=bzfiKG3MnMYHVAeR',
    category: 'Úvod'
  },
  {
    id: 2,
    title: 'POLYTEX Impregnacia fasad - extra voduodpudivá ochrana na omietky, kameň, betón, priznané tehly...',
    youtubeUrl: 'https://youtu.be/6nDRn7b7P8s?si=4x2NhhM2QSVB48Bi',
    category: 'Príprava'
  },
  {
    id: 3,
    title: 'Ako sa zbaviť plesne na stenách v interiéri - jednoduchý návod ako odstrániť plesne v byte či dome',
    youtubeUrl: 'https://youtu.be/sF4YYNU19UI?si=RSlils6ipy7tsqnK',
    category: 'Aplikácia'
  },
  {
    id: 4,
    title: 'Ako sa robí fasádna omietka - postup natiahnutia pastovitej omietky',
    youtubeUrl: 'https://youtu.be/H52nUVwTx8Q?si=Osrlbyt5EX6vMa1b',
    category: 'Aplikácia'
  },
  {
    id: 5,
    title: 'POLYTEX Nano-silikónova fasádna omietka - high-tech omietka pre exkluzívne fasády bez plesní a rias',
    youtubeUrl: 'https://youtu.be/hRhxDunJuuY?si=Xvg2W8V431wTEIfb',
    category: 'Použitie'
  },
  {
    id: 6,
    title: 'POLYTEX Keramický lak - najumývateľnejší náter pre kuchyne, kúpeľne, steny pri vaniach a výlevkách',
    youtubeUrl: 'https://youtu.be/oO0fcjxU7Jc?si=Bt7JC0a1keocfVqi',
    category: 'Údržba'
  },
  {
    id: 7,
    title: 'POLYTEX - vyrábame omietky, farby a laky pre vnútorné steny a fasády',
    youtubeUrl: 'https://youtu.be/K3kGxtd_7lA?si=ARAi90qy0l-KIklf',
    category: 'Použitie'
  }
];


export default function PolytexGalleryPage() {
  return (
    <div className="pt-16">
      {/* Breadcrumb */}
      <div className="bg-slate-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-600 hover:text-primary">
              Domov
            </Link>
            <span className="text-slate-400">/</span>
            <Link href="/polytex-produkt" className="text-slate-600 hover:text-primary">
              POLYTEX
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">Video Galéria</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6">
              <Button asChild variant="outline" size="sm">
                <Link href="/polytex-produkt" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Späť na POLYTEX produkty
                </Link>
              </Button>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              POLYTEX Video Galéria
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-4xl mx-auto">
              Pozrite si praktické ukážky aplikácie POLYTEX hygienických farieb. 
              Návody, techniky a tipy pre dokonalé výsledky v každom projekte.
            </p>
          </div>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* All Videos Grid */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                POLYTEX videá
              </h2>
              <p className="text-lg text-slate-600">
                Kolekcia návodov a ukážok pre POLYTEX produkty
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <Card key={video.id} className="p-6 bg-background hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                  <div className="mb-4">
                    <HeroVideoDialog
                      videoSrc={video.youtubeUrl}
                      title={video.title}
                      size="md"
                      className="w-full h-40"
                    />
                  </div>
                  
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-3">
                    {video.category}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}