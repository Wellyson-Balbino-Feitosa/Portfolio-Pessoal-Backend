import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<{ type: 'idle' | 'error' | 'success'; msg: string }>({ type: 'idle', msg: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', msg: 'Por favor, preencha todos os campos da mensagem.' });
      return;
    }

    const recipient = 'lowlyensnibalbo@gmail.com';
    const subject = encodeURIComponent(`Contato via Portfólio - ${formData.name}`);
    const body = encodeURIComponent(`Nome: ${formData.name}\nE-mail: ${formData.email}\n\nMensagem:\n${formData.message}`);
    
    // Provoca a abertura do cliente de email local
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    
    setStatus({ type: 'success', msg: 'Cliente de e-mail aberto com sucesso!' });
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => {
      setStatus({ type: 'idle', msg: '' });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    if (status.type === 'error') setStatus({ type: 'idle', msg: '' });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-2 mb-4"
          >
            Vamos Construir Juntos!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-body"
          >
            Seja para construir um sistema personalizado para sua empresa ou para um projeto pessoal, seja para refatorar um sistema legado ou apenas trocar uma ideia sobre escalabilidade, minha caixa de entrada está aberta.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Informações de Contato</h3>
                <p className="text-sm text-text-muted">
                  Prefiro e-mails ou LinkedIn para conversas profissionais e discussões de projetos.
                </p>
              </div>

              <div className="space-y-4">
                <a href="mailto:lowlyensnibalbo@gmail.com" className="flex items-center gap-4 text-text-muted hover:text-primary transition-colors group">
                  <div className="p-3 glass rounded-xl group-hover:bg-primary/10 transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">E-mail</p>
                    <p className="text-sm break-all">lowlyensnibalbo@gmail.com</p>
                  </div>
                </a>

                <a href="https://linkedin.com/in/wellysonbalbino/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-text-muted hover:text-[#0A66C2] transition-colors group">
                  <div className="p-3 glass rounded-xl group-hover:bg-[#0A66C2]/10 transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">LinkedIn</p>
                    <p className="text-sm">Conecte-se comigo</p>
                  </div>
                </a>

                <a href="https://github.com/Wellyson-Balbino-Feitosa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-text-muted hover:text-white transition-colors group">
                  <div className="p-3 glass rounded-xl group-hover:bg-white/10 transition-colors">
                    <Github className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">GitHub</p>
                    <p className="text-sm">Veja meus repositórios</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Message Form */}
            <div className="bg-surface/50 p-6 rounded-2xl border border-white/5 flex flex-col">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-accent" />
                Mensagem Rápida
              </h3>
              
              <form className="space-y-4 flex-grow flex flex-col" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="sr-only">Nome</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu Nome"
                    className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Seu E-mail"
                    className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div className="flex-grow">
                  <label htmlFor="message" className="sr-only">Mensagem</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Como posso te ajudar?"
                    className="w-full h-full bg-surface/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none min-h-[120px]"
                  ></textarea>
                </div>

                {status.type === 'error' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-2 rounded">
                    <AlertCircle className="w-4 h-4" />
                    {status.msg}
                  </motion.div>
                )}
                {status.type === 'success' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 p-2 rounded">
                    <CheckCircle2 className="w-4 h-4" />
                    {status.msg}
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full bg-primary text-background font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mt-auto"
                >
                  <Send className="w-5 h-5" />
                  Enviar Mensagem
                </button>
              </form>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

