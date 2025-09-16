'use client'

import {
  OrganizationProfile,
  OrganizationSwitcher,
  CreateOrganization,
  useOrganization,
  useOrganizationList
} from '@clerk/nextjs'
import { Building2, Plus, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface OrganizationWrapperProps {
  children: React.ReactNode
  showSwitcher?: boolean
  showCreateButton?: boolean
}

/**
 * Organization wrapper component for multi-tenant features
 */
export function OrganizationWrapper({
  children,
  showSwitcher = true,
  showCreateButton = true
}: OrganizationWrapperProps) {
  const { organization, isLoaded } = useOrganization()
  const { organizationList } = useOrganizationList()
  const [showCreateOrg, setShowCreateOrg] = useState(false)
  const [showOrgProfile, setShowOrgProfile] = useState(false)

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Organization Controls */}
      <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <Building2 className="h-5 w-5 text-slate-600" />
          <div>
            <h3 className="font-medium text-slate-900">
              {organization ? organization.name : 'Žiadna organizácia'}
            </h3>
            <p className="text-sm text-slate-600">
              {organization
                ? `${organization.membersCount} členov`
                : 'Nie ste členom žiadnej organizácie'
              }
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {showSwitcher && organizationList && organizationList.length > 0 && (
            <OrganizationSwitcher
              appearance={{
                elements: {
                  organizationSwitcherTrigger: "border border-slate-300 hover:bg-slate-50",
                  organizationPreview: "text-slate-900",
                  organizationSwitcherPopoverCard: "shadow-lg border border-slate-200",
                },
              }}
            />
          )}

          {showCreateButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCreateOrg(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Vytvoriť organizáciu
            </Button>
          )}

          {organization && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowOrgProfile(true)}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Nastavenia
            </Button>
          )}
        </div>
      </div>

      {/* Create Organization Modal */}
      {showCreateOrg && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Vytvoriť novú organizáciu</h2>
              <Button
                variant="ghost"
                onClick={() => setShowCreateOrg(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </Button>
            </div>
            <CreateOrganization
              afterCreateOrganizationUrl="/profil"
              appearance={{
                elements: {
                  formButtonPrimary: "bg-primary hover:bg-primary/90",
                  card: "shadow-none border-0",
                }
              }}
            />
          </div>
        </div>
      )}

      {/* Organization Profile Modal */}
      {showOrgProfile && organization && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Nastavenia organizácie</h2>
              <Button
                variant="ghost"
                onClick={() => setShowOrgProfile(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </Button>
            </div>
            <OrganizationProfile
              appearance={{
                elements: {
                  formButtonPrimary: "bg-primary hover:bg-primary/90",
                  card: "shadow-none border-0",
                  navbar: "bg-slate-50",
                  navbarButton: "text-slate-700 hover:bg-slate-100",
                }
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      {children}
    </div>
  )
}

/**
 * Organization statistics component
 */
export function OrganizationStats() {
  const { organization, memberships } = useOrganization()

  if (!organization) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">Celkovo členov</p>
            <p className="text-2xl font-bold text-slate-900">
              {organization.membersCount}
            </p>
          </div>
          <Building2 className="h-8 w-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">Aktívni členovia</p>
            <p className="text-2xl font-bold text-slate-900">
              {memberships?.count || 0}
            </p>
          </div>
          <Building2 className="h-8 w-8 text-green-500" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">Vytvorená</p>
            <p className="text-lg font-medium text-slate-900">
              {organization.createdAt
                ? new Date(organization.createdAt).toLocaleDateString('sk-SK')
                : 'N/A'
              }
            </p>
          </div>
          <Building2 className="h-8 w-8 text-purple-500" />
        </div>
      </div>
    </div>
  )
}