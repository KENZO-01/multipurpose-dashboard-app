import { ExternalLink } from "lucide-react";

interface ProjectLinkProps {
  externalLinks: {
    title: string;
    items: {
      title: string;
      link: string;
    }[];
  }[];
}


const ProjectLinks = ({ externalLinks }: ProjectLinkProps) => {
  return (
    <div className="flex gap-6">
      {externalLinks.map((linkGroup) => (
        <div key={linkGroup.title}>
          <div className="text-slate-900 dark:text-white text-sm font-bold">
            {linkGroup.title}
          </div>
          <div className="flex flex-col gap-2 py-2">
            {linkGroup.items.map((item) => (
              <a
                href={item.link}
                target="_blank"
                key={item.title}
                className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-1"
              >
                {item.title} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectLinks;
