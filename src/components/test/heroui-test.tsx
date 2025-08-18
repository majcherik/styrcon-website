'use client';

import { Button, Card, CardBody, CardHeader, Badge, Chip } from '@heroui/react';
import { ArrowRight, Star, Shield } from 'lucide-react';

export function HeroUITest() {
  return (
    <div className="p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">🎨 HeroUI STYRCON Theme Test</h2>
        <p className="text-foreground/70">
          Testing HeroUI components with custom STYRCON theme colors
        </p>
      </div>

      {/* Button Tests */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Button Variations</h3>
        <div className="flex flex-wrap gap-4">
          <Button color="primary" variant="solid">
            Primary Button
          </Button>
          <Button color="secondary" variant="solid">
            Secondary Button
          </Button>
          <Button color="primary" variant="bordered">
            Bordered Primary
          </Button>
          <Button color="primary" variant="light">
            Light Primary
          </Button>
          <Button color="primary" variant="ghost">
            Ghost Primary
          </Button>
          <Button color="primary" isDisabled>
            Disabled Button
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Action Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button color="success" startContent={<Shield className="w-4 h-4" />}>
            Success Action
          </Button>
          <Button color="warning" endContent={<ArrowRight className="w-4 h-4" />}>
            Warning Action
          </Button>
          <Button color="danger" variant="bordered">
            Danger Action
          </Button>
        </div>
      </div>

      {/* Card Tests */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Card Components</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <p className="text-md font-semibold">STYRCON Product</p>
                <p className="text-small text-default-500">Thermal insulation</p>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-foreground/80">
                Nehorľavé paropriepustné tepelnoizolačné dosky triedy A1 
                pre profesionálne zateplenie budov.
              </p>
            </CardBody>
          </Card>

          <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              <div className="p-2 bg-secondary/10 rounded-full">
                <Star className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex flex-col">
                <p className="text-md font-semibold">Quality Assurance</p>
                <p className="text-small text-default-500">CE certified</p>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-foreground/80">
                Všetky naše produkty sú certifikované podľa európskych 
                štandardov a spĺňajú najvyššie požiadavky na kvalitu.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Badges and Chips */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Badges & Chips</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Badge content="A1" color="danger" variant="solid">
            <Chip color="default">Fire Class</Chip>
          </Badge>
          <Badge content="CE" color="success" variant="solid">
            <Chip color="primary">Certified</Chip>
          </Badge>
          <Chip color="secondary" variant="bordered">STYRCON</Chip>
          <Chip color="success" variant="flat">In Stock</Chip>
          <Chip color="warning" variant="dot">Limited</Chip>
        </div>
      </div>

      {/* Theme Info */}
      <div className="bg-default/50 p-4 rounded-lg">
        <h4 className="font-semibold text-foreground mb-2">Theme Information</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-primary text-primary-foreground p-2 rounded text-center">Primary</div>
          <div className="bg-secondary text-secondary-foreground p-2 rounded text-center">Secondary</div>
          <div className="bg-success text-success-foreground p-2 rounded text-center">Success</div>
          <div className="bg-warning text-warning-foreground p-2 rounded text-center">Warning</div>
        </div>
      </div>
    </div>
  );
}