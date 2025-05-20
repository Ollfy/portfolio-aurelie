import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { LangContext } from "../context/LangContext";
import SimpleModelViewer from '../components/SimpleModelViewer';

import frData from "../data/project_fr.json";
import enData from "../data/project_en.json";

// Composant pour afficher chaque section
const Section = ({ heading, content }) => (
  <div className="mb-6">
    {heading && (
      <h2 className="text-xl font-semibold text-red-600 dark:text-red-500 mt-6 mb-2">
        {heading}
      </h2>
    )}

    {Array.isArray(content) ? (
      content.map((item, index) =>
        item === "{{3D_MODEL}}" ? (
          <div className="w-full h-[500px] my-4" key={index}>
            <SimpleModelViewer />
          </div>
        ) : (
          <div
            key={index}
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: item }}
          />
        )
      )
    ) : content === "{{3D_MODEL}}" ? (
      <div className="w-full h-[500px] my-4">
        <SimpleModelViewer />
      </div>
    ) : (
      <div className="mb-4" dangerouslySetInnerHTML={{ __html: content }} />
    )}
  </div>
);

// Composant principal
const ProjectPage = () => {
  const { slug } = useParams();
  const { lang } = useContext(LangContext); // "fr" ou "en"

  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const data = lang === "en" ? enData : frData;
    const project = data.projects?.[slug];
    setProjectData(project || null);
  }, [lang, slug]);

  if (!projectData) {
    return (
      <p className="text-center mt-20 text-red-500">
        {lang === "en" ? "Project not found." : "Projet introuvable."}
      </p>
    );
  }

  return (
    <section className="px-6 py-12 max-w-3xl mx-auto bg-stone-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 text-justify leading-relaxed whitespace-pre-line mb-4">
      <Link to="/" className="text-red-500 hover:underline text-sm mt-10 block">
        ← {lang === "en" ? "Back to timeline" : "Retour à la timeline"}
      </Link>

      <h1 className="text-3xl font-bold text-red-600 mt-8 mb-6 font-serif">
        {projectData.title}
      </h1>

      {Object.entries(projectData.sections || {}).map(([key, section]) => (
        <Section
          key={key}
          heading={section.heading}
          content={section.content}
        />
      ))}
    </section>
  );
};

export default ProjectPage;