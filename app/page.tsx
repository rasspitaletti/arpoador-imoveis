'use client'

import { useCallback, useMemo, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Award,
  Building2,
  Check,
  ChevronDown,
  Clock,
  Handshake,
  KeyRound,
  Landmark,
  MapPin,
  Navigation,
  Phone,
  Quote,
  Scale,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Users,
} from 'lucide-react'
import { Header, type NavItem } from '@/components/site/header'
import { InstagramMark, Logo, WhatsappMark } from '@/components/site/icons'
import { PropertyCard } from '@/components/site/property-card'
import { PropertyModal } from '@/components/site/property-modal'
import { useReveal, useScrolled } from '@/components/site/use-site-effects'
import {
  categories,
  contact,
  formatPrice,
  image,
  mapsDirectionsUrl,
  mapsEmbedUrl,
  mapsSearchUrl,
  properties,
  regions,
  testimonials,
  whatsappLink,
  type Category,
  type Property,
} from '@/lib/site-data'

type Purpose = 'Todos' | 'Comprar' | 'Alugar'
const PAGE_SIZE = 6

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

function Eyebrow({ children, tone = 'dark' }: { children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <p className={`mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.24em] ${tone === 'dark' ? 'text-bronze' : 'text-sand'}`}>
      <span className={`h-px w-8 ${tone === 'dark' ? 'bg-bronze/60' : 'bg-sand/60'}`} />
      {children}
    </p>
  )
}

