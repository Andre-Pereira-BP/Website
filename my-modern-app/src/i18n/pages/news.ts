import { defineDict } from '../dict';
import type { NewsCategory } from '../../lib/types';

const en = {
  title: 'News & Updates',
  subtitle: 'Company news, projects, events and technology from the BridgePoint team.',
  seoDescription: 'Latest news from BridgePoint Test Systems: projects, technology, events and company updates.',
  categories: {
    all: 'All News',
    company: 'Company',
    technology: 'Technology',
    events: 'Events',
    projects: 'Projects',
  } as Record<NewsCategory | 'all', string>,
  featured: 'Featured',
  readMore: 'Read more',
  readFull: 'Read full article',
  searchPlaceholder: 'Search news…',
  searchLabel: 'Search news',
  filterLabel: 'Filter by category',
  emptyTitle: 'No news found',
  emptyText: 'Try adjusting your search or filter criteria.',
  results: (n: number) => `${n} ${n === 1 ? 'article' : 'articles'}`,
  backToNews: 'Back to news',
  source: 'Source',
  share: 'Share',
  shareLinkedIn: 'Share on LinkedIn',
  copyLink: 'Copy link',
  copied: 'Link copied!',
  related: 'More news',
  notFoundTitle: 'Article not found',
  notFoundText: 'This article does not exist or is no longer available.',
  followTitle: 'Stay Up to Date',
  followText: 'Follow BridgePoint on LinkedIn for the latest news, projects and job opportunities.',
};

export type NewsDict = typeof en;

const pt: NewsDict = {
  title: 'Notícias e Novidades',
  subtitle: 'Novidades da empresa, projetos, eventos e tecnologia da equipa BridgePoint.',
  seoDescription: 'Últimas notícias da BridgePoint Test Systems: projetos, tecnologia, eventos e novidades da empresa.',
  categories: {
    all: 'Todas',
    company: 'Empresa',
    technology: 'Tecnologia',
    events: 'Eventos',
    projects: 'Projetos',
  },
  featured: 'Destaque',
  readMore: 'Ler mais',
  readFull: 'Ler artigo completo',
  searchPlaceholder: 'Pesquisar notícias…',
  searchLabel: 'Pesquisar notícias',
  filterLabel: 'Filtrar por categoria',
  emptyTitle: 'Nenhuma notícia encontrada',
  emptyText: 'Experimente ajustar a pesquisa ou os filtros.',
  results: (n: number) => `${n} ${n === 1 ? 'artigo' : 'artigos'}`,
  backToNews: 'Voltar às notícias',
  source: 'Fonte',
  share: 'Partilhar',
  shareLinkedIn: 'Partilhar no LinkedIn',
  copyLink: 'Copiar ligação',
  copied: 'Ligação copiada!',
  related: 'Mais notícias',
  notFoundTitle: 'Artigo não encontrado',
  notFoundText: 'Este artigo não existe ou já não está disponível.',
  followTitle: 'Mantenha-se Atualizado',
  followText: 'Siga a BridgePoint no LinkedIn para acompanhar as últimas notícias, projetos e oportunidades de emprego.',
};

export const newsDict = defineDict('news', { en, pt });
