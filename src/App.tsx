/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Check, ArrowRight, Instagram, Globe } from 'lucide-react';

type Step = 
  | 'welcome' 
  | 'name' 
  | 'whatsapp' 
  | 'email' 
  | 'context' 
  | 'challenges' 
  | 'revenue' 
  | 'investment' 
  | 'why_me' 
  | 'final';

interface FormData {
  name: string;
  whatsapp: string;
  email: string;
  context: string;
  challenge: string;
  revenue: string;
  investment: string;
  why_me: string;
}

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    whatsapp: '',
    email: '',
    context: '',
    challenge: '',
    revenue: '',
    investment: '',
    why_me: '',
  });

  const [error, setError] = useState<string | null>(null);

  const stepsOrder: Step[] = [
    'welcome', 
    'name', 
    'whatsapp', 
    'email', 
    'context', 
    'challenges', 
    'revenue', 
    'investment', 
    'why_me', 
    'final'
  ];

  const currentStepIndex = stepsOrder.indexOf(currentStep);
  const progress = (currentStepIndex / (stepsOrder.length - 1)) * 100;

  const validateCurrentStep = (): boolean => {
    setError(null);
    switch (currentStep) {
      case 'name':
        if (!formData.name.trim()) {
          setError('Por favor, preencha seu nome.');
          return false;
        }
        break;
      case 'whatsapp':
        if (!formData.whatsapp.trim()) {
          setError('Por favor, preencha seu WhatsApp.');
          return false;
        }
        break;
      case 'email':
        if (!formData.email.trim() || !formData.email.includes('@')) {
          setError('Por favor, insira um e-mail válido.');
          return false;
        }
        break;
      case 'context':
        if (!formData.context.trim()) {
          setError('Por favor, descreva seu negócio.');
          return false;
        }
        break;
      case 'challenges':
        if (!formData.challenge) {
          setError('Por favor, selecione uma opção.');
          return false;
        }
        break;
      case 'revenue':
        if (!formData.revenue) {
          setError('Por favor, selecione seu faturamento.');
          return false;
        }
        break;
      case 'investment':
        if (!formData.investment) {
          setError('Por favor, selecione uma opção de investimento.');
          return false;
        }
        break;
      case 'why_me':
        if (!formData.why_me.trim()) {
          setError('Por favor, responda esta pergunta.');
          return false;
        }
        break;
    }
    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      const nextIdx = currentStepIndex + 1;
      if (nextIdx < stepsOrder.length) {
        setCurrentStep(stepsOrder[nextIdx]);
      }
    }
  };

  const prevStep = () => {
    setError(null);
    const prevIdx = currentStepIndex - 1;
    if (prevIdx >= 0) {
      setCurrentStep(stepsOrder[prevIdx]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Prevent next step if it's a textarea and we want new lines, 
      // but here we follow Typeform style where Enter usually proceeds.
      if (currentStep !== 'context' && currentStep !== 'why_me' && currentStep !== 'welcome' && currentStep !== 'final') {
        nextStep();
      }
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <motion.div 
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-[90vw] md:w-full max-w-2xl text-center space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-display font-bold text-cupula-gold leading-tight">
                Aplicação Estratégica:<br />A CÚPULA
              </h1>
              <p className="text-lg md:text-xl text-cupula-cream/80 font-light">
                Responda com atenção. Esta é a etapa obrigatória para avaliarmos se o momento atual do seu negócio tem fit com o nosso método de escala. Leva menos de 2 minutos.
              </p>
            </div>
            <button onClick={nextStep} className="typeform-button group">
              Iniciar Aplicação
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-cupula-cream/40">Pressione Enter ↵</p>
          </motion.div>
        );

      case 'name':
        return (
          <motion.div 
            key="name"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-[90vw] md:w-full max-w-2xl space-y-6"
          >
            <div className="space-y-2">
              <span className="text-cupula-gold font-mono text-sm">01 →</span>
              <h2 className="text-2xl md:text-3xl font-medium">Para começarmos, qual é o seu nome completo?</h2>
            </div>
            <input 
              autoFocus
              type="text"
              placeholder="Digite seu nome aqui..."
              className="typeform-input"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="flex items-center gap-4">
              <button onClick={nextStep} className="typeform-button">OK</button>
              <span className="text-xs text-cupula-cream/40">pressione Enter ↵</span>
            </div>
          </motion.div>
        );

      case 'whatsapp':
        return (
          <motion.div 
            key="whatsapp"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-[90vw] md:w-full max-w-2xl space-y-6"
          >
            <div className="space-y-2">
              <span className="text-cupula-gold font-mono text-sm">02 →</span>
              <h2 className="text-2xl md:text-3xl font-medium">Qual é o seu melhor número de WhatsApp com DDD?</h2>
              <p className="text-sm text-cupula-cream/60 italic">Nossa equipe usará este número exclusivamente para avisar sobre a aprovação da sua aplicação.</p>
            </div>
            <input 
              autoFocus
              type="tel"
              placeholder="(00) 00000-0000"
              className="typeform-input"
              value={formData.whatsapp}
              onChange={(e) => updateField('whatsapp', e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="flex items-center gap-4">
              <button onClick={nextStep} className="typeform-button">OK</button>
              <span className="text-xs text-cupula-cream/40">pressione Enter ↵</span>
            </div>
          </motion.div>
        );

      case 'email':
        return (
          <motion.div 
            key="email"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-[90vw] md:w-full max-w-2xl space-y-6"
          >
            <div className="space-y-2">
              <span className="text-cupula-gold font-mono text-sm">03 →</span>
              <h2 className="text-2xl md:text-3xl font-medium">Qual é o seu e-mail principal?</h2>
            </div>
            <input 
              autoFocus
              type="email"
              placeholder="nome@exemplo.com"
              className="typeform-input"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="flex items-center gap-4">
              <button onClick={nextStep} className="typeform-button">OK</button>
              <span className="text-xs text-cupula-cream/40">pressione Enter ↵</span>
            </div>
          </motion.div>
        );

      case 'context':
        return (
          <motion.div 
            key="context"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-[90vw] md:w-full max-w-2xl space-y-6"
          >
            <div className="space-y-2">
              <span className="text-cupula-gold font-mono text-sm">04 →</span>
              <h2 className="text-2xl md:text-3xl font-medium">Excelente. Agora me dê o contexto: qual é o seu negócio hoje e o que você vende?</h2>
              <p className="text-sm text-cupula-cream/60">Seja breve, mas específico.</p>
            </div>
            <textarea 
              autoFocus
              rows={3}
              placeholder="Descreva seu negócio..."
              className="typeform-input resize-none"
              value={formData.context}
              onChange={(e) => updateField('context', e.target.value)}
            />
            <div className="flex items-center gap-4">
              <button onClick={nextStep} className="typeform-button">OK</button>
              <span className="text-xs text-cupula-cream/40">pressione Ctrl + Enter ↵</span>
            </div>
          </motion.div>
        );

      case 'challenges':
        const challenges = [
          "Falta de caixa rápido (Preciso de ROI Imediato).",
          "Tenho vendas, mas a operação é bagunçada e não tenho processos.",
          "Não sei como estruturar e vender meu produto no digital.",
          "Trabalho demais, estou esgotado e a margem de lucro é baixa.",
          "Outro."
        ];
        return (
          <motion.div 
            key="challenges"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-[90vw] md:w-full max-w-2xl space-y-6"
          >
            <div className="space-y-2">
              <span className="text-cupula-gold font-mono text-sm">05 →</span>
              <h2 className="text-2xl md:text-3xl font-medium">Onde o seu negócio está travando hoje? Qual é o seu maior desafio para escalar?</h2>
            </div>
            <div className="grid gap-3">
              {challenges.map((c, i) => (
                <button 
                  key={i}
                  onClick={() => {
                    updateField('challenge', c);
                    setTimeout(nextStep, 300);
                  }}
                  className={`choice-card ${formData.challenge === c ? 'selected' : ''}`}
                >
                  <span className="w-6 h-6 rounded border border-cupula-gold/40 flex items-center justify-center text-xs font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{c}</span>
                  {formData.challenge === c && <Check className="w-5 h-5 text-cupula-gold" />}
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 'revenue':
        const revenues = [
          "Abaixo de R$ 10.000",
          "De R$ 10.000 a R$ 30.000",
          "De R$ 30.000 a R$ 100.000",
          "Acima de R$ 100.000"
        ];
        return (
          <motion.div 
            key="revenue"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-[90vw] md:w-full max-w-2xl space-y-6"
          >
            <div className="space-y-2">
              <span className="text-cupula-gold font-mono text-sm">06 →</span>
              <h2 className="text-2xl md:text-3xl font-medium">Para construirmos a estrutura certa, eu preciso entender o nível do jogo que você joga hoje. Qual é a sua média de faturamento mensal?</h2>
            </div>
            <div className="grid gap-3">
              {revenues.map((r, i) => (
                <button 
                  key={i}
                  onClick={() => {
                    updateField('revenue', r);
                    setTimeout(nextStep, 300);
                  }}
                  className={`choice-card ${formData.revenue === r ? 'selected' : ''}`}
                >
                  <span className="w-6 h-6 rounded border border-cupula-gold/40 flex items-center justify-center text-xs font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{r}</span>
                  {formData.revenue === r && <Check className="w-5 h-5 text-cupula-gold" />}
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 'investment':
        const options = [
          { label: "Sim, possuo o caixa e estou pronto para investir.", value: "Sim" },
          { label: "Consigo liberar o limite no cartão de crédito.", value: "Cartão" },
          { label: "Não possuo esse capital no momento.", value: "Não" }
        ];
        return (
          <motion.div 
            key="investment"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-[90vw] md:w-full max-w-2xl space-y-6"
          >
            <div className="space-y-2">
              <span className="text-cupula-gold font-mono text-sm">07 →</span>
              <h2 className="text-2xl md:text-3xl font-medium">A Cúpula é uma mentoria individual de alto nível que exige dedicação de energia e capital (Investimento de R$ 12.997). Você possui limite no cartão ou caixa disponível para investir na reestruturação do seu negócio agora?</h2>
            </div>
            <div className="grid gap-3">
              {options.map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => {
                    updateField('investment', opt.label);
                    setTimeout(nextStep, 300);
                  }}
                  className={`choice-card ${formData.investment === opt.label ? 'selected' : ''}`}
                >
                  <span className="w-6 h-6 rounded border border-cupula-gold/40 flex items-center justify-center text-xs font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{opt.label}</span>
                  {formData.investment === opt.label && <Check className="w-5 h-5 text-cupula-gold" />}
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 'why_me':
        return (
          <motion.div 
            key="why_me"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-[90vw] md:w-full max-w-2xl space-y-6"
          >
            <div className="space-y-2">
              <span className="text-cupula-gold font-mono text-sm">08 →</span>
              <h2 className="text-2xl md:text-3xl font-medium">Meu tempo é o meu maior ativo, e eu escolho a dedo quem senta à mesa comigo nos jantares da Cúpula. Por que você seria um bom mentorado para o meu ecossistema?</h2>
            </div>
            <textarea 
              autoFocus
              rows={4}
              placeholder="Sua resposta..."
              className="typeform-input resize-none"
              value={formData.why_me}
              onChange={(e) => updateField('why_me', e.target.value)}
            />
            <div className="flex items-center gap-4">
              <button onClick={nextStep} className="typeform-button">Finalizar Aplicação</button>
              <span className="text-xs text-cupula-cream/40">pressione Ctrl + Enter ↵</span>
            </div>
          </motion.div>
        );

      case 'final':
        return (
          <motion.div 
            key="final"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-[90vw] md:w-full max-w-2xl text-center space-y-8"
          >
            <div className="w-20 h-20 bg-cupula-gold rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-cupula-bg" strokeWidth={3} />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-cupula-gold">Aplicação Finalizada.</h1>
              <p className="text-lg text-cupula-cream/80 leading-relaxed">
                Seu perfil foi enviado para a mesa da Apollo Digital. Nossa equipe fará a análise nas próximas 24 horas. Fique atento ao seu WhatsApp. Se o seu momento estiver alinhado com a nossa engenharia, entraremos em contato para agendar a sua Sessão de Fundação.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-cupula-gold/30 rounded-lg hover:bg-cupula-gold/10 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                Voltar para o Instagram
              </a>
              <a 
                href="#" 
                className="flex items-center justify-center gap-2 px-6 py-3 border border-cupula-gold/30 rounded-lg hover:bg-cupula-gold/10 transition-colors"
              >
                <Globe className="w-5 h-5" />
                Ir para o Site
              </a>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cupula-bg text-cupula-cream flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cupula-red/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cupula-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Progress Bar */}
      {currentStep !== 'welcome' && currentStep !== 'final' && (
        <div className="fixed top-0 left-0 w-full h-1 bg-cupula-red/20 z-50">
          <motion.div 
            className="h-full bg-cupula-gold shadow-[0_0_10px_rgba(197,160,89,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="w-full flex flex-col items-center justify-center flex-1">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
        
        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg text-sm backdrop-blur-sm z-40"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      {currentStep !== 'welcome' && currentStep !== 'final' && (
        <div className="fixed bottom-8 right-8 flex gap-2">
          <button 
            onClick={prevStep}
            className="p-3 bg-cupula-red/20 border border-cupula-gold/20 rounded-lg hover:bg-cupula-red/40 transition-colors"
            title="Anterior"
          >
            <ChevronUp className="w-6 h-6 text-cupula-gold" />
          </button>
          <button 
            onClick={nextStep}
            className="p-3 bg-cupula-red/20 border border-cupula-gold/20 rounded-lg hover:bg-cupula-red/40 transition-colors"
            title="Próximo"
          >
            <ChevronDown className="w-6 h-6 text-cupula-gold" />
          </button>
        </div>
      )}

      {/* Branding / Footer */}
      <div className="fixed bottom-8 left-8 hidden md:block">
        <p className="text-xs font-mono text-cupula-gold/40 tracking-widest uppercase">
          Mentoria Cúpula © 2026
        </p>
      </div>
    </div>
  );
}
