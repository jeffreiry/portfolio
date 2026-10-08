import type { RawJob } from '../types.ts';
import { htmlToText } from '../html-to-text.ts';
import { isDesignRole } from '../design-role-filter.ts';

// Feed RSS oficial, categoria Design já filtrada no servidor —
// weworkremotely.com/categories/remote-design-jobs.rss. Sem API JSON pública
// documentada, mas RSS é estrutura estável o bastante pra extrair por regex
// sem puxar dependência nova de parser XML (os campos são sempre tags simples
// de nível único dentro de <item>, sem aninhamento). htmlToText() já decodifica
// as mesmas entidades (&lt; &gt; &amp; etc.) usadas tanto em HTML quanto em XML,
// então serve sem adaptação pro campo <description> daqui.
function extractTag(block: string, tag: string): string {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match?.[1]?.trim() ?? '';
}

// Título vem como "Empresa: Cargo" — sem esse separador, melhor não adivinhar
// (vaga rara o bastante pra não valer o risco de poluir "company" com lixo).
function splitTitle(raw: string): { company: string; title: string } {
  const idx = raw.indexOf(': ');
  if (idx === -1) return { company: 'Empresa não identificada', title: raw };
  return { company: raw.slice(0, idx).trim(), title: raw.slice(idx + 2).trim() };
}

export async function fetchWeWorkRemotelyJobs(): Promise<RawJob[]> {
  const res = await fetch('https://weworkremotely.com/categories/remote-design-jobs.rss');
  if (!res.ok) {
    throw new Error(`We Work Remotely respondeu ${res.status}`);
  }
  const xml = await res.text();
  const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

  const jobs: RawJob[] = [];
  for (const block of items) {
    const rawTitle = extractTag(block, 'title');
    const { company, title } = splitTitle(rawTitle);
    if (!isDesignRole(title)) continue;

    const link = extractTag(block, 'link');
    const guid = extractTag(block, 'guid');
    const pubDate = extractTag(block, 'pubDate');
    const region = extractTag(block, 'region');
    const description = htmlToText(extractTag(block, 'description'));

    jobs.push({
      source: 'weworkremotely',
      externalId: guid || link,
      title,
      company,
      description,
      url: link,
      location: region || undefined,
      // Board 100% remoto por definição — mesmo princípio do adapter do Remotive.
      workplace: 'remote',
      publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      // Mesmo racional do Remotive: "region" é texto livre inconsistente
      // ("Anywhere in the World", "US Only") — não vale tentar inferir 'br'.
      origin: 'intl',
    });
  }

  return jobs;
}
