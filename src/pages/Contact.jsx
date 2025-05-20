import { useRef, useState, useContext } from "react";
import emailjs from "emailjs-com";
import { Mail, Phone, MapPin, Linkedin, Github, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { LangContext } from "../context/LangContext";
import contactData from "../data/contact.json";

const Contact = () => {
  const { lang } = useContext(LangContext);
  const t = contactData[lang];
  const form = useRef();
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  const showToast = (message, type = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ message: "", type: "", visible: false }), 4000);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);

    const serviceID = "service_a0fs26b";
    const userTemplateID = "template_t8hwx0f";
    const ownerTemplateID = "template_w8fu7ir";
    const publicKey = "Hm9DPlseKJ8RgsAes";

    Promise.all([
      emailjs.sendForm(serviceID, userTemplateID, form.current, publicKey),
      emailjs.sendForm(serviceID, ownerTemplateID, form.current, publicKey)
    ])
      .then(() => {
        setSending(false);
        showToast(t.toastSuccess, "success");
        form.current.reset();
      })
      .catch(() => {
        setSending(false);
        showToast(t.toastError, "error");
      });
  };

  return (
    <>
      <section
        id="contact"
        className="bg-stone-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-100 py-20 px-6 md:px-16 relative transition-colors duration-300"
      >
        <div className="w-200 h-[2px] bg-gray-300 dark:bg-gray-600 mx-auto mb-12 rounded-full" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Colonne gauche animée */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl font-bold mb-4">
              {t.title} <span className="text-red-600 dark:text-red-500">{t.highlight}</span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8 text-justify whitespace-pre-line">
              {t.description}
            </p>

            <div className="space-y-6 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="text-rose-600 dark:text-red-500" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p><a href="mailto:aurelienunge.pro@gmail.com" className="hover:underline">aurelienunge.pro@gmail.com</a></p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-rose-600 dark:text-red-500" />
                <div>
                  <p className="font-semibold">Téléphone</p>
                  <p><a href="tel:+33670212436" className="hover:underline">+33 6 70 21 24 36</a></p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-rose-600 dark:text-red-500" />
                <div>
                  <p className="font-semibold">Localisation</p>
                  <p>Lyon, France</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8 text-rose-600 dark:text-red-500">
              <a href="https://www.linkedin.com/in/aurelienunge" target="_blank" rel="noreferrer" className="hover:text-rose-800 dark:hover:text-rose-300 transition">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/Ollfy" target="_blank" rel="noreferrer" className="hover:text-rose-800 dark:hover:text-rose-300 transition">
                <Github size={24} />
              </a>
            </div>
          </motion.div>

          {/* Formulaire animé */}
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-md"
          >
            <div>
              <label className="block mb-1 font-medium" htmlFor="name">{t.labels.name}</label>
              <input name="name" id="name" type="text" placeholder={t.placeholders.name} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded-md" required />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="email">{t.labels.email}</label>
              <input name="email" id="email" type="email" placeholder={t.placeholders.email} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded-md" required />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="subject">{t.labels.subject}</label>
              <input name="subject" id="subject" type="text" placeholder={t.placeholders.subject} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded-md" required />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="message">{t.labels.message}</label>
              <textarea name="message" id="message" rows="4" placeholder={t.placeholders.message} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded-md" required></textarea>
            </div>

            <button type="submit" disabled={sending} className={`flex items-center justify-center gap-2 ${sending ? "bg-rose-400 cursor-not-allowed" : "bg-rose-600 hover:bg-rose-800"} text-white py-2 px-6 rounded-md transition`}>
              {sending ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                    <path d="M4 12a8 8 0 018-8" stroke="white" strokeWidth="4" fill="none" />
                  </svg>
                  {t.sending}
                </>
              ) : (
                t.send
              )}
            </button>
          </motion.form>
        </div>

        {/* Toast */}
        {toast.visible && (
          <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-md shadow-lg text-white text-sm font-medium transition-all duration-300 ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
            <div className="flex items-center gap-2">
              {toast.type === "success" ? <CheckCircle size={18} /> : <XCircle size={18} />}
              <span>{toast.message}</span>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-300 dark:border-white bg-stone-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-400 py-8 px-6 text-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-left font-semibold text-red-600 dark:text-red-500">
            Aurélie Nunge<span className="text-gray-800 dark:text-gray-100">.</span>
          </div>
          <div className="text-center text-gray-700 dark:text-white">
            © {new Date().getFullYear()} {t.footer}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;
