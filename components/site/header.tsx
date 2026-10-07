'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Menu, Phone, X } from 'lucide-react'
import { contact, whatsappLink } from '@/lib/site-data'
import { InstagramMark, Logo, WhatsappMark } from './icons'
import { useLockBody, useScrolled } from './use-site-effects'

export type NavItem = { label: string; href: string; onSelect?: () => void }

export function Header({ items }: { items: NavItem[] }) {
  const scrolled = useScrolled(40)
  const [open, setOpen] = useState(false)
  useLockBody(open)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled && !open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color,padding] duration-500 ease-soft ${
        solid ? 'bg-cream/90 text-ink shadow-[0_1px_0_rgba(30,33,29,.08)] backdrop-blur-md' : 'bg-transparent text-white'
      }`}
    >
      <div className={`mx-auto flex max-w-[1380px] items-center justify-between gap-6 px-5 transition-[padding] duration-500 sm:px-6 lg:px-10 ${solid ? 'py-3' : 'py-5'}`}>
        <a href="#inicio" className="group relative z-[2]" aria-label="Arpoador Imóveis — início" onClick={() => setOpen(false)}>
          <Logo tone={solid ? 'dark' : 'light'} />
        </a>

        <nav className="hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-[.16em] xl:flex" aria-label="Navegação principal">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={item.onSelect}
              className={`group relative py-2 transition-colors ${solid ? 'hover:text-bronze' : 'hover:text-sand'}`}
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-soft group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 xl:flex">
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram da Arpoador Imóveis"
            className={`flex size-10 items-center justify-center rounded-full border transition ${solid ? 'border-ink/15 hover:border-ink hover:bg-ink hover:text-cream' : 'border-white/30 hover:border-white hover:bg-white hover:text-ink'}`}
          >
            <InstagramMark />
          </a>
          <a
            href={whatsappLink('Olá! Gostaria de saber mais sobre os imóveis disponíveis.')}
            target="_blank"
            rel="noreferrer"
            className={`group inline-flex items-center gap-2 rounded-full px-5 py-3 text-[10px] font-semibold uppercase tracking-[.16em] transition active:scale-[.98] ${
              solid ? 'bg-moss text-white hover:bg-moss-soft' : 'bg-sand text-ink hover:bg-white'
            }`}
          >
            <WhatsappMark /> Falar no WhatsApp <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          type="button"
          className={`relative z-[2] flex size-11 items-center justify-center rounded-full border transition xl:hidden ${open ? 'border-white/30 text-white' : solid ? 'border-ink/15' : 'border-white/30'}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menu mobile/tablet */}
      <div
        className={`fixed inset-0 z-[1] bg-moss-deep text-white transition-[opacity,visibility] duration-500 ease-soft xl:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-28 sm:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[.24em] text-sand">Menu</p>
          <nav className="mt-6 flex flex-col" aria-label="Navegação mobile">
            {items.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  item.onSelect?.()
                  setOpen(false)
                }}
                style={{ transitionDelay: open ? `${120 + i * 45}ms` : '0ms' }}
                className={`flex items-center justify-between border-b border-white/10 py-4 font-serif text-[28px] leading-none transition duration-500 ease-soft hover:text-sand sm:text-4xl ${open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
              >
                {item.label}
                <ArrowRight size={18} className="text-white/40" />
              </a>
            ))}
          </nav>
          <div className={`mt-auto grid gap-3 pt-10 transition duration-500 ${open ? 'opacity-100 delay-300' : 'opacity-0'}`}>
            <a
              href={whatsappLink('Olá! Gostaria de saber mais sobre os imóveis disponíveis.')}
              target="_blank"
              rel="noreferrer"
              tabIndex={open ? 0 : -1}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sand px-6 py-4 text-[11px] font-semibold uppercase tracking-[.16em] text-ink active:scale-[.98]"
            >
              <WhatsappMark /> Falar no WhatsApp
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a href={contact.phoneHref} tabIndex={open ? 0 : -1} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[.14em]">
                <Phone size={15} /> Ligar
              </a>
              <a href={contact.instagramUrl} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[.14em]">
                <InstagramMark /> Instagram
              </a>
            </div>
            <p className="pt-3 text-center text-xs text-white/50">
              {contact.street} · {contact.district}, {contact.city}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
