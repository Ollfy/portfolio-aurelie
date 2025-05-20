import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section id="home" className="bg-stone-200 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 min-h-screen px-8 md:px-20 py-16 transition-colors duration-300">
      {/* Titre centré au-dessus */}
      <h1 className="text-5xl leading-tight text-center mb-12">
        <span className="text-gray-800 dark:text-gray-100 font-porkys text-8xl"> AURéLIE NUNGE </span>
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Gauche : texte animé dès le chargement */}
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 text-justify">
            Je suis <strong>Aurélie Nunge</strong>, Data Analyst spécialisée en automatisation et visualisation de données. <br />
            J’aide les entreprises à transformer leurs données en leviers de décision grâce à des analyses claires, des dashboards pertinents et des solutions efficaces.<br />
            Mon approche allie technicité et pédagogie, pour que chaque insight soit compréhensible et utile.<br />
            Après deux ans en alternance, je mets mes compétences à disposition en freelance, pour des missions ponctuelles ou de plus long terme.<br />
            👉 Curieuse, rigoureuse et passionnée, je suis toujours partante pour un nouveau challenge.<br />
            N’hésitez pas à me contacter pour discuter de votre projet. 🙌
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-red-700 dark:bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-800 dark:hover:bg-red-500 transition">
              Voir mes projets
            </button>
            <a
              href="#contact"
              className="border border-red-700 dark:border-red-500 text-red-700 dark:text-red-400 px-6 py-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900 transition"
            >
              Me contacter
            </a>
          </div>
        </motion.div>

        {/* Droite : image animée aussi immédiatement */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <img
            src="/illustration-concept-analyse-donnees_114360-8053.jpg"
            alt="Graphique illustratif"
            className="w-[500px] h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
