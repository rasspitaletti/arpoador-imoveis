'use client'

import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, Bath, BedDouble, CarFront, MapPin, Ruler } from 'lucide-react'
import { formatPrice, type Property } from '@/lib/site-data'

const statusTone: Record<Property['status'], string> = {
  Venda: 'bg-moss text-white',
  Locação: 'bg-sand text-ink',
  Lançamento: 'bg-ink text-sand',
}

export function PropertySpecs({ property, size = 'sm' }: { property: Property; size?: 'sm' | 'lg' }) {
  const icon = size === 'lg' ? 18 : 15
  const items = [
    property.beds > 0 && { icon: <BedDouble size={icon} />, label: `${property.beds} ${property.beds === 1 ? 'quarto' : 'quartos'}` },
    property.baths > 0 && { icon: <Bath size={icon} />, label: `${property.baths} ${property.baths === 1 ? 'banheiro' : 'banheiros'}` },
    property.parking > 0 && { icon: <CarFront size={icon} />, label: `${property.parking} ${property.parking === 1 ? 'vaga' : 'vagas'}` },
    { icon: <Ruler size={icon} />, label: `${property.area} m²` },
  ].filter(Boolean) as { icon: ReactNode; label: string }[]

  return (
    <ul className={size === 'lg' ? 'grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-stone' : 'flex flex-wrap gap-x-4 gap-y-2 text-xs text-stone'}>
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="text-bronze">{item.icon}</span>
          {item.label}
        </li>
      ))}
      {size === 'sm' && property.note && items.length === 1 && <li className="whitespace-nowrap">{property.note}</li>}
    </ul>
  )
}

export function PropertyCard({ property, onOpen, priority = false }: { property: Property; onOpen: (p: Property) => void; priority?: boolean }) {
  const price = formatPrice(property)
  return (
    <article className="group h-full">
      <button
        type="button"
        onClick={() => onOpen(property)}
        className="flex h-full w-full flex-col overflow-hidden rounded-[2px] border border-line/70 bg-paper text-left shadow-[0_1px_0_rgba(28,34,28,.04)] transition duration-500 ease-soft hover:-translate-y-1 hover:border-[#cfc6b3] hover:shadow-[0_24px_50px_-20px_rgba(28,34,28,.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-moss"
        aria-label={`Ver detalhes: ${property.title}, ${property.neighborhood}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#ddd9cf]">
          <img
            src={property.images[0]}
            alt={`${property.type} em ${property.neighborhood}, ${property.city}`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="size-full object-cover transition duration-[1100ms] ease-soft group-hover:scale-[1.06]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111611]/45 via-transparent to-transparent opacity-70 transition duration-500 group-hover:opacity-100" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className={`px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] ${statusTone[property.status]}`}>{property.status}</span>
            {property.badge && <span className="bg-cream/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-ink">{property.badge}</span>}
          </div>
          <span className="absolute bottom-4 left-4 text-[11px] font-semibold uppercase tracking-[.16em] text-white/90">{property.images.length} fotos</span>
          <span className="absolute bottom-4 right-4 flex size-10 translate-y-2 items-center justify-center rounded-full bg-white text-ink opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={17} />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-bronze">{property.type}</p>
          <h3 className="mt-2 font-serif text-[22px] leading-[1.15] tracking-[-.01em] text-ink">{property.title}</h3>
          <p className="mt-2 flex items-center gap-1.5 text-[13px] text-stone">
            <MapPin size={14} className="shrink-0 text-bronze" /> {property.neighborhood}, {property.city}
          </p>
          <div className="mt-5 border-t border-line pt-4">
            <PropertySpecs property={property} />
          </div>
          <div className="mt-auto flex items-end justify-between gap-3 pt-6">
            <p className="font-serif text-2xl leading-none text-ink">
              {price.value}
              {price.suffix && <span className="ml-1 font-sans text-xs text-stone">{price.suffix}</span>}
            </p>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[.14em] text-moss">
              Detalhes <ArrowRight size={14} className="transition duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </button>
    </article>
  )
}
