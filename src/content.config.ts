import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseSchema = z.object({
  title: z.string(),
  slug: z.string(),
  thesis: z.string().optional(),
  template: z.enum(['enterprise', 'brand', 'brand-split', 'editorial']).optional().default('enterprise'),
  role: z.string(),
  summary: z.string(),
  company: z.string(),
  year: z.number(),
  thumbnail: z.string().optional(),
  cover: z.string().optional(),
  bgImage: z.string().optional(),
  accent: z.string(),
  tags: z.array(z.string()),
  url: z.string().optional(),
  // Metadados alternativos do hero "brand-split" — quando presentes, substituem
  // a linha padrão Atuação/Empresa/Ano por Atuação/Escopo (lista)/Duração.
  scope: z.array(z.string()).optional(),
  duration: z.string().optional(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), source: z.string().optional() })).optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(true),
  protected: z.boolean().default(false),
  order: z.number().optional(),
});

const casesEn = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/cases/en' }),
  schema: caseSchema,
});

const casesPt = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/cases/pt' }),
  schema: caseSchema,
});

export const collections = { casesEn, casesPt };
