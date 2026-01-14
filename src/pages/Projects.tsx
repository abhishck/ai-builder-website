import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Project } from "../types";
import {
  ArrowBigDownDash,
  Divide,
  EyeIcon,
  EyeOffIcon,
  FullscreenIcon,
  LaptopIcon,
  Loader2Icon,
  MessageSquareIcon,
  SaveIcon,
  Smartphone,
  SmartphoneIcon,
  TabletIcon,
  XIcon,
} from "lucide-react";
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
    const project = dummyProjects.find((project) => project.id === projectId);
    setTimeout(() => {
      if (project) {
        setProjects({ ...project, conversation: dummyConversations });
        setLoading(false);
        setIsGenerating(project.current_code ? false : true);
      }
    }, 2000);
  };

  const saveProject=async()=>{

  }

  const downlaodCode = ()=>{

  }

  const togglePublish=async ()=>{

  }

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
          <img
            src="/favicon.svg"
            alt="logo"
            className="h-6 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="max-w-64 sm:max-w-xs">
            <p className="text-sm text-medium capitalize truncate">
              {project.name}
            </p>
            <p className="text-xs text-gray-400 -mt-0.5">
              Previewing last saved version
            </p>
          </div>
          <div className="sm:hidden flex-1 flex justify-end">
            {isMenuOpen ? (
              <MessageSquareIcon
                onClick={() => setIsMenuOpen(false)}
                className="size-6 cursor-pointer"
              />
            ) : (
              <XIcon
                onClick={() => setIsMenuOpen(true)}
                className="size=6 cursor-pointer"
              />
            )}
          </div>
        </div>
        {/* middle */}
        <div className="sm:flex hidden gap-2 bg-gray-950 p-1.5 rounded-md">
          <SmartphoneIcon
            onClick={() => setDevice("phone")}
            className={`size-6 p-1 rounded cursor-pointer ${
              device === "phone" ? "bg-gray-700" : ""
            }`}
          />
          <TabletIcon
            onClick={() => setDevice("tablet")}
            className={`size-6 p-1 rounded cursor-pointer ${
              device === "tablet" ? "bg-gray-700" : ""
            }`}
          />
          <LaptopIcon
            onClick={() => setDevice("desktop")}
            className={`size-6 p-1 rounded cursor-pointer ${
              device === "desktop" ? "bg-gray-700" : ""
            }`}
          />
        </div>
        {/* right */}
        <div className="flex items-center justify-end gap-3 flex-1 text-xs sm:text-sm">
          <button onClick={saveProject} disabled={isSaving} className="max-sm:hidden bg-gray-800 hover:bg-gray-700 text-white px-3.5 py-1 flex items-center gap-2 rounded sm:rounded-sm transition-colors border border-gray-700">
            {isSaving ? <Loader2Icon className="animate-spin" size={16}/> :
            
            <SaveIcon size={16} />
            }
            Save
          </button>
          <Link target="_blank" to={`/preview/${projectId}`} className="flex items-center gap-2 px-4 py-1 rounded sm:rounded-sm border border-gary-500 transition-colors">
            <FullscreenIcon size={16} /> preview
          </Link>
          <button onClick={downlaodCode} className="bg-linear-to-br from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white px-3.5 py-1 flex items-center gap-2 rounded sm:rounded-sm transition-colors">
            <ArrowBigDownDash size={16} /> Download
          </button>
          <button onClick={togglePublish} className="bg-linear-to-br from-indigo-700 to-indigo-600 hover:from-indigo-600 hover:to-indigo-500 text-white px-3.5 py-1 flex items-center gap-2 rounded sm:rounded-sm transition-colors">
            {project.isPublished ? (
              <EyeOffIcon size={16} />
            ) : (
              <EyeIcon size={16} />
            )}
            {project.isPublished ? "Publish" : "Unpublish"}
          </button>
        </div>
      </div>
      <div className="flex-1 flex overflow-auto">
            {/* left sidebar */}
            <div>sidebar</div>
            <div className="flex-1 p-2 pl-0">project preview</div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <p className="text-2xl font-medium text-gray-200">
        Unable to load project!
      </p>
    </div>
  );
}

export default Projects;
