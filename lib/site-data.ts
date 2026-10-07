// Dados centrais do site — edite aqui contatos, imóveis e depoimentos.

export const contact = {
  company: 'Arpoador Imóveis',
  whatsappNumber: '551137824947',
  phoneDisplay: '(11) 3782-4947',
  phoneHref: 'tel:+551137824947',
  // Troque pelo @ real da imobiliária
  instagramHandle: '@arpoadorimoveis',
  instagramUrl: 'https://www.instagram.com/arpoadorimoveis/',
  street: 'Rua Alvarenga, 1.250',
  district: 'Butantã',
  city: 'São Paulo — SP',
  zip: 'CEP 05509-001',
  mapsQuery: 'Rua Alvarenga, 1250, Butantã, São Paulo - SP',
  hours: [
    { label: 'Segunda a sexta', value: '9h às 18h' },
    { label: 'Sábado', value: '9h às 13h' },
  ],
  creci: 'CRECI sob consulta',
}

export const whatsappLink = (message: string) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapsQuery)}`
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.mapsQuery)}`
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(contact.mapsQuery)}&output=embed`

export const image = (id: string, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

export type Category = 'Casas' | 'Apartamentos' | 'Terrenos' | 'Comerciais'
export type Status = 'Venda' | 'Locação' | 'Lançamento'

export type Property = {
  id: number
  title: string
  category: Category
  type: string
  status: Status
  neighborhood: string
  city: string
  price: number
  monthly?: boolean
  beds: number
  baths: number
  parking: number
  area: number
  badge?: string
  note?: string
  featured?: boolean
  images: string[]
  description: string
  features: string[]
}

export const properties: Property[] = [
  {
    id: 1,
    title: 'Casa em condomínio com piscina e jardim',
    category: 'Casas',
    type: 'Casa em condomínio',
    status: 'Lançamento',
    neighborhood: 'Alphaville',
    city: 'Barueri',
    price: 3980000,
    beds: 5,
    baths: 5,
    parking: 4,
    area: 420,
    badge: 'Exclusivo',
    featured: true,
    images: [image('photo-1613490493576-7fde63acd811'), image('photo-1600566753190-17f0baa2a6c3'), image('photo-1600563438938-a9a27216b4f5'), image('photo-1600585152220-90363fe7e115')],
    description:
      'Residência nova em condomínio fechado, com arquitetura autoral, pé-direito duplo e integração total entre living, varanda e piscina. Projeto pensado para receber com conforto e privacidade.',
    features: ['Piscina aquecida', 'Pé-direito duplo', 'Suíte master com closet', 'Espaço gourmet', 'Segurança 24h', 'Energia solar'],
  },
  {
    id: 2,
    title: 'Apartamento iluminado com vista aberta',
    category: 'Apartamentos',
    type: 'Apartamento',
    status: 'Venda',
    neighborhood: 'Vila Madalena',
    city: 'São Paulo',
    price: 1280000,
    beds: 3,
    baths: 2,
    parking: 2,
    area: 128,
    badge: 'Destaque',
    featured: true,
    images: [image('photo-1600607687939-ce8a6c25118c'), image('photo-1600607687920-4e2a09cf159d'), image('photo-1502672260266-1c1ef2d93688')],
    description:
      'Andar alto com ambientes integrados, sol da manhã e vista livre para o bairro mais criativo de São Paulo. A poucos passos de cafés, galerias e do metrô.',
    features: ['Andar alto', 'Varanda integrada', 'Sol da manhã', 'Portaria 24h', 'Academia', 'Próximo ao metrô'],
  },
  {
    id: 3,
    title: 'Casa contemporânea cercada por verde',
    category: 'Casas',
    type: 'Casa',
    status: 'Venda',
    neighborhood: 'Morumbi',
    city: 'São Paulo',
    price: 2450000,
    beds: 4,
    baths: 4,
    parking: 3,
    area: 286,
    badge: 'Exclusivo',
    featured: true,
    images: [image('photo-1600596542815-ffad4c1539a9'), image('photo-1600585154340-be6161a56a0c'), image('photo-1600566753086-00f18fb6b3ea')],
    description:
      'Projeto generoso em rua arborizada, com grandes aberturas para o jardim, living amplo e suítes voltadas para a área verde. Ideal para famílias que valorizam espaço e tranquilidade.',
    features: ['Jardim paisagístico', '4 suítes', 'Living com lareira', 'Churrasqueira', 'Depósito', 'Rua tranquila'],
  },
  {
    id: 4,
    title: 'Apartamento novo com varanda gourmet',
    category: 'Apartamentos',
    type: 'Apartamento',
    status: 'Lançamento',
    neighborhood: 'Perdizes',
    city: 'São Paulo',
    price: 1890000,
    beds: 3,
    baths: 3,
    parking: 2,
    area: 142,
    badge: 'Novo',
    images: [image('photo-1600566753086-00f18fb6b3ea'), image('photo-1600210491892-03d54c0aaf87'), image('photo-1600566752355-35792bedcfea')],
    description:
      'Recém-entregue, com acabamentos sofisticados, varanda gourmet ampla e lazer completo no condomínio. Planta inteligente com três suítes.',
    features: ['Varanda gourmet', '3 suítes', 'Piscina', 'Salão de festas', 'Bicicletário', 'Vaga para visitantes'],
  },
  {
    id: 5,
    title: 'Sobrado reformado com quintal ensolarado',
    category: 'Casas',
    type: 'Sobrado',
    status: 'Venda',
    neighborhood: 'Jardim Bonfiglioli',
    city: 'São Paulo',
    price: 980000,
    beds: 3,
    baths: 3,
    parking: 2,
    area: 176,
    badge: 'Oportunidade',
    images: [image('photo-1570129477492-45c003edd2be'), image('photo-1600607688969-a5bfcd646154'), image('photo-1484154218962-a197022b5858')],
    description:
      'Sobrado acolhedor, totalmente reformado e pronto para morar. Quintal com sol a tarde toda, cozinha planejada e localização próxima a escolas e comércio.',
    features: ['Reformado', 'Cozinha planejada', 'Quintal', 'Edícula', 'Próximo a escolas', 'Aceita financiamento'],
  },
  {
    id: 6,
    title: 'Apartamento mobiliado perto da Faria Lima',
    category: 'Apartamentos',
    type: 'Apartamento',
    status: 'Locação',
    neighborhood: 'Pinheiros',
    city: 'São Paulo',
    price: 6800,
    monthly: true,
    beds: 2,
    baths: 2,
    parking: 1,
    area: 94,
    badge: 'Mobiliado',
    images: [image('photo-1522708323590-d24dbb6b0267'), image('photo-1600607687920-4e2a09cf159d'), image('photo-1554995207-c18c203602cb')],
    description:
      'Planta contemporânea, mobiliada e equipada, em uma das regiões mais desejadas da cidade. A poucos minutos de restaurantes, escritórios e da Estação Fradique Coutinho.',
    features: ['Mobiliado', 'Ar-condicionado', 'Varanda', 'Lavanderia', 'Coworking no prédio', 'Pet friendly'],
  },
  {
    id: 7,
    title: 'Casa térrea com jardim e edícula',
    category: 'Casas',
    type: 'Casa',
    status: 'Venda',
    neighborhood: 'Vila Sônia',
    city: 'São Paulo',
    price: 1150000,
    beds: 3,
    baths: 2,
    parking: 2,
    area: 190,
    images: [image('photo-1564013799919-ab600027ffc6'), image('photo-1586023492125-27b2c045efd7'), image('photo-1600210492486-724fe5c67fb0')],
    description:
      'Casa térrea em rua residencial, com jardim frontal, edícula independente e excelente iluminação natural. A poucos minutos da Estação Vila Sônia.',
    features: ['Térrea', 'Edícula', 'Jardim', 'Lavanderia coberta', 'Rua residencial', 'Próximo ao metrô'],
  },
  {
    id: 8,
    title: 'Cobertura duplex com terraço privativo',
    category: 'Apartamentos',
    type: 'Cobertura',
    status: 'Venda',
    neighborhood: 'Butantã',
    city: 'São Paulo',
    price: 1590000,
    beds: 3,
    baths: 3,
    parking: 3,
    area: 210,
    badge: 'Vista livre',
    images: [image('photo-1545324418-cc1a3fa10c00'), image('photo-1507089947368-19c1da9775ae'), image('photo-1600585152220-90363fe7e115')],
    description:
      'Cobertura com terraço, churrasqueira e vista para o verde da Cidade Universitária. Living em dois ambientes e suíte master com hidromassagem.',
    features: ['Terraço com churrasqueira', 'Hidromassagem', 'Vista para o verde', '3 vagas', 'Depósito privativo', 'Portaria 24h'],
  },
  {
    id: 9,
    title: 'Casa em condomínio na Granja Viana',
    category: 'Casas',
    type: 'Casa em condomínio',
    status: 'Venda',
    neighborhood: 'Granja Viana',
    city: 'Cotia',
    price: 1690000,
    beds: 4,
    baths: 3,
    parking: 3,
    area: 260,
    badge: 'Condomínio',
    images: [image('photo-1580587771525-78b9dba3b914'), image('photo-1600563438938-a9a27216b4f5'), image('photo-1600573472550-8090b5e0745e')],
    description:
      'Casa ampla em condomínio arborizado, com segurança, áreas de lazer e qualidade de vida a 25 minutos do Butantã pela Raposo Tavares.',
    features: ['Condomínio fechado', 'Área verde', 'Piscina', 'Home office', 'Segurança 24h', 'Quadra'],
  },
  {
    id: 10,
    title: 'Casa para locação próxima à USP',
    category: 'Casas',
    type: 'Casa',
    status: 'Locação',
    neighborhood: 'Butantã',
    city: 'São Paulo',
    price: 7500,
    monthly: true,
    beds: 3,
    baths: 2,
    parking: 2,
    area: 160,
    images: [image('photo-1568605114967-8130f3a36994'), image('photo-1560448204-e02f11c3d0e2'), image('photo-1554995207-c18c203602cb')],
    description:
      'Casa bem conservada em rua tranquila, a poucos minutos da Cidade Universitária e da Estação Butantã. Ótima para famílias ou professores.',
    features: ['Rua tranquila', 'Quintal', 'Armários planejados', 'Próximo à USP', 'Aceita pets', 'Garantia flexível'],
  },
  {
    id: 11,
    title: 'Studio funcional a 5 minutos do metrô',
    category: 'Apartamentos',
    type: 'Studio',
    status: 'Locação',
    neighborhood: 'Butantã',
    city: 'São Paulo',
    price: 2900,
    monthly: true,
    beds: 1,
    baths: 1,
    parking: 1,
    area: 38,
    images: [image('photo-1560448204-e02f11c3d0e2'), image('photo-1484154218962-a197022b5858')],
    description:
      'Studio novo e funcional, com cozinha americana e lazer completo. Perfeito para quem estuda ou trabalha na região da Cidade Universitária.',
    features: ['Cozinha americana', 'Lavanderia compartilhada', 'Rooftop', 'Academia', 'Portaria digital', 'Próximo ao metrô'],
  },
  {
    id: 12,
    title: 'Terreno plano em rua residencial',
    category: 'Terrenos',
    type: 'Terreno',
    status: 'Venda',
    neighborhood: 'Jardim Arpoador',
    city: 'São Paulo',
    price: 740000,
    beds: 0,
    baths: 0,
    parking: 0,
    area: 310,
    badge: 'Projeto',
    note: 'Frente de 12 m · plano',
    images: [image('photo-1494526585095-c41746248156'), image('photo-1500382017468-9049fed747ef')],
    description:
      'Terreno plano em rua tranquila, com documentação em dia e fácil acesso à Raposo Tavares e à Av. Corifeu de Azevedo Marques. Ideal para projeto residencial.',
    features: ['Topografia plana', 'Frente de 12 m', 'Documentação em dia', 'Zona residencial', 'Rua asfaltada', 'Água e esgoto'],
  },
  {
    id: 13,
    title: 'Lote em condomínio fechado',
    category: 'Terrenos',
    type: 'Terreno em condomínio',
    status: 'Venda',
    neighborhood: 'Granja Viana',
    city: 'Cotia',
    price: 520000,
    beds: 0,
    baths: 0,
    parking: 0,
    area: 450,
    note: 'Leve aclive · vista para o verde',
    images: [image('photo-1500382017468-9049fed747ef'), image('photo-1580587771525-78b9dba3b914')],
    description:
      'Lote em condomínio com portaria, área verde preservada e infraestrutura completa. Excelente para construir a casa da família com segurança.',
    features: ['Condomínio fechado', 'Leve aclive', 'Área verde', 'Infraestrutura completa', 'Portaria 24h', 'Aceita permuta'],
  },
  {
    id: 14,
    title: 'Conjunto comercial em endereço estratégico',
    category: 'Comerciais',
    type: 'Conjunto comercial',
    status: 'Locação',
    neighborhood: 'Itaim Bibi',
    city: 'São Paulo',
    price: 14500,
    monthly: true,
    beds: 0,
    baths: 3,
    parking: 4,
    area: 210,
    badge: 'Comercial',
    images: [image('photo-1497366216548-37526070297c'), image('photo-1497366811353-6870744d04b2'), image('photo-1486406146926-c627a92ad1ab')],
    description:
      'Conjunto elegante e flexível, com planta livre, ar-condicionado central e recepção, pronto para receber sua operação em um dos principais polos corporativos.',
    features: ['Planta livre', 'Ar-condicionado central', 'Recepção', 'Copa', 'Prédio AAA', '4 vagas'],
  },
  {
    id: 15,
    title: 'Loja de rua com vitrine ampla',
    category: 'Comerciais',
    type: 'Loja',
    status: 'Locação',
    neighborhood: 'Pinheiros',
    city: 'São Paulo',
    price: 9800,
    monthly: true,
    beds: 0,
    baths: 2,
    parking: 0,
    area: 120,
    note: 'Pé-direito de 4,5 m',
    images: [image('photo-1441986300917-64674bd600d8'), image('photo-1497366811353-6870744d04b2')],
    description:
      'Loja com vitrine generosa em rua de grande fluxo de pedestres, cercada por cafés e restaurantes. Ideal para varejo, showroom ou gastronomia.',
    features: ['Vitrine ampla', 'Pé-direito alto', 'Mezanino', 'Alto fluxo', 'Esquina', 'Pronta para uso'],
  },
  {
    id: 16,
    title: 'Sala comercial próxima ao metrô',
    category: 'Comerciais',
    type: 'Sala comercial',
    status: 'Venda',
    neighborhood: 'Butantã',
    city: 'São Paulo',
    price: 690000,
    beds: 0,
    baths: 1,
    parking: 1,
    area: 48,
    images: [image('photo-1497366811353-6870744d04b2'), image('photo-1497366216548-37526070297c')],
    description:
      'Sala pronta para consultório ou escritório, em prédio com recepção e segurança, a 300 m da Estação Butantã. Ótima opção para renda.',
    features: ['Recepção', 'Ar-condicionado', 'Copa', 'Próximo ao metrô', 'Ideal para consultório', 'Ótima para renda'],
  },
]

export const categories: { name: Category; label: string; description: string; image: string }[] = [
  { name: 'Casas', label: 'Casas e sobrados', description: 'Térreas, sobrados e condomínios', image: image('photo-1600047509807-ba8f99d2cdde', 900) },
  { name: 'Apartamentos', label: 'Apartamentos', description: 'Do studio à cobertura', image: image('photo-1600573472550-8090b5e0745e', 900) },
  { name: 'Terrenos', label: 'Terrenos', description: 'Lotes para o seu projeto', image: image('photo-1500382017468-9049fed747ef', 900) },
  { name: 'Comerciais', label: 'Comerciais', description: 'Salas, lojas e conjuntos', image: image('photo-1486406146926-c627a92ad1ab', 900) },
]

export const testimonials = [
  {
    name: 'Mariana Lopes',
    context: 'Comprou apartamento em Pinheiros',
    text: 'Desde a primeira visita senti que estavam ouvindo o que a gente queria. Mostraram só imóveis que faziam sentido e cuidaram de toda a documentação com muita clareza.',
  },
  {
    name: 'Ricardo e Fernanda Alves',
    context: 'Venderam casa no Butantã',
    text: 'A avaliação foi realista e a divulgação trouxe compradores qualificados. Vendemos em menos de dois meses, sem desgaste e com toda a negociação bem conduzida.',
  },
  {
    name: 'Paulo Henrique Sato',
    context: 'Alugou sala comercial',
    text: 'Precisava de uma sala perto do metrô para o consultório. Em uma semana já tinha visitado três opções certeiras. Atendimento rápido e muito profissional.',
  },
  {
    name: 'Camila Ribeiro',
    context: 'Comprou o primeiro imóvel',
    text: 'Era minha primeira compra e eu tinha muitas dúvidas sobre financiamento. Me explicaram cada etapa com paciência. Hoje estou no meu sobrado e muito feliz.',
  },
  {
    name: 'Eduardo Martins',
    context: 'Investidor · Vila Sônia',
    text: 'Conhecem a região como poucos. Me ajudaram a entender o potencial de valorização de cada rua antes de decidir. Já estou no segundo negócio com a Arpoador.',
  },
  {
    name: 'Juliana Prado',
    context: 'Alugou casa perto da USP',
    text: 'Processo de locação simples e transparente, com garantia flexível. A equipe respondeu tudo pelo WhatsApp e acompanhou até a entrega das chaves.',
  },
]

export const regions = ['Butantã', 'Jardim Arpoador', 'Vila Sônia', 'Morumbi', 'Pinheiros', 'Rio Pequeno', 'Granja Viana', 'Alphaville']

export const formatPrice = (property: Pick<Property, 'price' | 'monthly'>) => {
  const value = property.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return { value: `R$ ${value}`, suffix: property.monthly ? '/ mês' : '' }
}
