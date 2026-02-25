import { motion } from 'framer-motion';
import { Database, Server, ShieldCheck, Cpu } from 'lucide-react';

const features = [
  {
    icon: <Server className="w-6 h-6 text-primary" />,
    title: 'Arquitetura Em Camadas',
    description: 'Organização do sistema em camadas bem definidas (controller, service e repository), promovendo separação de responsabilidades, código mais limpo e maior facilidade de manutenção e evolução.'
  },
  {
    icon: <Database className="w-6 h-6 text-accent" />,
    title: 'Modelagem de Dados',
    description: 'Otimização de consultas e design de schemas para bancos relacionais (PostgreSQL, MySQL).'
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#10b981]" />,
    title: 'Segurança & Autenticação',
    description: 'Implementação de fluxos de autenticação seguros (OAuth, JWT) e práticas rigorosas de proteção contra vulnerabilidades comuns.'
  },
  {
    icon: <Cpu className="w-6 h-6 text-[#f59e0b]" />,
    title: 'DevOps & CI/CD',
    description: 'Containerização com Docker, orquestração com Docker Compose, e automação de deploys para um ciclo de vida de desenvolvimento ágil e contínuo.'
  }
];

export const About = () => {
  return (
    <section id="about" className="py-20 bg-surface/30 border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h2 className="heading-2 mb-6">A Pessoa por Trás da Performance</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mb-8 rounded-full"></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center mb-4">
              {/* Profile Image */}
              <div className="w-56 h-56 sm:w-48 sm:h-48 mx-auto sm:mx-0 shrink-0 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl relative group">
                <div className="absolute inset-0 bg-transparent sm:bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
                {/* 
                  O link da imagem abaixo é um placeholder estilizado. 
                  Recomendo substituir pela sua própria foto (ex: em public/avatar.jpg mantendo o /avatar.jpg) 
                */}
                <img 
                  src="https://avatars.githubusercontent.com/u/251650728?v=4"
                  alt="Wellyson - Desenvolvedor Backend" 
                  className="w-full h-full object-cover grayscale-0 sm:grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110" 
                />
              </div>

              <div className="flex-1">
                <p className="text-body">
                  Acredito que tecnologia não é apenas código mas sim responsabilidade, colaboração e impacto real na vida de milhares de usuários. Dessa forma, atuo no desenvolvimento de APIs e sistemas backend com foco em arquitetura limpa, alta performance com assíncronismo e escalabilidade. Construo hoje estruturando aplicações com separação clara de responsabilidades, boas práticas (Clean Code, SOLID) e preocupação constante com manutenibilidade.
                </p>
              </div>
            </div>

            <p className="text-body mb-2">
              Com aprendizado contínuo em desenvolvimento de software, foco não apenas em preencher requisitos, mas em criar bases de código sólidas, limpas e testadas. Afinal, um bom sistema vive muito além de sua primeira versão.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-2">
              <div className="glass p-4 rounded-xl border border-white/5 text-center">
                <span className="block text-3xl font-extrabold text-white mb-1">1+</span>
                <span className="text-sm text-text-muted">Anos de Experiência</span>
              </div>
              <div className="glass p-4 rounded-xl border border-white/5 text-center">
                <span className="block text-3xl font-extrabold text-white mb-1">3.6x</span>
                <span className="text-sm text-text-muted">Mais performance com assíncronismo</span>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
