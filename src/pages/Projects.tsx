import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Project } from "../types";
import { Divide, Loader2Icon } from "lucide-react";
import { dummyConversations, dummyProjects } from "../assets/assets";

function Projects() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProjects] = React.useState<Project | null>(null);
  const [loading, setLoading] = React.useState(true);

  const [isGenerating, setIsGenerating] = React.useState(true);
  const [device, setDevice] = React.useState<"phone" | "tablet" | "desktop">(
    "desktop"
  );

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const fetchProject = async () => {
    const project=dummyProjects.find((project)=>project.id=== projectId);
    setTimeout(()=>{
      if(project){
        setProjects({...project,conversation:dummyConversations});
        setLoading(false)
        setIsGenerating(project.current_code ? false : true)
      }
    },2000)
  };

  useEffect(() => {
    fetchProject();
  }, []);

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <Loader2Icon className="animate-spin size-7 text-violet-200" />
        </div>
      </>
    );
  }
  return project ? (
    <div className="flex flex-col  h-screen w-full bg-gray-900 text-white">
      {/* builder nav bar */}
      <div className="flex max-sm:flex-col sm:items-center gap-4 px-4 py-2 no-scrollbar">
        {/* left */}
        <div className="flex items-center gap-2 sm:min-w-90 text-nowrap">
          <img src="/favicon.svg" alt="logo" className="h-6 cursor-pointer" onClick={()=>navigate("/")} />
          <div className="max-w-64 sm:max-w-xs">
            <p className="text-sm text-medium capitalize truncate">{project.name}</p>
            <p className="text-xs text-gray-400 -mt-0.5">Previewing last saved version</p>
          </div>
        </div>
        {/* middle */}
        <div></div>
        {/* right */}
        <div></div>
      </div>
    </div>
  )
  :
  (
    <div className="flex items-center justify-center h-screen">
      <p className="text-2xl font-medium text-gray-200">Unable to load project!</p>
    </div>
  )

}

export default Projects;
