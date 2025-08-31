"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "STYRCON 200®",
    description: "polystyrén-cementová tepelno-izolačná kompozitná doska",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="https://www.e-ma.sk/imgcache/styrcon-200-e-img-159-5-800-600-0-ffffff.jpg?v=1632745931"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="STYRCON 200® doska"
        />
      </div>
    ),
  },
  {
    title: "LEPSTYR (25kg)",
    description: "lepiaca armovacia stierka na Styrcon",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="https://www.styrcon.sk/obchod_homedir/data/2430/obrazky/lepstyr-s.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="LEPSTYR lepiaca stierka"
        />
      </div>
    ),
  },
  {
    title: "PENESTYR (5kg/1kg)",
    description: "penetračný náter pre zatepľovací systém Styrexon",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="https://www.e-ma.sk/imgcache/penestyr-5kg1kg-e-img-162-5-800-600-0-ffffff.jpg?v=1632745939"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="PENESTYR penetračný náter"
        />
      </div>
    ),
  },
  {
    title: "TANIEROVÁ HMOŽDINKA",
    description: "hmoždinka na kotvenie dosiek Styrcon",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="https://www.styrcon.sk/obchod_homedir/data/2430/obrazky/male_obrazky/hmozdinka-s.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Tanierová hmoždinka"
        />
      </div>
    ),
  },
  {
    title: "SKLOKERAMICKÁ MRIEŽKA",
    description: "sklotextílna sieťka na armovanie zatepľovacieho systému",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="https://www.styrcon.sk/obchod_homedir/data/2430/obrazky/male_obrazky/sietka-s.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Sklokeramická mriežka"
        />
      </div>
    ),
  },
];

export function StyrexonSystemSection() {
  return (
    <section className="bg-white">
      <div className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-lg">
              Systémové komponenty
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6">
              STYREXON sa skladá z
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Objavte všetky komponenty zatepľovacieho systému STYREXON, ktoré spoločne vytvárajú komplexné riešenie pre tepelnú izoláciu.
            </p>
          </div>
        </div>
      </div>
      <StickyScroll content={content} />
    </section>
  );
}