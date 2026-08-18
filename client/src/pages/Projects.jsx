import React, { useEffect, useState } from 'react';
import { projectService } from '../services/projectService';
import ProjectCard from '../components/ProjectCard';
import Modal from '../components/Modal';
import { CardSkeleton } from '../components/LoadingSkeleton';
import {
  FolderGit2,
  Search,
  SlidersHorizontal,
  Star,
  Github,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFeatured, setFilterFeatured] = useState(false);
  const [selectedTech, setSelectedTech] = useState('All');
  const [previewProject, setPreviewProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await projectService.getProjects();
        if (res.success && res.data) {
          setProjects(res.data);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Extract all unique technologies
  const allTechnologies = [
    'All',
    ...Array.from(
      new Set(
        projects.flatMap((p) => p.technologies || []).filter(Boolean)
      )
    ),
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFeatured = filterFeatured ? project.featured : true;
    const matchesTech =
      selectedTech === 'All' || project.technologies.includes(selectedTech);

    return matchesSearch && matchesFeatured && matchesTech;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Project Portfolio</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Selected <span className="gradient-text">Projects</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
          Practical web applications, backend systems, machine learning recommendations, and responsive utilities.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center gap-4">
        {/* Search input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects by name, keyword, or technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Featured Toggle */}
          <button
            onClick={() => setFilterFeatured(!filterFeatured)}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
              filterFeatured
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${filterFeatured ? 'fill-amber-300' : ''}`} />
            <span>Featured Only</span>
          </button>

          {/* Technology dropdown */}
          <select
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-medium text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            {allTechnologies.map((tech) => (
              <option key={tech} value={tech}>
                {tech === 'All' ? 'All Tech Stacks' : tech}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <SlidersHorizontal className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No projects found</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query or technology filter to find what you are looking for.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterFeatured(false);
              setSelectedTech('All');
            }}
            className="mt-2 text-xs font-semibold text-indigo-400 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onSelect={(p) => setPreviewProject(p)}
            />
          ))}
        </div>
      )}

      {/* Quick Preview Modal */}
      {previewProject && (
        <Modal
          isOpen={!!previewProject}
          onClose={() => setPreviewProject(null)}
          title={previewProject.title}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-6">
            <div className="aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={previewProject.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'}
                alt={previewProject.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
                }}
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                Project Overview
              </h4>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {previewProject.description}
              </p>
            </div>

            {previewProject.features && previewProject.features.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  Core Features
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {previewProject.features.slice(0, 4).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Technologies Utilized
              </h4>
              <div className="flex flex-wrap gap-2">
                {previewProject.technologies?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-indigo-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <a
                href={`/projects/${previewProject._id}`}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                View Complete Project Details →
              </a>

              <div className="flex items-center gap-2">
                {Boolean(previewProject.githubUrl?.trim()) && (
                  <a
                    href={previewProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repository</span>
                  </a>
                )}
                {Boolean(previewProject.liveUrl?.trim()) && (
                  <a
                    href={previewProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Projects;
