import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { LangContext } from '../context/LangContext';
import projectsData from '../data/timeline.json';

const Timeline = () => {
  const { lang } = useContext(LangContext);
  const t = projectsData[lang];

  return (
    <section id="projet" className="bg-stone-200 dark:bg-zinc-700 px-6 py-12 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="w-200 h-[2px] bg-gray-300 dark:bg-gray-600 mx-auto mb-12 rounded-full" />
        <div className="text-center mb-12">
          <h2 className="text-4xl font-porkys">
            <span className="text-red-600 dark:text-red-500">{t.title}</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 dark:bg-red-500 mx-auto mt-2 rounded-full"></div>
        </div>

        <div className="relative">
          {/* Ligne centrale */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-black dark:bg-white" />

          <div className="flex flex-col gap-20">
            {t.projects.map((project, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative flex flex-col md:flex-row justify-between items-center w-full"
                >
                  {/* Bloc gauche */}
                  <div className={`w-full md:w-[44%] ${isLeft ? 'text-center md:text-right' : 'hidden md:block'}`}>
                    {isLeft && (
                      <div className="relative md:p-0 md:px-6 p-4 px-4 md:rounded-none rounded-xl md:border-none border md:shadow-none shadow-md md:bg-transparent bg-white dark:md:bg-transparent dark:bg-zinc-600">
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">{project.date}</p>
                        <Link to={`/projets/${project.slug}`}>
                          <h3 className="text-xl font-semibold text-red-600 dark:text-red-500 hover:underline">
                            {project.title}
                          </h3>
                        </Link>
                        <Link to={`/projets/${project.slug}`}>
                          <img
                            src={project.image}
                            alt={project.title}
                            className="rounded-lg shadow-md mt-2 w-96 h-auto ml-auto transform transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-[0_0_0_4px_rgba(220,38,38,0.25)] hover:shadow-red-500/20"
                          />
                        </Link>
                        <p className="text-gray-700 dark:text-gray-300 mt-2">{project.summary}</p>
                      </div>
                    )}
                  </div>

                  {/* Point central */}
                  <div className="w-full md:w-1/12 flex justify-center items-center z-10 order-first md:order-none mb-4 md:mb-0">
                    <div className="w-5 h-5 bg-red-500 dark:text-red-500 rounded-full border-4 border-white dark:border-zinc-800"></div>
                  </div>

                  {/* Bloc droit */}
                  <div className={`w-full md:w-[44%] ${!isLeft ? 'text-center md:text-left' : 'hidden md:block'}`}>
                    {!isLeft && (
                      <div className="relative md:p-0 md:px-6 p-4 px-4 md:rounded-none rounded-xl md:border-none border  md:shadow-none shadow-md md:bg-transparent bg-white dark:md:bg-transparent dark:bg-zinc-600">
                        {/* 📅 Date */}
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">{project.date}</p>
                      
                        <Link to={`/projets/${project.slug}`}>
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-red-600 dark:text-red-500 hover:underline mb-2">
                          {project.title}
                        </h3>

                        </Link>

                      
                        {/* 📷 Image */}
                        <Link to={`/projets/${project.slug}`}>
                          <img
                            src={project.image}
                            alt={project.title}
                            className="rounded-lg shadow-md mt-2 mb-2 w-96 h-auto object-contain mx-auto md:mx-0 transform transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-[0_0_0_4px_rgba(220,38,38,0.25)] hover:shadow-red-500/20"
                          />
                        </Link>
                      
                        {/* 📝 Résumé */}
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                          {project.summary}
                        </p>
                      </div>
                    
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;