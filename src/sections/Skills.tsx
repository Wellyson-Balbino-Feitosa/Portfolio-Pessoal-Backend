import { motion } from 'framer-motion';
import { 
  FaNodeJs, FaPython, FaDocker, FaGithub, FaGitlab, FaLinux 
} from 'react-icons/fa';
import { 
  SiJavascript, SiFastapi, SiFlask, SiDjango, SiPostgresql, 
  SiMysql, SiMongodb, SiSqlalchemy, SiVercel
} from 'react-icons/si';
import { 
  BiGitBranch 
} from 'react-icons/bi';
import { 
  Network, Layers, ShieldCheck, Component, TestTube2, Terminal
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Linguagens & Frameworks',
    skills: [
      { name: 'Node.js', icon: <FaNodeJs /> },
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'Python', icon: <FaPython /> },
      { name: 'FastAPI', icon: <SiFastapi /> },
      { name: 'Flask', icon: <SiFlask /> },
      { name: 'Django', icon: <SiDjango /> },
    ],
  },
  {
    title: 'Bancos de Dados & ORMs',
    skills: [
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'MySQL', icon: <SiMysql /> },
      { name: 'MongoDB', icon: <SiMongodb /> },
      { name: 'SQLAlchemy', icon: <SiSqlalchemy /> },
      { name: 'Alembic (migrações)', icon: <Terminal className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Infraestrutura & DevOps',
    skills: [
      { name: 'Docker', icon: <FaDocker /> },
      { name: 'Docker Compose', icon: <FaDocker /> },
      { name: 'CI/CD (GitHub Actions)', icon: <FaGithub /> },
      { name: 'Git', icon: <BiGitBranch /> },
      { name: 'GitHub', icon: <FaGithub /> },
      { name: 'GitLab', icon: <FaGitlab /> },
      { name: 'Linux', icon: <FaLinux /> },
    ],
  },
  {
    title: 'Arquitetura & Ferramentas',
    skills: [
      { name: 'APIs RESTful', icon: <Network className="w-4 h-4" /> },
      { name: 'Clean Architecture', icon: <Layers className="w-4 h-4" /> },
      { name: 'SOLID', icon: <ShieldCheck className="w-4 h-4" /> },
      { name: 'MVC', icon: <Component className="w-4 h-4" /> },
      { name: 'Arquitetura em Camadas', icon: <Layers className="w-4 h-4" /> },
      { name: 'Testes Unitários', icon: <TestTube2 className="w-4 h-4" /> },
      { name: 'Vercel', icon: <SiVercel /> },
    ],
  }
];

export const Skills = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-2 mb-4"
          >
            Habilidades Técnicas (Hard Skills)
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-primary mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass p-8 rounded-2xl border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors" />
              
              <h3 className="text-xl font-bold text-white mb-6 relative z-10">{category.title}</h3>
              
              <div className="flex flex-wrap gap-3 relative z-10">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-text-muted hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default"
                  >
                    <span className="text-lg flex items-center justify-center">{skill.icon}</span>
                    {skill.name}
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
