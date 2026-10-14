import type { DevProject } from "../../data/projects";

export function Logo({ project, className = "" }: { project: DevProject; className?: string }) {
  return <img className={`sp-logo ${className}`} src={project.logo} alt="" loading="lazy" decoding="async" width={48} height={48} />;
}
