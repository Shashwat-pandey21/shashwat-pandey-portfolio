import React from 'react';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, ArrowRight, Star } from 'lucide-react';

const ProjectCard = ({ project, onSelect }) => {
  const {
    _id,
    title,
    description,
    technologies = [],
    image,
    githubUrl,
    liveUrl,
    featured,
  } = project;

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col group h-full border border-slate-800/80 bg-slate-900/60 hover:border-indigo-500/50 transition-all duration-300">
      {/* Project Image Preview */}
      <div className="relative aspect-video overflow-hidden bg-slate-950">
        <img
          src={image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-80" />

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold backdrop-blur-md">
            <Star className="w-3 h-3 fill-amber-300" />
            <span>Featured</span>
          </div>
        )}

        {/* Quick Links Overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View Source Code"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full bg-slate-900/80 hover:bg-white hover:text-slate-950 text-white flex items-center justify-center backdrop-blur-md border border-slate-700 transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Live Deployment"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-white flex items-center justify-center backdrop-blur-md shadow-lg shadow-indigo-600/30 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <Link
            to={`/projects/${_id}`}
            className="block text-xl font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1"
          >
            {title}
          </Link>
          <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Technologies Pills */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-indigo-300 text-xs font-mono"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
              <span className="px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-400 text-xs font-mono">
                +{technologies.length - 4}
              </span>
            )}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <Link
              to={`/projects/${_id}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>Explore Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {onSelect && (
              <button
                onClick={() => onSelect(project)}
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                Quick Preview
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
