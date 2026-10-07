'use client'

import { useEffect, useState } from 'react'

/**
 * Revela elementos com [data-reveal] quando entram na tela.
 *
 * Regras de segurança (o conteúdo nunca depende da animação para existir):
 * - Sem JS, sem IntersectionObserver ou com "reduzir movimento": tudo fica visível.
 * - O CSS só esconde algo enquanto <html> tiver a classe "reveal-ready", que é
 *   adicionada e REMOVIDA por este efeito. Assim o efeito duplo do React
 *   StrictMode (next dev: monta → desmonta → monta) não deixa nada preso invisível.
 * - Elementos já na tela no carregamento aparecem direto (sem "piscar").
 * - Novos elementos (filtros, "ver mais") são observados automaticamente.
 */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const show = (el: Element) => ((el as HTMLElement).dataset.shown = '')
    const pending = () => document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-shown])')

    if (reduce || typeof IntersectionObserver === 'undefined') {
      pending().forEach(show)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Mostra ao entrar na tela ou se o usuário já passou por ele (salto por âncora)
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
            show(entry.target)
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    )

    // Controle local a ESTA execução do efeito (não persiste no DOM)
    const watched = new WeakSet<Element>()
    const scan = (initial = false) => {
      pending().forEach((el) => {
        if (watched.has(el)) return
        watched.add(el)
        if (initial) {
          const rect = el.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.92) {
            show(el) // já visível ou acima da dobra: aparece sem esperar
            return
          }
        }
        io.observe(el)
      })
    }

    scan(true)
    root.classList.add('reveal-ready')

    const mo = new MutationObserver(() => scan())
    mo.observe(document.body, { childList: true, subtree: true })

    // Rede de segurança: qualquer elemento cujo topo já passou pela dobra é revelado,
    // mesmo que o IntersectionObserver não dispare (salto por âncora, itens de
    // carrossel horizontal fora da área visível no celular).
    let frame = 0
    const sweep = () => {
      frame = 0
      const limit = window.innerHeight * 0.92
      pending().forEach((el) => {
        if (el.getBoundingClientRect().top < limit) {
          show(el)
          io.unobserve(el)
        }
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sweep)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      io.disconnect()
      mo.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
      root.classList.remove('reveal-ready')
    }
  }, [])
}

export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])
  return scrolled
}

export function useLockBody(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const { overflow, paddingRight } = document.body.style
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [locked])
}
