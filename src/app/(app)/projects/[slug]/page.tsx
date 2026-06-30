import { CurriculumService } from "@/lib/services/curriculum.service";
import { notFound } from "next/navigation";
import ProjectClient from "./project-client";

export default async function ProjectSlugPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  const project = await CurriculumService.getProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }

  return (
    <ProjectClient project={project} />
  );
}
