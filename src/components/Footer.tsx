import { Terminal, Github, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-surface border-t border-white/5 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        <div className="flex items-center gap-2 mb-6">
          <Terminal className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg text-white">
            Wellyson<span className="text-primary">.</span>Dev
          </span>
        </div>

        <div className="flex space-x-6 mb-8">
          <a href="https://github.com/Wellyson-Balbino-Feitosa" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-white transition-colors">
            <span className="sr-only">GitHub</span>
            <Github className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/wellysonbalbino/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-[#0A66C2] transition-colors">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="mailto:wellysonjose115@gmail.com" className="text-text-muted hover:text-primary transition-colors">
            <span className="sr-only">Email</span>
            <Mail className="w-6 h-6" />
          </a>
        </div>

        <p className="text-sm text-text-muted/60 text-center">
          &copy; {new Date().getFullYear()} Wellyson Balbino Feitosa | Todos os direitos reservados. 
        </p>
      </div>
    </footer>
  );
};
