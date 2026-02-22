import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'

interface Feature {
  name: string
  included: boolean
}

interface PricingCardProps {
  name: string
  price: string | number
  description: string
  features: Feature[]
  highlighted?: boolean
  ctaText?: string
  ctaLink?: string
}

export function PricingCard({
  name,
  price,
  description,
  features,
  highlighted = false,
  ctaText = 'Get Started',
  ctaLink = '/signup',
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-lg border p-8 space-y-6 transition-all ${
        highlighted
          ? 'bg-primary text-primary-foreground border-primary scale-105'
          : 'bg-card border-border hover:shadow-lg'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-foreground text-primary text-xs font-semibold rounded-full">
          Most Popular
        </div>
      )}
      <div className="space-y-2">
        <h3 className={`text-xl font-semibold ${highlighted ? 'text-primary-foreground' : 'text-foreground'}`}>
          {name}
        </h3>
        <p className={highlighted ? 'text-primary-foreground/80' : 'text-muted-foreground'}>
          {description}
        </p>
      </div>

      <div className="space-y-1">
        <div className="text-4xl font-bold">{price}</div>
        <p className={`text-sm ${highlighted ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
          per month, billed monthly
        </p>
      </div>

      <Button asChild className={highlighted ? '' : 'w-full'} variant={highlighted ? 'secondary' : 'default'}>
        <Link href={ctaLink}>{ctaText}</Link>
      </Button>

      <div className="space-y-3 pt-4 border-t border-current border-opacity-20">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            {feature.included ? (
              <Check size={20} className={highlighted ? 'text-primary-foreground' : 'text-primary'} />
            ) : (
              <div className="w-5 h-5" />
            )}
            <span
              className={`text-sm ${
                feature.included
                  ? highlighted
                    ? 'text-primary-foreground'
                    : 'text-foreground'
                  : highlighted
                    ? 'text-primary-foreground/50'
                    : 'text-muted-foreground'
              }`}
            >
              {feature.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
