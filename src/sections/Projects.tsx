import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Layers, Activity } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  icon: ReactNode;
  tech: string[];
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    title: 'AsyncFlow Engine - Motor de Processamento Assíncrono',
    description: 'Sistema distribuído para processamento de filas de alta demanda. O projeto foi pensado como uma solução para orquestrar e processar jobs de forma eficiente, utilizando FastAPI para exposição da API, RabbitMQ como broker de mensagens para distribuição das tarefas e workers assíncronos baseados em asyncio para execução não bloqueante. A persistência de estado é realizada com PostgreSQL, e toda a aplicação é containerizada com Docker, possibilitando fácil replicação e deploy.',
    icon: <Activity className="w-8 h-8 text-primary" />,
    tech: ['FastAPI', 'RabbitMQ', 'PostgreSQL', 'Docker', 'Kubernetes'],
    github: 'https://github.com/Wellyson-Balbino-Feitosa/AsyncFlow-Engine',
  },
  {
    title: 'API Gateway & Autenticação de Alta Performance para Microsserviços',
    description: 'Gateway de API centralizado com limitação de taxa (Rate Limiting) distribuído via Redis, além de possuir sistemas com JWT, rotas dinâmicas, proxy assíncrono e suporte a 15 microsserviços, preparado para escalar horizontalmente.',
    icon: <Layers className="w-8 h-8 text-accent" />,
    tech: ['FastAPI', 'PyJWT', 'Redis', 'HTTPX', 'Pydantic'],
    github: 'https://github.com/Wellyson-Balbino-Feitosa/Async-Api-Gateway'
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-surface/20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="heading-2 mb-4"
          >
            Experiência com Projetos & Arquitetura
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-body max-w-2xl"
          >
            Sistemas em produção não sobrevivem apenas com código limpo, eles precisam de design robusto. Aqui estão alguns desafios de backend que arquiteturei e implementei.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass p-8 rounded-2xl flex flex-col h-full border border-white/5 hover:border-primary/40 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                  {project.icon}
                </div>
                <div className="flex space-x-3">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-white transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-sm text-text-muted mb-8 flex-grow leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tech, tIdx) => (
                  <span key={tIdx} className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
