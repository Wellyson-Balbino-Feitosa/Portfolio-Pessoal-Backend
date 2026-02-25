import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-green-500 text-sm font-medium mb-8 border border-primary/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Disponível para novos projetos
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-1 mb-6"
          >
            Transformando <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Conceitos</span>
            <br className="hidden sm:block" /> em Aplicações Reais.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-body max-w-2xl mb-10 mx-auto"
          >
            Desenvolvo sistemas focados em arquiteturas escaláveis, APIs assíncronas de alta performance e engenharia de software sólida. Transformo os seus desafios em sistemas robustos e confiáveis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-background font-bold hover:bg-primary/90 transition-all w-full sm:w-auto"
            >
              Ver Projetos
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg glass text-white hover:bg-white/5 transition-all w-full sm:w-auto"
            >
              <Terminal className="w-5 h-5" />
              Vamos Conversar
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
