import type { Metadata } from 'next';
import Link from 'next/link';
import { Paperclip } from 'lucide-react';
import { DownloadLink } from '@/components/documents/download-link';

export const metadata: Metadata = {
  title: 'Dokumenty a technické listy | STYRCON - E-MA SK',
  description: 'Stiahnite si technické listy, certifikáty a dokumentáciu pre STYRCON produkty. Kompletné technické parametre a návody na použitie.',
  keywords: 'styrcon dokumenty, technické listy, certifikáty, návody, dokumentácia, stiahnutie pdf',
};

interface ProductDocument {
  name: string;
  fileName: string;
  fileSize: string;
  downloadUrl: string;
}

interface ProductDocumentsProps {
  productName: string;
  documents: ProductDocument[];
}

function ProductDocuments({ productName, documents }: ProductDocumentsProps) {
  return (
    <div className="bg-background rounded-lg shadow-sm border border-slate-200 p-6 h-full hover:shadow-md transition-shadow">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{productName}</h3>
        <p className="text-sm text-slate-600">Technické dokumenty a certifikáty</p>
      </div>
      
      <div className="border-t border-slate-100">
        <dl className="divide-y divide-slate-100">
          <div className="py-4">
            <dt className="text-sm font-medium text-slate-900 mb-3">Dokumenty na stiahnutie</dt>
            <dd className="text-sm text-slate-900">
              <ul role="list" className="divide-y divide-slate-100 rounded-md border border-slate-200">
                {documents.map((doc, index) => (
                  <li key={index} className="flex items-center justify-between py-4 pr-5 pl-4 text-sm">
                    <div className="flex w-0 flex-1 items-center">
                      <Paperclip aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-slate-400" />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium text-slate-900">{doc.fileName}</span>
                        <span className="flex-shrink-0 text-slate-400">{doc.fileSize}</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <DownloadLink fileName={doc.fileName} downloadUrl={doc.downloadUrl} />
                    </div>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  const styrconDocuments: ProductDocument[] = [
    {
      name: 'STYRCON 200® KBU',
      fileName: 'STYRCON_200_KBU.pdf',
      fileSize: '1.2MB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-092719-STYRCON_200_KBU.pdf'
    },
    {
      name: 'STYRCON klasifikácia - reakcia na oheň',
      fileName: 'STYRCON_klasifikacia-reakcia_na_ohen.pdf', 
      fileSize: '850KB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-092742-STYRCON_klasifikacia-reakcia_na_ohen.pdf'
    },
    {
      name: 'STYRCON protokol - reakcia na oheň',
      fileName: 'STYRCON_protokol-reakcia_na_ohen.pdf',
      fileSize: '1.5MB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-092819-STYRCON_protokol-reakcia_na_ohen.pdf'
    },
    {
      name: 'STYRCON technický list 2018',
      fileName: 'STYRCON_tech_list2018.pdf',
      fileSize: '2.1MB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-092840-STYRCON_tech_list2018.pdf'
    },
    {
      name: 'STYRCON vyhlásenie o parametroch 2018',
      fileName: 'STYRCON_VyhlPar2018r.pdf',
      fileSize: '975KB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-092931-STYRCON_VyhlPar2018r.pdf'
    }
  ];

  const penestyrDocuments: ProductDocument[] = [
    {
      name: 'Penestyr technický list',
      fileName: 'TechList_Penestyr.pdf',
      fileSize: '1.8MB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-093125-TechList_Penestyr.pdf'
    }
  ];

  const lepStyrDocuments: ProductDocument[] = [
    {
      name: 'LepStyr certifikát',
      fileName: 'LepStyr_certifikat.pdf',
      fileSize: '1.3MB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-093013-LepStyr_certifikat.pdf'
    },
    {
      name: 'LepStyr technický list',
      fileName: 'LepStyr_TechList.pdf',
      fileSize: '2.2MB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-093054-LepStyr_TechList.pdf'
    }
  ];

  const styrexonDocuments: ProductDocument[] = [
    {
      name: 'STYREXON kotvenie',
      fileName: 'STYREXON_kotvenie.pdf',
      fileSize: '1.6MB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-092142-STYREXON_kotvenie.pdf'
    },
    {
      name: 'STYREXON CE-Vyhlásenie o parametroch',
      fileName: 'STYREXON_CE-Vyhlasenie_o_partametroch.pdf',
      fileSize: '950KB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-092316-STYREXON_CE-Vyhlasenie_o_partametroch.pdf'
    },
    {
      name: 'STYREXON protokol - reakcia na oheň',
      fileName: 'STYREXON_protokol-reakcia_na_ohen.pdf',
      fileSize: '1.4MB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-092345-STYREXON_protokol-reakcia_na_ohen.pdf'
    },
    {
      name: 'STYREXON technický list',
      fileName: 'STYREXON_techlist.pdf',
      fileSize: '2.8MB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-092406-STYREXON_techlist.pdf'
    },
    {
      name: 'STYREXON technické detaily',
      fileName: 'STYREXON_technicke_detaily.pdf',
      fileSize: '3.2MB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-092521-STYREXON_technicke_detaily.pdf'
    },
    {
      name: 'STYREXON údržba',
      fileName: 'STYREXON_udrzba.pdf',
      fileSize: '1.1MB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-092543-STYREXON_udrzba.pdf'
    },
    {
      name: 'STYREXON-B certifikát',
      fileName: 'STYREXON-B_Certifikat.pdf',
      fileSize: '1.7MB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-092602-STYREXON-B_Certifikat.pdf'
    }
  ];

  const lepidlaDocuments: ProductDocument[] = [
    {
      name: 'KLEBER-STYR technický list',
      fileName: 'KLEBER-STYR_TechList.pdf',
      fileSize: '2.4MB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-093219-KLEBER-STYR_TechList.pdf'
    },
    {
      name: 'KLEBER-STYR vyhlásenie o parametroch',
      fileName: 'KLEBER-STYR_Vyhlpar.pdf',
      fileSize: '1.1MB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-093244-KLEBER-STYR_Vyhlpar.pdf'
    },
    {
      name: 'Min-styr technický list',
      fileName: 'Min-styr_TechList.pdf',
      fileSize: '1.8MB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-093322-Min-styr_TechList.pdf'
    },
    {
      name: 'FlexKLEBER-STYR technický list',
      fileName: 'FlexKLEBER-STYR_TechList.pdf',
      fileSize: '2.0MB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-11-21-204623-FlexKLEBER-STYR_TechList.pdf'
    }
  ];

  const vertexR117Documents: ProductDocument[] = [
    {
      name: 'Vertex R117 technický list',
      fileName: 'Vertex_R117_TechList2.pdf',
      fileSize: '2.3MB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-094510-Vertex_R117_TechList2.pdf'
    },
    {
      name: 'Vertex R117 vyhlásenie o parametroch',
      fileName: 'Vertex_R117_VyhlPar.pdf',
      fileSize: '950KB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-094553-Vertex_R117_VyhlPar.pdf'
    }
  ];

  const jansaPTPDocuments: ProductDocument[] = [
    {
      name: 'Jansa PTP vyhlásenie kotvy',
      fileName: 'VyhlPr_kotvy-JANSA.pdf',
      fileSize: '1.4MB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-094642-VyhlPr_kotvy-JANSA.pdf'
    }
  ];

  const styrcomixDocuments: ProductDocument[] = [
    {
      name: 'Styrcomix technický list',
      fileName: 'Techlist_STYRCOMIX.pdf',
      fileSize: '1.9MB',
      downloadUrl: 'https://www.e-ma.sk/files/2021-08-30-094730-Techlist_STYRCOMIX.pdf'
    }
  ];

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
            <span className="text-slate-900 font-medium">Dokumenty</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Dokumenty a technické listy
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Stiahnite si kompletné technické dokumenty, certifikáty a návody 
              pre všetky STYRCON produkty.
            </p>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid layout with alternating left-right pattern */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ProductDocuments
              productName="STYRCON - Paropriepustné tepelnoizolačné dosky"
              documents={styrconDocuments}
            />

            <ProductDocuments
              productName="Penestyr - Tepelnoizolačné dosky z expandovaného polystyrénu"
              documents={penestyrDocuments}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ProductDocuments
              productName="LepStyr - Lepidlo na polystyrénové dosky"
              documents={lepStyrDocuments}
            />

            <ProductDocuments
              productName="STYREXON - Zatepľovací systém"
              documents={styrexonDocuments}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ProductDocuments
              productName="Lepidlá - Lepiacie materiály"
              documents={lepidlaDocuments}
            />

            <ProductDocuments
              productName="Vertex R117 - Silikónová omietka"
              documents={vertexR117Documents}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ProductDocuments
              productName="Jansa PTP - Kotvy a upevňovacie prvky"
              documents={jansaPTPDocuments}
            />

            <ProductDocuments
              productName="Styrcomix - Stavebná zmes"
              documents={styrcomixDocuments}
            />
          </div>

          {/* Placeholder for future products */}
          <div className="text-center py-8 text-slate-500">
            <p>Ďalšie produktové dokumenty budú dostupné čoskoro...</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Potrebujete ďalšie informácie?
          </h2>
          <p className="text-slate-600 mb-6">
            Ak nenájdete potrebný dokument alebo máte otázky, neváhajte nás kontaktovať.
          </p>
          <Link 
            href="/kontakt"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Kontaktovať nás
          </Link>
        </div>
      </section>
    </div>
  );
}