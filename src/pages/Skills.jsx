import { motion } from "framer-motion";
import { useContext } from "react";
import { LangContext } from "../context/LangContext";
import skillsData from "../data/skills.json";

const technicalSkills = [
  { name: "Power BI", icon: "/icons/powerbi.png" },
  { name: "Power Query", icon: "/icons/powerquery.png" },
  { name: "VBA", icon: "/icons/vba.svg" },
  { name: "Pack Office", icon: "/icons/packoffice.png" },
  { name: "Python", icon: "/icons/python.png" },
  { name: "VS Code", icon: "/icons/vscode.png" },
  { name: "Flask", icon: "/icons/flask.png" },
  { name: "Dash", icon: "/icons/dash.png" },
  { name: "SQL", icon: "/icons/sql.png" },
  { name: "CSS", icon: "/icons/css.png" },
  { name: "HTML", icon: "/icons/html.png" },
  { name: "React", icon: "/icons/react.png" },
  { name: "Vite", icon: "/icons/vite.png" },
  { name: "Tailwind", icon: "/icons/tailwind.png" },
  { name: "Langage C", icon: "/icons/C.png" }
];

const Skills = () => {
  const { lang } = useContext(LangContext);
  const t = skillsData[lang];

  return (
    <section
      id="skills"
      className="bg-stone-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-100 px-6 md:px-20 py-20 transition-colors duration-300"
    >
      {/* Titre */}
      <div className="w-200 h-[2px] bg-gray-300 dark:bg-gray-600 mx-auto mb-12 rounded-full" />
      <div className="text-center mb-12">
        <h2 className="text-4xl font-porkys">
          <span className="text-red-600 dark:text-red-500">{t.title}</span>
        </h2>
        <div className="w-24 h-1 bg-red-600 dark:bg-red-500 mx-auto mt-2 rounded-full"></div>
      </div>

      {/* Marquee scrollable et animée */}
      <div className="relative overflow-x-auto hide-scrollbar">
        <motion.div
          className="flex gap-8 whitespace-nowrap min-w-max px-2 py-4"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {[...technicalSkills, ...technicalSkills].map((skill, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center min-w-[100px]"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-md mb-2">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-xs text-center font-medium">{skill.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Soft Skills */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16 max-w-7xl mx-auto whitespace-pre-line">
        {t.softSkills.map((skill, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-5 transform transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-[0_0_0_4px_rgba(220,38,38,0.25)] hover:shadow-red-500/20"
          >
            <h3 className="text-red-600 dark:text-red-500 font-semibold text-lg mb-2">
              {skill.title}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {skill.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
