'use client'

import { useCallback, useEffect, useState } from 'react'
import { CalendarCheck, Check, ChevronLeft, ChevronRight, MapPin, ShieldCheck, X } from 'lucide-react'
import { formatPrice, whatsappLink, type Property } from '@/lib/site-data'
import { PropertySpecs } from './property-card'
import { WhatsappMark } from './icons'
import { useLockBody } from './use-site-effects'

export function PropertyModal({ property, onClose }: { property: Property; onClose: () => void }) {
  const [index, setIndex] = useState(0)
  const total = property.images.length
  const price = formatPrice(property)

  useLockBody(true)

  const go = useCallback((step: number) => setIndex((current) => (current + step + total) % total), [total])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  const label = `${property.title} — ${property.neighborhood}, ${property.city}`

  return (
    <div
      className="animate-overlay fixed inset-0 z-[70] flex items-end justify-center bg-[#111611]/70 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="animate-sheet relative max-h-[94dvh] w-full max-w-6xl overflow-y-auto rounded-t-2xl bg-paper shadow-2xl sm:rounded-[2px]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes"
          className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-full bg-paper/95 text-ink shadow-sm transition hover:rotate-90 hover:bg-white"
        >
          <X size={18} />
        </button>

        <div className="grid lg:grid-cols-[1.25fr_1fr]">
          {/* Galeria */}
          <div className="bg-moss">
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[560px]">
              {property.images.map((src, i) => (
                <img
                  key={src + i}
                  src={src}
                  alt={`Foto ${i + 1} de ${total} — ${label}`}
                  className={`absolute inset-0 size-full object-cover transition duration-700 ease-soft ${i === index ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0'}`}
                />
              ))}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent" />
              {total > 1 && (
                <>
                  <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className="absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink transition hover:bg-white active:scale-95">
                    <ChevronLeft size={20} />
                  </button>
                  <button type="button" onClick={() => go(1)} aria-label="Próxima foto" className="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink transition hover:bg-white active:scale-95">
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <div className="flex gap-2">
                  {property.images.map((src, i) => (
                    <button
                      key={'thumb' + src + i}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Ver foto ${i + 1}`}
                      className={`h-11 w-14 overflow-hidden border-2 transition sm:h-12 sm:w-16 ${i === index ? 'border-sand' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    >
                      <img src={src.replace('w=1400', 'w=200')} alt="" className="size-full object-cover" />
                    </button>
                  ))}
                </div>
                <span className="rounded-full bg-black/45 px-3 py-1 text-[11px] font-semibold tracking-[.12em] text-white">
                  {index + 1} / {total}
                </span>
              </div>
            </div>
          </div>

          {/* Informações */}
          <div className="p-6 sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-bronze">
              {property.type} · {property.status}
            </p>
            <h2 className="mt-3 pr-10 font-serif text-3xl leading-[1.05] tracking-[-.02em] text-ink sm:text-4xl">{property.title}</h2>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-stone">
              <MapPin size={15} className="text-bronze" /> {property.neighborhood}, {property.city}
            </p>

            <div className="mt-7 flex items-baseline gap-2">
              <p className="font-serif text-4xl text-ink">{price.value}</p>
              {price.suffix && <span className="text-sm text-stone">{price.suffix}</span>}
            </div>

            <div className="mt-7 border-y border-line py-5">
              <PropertySpecs property={property} size="lg" />
              {property.note && <p className="mt-3 text-sm text-stone">{property.note}</p>}
            </div>

            <p className="mt-7 text-[15px] leading-7 text-stone">{property.description}</p>

            <h3 className="mt-8 text-[11px] font-semibold uppercase tracking-[.18em] text-ink">Destaques do imóvel</h3>
            <ul className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2.5 text-sm text-ink sm:grid-cols-2">
              {property.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check size={15} className="shrink-0 text-bronze" /> {feature}
                </li>
              ))}
            </ul>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <a
                href={whatsappLink(`Olá! Tenho interesse no imóvel "${property.title}" (${property.neighborhood} · cód. ${String(property.id).padStart(3, '0')}). Pode me passar mais informações?`)}
                target="_blank"
                rel="noreferrer"
                className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-moss px-5 py-4 text-[11px] font-semibold uppercase tracking-[.14em] text-white transition hover:bg-moss-soft active:scale-[.98]"
              >
                <WhatsappMark /> Tenho interesse
              </a>
              <a
                href={whatsappLink(`Olá! Gostaria de agendar uma visita ao imóvel "${property.title}" (${property.neighborhood} · cód. ${String(property.id).padStart(3, '0')}).`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c9c6bc] px-5 py-4 text-[11px] font-semibold uppercase tracking-[.14em] text-ink transition hover:border-ink hover:bg-cream active:scale-[.98]"
              >
                <CalendarCheck size={15} /> Agendar visita
              </a>
            </div>
            <p className="mt-6 flex items-center gap-2 text-xs text-stone">
              <ShieldCheck size={16} className="text-bronze" /> Código do imóvel: {String(property.id).padStart(3, '0')} · Atendimento seguro e personalizado
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
