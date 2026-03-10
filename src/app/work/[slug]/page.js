import { notFound } from 'next/navigation';
import { projects } from '@/lib/data/projects';
import CaseStudyContent from '@/components/work/CaseStudyContent';
import { CreativeWorkSchema } from '@/components/SchemaMarkup';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Irvale Studio`,
    description: project.headline,
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <CreativeWorkSchema
        name={project.name}
        description={project.description}
        image={`https://irvale.studio${project.image}`}
        datePublished={project.year}
      />
      <CaseStudyContent project={project} nextProject={nextProject} />
    </>
  );
}
