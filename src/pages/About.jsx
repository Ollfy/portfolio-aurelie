import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { LangContext } from "../context/LangContext";
import aboutData from "../data/about.json";

const About = () => {
  const { lang } = useContext(LangContext);
  const t = aboutData[lang];

  return (
    <section
      id="about"
      className="bg-stone-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-100 px-4 sm:px-8 md:px-20 py-24 md:py-32 lg:py-40 transition-colors duration-300 min-h-[100vh]"
    >
      <div className="w-200 h-[2px] bg-gray-300 dark:bg-gray-600 mx-auto mb-12 rounded-full" />
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-porkys text-red-600 dark:text-red-500">
          {t.title.split(" ")[0]}{" "}
          <span className="text-red-600 dark:text-red-500">
            {t.title.split(" ")[1]}
          </span>
        </h2>
        <div className="w-24 h-1 bg-red-600 dark:bg-red-500 mx-auto mt-2 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse md:grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-4xl mb-2 font-bold"
          >
            {t.job}{" "}
            <span className="text-red-600 dark:text-red-500 font-porkys">.</span>
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-base sm:text-lg text-justify whitespace-pre-line space-y-4 px-4 sm:px-0"
          >
            <p>
              {t.descriptionLines[0]} <strong>Aurélie Nunge</strong>
              {t.descriptionLines[1]}
            </p>
            <p>
              {t.descriptionLines.slice(2).join(" ")}
            </p>
          </motion.div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-800 dark:text-gray-200 mb-8">
            {t.skills.map((skill, index) => (
              <motion.li
                key={skill}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.15 }}
                className="flex items-center gap-2"
              >
                <CheckCircle size={18} className="text-red-600 dark:text-red-500" />
                {skill}
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="flex gap-4 flex-wrap"
          >
            <a
              href="/documents/CV.pdf"
              target="_blank"
              className="inline-block bg-red-600 dark:bg-red-500 text-white font-medium px-6 py-3 rounded-md hover:bg-red-800 dark:hover:bg-red-500 transition"
            >
              {t.cv}
            </a>
            <a
              href="#contact"
              className="border border-red-600 dark:border-red-500 text-red-600 dark:text-red-500 px-6 py-3 rounded-md hover:bg-red-100 dark:hover:bg-red-900 transition"
            >
              {t.contact}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-sm sm:max-w-md h-72 sm:h-[650px] mx-auto rounded-xl shadow-inner overflow-hidden"
        >
          <img
            src="/documents/moi.png"
            alt="Illustration"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;