function Stars({ className = '' }: { className?: string }) {
  return (
    <span className={`flex gap-0.5 ${className}`} aria-label="Avaliação 5 de 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  )
}

const matchesPurpose = (property: Property, purpose: Purpose) =>
  purpose === 'Todos' || (purpose === 'Alugar' ? property.status === 'Locação' : property.status !== 'Locação')

export default function Page() {
  useReveal()
  const showFloating = useScrolled(640)

  const [purpose, setPurpose] = useState<Purpose>('Todos')
  const [category, setCategory] = useState<'Todos' | Category>('Todos')
  const [region, setRegion] = useState('Todas')
  const [search, setSearch] = useState('')
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [selected, setSelected] = useState<Property | null>(null)

  const openProperty = useCallback((property: Property) => setSelected(property), [])
  const closeProperty = useCallback(() => setSelected(null), [])

  const neighborhoods = useMemo(() => [...new Set(properties.map((p) => p.neighborhood))].sort((a, b) => a.localeCompare(b)), [])

  const baseFiltered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return properties.filter(
      (p) =>
        matchesPurpose(p, purpose) &&
        (region === 'Todas' || p.neighborhood === region) &&
        (!term || `${p.title} ${p.type} ${p.neighborhood} ${p.city}`.toLowerCase().includes(term)),
    )
  }, [purpose, region, search])

  const filtered = useMemo(
    () =>
      baseFiltered
        .filter((p) => category === 'Todos' || p.category === category)
        .sort((a, b) => Number(!!a.featured) - Number(!!b.featured)),
    [baseFiltered, category],
  )
  const countFor = (name: 'Todos' | Category) => (name === 'Todos' ? baseFiltered.length : baseFiltered.filter((p) => p.category === name).length)

  const featured = properties.filter((p) => p.featured)
  const heroProperty = featured[0]

  const resetFilters = () => {
    setPurpose('Todos')
    setCategory('Todos')
    setRegion('Todas')
    setSearch('')
    setVisible(PAGE_SIZE)
  }

  const goToListing = () => document.getElementById('todos-imoveis')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const choosePurpose = (value: Purpose) => {
    setPurpose(value)
    setVisible(PAGE_SIZE)
  }
  const chooseCategory = (value: 'Todos' | Category) => {
    setCategory(value)
    setVisible(PAGE_SIZE)
  }

  const navItems: NavItem[] = [
    { label: 'Imóveis', href: '#imoveis' },
    { label: 'Comprar', href: '#todos-imoveis', onSelect: () => choosePurpose('Comprar') },
    { label: 'Alugar', href: '#todos-imoveis', onSelect: () => choosePurpose('Alugar') },
    { label: 'Anuncie', href: '#venda' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
  ]

  return (
    <main className="min-h-screen overflow-x-clip bg-cream text-ink">
      <Header items={navItems} />

      {/* ——— HERO ——— */}
      <section id="inicio" className="relative isolate flex min-h-[680px] items-end overflow-hidden bg-moss pb-32 pt-32 text-white sm:min-h-[740px] lg:min-h-[780px] xl:min-h-[860px] lg:pb-40">
        <img
          src={image('photo-1600585154340-be6161a56a0c', 2000)}
          alt="Casa contemporânea cercada por vegetação"
          fetchPriority="high"
          className="animate-settle absolute inset-0 -z-10 size-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#111611]/90 via-[#1c261d]/45 to-[#111611]/10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1e211d]/85 via-transparent to-[#111611]/35" />

        <div className="mx-auto grid w-full max-w-[1380px] items-end gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-10">
          <div className="max-w-3xl">
            <h1 className="animate-rise max-w-3xl font-serif text-[46px] font-light leading-[1.02] tracking-[-.025em] sm:text-[64px] lg:text-[84px]" style={delay(120)}>
              Encontre o imóvel que combina com o seu <em className="font-normal text-sand">momento</em>.
            </h1>
            <p className="animate-rise mt-8 max-w-[34rem] text-base leading-[1.75] text-white/75 sm:text-[17px]" style={delay(260)}>
              Atendimento personalizado para você comprar, vender ou alugar em São Paulo com segurança, transparência e tranquilidade.
            </p>
            <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={delay(380)}>
              <a href="#imoveis" className="group inline-flex items-center justify-center gap-3 rounded-full bg-sand px-7 py-4 text-xs font-semibold uppercase tracking-[.14em] text-ink transition hover:bg-white active:scale-[.98]">
                Ver imóveis <ArrowDownRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
              <a
                href={whatsappLink('Olá! Gostaria de falar com um consultor sobre um imóvel.')}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/40 px-7 py-4 text-xs font-semibold uppercase tracking-[.14em] backdrop-blur-[2px] transition hover:border-white hover:bg-white/10 active:scale-[.98]"
              >
                <WhatsappMark /> Falar com um consultor
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
            <div className="animate-rise mt-10 flex items-center gap-3 text-xs text-white/70 lg:hidden" style={delay(560)}>
              <Stars className="text-sand" /> 346 avaliações no Google
            </div>
          </div>

          {/* Cartão flutuante — inspirado na composição da referência */}
          {heroProperty && (
            <div className="animate-rise hidden w-[340px] lg:block" style={delay(620)}>
              <div className="mb-3 ml-auto flex w-fit items-center gap-3 rounded-full border border-white/15 bg-[#111611]/40 px-4 py-2.5 text-xs text-white/85 backdrop-blur-md">
                <Stars className="text-sand" /> <span>346 avaliações no Google</span>
              </div>
              <button
                type="button"
                onClick={() => openProperty(heroProperty)}
                className="group block w-full overflow-hidden rounded-[2px] border border-white/15 bg-[#111611]/45 text-left shadow-[0_30px_80px_-20px_rgba(0,0,0,.6)] backdrop-blur-md transition duration-500 ease-soft hover:-translate-y-1 hover:border-white/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={heroProperty.images[0].replace('w=1400', 'w=800')} alt={heroProperty.title} className="size-full object-cover transition duration-1000 ease-soft group-hover:scale-105" />
                  <span className="absolute left-3 top-3 bg-sand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.14em] text-ink">Em destaque</span>
                </div>
                <div className="flex items-end justify-between gap-4 p-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-sand">{heroProperty.neighborhood} · {heroProperty.city}</p>
                    <p className="mt-1.5 font-serif text-xl leading-tight">{heroProperty.title}</p>
                    <p className="mt-2 text-sm text-white/70">{formatPrice(heroProperty).value}</p>
                  </div>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-ink transition duration-300 group-hover:bg-sand">
                    <ArrowUpRight size={17} />
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ——— BUSCA ——— */}
      <section className="relative z-10 mx-auto -mt-20 max-w-[1180px] px-4 sm:px-6" aria-label="Busca de imóveis">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            setVisible(PAGE_SIZE)
            goToListing()
          }}
          className="animate-rise rounded-[2px] bg-paper p-5 shadow-[0_24px_70px_rgba(28,34,28,.14)] sm:p-7 md:p-8"
          style={delay(700)}
        >
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="font-serif text-2xl leading-tight sm:text-[28px]">Encontre seu próximo endereço</h2>
            <span className="hidden text-[11px] font-semibold uppercase tracking-[.18em] text-bronze md:block">
              {filtered.length} {filtered.length === 1 ? 'imóvel disponível' : 'imóveis disponíveis'}
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1.05fr_1.2fr_1fr_1fr_auto]">
            <div className="flex rounded-[2px] border border-line p-1" role="group" aria-label="Finalidade">
              {(['Todos', 'Comprar', 'Alugar'] as Purpose[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => choosePurpose(item)}
                  aria-pressed={purpose === item}
                  className={`flex-1 rounded-[2px] px-3 py-3 text-xs font-semibold transition duration-300 ${purpose === item ? 'bg-moss text-white shadow-sm' : 'text-stone hover:text-ink'}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 border border-line px-4 text-xs text-stone transition focus-within:border-moss">
              <Search size={15} className="shrink-0" />
              <span className="sr-only">Buscar</span>
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setVisible(PAGE_SIZE)
                }}
                placeholder="Bairro, cidade ou tipo de imóvel"
                className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-ink outline-none placeholder:text-[#9a9e96]"
              />
            </label>
            <label className="relative flex items-center justify-between gap-2 border border-line px-4 text-xs text-stone transition focus-within:border-moss">
              <span>Tipo</span>
              <select value={category} onChange={(event) => chooseCategory(event.target.value as 'Todos' | Category)} className="w-full appearance-none bg-transparent py-3.5 pr-5 text-right text-sm text-ink outline-none">
                <option value="Todos">Todos</option>
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-4" />
            </label>
            <label className="relative flex items-center justify-between gap-2 border border-line px-4 text-xs text-stone transition focus-within:border-moss">
              <span>Região</span>
              <select
                value={region}
                onChange={(event) => {
                  setRegion(event.target.value)
                  setVisible(PAGE_SIZE)
                }}
                className="w-full appearance-none bg-transparent py-3.5 pr-5 text-right text-sm text-ink outline-none"
              >
                <option value="Todas">Todas</option>
                {neighborhoods.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-4" />
            </label>
            <button type="submit" className="group flex items-center justify-center gap-2 bg-moss px-7 py-3.5 text-xs font-semibold uppercase tracking-[.12em] text-white transition hover:bg-moss-soft active:scale-[.98] md:col-span-2 lg:col-span-1">
              <Search size={15} /> Buscar
            </button>
          </div>
        </form>
      </section>

      {/* ——— CATEGORIAS ——— */}
      <section id="imoveis" className="mx-auto max-w-[1380px] px-5 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
          <div>
            <Eyebrow>Explore por categoria</Eyebrow>
            <h2 className="max-w-2xl font-serif text-4xl leading-[1.02] tracking-[-.02em] md:text-[56px]">O imóvel certo para cada fase</h2>
          </div>
          <p className="max-w-sm text-[15px] leading-7 text-stone">Casas, apartamentos, terrenos e espaços comerciais selecionados na Zona Oeste e na Grande São Paulo.</p>
        </div>
        <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-5">
          {categories.map((c, i) => (
            <div key={c.name} data-reveal style={delay(i * 90)} className="w-[72%] shrink-0 snap-start sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  chooseCategory(c.name)
                  goToListing()
                }}
                className="group relative block aspect-[3/4] w-full overflow-hidden rounded-[2px] bg-moss text-left text-white sm:aspect-[4/5]"
              >
                <img src={c.image} alt={c.label} loading="lazy" className="absolute inset-0 size-full object-cover opacity-90 transition duration-[1200ms] ease-soft group-hover:scale-[1.07]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111611]/85 via-[#111611]/15 to-transparent transition duration-500 group-hover:from-[#111611]/90" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-sand">
                    {properties.filter((p) => p.category === c.name).length} imóveis
                  </p>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-[28px] leading-none">{c.label}</h3>
                      <p className="mt-2 text-sm text-white/70">{c.description}</p>
                    </div>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/40 transition duration-300 group-hover:border-sand group-hover:bg-sand group-hover:text-ink">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ——— DESTAQUES ——— */}
      <section className="mx-auto max-w-[1380px] px-5 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
          <div>
            <Eyebrow>Curadoria Arpoador</Eyebrow>
            <h2 className="max-w-2xl font-serif text-4xl leading-[1.02] tracking-[-.02em] md:text-[56px]">Imóveis em destaque</h2>
          </div>
          <p className="max-w-sm text-[15px] leading-7 text-stone">Oportunidades escolhidas a dedo pela nossa equipe — visitadas, avaliadas e com documentação conferida.</p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.35fr_1fr] lg:grid-rows-2">
          {featured.map((p, i) => {
            const price = formatPrice(p)
            const big = i === 0
            return (
              <div key={p.id} data-reveal style={delay(i * 110)} className={big ? 'lg:row-span-2' : ''}>
                <button
                  type="button"
                  onClick={() => openProperty(p)}
                  className={`group relative block w-full overflow-hidden rounded-[2px] bg-moss text-left text-white ${big ? 'aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[640px]' : 'aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[310px]'}`}
                >
                  <img src={p.images[0]} alt={`${p.type} em ${p.neighborhood}`} loading="lazy" className="absolute inset-0 size-full object-cover transition duration-[1200ms] ease-soft group-hover:scale-[1.05]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111611]/90 via-[#111611]/20 to-transparent" />
                  <div className="absolute left-5 top-5 flex gap-2">
                    <span className="bg-sand px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-ink">{p.status}</span>
                    {p.badge && <span className="bg-cream/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-ink">{p.badge}</span>}
                  </div>
                  <div className={`absolute inset-x-0 bottom-0 ${big ? 'p-6 sm:p-9' : 'p-6 sm:p-7'}`}>
                    <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[.18em] text-sand">
                      <MapPin size={13} /> {p.neighborhood} · {p.city}
                    </p>
                    <h3 className={`mt-3 max-w-lg font-serif leading-[1.05] tracking-[-.02em] ${big ? 'text-3xl sm:text-[42px]' : 'text-[26px]'}`}>{p.title}</h3>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5">
                      <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/75">
                        {p.beds > 0 && <span>{p.beds} quartos</span>}
                        {p.baths > 0 && <span>{p.baths} banheiros</span>}
                        {p.parking > 0 && <span>{p.parking} vagas</span>}
                        <span>{p.area} m²</span>
                      </div>
                      <span className="flex items-center gap-3">
                        <span className="font-serif text-2xl">{price.value}</span>
                        <span className="flex size-10 items-center justify-center rounded-full bg-white text-ink transition duration-300 group-hover:bg-sand">
                          <ArrowUpRight size={17} />
                        </span>
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* ——— TODOS OS IMÓVEIS ——— */}
      <section id="todos-imoveis" className="mx-auto max-w-[1380px] px-5 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
          <div>
            <Eyebrow>Portfólio completo</Eyebrow>
            <h2 className="max-w-2xl font-serif text-4xl leading-[1.02] tracking-[-.02em] md:text-[56px]">Mais imóveis disponíveis</h2>
          </div>
          <div className="flex rounded-full border border-line bg-paper p-1" role="group" aria-label="Finalidade">
            {(['Todos', 'Comprar', 'Alugar'] as Purpose[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => choosePurpose(item)}
                aria-pressed={purpose === item}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold transition duration-300 ${purpose === item ? 'bg-moss text-white' : 'text-stone hover:text-ink'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto border-b border-line px-5 sm:mx-0 sm:px-0" role="tablist" aria-label="Categorias">
          {(['Todos', ...categories.map((c) => c.name)] as ('Todos' | Category)[]).map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={category === name}
              onClick={() => chooseCategory(name)}
              className={`relative shrink-0 px-4 pb-4 pt-2 text-sm font-medium transition ${category === name ? 'text-ink' : 'text-stone hover:text-ink'}`}
            >
              {name}
              <span className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${category === name ? 'bg-moss text-white' : 'bg-linen text-stone'}`}>{countFor(name)}</span>
              <span className={`absolute inset-x-3 -bottom-px h-0.5 origin-left bg-moss transition-transform duration-300 ease-soft ${category === name ? 'scale-x-100' : 'scale-x-0'}`} />
            </button>
          ))}
        </div>

        {(region !== 'Todas' || search) && (
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-stone">
            <SlidersHorizontal size={14} /> Filtros ativos:
            {region !== 'Todas' && <span className="rounded-full bg-linen px-3 py-1 text-ink">{region}</span>}
            {search && <span className="rounded-full bg-linen px-3 py-1 text-ink">“{search}”</span>}
            <button type="button" onClick={resetFilters} className="ml-1 font-semibold text-moss underline-offset-4 hover:underline">
              Limpar filtros
            </button>
          </div>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, visible).map((p, i) => (
            <div key={p.id} data-reveal style={delay((i % 3) * 90)}>
              <PropertyCard property={p} onOpen={openProperty} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-4 rounded-[2px] border border-dashed border-line bg-paper px-6 py-16 text-center">
            <p className="font-serif text-2xl">Nenhum imóvel com esses filtros — ainda.</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone">Nossa carteira muda toda semana e muitos imóveis não são anunciados. Conte o que você procura e avisamos assim que surgir.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={resetFilters} className="rounded-full border border-line px-6 py-3 text-[11px] font-semibold uppercase tracking-[.14em] transition hover:border-ink">
                Limpar filtros
              </button>
              <a href={whatsappLink('Olá! Não encontrei o imóvel que procuro no site. Podem me ajudar?')} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-moss px-6 py-3 text-[11px] font-semibold uppercase tracking-[.14em] text-white transition hover:bg-moss-soft">
                <WhatsappMark /> Pedir ajuda
              </a>
            </div>
          </div>
        )}

        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          {filtered.length > visible ? (
            <>
              <p className="text-xs text-stone">
                Mostrando {Math.min(visible, filtered.length)} de {filtered.length} imóveis
              </p>
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="group inline-flex items-center gap-3 rounded-full border border-ink/80 px-8 py-4 text-[11px] font-semibold uppercase tracking-[.16em] transition hover:bg-ink hover:text-cream active:scale-[.98]"
              >
                Ver mais imóveis <ChevronDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </>
          ) : (
            filtered.length > 0 && (
              <a
                href={whatsappLink('Olá! Gostaria de conhecer outros imóveis da carteira da Arpoador.')}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-ink/80 px-8 py-4 text-[11px] font-semibold uppercase tracking-[.16em] transition hover:bg-ink hover:text-cream active:scale-[.98]"
              >
                Ver imóveis fora do site <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            )
          )}
        </div>
      </section>

      {/* ——— NÚMEROS ——— */}
      <section className="border-y border-[#d8d3c7] bg-moss text-white">
        <div className="mx-auto grid max-w-[1380px] grid-cols-2 px-5 sm:px-6 lg:grid-cols-4 lg:px-10">
          {[
            ['10+', 'Anos de experiência'],
            ['346', 'Avaliações no Google'],
            ['5.000+', 'Famílias atendidas'],
            ['SP', 'Especialistas na região'],
          ].map(([number, label], i) => (
            <div key={label} data-reveal style={delay(i * 90)} className={['border-white/15 py-8 lg:py-12', i % 2 === 1 ? 'border-l pl-6 sm:pl-8' : 'pr-4', i >= 2 ? 'border-t lg:border-t-0' : '', i > 0 ? 'lg:border-l lg:pl-8' : ''].join(' ')}>
              <p className="font-serif text-4xl text-sand lg:text-5xl">{number}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[.18em] text-white/60">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ——— SOBRE ——— */}
      <section id="sobre" className="mx-auto grid max-w-[1380px] gap-14 px-5 py-24 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:px-10 lg:py-32">
        <div className="relative self-center pb-10 pr-8 sm:pb-14 sm:pr-16" data-reveal="fade">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-moss sm:aspect-[5/6]">
            <img src={image('photo-1600566753086-00f18fb6b3ea', 1200)} alt="Interior acolhedor de um imóvel" loading="lazy" className="size-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 w-[52%] overflow-hidden rounded-[2px] border-[6px] border-cream shadow-[0_24px_50px_-18px_rgba(28,34,28,.35)]">
            <img src={image('photo-1560518883-ce09059eeffa', 700)} alt="Consultora entregando as chaves de um imóvel" loading="lazy" className="aspect-[4/3] size-full object-cover" />
          </div>
          <div className="absolute left-5 top-5 flex items-center gap-3 bg-cream px-5 py-4 text-xs font-semibold shadow-sm sm:left-6 sm:top-6">
            <Check size={16} className="text-bronze" /> Realizando sonhos em SP
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div data-reveal>
            <Eyebrow>Sobre a Arpoador</Eyebrow>
            <h2 className="font-serif text-[42px] leading-[.98] tracking-[-.02em] md:text-7xl">Realizando sonhos em São Paulo</h2>
            <p className="mt-8 max-w-lg text-base leading-7 text-stone">
              Há mais de 10 anos, a Arpoador Imóveis ajuda famílias, investidores e empresas a comprar, vender e alugar com atendimento próximo, profissional e personalizado.
            </p>
            <p className="mt-4 max-w-lg text-base leading-7 text-stone">
              Nascemos no Jardim Arpoador e conhecemos a Zona Oeste rua por rua — por isso indicamos o imóvel certo, no preço justo, sem pressa e sem surpresas.
            </p>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {[
              { icon: <Users size={20} />, title: 'Atendimento personalizado', text: 'Um consultor dedicado acompanha você da primeira visita à entrega das chaves.' },
              { icon: <ShieldCheck size={20} />, title: 'Segurança jurídica', text: 'Análise documental completa e contratos revisados em cada negociação.' },
              { icon: <MapPin size={20} />, title: 'Conhecimento da região', text: 'Especialistas na Zona Oeste, com leitura real de cada bairro e condomínio.' },
              { icon: <Scale size={20} />, title: 'Avaliação justa', text: 'Preço definido com base em dados reais de mercado, não em achismo.' },
            ].map((item, i) => (
              <div key={item.title} data-reveal style={delay(i * 80)} className="border-t border-line pt-5">
                <span className="flex size-11 items-center justify-center rounded-full bg-linen text-moss">{item.icon}</span>
                <h3 className="mt-4 text-[15px] font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-stone">{item.text}</p>
              </div>
            ))}
          </div>
          <a
            href={whatsappLink('Olá! Gostaria de conhecer melhor a Arpoador Imóveis.')}
            target="_blank"
            rel="noreferrer"
            data-reveal
            className="group mt-10 inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[.15em]"
          >
            Fale com a nossa equipe
            <span className="flex size-9 items-center justify-center rounded-full border border-ink/20 transition duration-300 group-hover:border-moss group-hover:bg-moss group-hover:text-white">
              <ArrowRight size={15} />
            </span>
          </a>
        </div>
      </section>

      {/* ——— SERVIÇOS ——— */}
      <section id="servicos" className="border-y border-[#d8d3c7] bg-linen">
        <div className="mx-auto max-w-[1380px] px-5 py-24 sm:px-6 lg:px-10 lg:py-32">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
            <div>
              <Eyebrow>Como podemos ajudar</Eyebrow>
              <h2 className="max-w-2xl font-serif text-4xl leading-[1.02] tracking-[-.02em] md:text-[56px]">Soluções completas para cada etapa</h2>
            </div>
            <p className="max-w-sm text-[15px] leading-7 text-stone">Do primeiro contato à escritura, cuidamos de cada detalhe para que a sua decisão seja simples e segura.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {[
              { icon: <KeyRound size={22} />, title: 'Comprar', text: 'Curadoria alinhada ao seu perfil, visitas organizadas e apoio completo na negociação.', cta: 'Quero comprar', msg: 'Olá! Quero ajuda para comprar um imóvel.' },
              { icon: <Award size={22} />, title: 'Vender', text: 'Avaliação gratuita, fotos profissionais e divulgação para compradores qualificados.', cta: 'Quero vender', msg: 'Olá! Quero vender meu imóvel com a Arpoador.' },
              { icon: <Building2 size={22} />, title: 'Alugar', text: 'Locação ágil e segura, com análise de crédito e garantias flexíveis para os dois lados.', cta: 'Quero alugar', msg: 'Olá! Procuro um imóvel para alugar.' },
              { icon: <Landmark size={22} />, title: 'Financiamento', text: 'Simulação de crédito, documentação e acompanhamento até a assinatura da escritura.', cta: 'Simular agora', msg: 'Olá! Gostaria de simular um financiamento imobiliário.' },
            ].map((service, i) => (
              <div key={service.title} data-reveal style={delay(i * 90)}>
                <a
                  href={whatsappLink(service.msg)}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col rounded-[2px] border border-[#d6d1c5] bg-paper p-7 transition duration-500 ease-soft hover:-translate-y-1 hover:border-[#c4b998] hover:shadow-[0_24px_50px_-24px_rgba(28,34,28,.3)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex size-12 items-center justify-center rounded-full bg-moss text-sand transition duration-500 group-hover:bg-sand group-hover:text-moss">{service.icon}</span>
                    <span className="font-serif text-lg text-[#b9b2a2]">0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 font-serif text-[28px] leading-none">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-stone">{service.text}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[11px] font-semibold uppercase tracking-[.15em] text-moss">
                    {service.cta} <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— VENDA SEU IMÓVEL ——— */}
      <section id="venda" className="relative overflow-hidden bg-moss text-white">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <img src={image('photo-1600585154526-990dced4db0d', 1400)} alt="" loading="lazy" className="size-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-moss via-moss/60 to-transparent" />
        </div>
        <div className="relative mx-auto grid max-w-[1380px] gap-14 px-5 py-24 sm:px-6 lg:grid-cols-2 lg:px-10 lg:py-32">
          <div data-reveal>
            <Eyebrow tone="light">Para proprietários</Eyebrow>
            <h2 className="max-w-2xl font-serif text-[42px] leading-none tracking-[-.02em] md:text-7xl">Quer vender ou alugar seu imóvel?</h2>
            <p className="mt-7 max-w-md text-base leading-7 text-white/70">Conte com um atendimento profissional para apresentar seu imóvel às pessoas certas — com avaliação justa e negociação segura.</p>
            <a
              href={whatsappLink('Olá! Tenho interesse em anunciar meu imóvel com a Arpoador.')}
              target="_blank"
              rel="noreferrer"
              className="group mt-9 inline-flex items-center gap-3 rounded-full bg-sand px-7 py-4 text-xs font-semibold uppercase tracking-[.14em] text-ink transition hover:bg-white active:scale-[.98]"
            >
              Quero anunciar meu imóvel <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
          <ol className="grid gap-4 self-center">
            {[
              { title: 'Avaliação gratuita', text: 'Visitamos o imóvel e definimos o preço ideal com base no mercado real da região.' },
              { title: 'Divulgação qualificada', text: 'Fotos profissionais, anúncios nos principais portais e nossa carteira de clientes.' },
              { title: 'Negociação segura', text: 'Filtramos propostas, cuidamos da documentação e acompanhamos até a escritura.' },
            ].map((step, i) => (
              <li key={step.title} data-reveal style={delay(i * 110)} className="flex gap-5 rounded-[2px] border border-white/12 bg-white/[.05] p-6 backdrop-blur-sm transition duration-500 hover:border-sand/40 hover:bg-white/[.08]">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-sand/50 font-serif text-lg text-sand">{i + 1}</span>
                <div>
                  <h3 className="font-serif text-2xl leading-tight">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-white/65">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ——— DEPOIMENTOS ——— */}
      <section id="depoimentos" className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end" data-reveal>
            <div>
              <Eyebrow>Depoimentos</Eyebrow>
              <h2 className="max-w-2xl font-serif text-4xl leading-[1.02] tracking-[-.02em] md:text-[56px]">Quem confiou, recomenda</h2>
            </div>
            <div className="flex items-center gap-5 rounded-[2px] border border-line bg-paper px-6 py-5">
              <p className="font-serif text-5xl leading-none">346</p>
              <div>
                <Stars className="text-[#c9a85c]" />
                <p className="mt-1.5 text-xs text-stone">avaliações no Google</p>
              </div>
            </div>
          </div>
        </div>
        <div className="no-scrollbar mx-auto mt-12 flex max-w-[1380px] snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-6 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3 lg:px-10">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              data-reveal
              style={delay((i % 3) * 90)}
              className="flex w-[85%] shrink-0 snap-center flex-col rounded-[2px] border border-line bg-paper p-7 transition duration-500 hover:border-[#cfc6b3] hover:shadow-[0_20px_40px_-24px_rgba(28,34,28,.25)] sm:w-[60%] md:w-auto"
            >
              <div className="flex items-center justify-between">
                <Stars className="text-[#c9a85c]" />
                <Quote size={26} className="text-linen" fill="currentColor" strokeWidth={0} />
              </div>
              <blockquote className="mt-5 flex-1 text-[15px] leading-7 text-ink/85">“{t.text}”</blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                <span className="flex size-11 items-center justify-center rounded-full bg-moss font-serif text-sm text-sand">
                  {t.name
                    .split(' ')
                    .filter((w) => w.length > 2)
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join('')}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{t.name}</span>
                  <span className="block text-xs text-stone">{t.context}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ——— LOCALIZAÇÃO ——— */}
      <section id="localizacao" className="border-y border-[#d8d3c7] bg-linen">
        <div className="mx-auto grid max-w-[1380px] gap-12 px-5 py-24 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:items-stretch lg:gap-16 lg:px-10 lg:py-32">
          <div className="flex flex-col" data-reveal>
            <Eyebrow>Nossa localização</Eyebrow>
            <h2 className="max-w-md font-serif text-[42px] leading-[.98] tracking-[-.02em] md:text-6xl">Venha tomar um café com a gente.</h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-stone">Estamos no Butantã, ao lado da Cidade Universitária, com fácil acesso pela Marginal Pinheiros e pela Raposo Tavares.</p>

            <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <address className="border-l-2 border-sand pl-5 not-italic">
                <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-bronze">Endereço</p>
                <p className="mt-2 text-sm font-semibold">{contact.street}</p>
                <p className="mt-1 text-sm text-stone">
                  {contact.district} · {contact.city}
                  <br />
                  {contact.zip}
                </p>
              </address>
              <div className="border-l-2 border-sand pl-5">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[.18em] text-bronze">
                  <Clock size={13} /> Horário
                </p>
                {contact.hours.map((h) => (
                  <p key={h.label} className="mt-2 text-sm">
                    <span className="font-semibold">{h.label}</span>
                    <span className="block text-stone">{h.value}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-9">
              <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-bronze">Regiões atendidas</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {regions.map((r) => (
                  <li key={r} className="rounded-full border border-[#d0cabd] bg-paper/70 px-3.5 py-1.5 text-xs text-ink">
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:mt-auto lg:pt-10">
              <a href={mapsSearchUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center justify-center gap-2 rounded-full bg-moss px-6 py-4 text-[11px] font-semibold uppercase tracking-[.14em] text-white transition hover:bg-moss-soft active:scale-[.98]">
                <MapPin size={15} /> Abrir no Google Maps
              </a>
              <a href={mapsDirectionsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/25 px-6 py-4 text-[11px] font-semibold uppercase tracking-[.14em] transition hover:border-ink hover:bg-paper active:scale-[.98]">
                <Navigation size={15} /> Traçar rota
              </a>
            </div>
          </div>

          <div className="relative min-h-[380px] overflow-hidden rounded-[2px] border-[6px] border-paper bg-[#d9d5ca] shadow-[0_30px_70px_-30px_rgba(28,34,28,.35)] sm:min-h-[460px]" data-reveal="fade">
            <iframe
              title="Mapa da localização da Arpoador Imóveis"
              src={mapsEmbedUrl}
              className="absolute inset-0 size-full border-0 contrast-[.95] grayscale-[.35] sepia-[.12]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 rounded-[2px] bg-paper/95 p-4 shadow-lg backdrop-blur sm:right-auto sm:max-w-sm">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-moss text-sand">
                <Building2 size={18} />
              </span>
              <div className="min-w-0">
                <p className="font-serif text-lg leading-tight">Arpoador Imóveis</p>
                <p className="truncate text-xs text-stone">
                  {contact.street} · {contact.district}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— CONTATO ——— */}
      <ContactSection />

      {/* ——— RODAPÉ ——— */}
      <footer className="bg-moss-deep text-white">
        <div className="mx-auto max-w-[1380px] px-5 pb-10 pt-20 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
            <div className="col-span-2 lg:col-span-1">
              <a href="#inicio" className="group inline-block" aria-label="Voltar ao início">
                <Logo tone="light" />
              </a>
              <p className="mt-6 max-w-xs text-sm leading-6 text-white/60">Compra, venda e locação de imóveis na Zona Oeste de São Paulo, com atendimento próximo e transparente.</p>
              <div className="mt-6 flex gap-3">
                <a href={contact.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex size-10 items-center justify-center rounded-full border border-white/20 transition hover:border-sand hover:bg-sand hover:text-ink">
                  <InstagramMark />
                </a>
                <a href={whatsappLink('Olá! Vim pelo site da Arpoador Imóveis.')} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="flex size-10 items-center justify-center rounded-full border border-white/20 transition hover:border-sand hover:bg-sand hover:text-ink">
                  <WhatsappMark />
                </a>
                <a href={contact.phoneHref} aria-label="Telefone" className="flex size-10 items-center justify-center rounded-full border border-white/20 transition hover:border-sand hover:bg-sand hover:text-ink">
                  <Phone size={16} />
                </a>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-sand">Navegação</p>
              <ul className="mt-5 grid gap-3 text-sm text-white/70">
                {[
                  ['Início', '#inicio'],
                  ['Imóveis', '#imoveis'],
                  ['Serviços', '#servicos'],
                  ['Sobre nós', '#sobre'],
                  ['Depoimentos', '#depoimentos'],
                  ['Localização', '#localizacao'],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="transition hover:text-sand">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-sand">Imóveis</p>
              <ul className="mt-5 grid gap-3 text-sm text-white/70">
                {categories.map((c) => (
                  <li key={c.name}>
                    <a href="#todos-imoveis" onClick={() => chooseCategory(c.name)} className="transition hover:text-sand">
                      {c.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#todos-imoveis" onClick={() => choosePurpose('Alugar')} className="transition hover:text-sand">
                    Imóveis para alugar
                  </a>
                </li>
                <li>
                  <a href="#venda" className="transition hover:text-sand">
                    Anuncie seu imóvel
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 lg:col-span-1">
              <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-sand">Contato</p>
              <ul className="mt-5 grid gap-4 text-sm text-white/70">
                <li>
                  <a href={whatsappLink('Olá! Vim pelo site da Arpoador Imóveis.')} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-sand">
                    <WhatsappMark /> {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={contact.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-sand">
                    <InstagramMark /> {contact.instagramHandle}
                  </a>
                </li>
                <li>
                  <a href={mapsSearchUrl} target="_blank" rel="noreferrer" className="flex gap-3 transition hover:text-sand">
                    <MapPin size={16} className="mt-0.5 shrink-0" />
                    <span>
                      {contact.street}
                      <br />
                      {contact.district} · {contact.city}
                    </span>
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock size={16} className="mt-0.5 shrink-0" />
                  <span>
                    Seg a sex, 9h–18h
                    <br />
                    Sáb, 9h–13h
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col-reverse items-start justify-between gap-5 border-t border-white/10 pt-8 text-xs text-white/45 md:flex-row md:items-center">
            <p>
              © {new Date().getFullYear()} Arpoador Imóveis · {contact.creci} · Todos os direitos reservados.
            </p>
            <a href="#inicio" className="group inline-flex items-center gap-2 font-semibold uppercase tracking-[.16em] text-white/60 transition hover:text-sand">
              Voltar ao topo <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </footer>

      {/* ——— WHATSAPP FLUTUANTE ——— */}
      <a
        href={whatsappLink('Olá! Gostaria de falar com a Arpoador Imóveis.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Arpoador Imóveis pelo WhatsApp"
        tabIndex={showFloating && !selected ? 0 : -1}
        className={`group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-0 overflow-hidden rounded-full bg-moss pl-[18px] pr-[18px] text-sand shadow-[0_14px_34px_-8px_rgba(28,34,28,.45)] ring-1 ring-sand/25 transition-all duration-500 ease-soft hover:bg-moss-soft sm:bottom-7 sm:right-7 ${
          showFloating && !selected ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <WhatsappMark className="size-5 shrink-0" />
        <span className="max-w-0 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[.14em] text-white opacity-0 transition-all duration-500 ease-soft group-hover:ml-3 group-hover:max-w-[160px] group-hover:opacity-100">
          Fale conosco
        </span>
      </a>

      {selected && <PropertyModal property={selected} onClose={closeProperty} />}
    </main>
  )
}

function ContactSection() {
  const [name, setName] = useState('')
  const [interest, setInterest] = useState('Comprar um imóvel')
  const [message, setMessage] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const text = `Olá! Meu nome é ${name.trim()}. Tenho interesse em: ${interest}.${message.trim() ? `\n\n${message.trim()}` : ''}`
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contato" className="mx-auto max-w-[1380px] px-5 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div data-reveal>
          <Eyebrow>Contato</Eyebrow>
          <h2 className="max-w-lg font-serif text-[42px] leading-[.98] tracking-[-.02em] md:text-7xl">Vamos encontrar o lugar certo.</h2>
          <p className="mt-7 max-w-md text-base leading-7 text-stone">Conte o que você procura e um consultor responde pelo WhatsApp — normalmente em poucos minutos, no horário comercial.</p>

          <ul className="mt-10 grid gap-3 sm:max-w-md">
            {[
              { icon: <WhatsappMark className="size-[18px]" />, label: 'WhatsApp', value: contact.phoneDisplay, href: whatsappLink('Olá! Vim pelo site da Arpoador Imóveis.'), external: true },
              { icon: <Phone size={18} />, label: 'Telefone', value: contact.phoneDisplay, href: contact.phoneHref, external: false },
              { icon: <InstagramMark className="size-[18px]" />, label: 'Instagram', value: contact.instagramHandle, href: contact.instagramUrl, external: true },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="group flex items-center gap-4 rounded-[2px] border border-line bg-paper px-5 py-4 transition duration-300 hover:border-[#cfc6b3] hover:shadow-[0_14px_30px_-20px_rgba(28,34,28,.3)]"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-linen text-moss transition duration-300 group-hover:bg-moss group-hover:text-sand">{item.icon}</span>
                  <span className="flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-[.16em] text-bronze">{item.label}</span>
                    <span className="mt-0.5 block text-sm font-semibold">{item.value}</span>
                  </span>
                  <ArrowUpRight size={17} className="text-stone transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal style={delay(120)}>
          <form onSubmit={submit} className="rounded-[2px] bg-moss p-7 text-white shadow-[0_30px_70px_-30px_rgba(28,34,28,.6)] sm:p-10">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.2em] text-sand">
              <Handshake size={15} /> Atendimento rápido
            </p>
            <h3 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">Fale com um consultor</h3>
            <p className="mt-2 text-sm text-white/60">Preencha e continue a conversa direto no WhatsApp.</p>

            <div className="mt-8 grid gap-5">
              <label className="grid gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[.16em] text-white/60">Seu nome</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Como podemos te chamar?"
                  className="border-b border-white/25 bg-transparent py-3 text-base text-white outline-none transition placeholder:text-white/35 focus:border-sand"
                />
              </label>
              <fieldset>
                <legend className="text-[11px] font-semibold uppercase tracking-[.16em] text-white/60">Tenho interesse em</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['Comprar um imóvel', 'Alugar um imóvel', 'Vender meu imóvel', 'Avaliar meu imóvel'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setInterest(option)}
                      aria-pressed={interest === option}
                      className={`rounded-full border px-4 py-2 text-xs transition duration-300 ${interest === option ? 'border-sand bg-sand text-ink' : 'border-white/25 text-white/80 hover:border-white/60'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>
              <label className="grid gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[.16em] text-white/60">Mensagem (opcional)</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Ex.: casa com 3 quartos no Butantã, até R$ 1 milhão"
                  className="resize-none border-b border-white/25 bg-transparent py-3 text-base text-white outline-none transition placeholder:text-white/35 focus:border-sand"
                />
              </label>
            </div>

            <button type="submit" className="group mt-9 inline-flex w-full items-center justify-center gap-3 rounded-full bg-sand px-7 py-4 text-xs font-semibold uppercase tracking-[.14em] text-ink transition hover:bg-white active:scale-[.98]">
              <WhatsappMark /> Enviar no WhatsApp <ArrowRight size={16} className="hidden transition-transform duration-300 group-hover:translate-x-1 sm:block" />
            </button>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-white/50">
              <ShieldCheck size={14} /> Seus dados são usados apenas para este atendimento.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
