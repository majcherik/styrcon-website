import type { Metadata } from "next";
import { Construction } from "lucide-react";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov",
  description: "Informácie o ochrane osobných údajov a spracovaní cookies na webovej stránke STYRCON.",
};

export default function OchranaOsobnychUdajovPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-6">
              <Construction className="h-16 w-16 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ochrana osobných údajov
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Stránka je v príprave
          </p>

          {/* Description */}
          <div className="bg-background dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Pracujeme na detailnej stránke s informáciami o ochrane osobných údajov,
              spracovaní cookies a vašich právach podľa GDPR.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Táto stránka bude čoskoro k dispozícii.
            </p>
          </div>

          {/* Contact Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              V prípade otázok týkajúcich sa ochrany osobných údajov nás kontaktujte:
            </p>
            <a
              href="/kontakt"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Kontaktná stránka
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
