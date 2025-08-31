import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  publishedAt: string;
  tags: string[];
}

const blogPosts: Record<string, BlogPost> = {
  'ako-sa-da-zateplit-vlhka-stavba': {
    id: 'ako-sa-da-zateplit-vlhka-stavba',
    title: 'Ako sa dá zatepliť vlhká stavba?',
    excerpt: 'Praktický návod na zatepľovanie vlhkých budov s STYRCON riešeniami. Význam paropriepustnosti a správnych postupov.',
    category: 'technicke',
    image: 'https://www.e-ma.sk/imgcache/e-img-449.jpg?v=1632883952',
    author: 'RNDr. Vladimír Libant',
    publishedAt: '2024-03-15',
    tags: ['zatepľovanie', 'vlhkosť', 'paropriepustnosť', 'sanácia'],
    content: `Vlhkosť v stavbách je jedným z najčastejších problémov, s ktorými sa stretávame pri sanáciách historických budov alebo pri riešení nedostatkov v tepelnej izolácii moderných stavieb. Otázka, či sa dá zatepliť vlhká stavba, je oprávnená a odpoveď znie: áno, ale len za určitých podmienok a so správnou technológiou.

## Prečo je vlhkosť problémom pri zatepľovaní?

Tradičné tepelnoizolačné materiály, ako sú polystyrén alebo polyuretánové peny, vytvárajú nepriepustnú bariéru pre vodné pary. Keď sa takýto materiál aplikuje na vlhkú stenu, vlhkosť zostane uzavretá v konštrukcii, čo môže viesť k:

- Nárastu vlhkosti v murive
- Vzniku plesní a húb
- Poškodeniu tepelnoizolačného materiálu
- Degradácii stavebnej konštrukcie
- Zdravotným problémom obyvateľov

## Riešenie: Paropriepustné tepelnoizolačné materiály

STYRCON dosky predstavujú revolučný prístup k zatepľovaniu vlhkých budov. Vďaka svojej výnimočnej paropriepustnosti s faktorom difúzneho odporu μ ≤ 3 umožňujú prirodzené "dýchanie" stavebnej konštrukcie.

### Kľúčové výhody STYRCON dosiek pri vlhkých stavbách:

**1. Prirodzené vysychanie murív**
Paropriepustnosť umožňuje postupné odvádzanie vlhkosti z konštrukcie smerom von, čím sa vlhkosť v murive postupne znižuje.

**2. Prevencia kondenzácie**
Vďaka schopnosti transportu vodných pár sa predchádza kondenzácii v izolačnej vrstve alebo na rozhraní materiálov.

**3. Zachovanie tepelnoizolačných vlastností**
Na rozdiel od tradičných materiálov, ktoré pri navlhnutí strácajú svoje izolačné vlastnosti, STYRCON si zachováva stabilné parametre aj pri vyššej vlhkosti.

## Postupy pri zatepľovaní vlhkých stavieb

### Prípravné práce

Pred aplikáciou akéhokoľvek tepelnoizolačného materiálu je potrebné:

1. **Identifikovať zdroj vlhkosti** - či ide o vzlínajúcu vlhkosť, zatekanie alebo kondenzáciu
2. **Vykonať sanačné opatrenia** - opraviť príčiny vlhkosti tam, kde je to možné
3. **Zmerať vlhkosť murív** - stanoviť aktuálny stav a sledovať vývoj

### Aplikácia STYRCON dosiek

Pri použití STYRCON dosiek na vlhké murivo postupujeme nasledovne:

**1. Príprava podkladu**
- Očistenie povrchu od uvoľnených častí
- Aplikácia penetračného náteru (ak je potrebná)
- Montáž kotevných prvkov

**2. Montáž tepelnej izolácie**
- Lepenie dosiek špeciálnymi lepidlami vhodnými pre vlhké podklady
- Dodržanie správnej technológie lepenia
- Mechanické kotvenie podľa projektu

**3. Dokončovacie práce**
- Aplikácia výstužnej vrstvy
- Penetrácia a finálna omietka
- Kontrola paropriepustnosti celého systému

## Monitoring a údržba

Po zateplení vlhkej stavby STYRCON doskami je dôležité:

- **Pravidelné kontroly** vlhkosti v interiéri
- **Sledovanie** stavu fasády
- **Zabezpečenie** správneho vetrania objektu
- **Monitorovanie** účinnosti zateplenia

## Technické parametre pre vlhké aplikácie

STYRCON dosky sú navrhnuté tak, aby vyhovovali požiadavkám vlhkých aplikácií:

- **Paropriepustnosť**: μ ≤ 3 (výnimočne vysoká)
- **Nasávavosť**: Nízka nasávavosť vody
- **Mrazuvzdornosť**: Odolnosť voči zmrazovaniu/rozmrazovaniu
- **Stabilita rozmerov**: Nízke bobtnanie pri navlhnutí

## Záver

Zatepľovanie vlhkých stavieb je možné, ale vyžaduje si správny výber materiálov a dodržanie technologických postupov. STYRCON dosky s ich výnimočnou paropriepustnosťou predstavujú ideálne riešenie pre takéto aplikácie, pretože umožňujú postupné vysychanie murív pri súčasnom zabezpečení kvalitnej tepelnej izolácie.

Pri každom projekte zatepľovania vlhkej stavby odporúčame konzultáciu s odborníkmi a vypracovanie projektu, ktorý zohľadní špecifiká konkrétnej stavby a miestne klimatické podmienky.

*Pre technické poradenstvo a podporu pri vašom projekte nás kontaktujte prostredníctvom našej [kontaktnej stránky](/kontakt).*`
  },
  'styrcon-200-info': {
    id: 'styrcon-200-info',
    title: 'STYRCON 200 INFO',
    excerpt: 'Dosky STYRCON 200 v kontakte s vlhkým murivom ostávajú na povrchu suché. Nehorľavé a sanačné zateplenie s výnimočnými vlastnosťami.',
    category: 'technicke',
    image: 'https://www.e-ma.sk/imgcache/styrcon-200-info-e-news-83-5-400-300-0-ffffff.jpg?v=1633090175',
    author: 'Admin',
    publishedAt: '2021-09-30',
    tags: ['styrcon-200', 'vlhkosť', 'nehorľavosť', 'sanácia', 'paropriepustnosť'],
    content: `Dosky STYRCON 200 v kontakte s vlhkým murivom ostávajú na povrchu suché.

K odpareniu vody dochádza priamo v doskách. Na rovnakom princípe funguje aj sanačná omietka. Na rozdiel od nej je kapacita pórov v doskách STYRCON 200 podstatne väčšia. Navyše dochádza k tomu, že pôvodná stena je po zateplení teplejšia, výpar vody do styrconovej štruktúry väčší ako v sanačnej omietke - murivo sa rýchlejšie vysušuje!

## Nehorľavé zateplenie

STYRCON 200 je nehorľavý kvôli cementovej škrupine na každej polystyrénovej guľôčke. Táto bariéra zabraňuje šíreniu plameňa. Izoluje polystyrénové granule od seba. Ak sú tepelnoizolačné dosky STYRCON 200 vystavené priamemu ohňu, polystyrén sa z nich len postupne odparí, ale cementový skelet ostane. Dosky ostanú doskami, nebortia sa, nič z nich neodkvapkáva.

### Kľúčové vlastnosti nehorľavosti:

**Cementová ochrana**
Každá polystyrénová guľôčka je obalená cementovou škrupinou, ktorá tvorí protipožiarnu bariéru.

**Strukturálna stabilita**
Pri požiari sa polystyrén postupne odparí, ale cementový skelet zachováva mechanickú pevnosť dosky.

**Bez odkvapkávania**
Na rozdiel od klasického polystyrénu nedochádza k odkvapkávaniu horľavých kvapiek.

## Sanačné zateplenie

Polystyrén-cementové dosky STYRCON 200 majú výbornú paropriepustnosť, ktorá je daná pórovitosťou štruktúry. Cement nevypĺňa priestory medzi granulkami polystyrénu, tie ostávajú voľné. Tvoria sieť veľkých nekapilárnych - nevzlínavých a navzájom poprepájaných pórov.

### Mechanizmus sanácie:

**Kapilárne póry v cementovej škupine**
V doskách STYRCON 200 sa nachádzajú aj kapilárne póry v cementovej škupine. Sú však krátke a vzlínajúca voda sa ihneď odparuje do spomínaných medzizrnných priestorov.

**Povrchová suchost**
Dosky STYRCON 200 v kontakte s vlhkým murivom ostávajú na povrchu suché. K odpareniu vody dochádza priamo v doskách.

**Porovnanie so sanačnou omietkou**
Na rovnakom princípe funguje aj sanačná omietka. Na rozdieľ od nej je kapacita pórov v doskách STYRCON 200 podstatne väčšia. Navyše dochádza k tomu, že pôvodná stena je po zateplení teplejšia, výpar vody do styrconovej štruktúry väčší ako v sanačnej omietke - murivo sa rýchlejšie vysušuje!

## Vnútorné zateplenie

Interiérové zateplenie sa bežne neodporúča, lebo pôvodné murivo ostane v zime prechladené, čo spôsobí kondenzáciu vodnej pary v konštrukcii. Tento problém sa dá obísť kapilárne aktívnym materiálom, ktorý kondenzát odvedie - rozpije. Tým sa dosiahne rýchle spätné odparenie vody z muriva.

### Výhody STYRCON 200 pri vnútornom zatepľovaní:

**Kapilárna aktivita**
Materiál aktívne transportuje vlhkosť a zabezpečuje jej rýchle odparovanie.

**Tepelná izolácia murív**
Po zateplení sa murivo udržiava v teplejšom stave, čo podporuje prirodzené vysychanie.

**Prevencia kondenzácie**
Schopnosť materiálu absorbovať a následne odpariť kondenzát minimalizuje riziko poškodenia konštrukcie.

## Technické špecifikácie

STYRCON 200 kombinuje najlepšie vlastnosti cementu a polystyrénu:

- **Nehorľavosť**: Trieda reakcie na oheň A2-s1,d0
- **Paropriepustnosť**: μ ≤ 3
- **Tepelná vodivosť**: λ = 0,065 W/mK
- **Objemová hmotnosť**: 200 kg/m³
- **Nasávavosť**: Nízka vďaka pórovitej štruktúre

## Záver

STYRCON 200 predstavuje unikátne riešenie pre sanačné zatepľovanie, ktoré kombinuje výnimočnú paropriepustnosť s nehorľavými vlastnosťami. Jeho špecifická štruktúra umožňuje efektívne riadenie vlhkosti v stavebných konštrukciách pri zachovaní vysokej tepelnoizolačnej účinnosti.

*Pre podrobnejšie technické informácie a aplikačné poradenstvo nás kontaktujte na našej [kontaktnej stránke](/kontakt).*`
  },
  'blizi-sa-zdrazovanie-klucoveho-materialu': {
    id: 'blizi-sa-zdrazovanie-klucoveho-materialu',
    title: 'Blíži sa zdražovanie kľúčového materiálu',
    excerpt: 'Ceny cementu porastú výrazne. Styrcon zabezpečil cement v predstihu, aby sa vyhol výpadkom vo výrobe. Naše dodávky stále v starých cenách.',
    category: 'prakticke',
    image: 'https://www.e-ma.sk/imgcache/blizi-sa-zdrazovanie-klucoveho-materialu-e-news-85-5-400-300-0-ffffff.jpg?v=1633344609',
    author: 'Admin',
    publishedAt: '2021-10-04',
    tags: ['cement', 'ceny', 'dodávky', 'trh', 'styrcon'],
    content: `Styrcon potrebuje pre výrobu dosiek kľúčový prvok a tou je cement. Čo sme tušili resp boli doteraz len šumy na trhu sa stáva skutočnosťou. Ceny CEMENTu porastú a výrazne. Nad dôvodom nebudeme špekulovať, fakty sú jasné - Alea iacta est - Kocky sú hodené.

Výrobca Styrcon spolu s nami mal potvrdený tento fakt už pred nejakým časom a vďaka dobrej analýze trhu sa urobili kroky na zabezpečenie cementu v predstihu, aby sme sa vyhli výpadkom vo výrobe našich úspešných Styrcon dosiek.

## Naše dodávky do 24 hodín a v starých cenách

Vďaka predvídavosti a dlhodobému plánovaniu môžeme našim zákazníkom garantovať:

- **Kontinuálne dodávky** bez výpadkov
- **Stabilné ceny** na určité obdobie
- **Rychlé dodávky** do 24 hodín kdekoľvek na Slovensku
- **Kvalita bez kompromisov**

## Informácia z "Hospodárske noviny"

Podľa článku z Hospodárskych novín zo dňa 4. októbra 2021:

*"Dramatický rast cien, rušenie dohodnutých zmlúv či naceňovanie kontraktov nanovo sa v uplynulých mesiacoch stali v stavebnom sektore bežnou realitou. Stúpajúca hodnota dreva, ocele, hliníka či polystyrénu robí pri výstavbe obrovské škrty v rozpočtoch. Cena spomínaných materiálov rástla v stovkách percent. Týka sa to aj ďalšieho, bez ktorého sa nezaobíde žiadna stavba. Na rad prichádza aj zvyšovanie hodnoty cementu."*

### Príčiny zdražovania

**Globálne faktory:**
- Nedostatok surovín na svetových trhoch
- Narušené dodávateľské reťazce
- Zvýšený dopyt po obnove ekonomiky
- Energetická kríza

**Lokálne faktory:**
- Obmedzená výrobná kapacita
- Zvýšené náklady na dopravu
- Regulačné opatrenia

## Náš prístup k situácii

### Strategické zásobovanie

Ako spoločnosť E-MA SK sme sa pripravili na túto situáciu:

**Včasné zabezpečenie zásob**
Analyzovali sme trh a zabezpečili dostatočné množstvo cementu ešte pred cenové náraste.

**Dlhodobé partnerstvá**
Naša spolupráca s výrobcom Styrcon je založená na vzájomnej dôvere a dlhodobom plánovaní.

**Zodpovednosť voči zákazníkom**
Uvedomujeme si našu zodpovednosť a snažíme sa chrániť našich zákazníkov pred cenovými turbulenciami.

### Konkurenčné výhody

**Stabilita dodávok**
Zatiaľ čo konkurencia bojuje s nedostatkom materiálu, my garantujeme neprerušované dodávky.

**Cenová stabilita**
Naše predvídavé plánovanie nám umožňuje udržať ceny na prijateľnej úrovni dlhší čas.

**Rychlosť dodávok**
Naša logistika je nastavená tak, aby sme dodali materiál do 24 hodín.

## Dopady na stavebný trh

Súčasná situácia prináša výzvy pre celý stavebný sektor:

### Krátkodobé dopady
- Zvýšené náklady projektov
- Predĺžené termíny dodávok
- Neistota v cenových kalkuláciách

### Dlhodobé dopady
- Potreba lepšieho plánovania projektov
- Dôraz na kvalitu a spoľahlivosť dodávateľov
- Presun k udržateľnejším materiálom

## Odporúčania pre zákazníkov

**Plánovanie dopredu**
Odporúčame našim zákazníkom plánovať svoje projekty s dostatočným predstihom.

**Zabezpečenie objednávok**
Pri väčších projektoch je vhodné zabezpečiť si materiál vopred.

**Konzultácie s odborníkmi**
Naši technici sú k dispozícii pre poradenstvo a optimalizáciu riešení.

## Záver

Aj keď sa stavebný trh nachádza v turbulentnom období, naša spoločnosť je pripravená poskytovať našim zákazníkom stabilné dodávky STYRCON systémov. Vďaka strategickému plánovaniu a silným partnerstvám môžeme garantovať kontinuitu a kvalitu našich služieb.

*Pre aktuálne informácie o cenách a dostupnosti materiálu nás kontaktujte na našej [kontaktnej stránke](/kontakt).*`
  },
  'ako-sa-vyznat-v-omietkach': {
    id: 'ako-sa-vyznat-v-omietkach',
    title: 'Ako sa vyznať v omietkach',
    excerpt: 'Komplexný prehľad minerálnych a pastovitých omietok. Porovnanie akrylátových a silikónových omietok s ich výhodami a nevýhodami.',
    category: 'technicke',
    image: 'https://www.e-ma.sk/imgcache/ako-sa-vyznat-v-omietkach-e-news-86-5-400-300-0-ffffff.jpg?v=1633613713',
    author: 'Admin',
    publishedAt: '2021-10-07',
    tags: ['omietky', 'minerálne', 'akrylátové', 'silikónové', 'fasáda'],
    content: `Výber správnej omietky je kľúčovým rozhodnutím pri dokončovaní fasády. Rôzne typy omietok majú svoje špecifické vlastnosti, výhody a nevýhody. V tomto článku si prejdeme najčastejšie používané typy omietok a pomôžeme vám zorientovať sa v ich vlastnostiach.

## Minerálne štrukturálne omietky

Minerálne omietky sa dodávajú vo forme prášku a riedia sa vodou. Sú vyrobené na báze minerálnych spojív (základ tvoria cement a vápenný hydrát). Nutné je plynulé aplikovanie hmoty a vytváranie konečnej dekoračnej štruktúry za mokra. Možno ich použiť na akýkoľvek povrch – na murivo aj rozličné typy tepelnej izolácie.

### Výhody minerálnych omietok:
- **Nízka cena** - najlacnejšia alternatíva spomedzi všetkých typov
- **Vysoká paropriepustnosť** - ideálne pre dýchacie steny
- **Dobrá priľnavosť** aj pri zvýšenej vlhkosti podkladu
- **Ekologickosť** - prírodné minerálne složky

### Nevýhody minerálnych omietok:
- **Zložitejšia aplikácia** - vyžaduje skúseného aplikátora
- **Menší výber z farebnej škály** - obmedzené farebné možnosti
- **Náchylnosť na popraskanie** pri nesprávnej aplikácii
- **Nutnosť dodržania technológie** miešania a aplikácie

## Pastovité štrukturálne omietky

Pastovité omietky sa dodávajú v pastovitom stave v plastových vedrách. Najprv sa nanáša penetračný náter, aby sa zabezpečil čistý a stabilný podklad.

### 1. Akrylátové omietky

Ide o zmes akrylátovej živice a syntetických polymérových spojív s kremičitými pieskami. Akrylátové omietky dobre viažu pigment, preto medzi nimi je možné nájsť aj sýte a výrazné odtiene. Ich použitie je obmedzené. Nie sú vhodné napríklad na fasády zateplené minerálnou vlnou alebo na murivo s vysokou paropriepustnosťou, pretože majú vyšší difúzny odpor. Sú odolné voči mechanickým poškodeniam, oterom a klimatickým vplyvom.

#### Výhody akrylátových omietok:
- **Odolnosť voči poveternostným vplyvom** - dlhá životnosť
- **Dobre krytie** - rovnomerný vzhľad povrchu
- **Nízka cena** - dostupná alternatíva
- **Jednoduchá aplikácia** - nevyžaduje špeciálne zručnosti
- **Bohatá farebná škála** - široký výber farieb

#### Nevýhody akrylátových omietok:
- **Nízka paropriepustnosť** - nevhodné pre dýchacie steny
- **Ľahké znečistenie** - pritahujú nečistoty z ovzdušia
- **Elektrostatické vlastnosti** - priťahujú prach
- **Obmedzené použitie** - nie pre všetky typy podkladov

### 2. Silikónové omietky

Sú vyrobené zo silikónových živíc a syntetických polymérov. Ide o tenkovrstvové omietky, ktoré konzistenciou pripomínajú pastu. Vyrábajú sa totiž z emulzie vody a silikónovej živice. Z hľadiska ceny patria k drahším alternatívam, cena je však adekvátna vysokej kvalite. V súčasnosti patria medzi najkvalitnejšie fasádne omietky a možno ich aplikovať na všetky zatepľovacie systémy. Vhodné pre fasády aj interiéry.

#### Výhody silikónových omietok:
- **Dobrá paropriepustnosť** - umožňujú dýchanie stien
- **Veľká schopnosť odpudzovať vodu** - hydrofóbne vlastnosti
- **Výborná krycia schopnosť** - rovnomerný vzhľad
- **Samočistiaca schopnosť** - odpudzujú nečistoty
- **Univerzálnosť** - vhodné pre všetky zatepľovacie systémy
- **Dlhá životnosť** - investícia do budúcnosti

#### Nevýhody silikónových omietok:
- **Vyššia cena** - najdrahšia alternatíva
- **Náročnosť na skladovanie** - citlivé na mrázové teploty
- **Špecifické požiadavky na podklad** - potreba kvalitnej penetrácie

## Výber správnej omietky

### Pre STYRCON zatepľovacie systémy

**Odporúčané kombinácie:**
- **Minerálne omietky** - ideálne pre maximálnu paropriepustnosť
- **Silikónové omietky** - pre kombináciu paropriepustnosti a samočistenia
- **Akrylátové omietky** - len v špecifických prípadoch a s odbornou konzultáciou

### Faktory ovplyvňujúce výber:

**Klimatické podmienky**
- Vlhkosť oblasti
- Teplotné výkyvy
- Smer vetrov a dažďov

**Typ podkladu**
- Minerálna vlna vs. polystyrén
- Paropriepustnosť základného materiálu
- Stav a kvalita podkladu

**Estetické požiadavky**
- Farebnosť
- Štruktúra povrchu
- Dlhodobý vzhľad

**Ekonomické hľadisko**
- Investičné náklady
- Náklady na údržbu
- Životnosť materiálu

## Technologické postupy aplikácie

### Príprava podkladu
1. **Čistenie** - odstránenie nečistôt a uvoľnených častí
2. **Penetrácia** - aplikácia vhodného penetračného náteru
3. **Vyrovnanie** - oprava nerovností a defektov

### Aplikácia omietky
1. **Príprava zmesi** - podľa pokynov výrobcu
2. **Nanášanie** - rovnomerne v požadovanej hrúbke
3. **Štruktúrovanie** - vytvorenie požadovaného povrchu
4. **Dokončenie** - kontrola a opravy

## Údržba omietok

### Pravidelná údržba:
- **Vizuálna kontrola** - identifikácia poškodení
- **Čistenie** - odstránenie nečistôt podľa typu omietky
- **Opravy** - včasné riešenie menších defektov
- **Renovácia** - podľa potreby a typu materiálu

## Záver

Výber správnej omietky zohráva kľúčovú úlohu v celkovej kvalite a životnosti zatepľovacieho systému. Pri rozhodovaní je dôležité zohľadniť nielen cenu, ale aj technické vlastnosti, estetické požiadavky a dlhodobé náklady na údržbu.

Pre STYRCON systémy odporúčame prioritne minerálne alebo silikónové omietky, ktoré najlepšie využívajú paropriepustné vlastnosti našich dosiek.

*Pre výber najvhodnejšej omietky pre váš projekt sa obráťte na našich odborníkov cez [kontaktný formulár](/kontakt).*`
  },
  'zateplena-tvarnica-styrcon': {
    id: 'zateplena-tvarnica-styrcon',
    title: 'Zateplená tvarnica STYRCON',
    excerpt: 'Prototyp zateplenej tvarnice Styrcon, ktorá obsahuje zateplenie už v sebe. Inovatívne riešenie pre moderné stavebníctvo.',
    category: 'zateplovanie',
    image: 'https://www.e-ma.sk/imgcache/zateplena-tvarnica-styrcon-e-news-87-5-400-300-0-ffffff.jpg?v=1634199762',
    author: 'Admin',
    publishedAt: '2021-10-14',
    tags: ['tvarnica', 'inovacia', 'zateplovanie', 'murivo', 'energetika'],
    content: `Na svete je prototyp zateplenej tvarnice Styrcon, ktorá sa môže použiť ihneď na stavbu bez nejakého zateplenia naviac, keďže obsahuje zateplenie už v sebe. Aktuálne overujeme záujem, pretože v ďalšom kroku je nutné mať celú skladačku a aby bola efektívna výroba a následne zaujimavá cena potrebujeme vedieť potenciálny objem, aký by trh mohol spotrebovať ročně.

## Revolučná inovacia v stavebníctve

Zateplená tvarnica STYRCON predstavuje prelomové riešenie, ktoré kombinuje nosné vlastnosti klasickej tvarnice s vynikajúcimi tepelnoizolačnými charakteristikami STYRCON materiálu. Táto inovacia môže výrazne zmeniť spôsob, akým pristupujeme k výstavbe energeticky efektívnych budov.

### Kľúčové vlastnosti zateplenej tvarnice:

**Integrovaná tepelná izolácia**
Tvarnica obsahuje zatepľovacú vrstvu priamo v svojej štruktúre, čo eliminuje potrebu dodatočného zatepľovania.

**Jednoduché použitie**
Možnosť okamžitého použitia na stavbu bez potreby ďalších zatepľovacích opatrení.

**Časové úspory**
Významné skrátenie času výstavby vďaka kombinácii dvoch pracovných operácií do jednej.

## Technické riešenie

### Štruktúra tvarnice

**Nosná vrstva**
Zabezpečuje mechanickú pevnosť a stabilitu konštrukcie podľa stavebných noriem.

**Izolačná vrstva STYRCON**
Integrovaná vrstva s výnimočnými tepelnoizolačnými a paropriepustnými vlastnosťami.

**Ochranná vrstva**
Vonkajšia vrstva chrániac izolačný materiál pred mechanickým poškodením.

### Výhody konceptu

**Energetická efektívnosť**
Dosahuje vynikajúce tepelnoizolačné hodnoty už v základnej konštrukcii.

**Ekonomické prínosy**
- Úspora času výstavby
- Zníženie pracovných nákladov
- Eliminácia dodatočných materiálov
- Jednoduché stavebné detaily

**Technické výhody**
- Minimalizácia tepelných mostov
- Výborná paropriepustnosť
- Dlhá životnosť
- Jednoduchá aplikácia

## Prieskum trhu

### Aktuálny stav

Momentálne realizujeme rozsiahly prieskum trhu s cieľom zistiť:

**Záujem stavebníkov**
- Rodinné domy
- Bytové domy
- Komerčné stavby
- Verejné budovy

**Požiadavky trhu**
- Preferované rozmery tvarníc
- Požadované tepelnoizolačné hodnoty
- Cenové očakávania
- Dodacie termíny

**Ročné objemy**
Pre efektívnu výrobu a konkurencieschopné ceny potrebujeme poznať potenciálnu ročnú spotrebu.

### Faktory ovplyvňujúce výrobu

**Investície do technológie**
Výroba zateplenej tvarnice vyžaduje špecializované výrobné linky a technológie.

**Ekonomika výroby**
Efektívnosť výroby priamo súvisí s objemom objednávok a kontinuitou výroby.

**Kvalita a certifikácia**
Potreba zabezpečiť všetky potrebné certifikáty a atesty pre nový produkt.

## Aplikačné možnosti

### Typy stavieb

**Rodinné domy**
Ideálne pre energeticky efektívne rodinné domy s nízkou energetickou náročnosťou.

**Bytové domy**
Efektívne riešenie pre viacpodlažné obytné stavby s vysokými nárokami na tepelný komfort.

**Komerčné objekty**
Vhodné pre administratívne budovy, školy, zdravotné zariadenia a iné komerčné stavby.

### Stavebné systémy

**Kombinovateľnosť**
Tvarnice možno kombinovať s rôznymi stavebnými systémami a technológiami.

**Flexibilita dizajnu**
Umožňuje realizáciu rôznych architektonických riešení bez kompromisov v energetickej efektívnosti.

## Environmentálne aspekty

### Udržateľnosť

**Zníženie odpadu**
Integrácia zateplenia do tvarnice minimalizuje množstvo stavebného odpadu.

**Energetické úspory**
Dlhodobé úspory energie na vykurovanie a chladenie budov.

**Recyklovateľnosť**
STYRCON materiál je možné recyklovať a znovu využiť.

### Uhlíková stopa

**Výrobný proces**
Optimalizácia výrobného procesu s cieľom minimalizácie emisií CO2.

**Životný cyklus**
Pozitívny dopad na životné prostredie počas celej životnosti budovy.

## Budúce kroky

### Vývoj produktu

**Optimalizácia parametrov**
Na základe spätnej väzby z trhu budeme optimalizovať technické parametre.

**Rozšírenie sortimentu**
Plánujeme vývoj rôznych typov a rozmerov zateplenej tvarnice.

**Certifikácia**
Zabezpečenie všetkých potrebných certifikátov a atestov.

### Trhová stratégia

**Pilotné projekty**
Realizácia vzorových projektov na demonštráciu výhod produktu.

**Vzdelávanie trhu**
Školenia pre architektov, projektantov a stavebníkov.

**Partnerstvá**
Budovanie partnerstiev s kľúčovými hráčmi na trhu.

## Záver

Zateplená tvarnica STYRCON predstavuje významný krok vpred v oblasti energeticky efektívneho stavebníctva. Jej úspešné uvedenie na trh závisí od záujmu stavebnej komunity a od dosiahnutia ekonomicky efektívnych výrobných objemov.

Pozývame všetkých záujemcov - architektov, projektantov, stavebníkov a investorov - aby sa podieľali na tejto inovácii svojimi návrhmi, pripomienkami a vyjadrením záujmu.

*Ak máte záujem o zateplenej tvarnici STYRCON alebo chcete prispieť k jej vývoju, kontaktujte nás cez náš [kontaktný formulár](/kontakt).*`
  },
  'ceny-komodit': {
    id: 'ceny-komodit',
    title: 'Ceny komodít',
    excerpt: 'Stavebné materiály zdraželi výrazně. Analýza súčasného trhu, príčiny nárastu cien a ako sa to týka našich dodávok STYRCON.',
    category: 'prakticke',
    image: 'https://www.e-ma.sk/imgcache/ceny-komodit-e-news-88-5-400-300-0-ffffff.jpg?v=1635100609',
    author: 'Admin',
    publishedAt: '2021-10-25',
    tags: ['ceny', 'komodity', 'trh', 'stavebné-materiály', 'analýza'],
    content: `Stavebné materiály zdraželi a idú stále hore - netýka sa našich dodávok

Ako vnímame súčasnú dobu na stavebnom trhu a s čím sa stretávame?

## Neúmerný rast cien

### Štatistiky rastu
**2021 II.QTR vs I.QTR:** +5%
**YTD vs 2021/2020:** navýšenie +6,8%

Niektoré komodity zaznamenali nárast až o stovky percent. Nehovoriac o dramatickom navýšenie cien ocele, železa, dreva a plastu.

### Príčiny cenového rastu

**COVID-19 dopad**
Nepomer ponuky a dopytu ovplyvnenú situáciou s názvom COVID-19. Spomalenie až zastavenie výroby stavbných materiálov sa prejavilo na nedostatku na skladoch.

**Oceľ a železo**
Okrem iných to podstatne ovplyvnila aj situácia s oceľou. Priamu podporu mnohí slovenskí výrobcovia podľa ich vyjadrení nedostali a ani ju priebežne necítia, čo iste nepomôže zotaveniu trhu v blízkej dobe.

**Slovenská produkcia**
Napriek tomu, že náš trh je plný slovenských výrobcov, ktorí dodávajú patentované výrobky ako je Styrcon.

## Analýza materiálov

### Oceľ a železo
*"Surová oceľ (z pohľadu najväčších svetových výrobcov), z ktorej sa robia druhovýrobky, sa vyrába v Číne, v Indii a v Spojených štátoch. V Európe je jej minimum".*

**Situácia na Slovensku:**
- Na Slovensko sa vozia polotovary
- Tunajšie ceny ovplyvňujú rastúce ceny komodít na svetových trhoch
- Európske clá na dovoz z Ázie ešte zdvíhajú ceny
- Z východu kontinentu sa vozia aj granuláty, plastové výrobky a polystyrén
- Globálny nedostatok týchto materiálov

### Drevo
**Nárast cien:** približne 200% (priemerný nárast, závisí na špecifikácii)

**Dopady na našu činnosť:**
- Cena drevených paliet stúpla najviac - až o 100%
- Môžeme potvrdiť navýšené ceny paliet, na ktorých dodávame Styrcon
- Ovplyvňuje ceny celého systému súčastí

### Cement, vápno a piesok
**Nárast cien:** 20 - 35%

Tieto základné stavebné materiály zaznamenali významný nárast, čo sa premieta do cien všetkých stavebných prác.

### Pohonné hmoty a energie
**Nepriame vplyvy:**
- Ovplyvňujú náklady na dopravu
- Ceny energií šplhajúce sa na svoje maximá
- Stavebné firmy majú v súčasnej situácii otvorené nožnice
- Nárast cien materiálov zvyšuje náklady na výstavbu

## Minerálne tepelnoizolačné dosky

### Konkurencia
Zdraženie sa prejavilo na všetkých materiálových vstupoch:
- Ceny izolácie našej konkurencie sa upravovali o aktuálnu výšku miery inflácie
- Ceny vstupných surovín veľmi priblížili k našim cenám
- Avšak stále nám nemôžu konkurovať niektorými vlastnosťami

### Trhová dynamika
**Cenové rally:**
- Ceny vstupných surovín sú veľmi dynamické
- Spôsobuje doteraz nevídané cenové rally na trhu
- Všeobecne sa termíny dodávok predlžujú
- V dôsledku kapacitných možností jednotlivých výrobcov

## E-MA SK pozícia na trhu

### Naše výhody

**Blízka spolupráca so slovenskými výrobcami**
- Zastupujeme kvalitných slovenských výrobcov
- Vlastné trhové analýzy a predikcie
- Schopnosť dodávať do 24 hodín kdekoľvek na Slovensku

**Stabilita dodávok**
- Kontinuálne dodávky bez výpadkov
- Predvídavé plánovanie zásob
- Dlhodobé partnerstvá s výrobcami

### Konkurenčné výhody STYRCON

**Technické vlastnosti**
- Unikátne paropriepustné vlastnosti
- Nehorľavosť
- Sanačné schopnosti
- Dlhá životnosť

**Cenová stabilita**
Na rozdiel od konkurencie, ktorá čelí častým cenovým výkyvom, STYRCON ponúka:
- Predvídateľné cenové politiky
- Menej volatilné ceny
- Dlhodobú cenovú stabilitu

## Dopady na stavebný sektor

### Krátkodobé efekty
- **Zdraženie projektov** - nárast rozpočtov o desiatky percent
- **Predĺžené termíny** - problémy s dostupnosťou materiálov
- **Neistota v kalkuláciách** - ťažko predvídateľné cenové pohyby

### Dlhodobé zmeny
- **Strategické plánovanie** - nutnosť lepšieho plánovania projektov
- **Kvalita nad cenou** - dôraz na spoľahlivosť dodávateľov
- **Lokálni dodávatelia** - preferencia domácich výrobcov

## Odporúčania pre zákazníkov

### Strategické nákupy
- **Plánovanie dopredu** - zabezpečenie materiálov s predstihom
- **Dlhodobé kontrakty** - stabilizácia cien na dlhšie obdobie
- **Konzultácie s dodávateľmi** - využitie odborných rád

### Optimalizácia projektov
- **Efektívne riešenia** - výber kvalitných materiálov s dlhou životnosťou
- **Komplexné systémy** - využitie systémových riešení ako STYRCON
- **Technická podpora** - spolupráca s odbornými poradcami

## Budúce výhľady

### Očakávania trhu
**Krátkodobé (6-12 mesiacov):**
- Pokračovanie vysokých cien
- Postupná stabilizácia niektorých komodít
- Riešenie problémov v dodávateľských reťazcoch

**Dlhodobé (2-5 rokov):**
- Nová rovnováha na úrovni vyšších cien
- Reštruktúralizácia dodávateľských reťazcov
- Dôraz na lokálnu produkciu

### Naša stratégia
- **Pokračovanie v stabilných dodávkach** STYRCON systémov
- **Rozvoj partnerstiev** so slovenskými výrobcami
- **Investície do logistiky** pre ešte rychlejšie dodávky
- **Technický rozvoj** - neustále zlepšovanie vlastností materiálov

## Záver

Súčasná situácia na trhu stavebných materiálov je náročná, ale E-MA SK vďaka strategickému prístupu a kvalitným partnerstvám dokáže poskytovať našim zákazníkom stabilité v nestabilnom prostredí. STYRCON ako slovenský produkt s výnimočnými vlastnosťami predstavuje spoľahlivú voľbu v týchto neistých časoch.

*Zdroje: www.abs.sk, Štatistický úrad SR*

*Pre aktuálne informácie o dostupnosti a cenách našich produktov nás kontaktujte cez [kontaktný formulár](/kontakt).*`
  },
  'vyvoj-cien-styrcon-u': {
    id: 'vyvoj-cien-styrcon-u',
    title: 'Vývoj cien Styrcon-u / Styrcon price development',
    excerpt: 'Cenová stabilita STYRCON oproti konkurencii. Dlhodobá stratégia a prínos kvalitných zatepľovacích systémov pre zákazníkov.',
    category: 'prakticke',
    image: 'https://www.e-ma.sk/imgcache/vyvoj-cien-styrcon-u---styrcon-price-development-e-news-89-5-400-300-0-ffffff.jpg?v=1635349264',
    author: 'Admin',
    publishedAt: '2021-10-28',
    tags: ['ceny', 'styrcon', 'stabilita', 'stratégia', 'hodnota'],
    content: `Ceny sa dlhodobo nemenili lebo Styrcon je pevný so stabilným technickým a výrobným zázemim a preto nie je citlivý na akékoľvek cenové turbulencie vstupov. Vopred sú urobené korekcie, aby cena bola viacmenej garantovaná na dlhý čas pre odberateľov. Inak ekonomiku nemôžeme udržať v zelených číslach a to je najmä o vzájomnej spolupráci výrobca Styrcon - E-MA SK - odberateľ.

## Filozofia cenovej stability

### Dlhodobá stratégia
Aj v tom je vidieť, že si koncového zákazníka vážime a chceme s ním bežať maratón, pre nás je beh na 100 m menej zaujímavý. Ukázali nám to dlhoročné skúsenosti z obchodu.

**Maratónsky prístup vs. šprintérsky prístup:**
- **Dlhodobé partnerstvá** namiesto krátkodobých ziskov
- **Stabilita** namiesto volatility
- **Spoľahlivosť** namiesto nepredvídateľnosti
- **Kvalita** namiesto lacných riešení

### Vnímanie hodnoty
Mnohí zákazníci však nevnímajú vlastnosti Styrconu a jeho prínos ale len cenu. Cena je zaujímavá veľmi zaujímavá pre každého, či je to malý zákazník alebo veľký korporát to je fakt, ale niekto múdry raz povedal: **"Nie sme takí bohatí, aby sme kupovali lacné veci".**

## STYRCON vs. konkurencia

### Kvalita systému Styrexon
A Styrcon, ktorý je súčasťou systému Styrexon je top medzi zatepľovacími systémami aj keď mnohí poznajú len zabehané chodníčky iných materiálov a značiek.

**Prečo STYRCON vyniká:**
- **Výnimočná paropriepustnosť** - μ ≤ 3
- **Nehorľavosť** - trieda A2-s1,d0
- **Sanačné vlastnosti** - riešenie vlhkých múrov
- **Dlhá životnosť** - investícia na desaťročia
- **Slovenská kvalita** - domáca výroba s medzinárodnou úrovňou

### Jednoduché zoznámenie sa s produktom
Niekedy však stačí málo:
- Pozrieť sa na web
- Hľadať informácie
- Poslať mail s otázkami
- Zavolať naším odborníkom
- Prísť sa pozrieť do skladu kde je ten materiál reálny a dotknúť sa ho

## Analýza cenového vývoja

### Prečo ceny vzrástli aj u Styrcon-u?
Lebo rieku navýšení stavebných materiálov sa nedá zastaviť. Pretože nikto nedokáže postaviť cenovú hrádzu. A o cenách stavebných materiálov sme písali minule všeobecne nie len o zateplení.

**Neodvratné faktory:**
- Globálny nárast cien surovín
- Energetická kríza
- Inflačné tlaky
- Narušené dodávateľské reťazce

### Porovnanie s konkurenciou
**Z grafu je jasné:**
- **Styrcon navýšenie**: priemerne 18% podľa referenčných hrúbok
- **Konkurencia navýšenie**: cca 30-40% (niekde aj viac)
- **STYRCON stabilita**: výrazne pod priemernou hladinou navýšení

**Kľúčové rozdiely:**
- Styrcon nepozná volatilitu na rozdiel od konkurencie
- Ceny konkurencie často nie sú jednoznačné (hore dole často ako na kolotoči)
- Naša cenová politika je transparentná a predvídateľná

## Ekonomické principy

### Udržateľnosť podnikania
Aby ekonomiku dokážeme udržať v zelených číslach, je potrebná vzájomná spolupráca:

**Trojstranné partnerstvo:**
1. **Výrobca Styrcon** - stabilné technické a výrobné zázemie
2. **E-MA SK** - distribúcia a technická podpora
3. **Odberateľ** - porozumenie hodnote a kvality

### Predvídateľnosť a plánovanie
**Výhody stabilnej cenovej politiky:**
- Ľahšie kalkulovanie projektov
- Predvídateľnosť rozpočtov
- Možnosť dlhodobého plánovania
- Minimalizácia investičných rizík

## Hodnota namiesto ceny

### Total Cost of Ownership (TCO)
Pri vyhodnocovaní zatepľovacích systémov je potrebné pozerať na:

**Počiatočné náklady:**
- Cena materiálu
- Náklady na aplikáciu
- Potrebné nástroje a príslušenstvo

**Prevádzkové náklady:**
- Úspory na vykurovaní
- Minimálna údržba
- Dlhá životnosť bez výmeny

**Skryté náklady:**
- Riziko poškodení pri nekvalitnom materiáli
- Náklady na opravy a renovácie
- Straty z výpadkov tepelnej izolácie

### ROI (Return on Investment)
**STYRCON výhody:**
- Rýchla návratnosť investície
- Významné úspory energie
- Zvýšenie hodnoty nehnuteľnosti
- Eliminacia problémov s vlhkosťou

## Technologické výhody = ekonomické výhody

### Paropriepustnosť
- **Eliminácia sanačných prác** - úspora nákladov na sanáciu
- **Zdravé vnútorné prostredie** - úspora na zdravotníctve
- **Dlhá životnosť konštrukcie** - úspora na renováciách

### Nehorľavosť
- **Nižšie poistné** - úspory na poistení nehnuteľnosti
- **Vyššia bezpečnosť** - ochrana investície
- **Súlad s prísnou legislatívou** - bez dodatočných nákladov

### Sanačné vlastnosti
- **Riešenie vlhkých múrov** - bez potreby sanácie
- **Univerzálne použitie** - jeden materiál pre rôzne aplikácie
- **Technická podpora** - zahrnutá v cene

## Trhové trendy

### Rastúci dopyt po kvalite
**Zmena myslenia zákazníkov:**
- Od najlacnejšieho k najvýhodnejšiemu riešeniu
- Dôraz na energetickú efektívnosť
- Požiadavky na dlhodobú spoľahlivosť
- Environmentálne aspekty

### Regulačné zmeny
**Prísnejšie normy:**
- Požiadavky na energetickú náročnosť budov
- Protipožiarne predpisy
- Environmentálne štandardy
- Kvalita vnútorného prostredia

## Budúcnost cenových politík

### Naše záväzky
**Dlhodobé ciele:**
- Zachovanie cenovej stability v rámci možností
- Transparentná komunikácia cenových zmien
- Včasné informovanie o plánovaných úpravách
- Flexibilita pri väčších projektoch

**Investície do efektívnosti:**
- Optimalizácia výrobných procesov
- Logistické zlepšenia
- Technologické inovácie
- Rozšírenie produktového portfólia

### Odporúčania pre zákazníkov

**Strategické nákupy:**
- Plánovanie väčších projektov dopredu
- Využívanie cenových garantov na dlhšie obdobia
- Konzultácie s našimi technickými poradcami
- Zvažovanie komplexných riešení

**Hodnotenie investícií:**
- Posudzovanie TCO namiesto len počiatočnej ceny
- Zohľadnenie energetických úspor
- Výpočet návratnosti investície
- Porovnanie s konkurenciou na báze hodnoty

## Záver

Cenový vývoj STYRCON-u odráža našu filozofiu dlhodobého partnerstva a zodpovedného prístupu k zákazníkom. Aj keď sme nemohli úplne uniknúť globálnym cenovým trendom, naše navýšenie je výrazne nižšie ako u konkurencie a stále poskytuje vynikajúcu hodnotu za peniaze.

Investícia do STYRCON systému nie je len nákupom zatepľovacieho materiálu, ale investíciou do kvality, spoľahlivosti a dlhodobých úspor. Verné sú slová múdrych ľudí - nie sme takí bohatí, aby sme kupovali lacné veci.

*Pre podrobné cenové ponuky a kalkulácie úspor nás kontaktujte na našej [kontaktnej stránke](/kontakt).*`
  }
};

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts[params.slug];
  
  if (!post) {
    return {
      title: 'Článok nenájdený | STYRCON Blog',
      description: 'Požadovaný článok nebol nájdený.',
    };
  }
  
  return {
    title: `${post.title} | STYRCON Blog | E-MA SK`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts[params.slug];
  
  if (!post) {
    notFound();
  }
  
  const categoryLabels: Record<string, string> = {
    'technicke': 'Technické články',
    'zateplovanie': 'Zatepľovanie',
    'sanacia': 'Sanácia',
    'prakticke': 'Praktické rady'
  };

  return (
    <div className="pt-16">
      {/* Breadcrumb */}
      <div className="bg-slate-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-600 hover:text-primary">
              Domov
            </Link>
            <span className="text-slate-400">/</span>
            <Link href="/aktuality" className="text-slate-600 hover:text-primary">
              Aktuality
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="ghost" className="pl-0">
              <Link href="/aktuality">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Späť na články
              </Link>
            </Button>
          </div>

          {/* Article Meta */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('sk-SK', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  {categoryLabels[post.category]}
                </span>
              </div>
            </div>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] mb-8 rounded-xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg prose-slate max-w-none
                          prose-headings:font-bold prose-headings:text-slate-900
                          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                          prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-4
                          prose-ul:my-4 prose-li:text-slate-700
                          prose-strong:text-slate-900 prose-strong:font-semibold
                          prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-bold text-slate-900 mt-6 mb-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h4 key={index} className="text-lg font-semibold text-slate-900 mt-4 mb-2">
                    {paragraph.replace(/\*\*/g, '')}
                  </h4>
                );
              }
              if (paragraph.startsWith('- ') || paragraph.includes('\n- ')) {
                const items = paragraph.split('\n').filter(item => item.startsWith('- '));
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 my-4 text-slate-700">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                return (
                  <p key={index} className="text-slate-600 italic bg-slate-50 p-4 rounded-lg border-l-4 border-primary/30 my-6">
                    {paragraph.replace(/^\*/, '').replace(/\*$/, '').replace(/\[kontaktnej stránky\]\(\/kontakt\)/, 'kontaktnej stránky')}
                  </p>
                );
              }
              return (
                <p key={index} className="text-slate-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Article Tags */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex justify-between items-center">
              <Button asChild variant="outline">
                <Link href="/aktuality">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Všetky články
                </Link>
              </Button>
              
              <Button asChild>
                <Link href="/kontakt">
                  Kontaktovať nás
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}