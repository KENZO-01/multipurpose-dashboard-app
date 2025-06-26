import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import UserHoverCard from "./components/user-hover-card";
import ProjectLinks from "./components/project-links";
import Projectmenu from "./components/project-menu";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProjects } from "@/Api/project.api";

const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  // Options for formatting the date
  const options: any = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  // Format the date according to the options
  return date.toLocaleDateString("en-US", options);
};

const Projects = () => {

  //get api to fetch all projects here
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchAllProjects,
  });

  console.log(isPending, isError, data, error)


  const navigate = useNavigate();

  return (
    <>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Explore your ongoing and completed projects.
          </p>
        </div>
        <Button
          className="space-x-0 gap-1"
          onClick={() => navigate("/projects/create-new")}
        >
          <Plus />
          <span>Create Project</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data?.map((project: any, index: number) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle
                className="cursor-pointer"
                onClick={() => navigate("/overview")}
              >
                [ {project?.key} ] {project?.name}
              </CardTitle>
              <CardDescription>{project?.description}</CardDescription>
              <CardDescription className="font-bold">
                <div>
                  started on:{" "}
                  <span className="border font-semibold py-1 text-xs px-2 rounded-sm">
                    {formatDate(project?.createdAt)}
                  </span>
                </div>
              </CardDescription>
              <CardAction className="text-slate-500">
                <Projectmenu />
              </CardAction>
            </CardHeader>
            <CardContent>
              <ProjectLinks externalLinks={externalLinks} />
            </CardContent>
            <CardFooter>
              <div>
                <div className="text-slate-900 dark:text-white text-sm py-2 font-bold">
                  Contributors
                </div>
                <div className="flex overflow-hidden -space-x-1">
                  {project?.members?.map((user: any, index: number) => (
                    <UserHoverCard user={user?.userId} key={index} />
                  ))}
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};
export default Projects;


const externalLinks = [
  {
    title: "Live Preview",
    items: [
      {
        title: "UAT Server",
        link: "http://localhost:5173/overview",
      },
      {
        title: "Production Server",
        link: "http://localhost:5173/overview",
      },
    ],
  },
  {
    title: "Codebase",
    items: [
      {
        title: "Backend Repository",
        link: "http://localhost:5173/overview",
      },
      {
        title: "Frontend Repository",
        link: "http://localhost:5173/overview",
      },
    ],
  },
];
