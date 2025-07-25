import React, { useState, useRef } from 'react';
import Layout from '../../components/common/Layout/Layout';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Loading } from '../../components/common/Loading';
import './Contact.css';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: 'geral',
    priority: 'normal'
  });
  
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  // Informações da farmácia
  const pharmacyInfo = {
    name: 'Farmácia Bem Estar',
    address: 'Rua das Flores, 123 - Centro',
    city: 'São Paulo - SP',
    cep: '01234-567',
    phone: '(11) 3456-7890',
    whatsapp: '(11) 99999-9999',
    email: 'contato@bemestar.com',
    hours: {
      weekdays: '08:00 às 22:00',
      saturday: '08:00 às 20:00',
      sunday: '09:00 às 18:00'
    }
  };

  // Departamentos
  const departments = [
    { value: 'geral', label: 'Informações Gerais', icon: '💬' },
    { value: 'vendas', label: 'Vendas e Produtos', icon: '🛒' },
    { value: 'farmaceutico', label: 'Orientação Farmacêutica', icon: '👨‍⚕️' },
    { value: 'entrega', label: 'Entrega e Logística', icon: '🚚' },
    { value: 'financeiro', label: 'Financeiro', icon: '💳' },
    { value: 'sugestoes', label: 'Sugestões e Reclamações', icon: '📝' }
  ];

  // Validação do formulário
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Telefone inválido. Use o formato (11) 99999-9999';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Assunto é obrigatório';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Assunto deve ter pelo menos 5 caracteres';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Máscara para telefone
  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    }
    return value;
  };

  // Atualizar campo do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    if (name === 'phone') {
      formattedValue = formatPhone(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Enviar formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll para o primeiro erro
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          errorElement.focus();
        }
      }
      return;
    }

    setFormStatus({ loading: true, success: false, error: null });

    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aqui você faria a requisição real para sua API
      console.log('Dados do formulário:', formData);
      
      setFormStatus({ loading: false, success: true, error: null });
      
      // Limpar formulário após sucesso
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        department: 'geral',
        priority: 'normal'
      });

      // Scroll para o topo
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      setFormStatus({ 
        loading: false, 
        success: false, 
        error: 'Erro ao enviar mensagem. Tente novamente.' 
      });
    }
  };

  // Breadcrumb
  const breadcrumbItems = [
    { label: 'Início', href: '/' },
    { label: 'Contato', href: '/contato', active: true }
  ];

  return (
    <Layout>
      <div className="contact-page">
        <div className="container">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Cabeçalho */}
          <div className="contact-page__header">
            <h1 className="contact-page__title">
              <span className="contact-page__title-icon">📞</span>
              Entre em Contato
            </h1>
            <p className="contact-page__subtitle">
              Estamos aqui para ajudar você! Entre em contato conosco através dos canais abaixo ou envie uma mensagem.
            </p>
          </div>

          {/* Mensagem de Sucesso */}
          {formStatus.success && (
            <div className="contact-page__success">
              <div className="contact-page__success-content">
                <span className="contact-page__success-icon">✅</span>
                <div className="contact-page__success-text">
                  <h3 className="contact-page__success-title">Mensagem enviada com sucesso!</h3>
                  <p className="contact-page__success-message">
                    Obrigado pelo seu contato. Nossa equipe responderá em breve.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="contact-page__content">
            {/* Informações de Contato */}
            <div className="contact-page__info">
              <div className="contact-page__info-header">
                <h2 className="contact-page__info-title">
                  <span className="contact-page__info-icon">🏪</span>
                  Informações da Farmácia
                </h2>
              </div>

              {/* Endereço */}
              <div className="contact-info-card">
                <div className="contact-info-card__header">
                  <span className="contact-info-card__icon">📍</span>
                  <h3 className="contact-info-card__title">Endereço</h3>
                </div>
                <div className="contact-info-card__content">
                  <p className="contact-info-card__text">{pharmacyInfo.address}</p>
                  <p className="contact-info-card__text">{pharmacyInfo.city}</p>
                  <p className="contact-info-card__text">CEP: {pharmacyInfo.cep}</p>
                  <a 
                    href="https://maps.google.com" 
                     
                    rel="noopener noreferrer"
                    className="contact-info-card__link"
                  >
                    <span className="contact-info-card__link-icon">🗺️</span>
                    Ver no Google Maps
                  </a>
                </div>
              </div>

              {/* Telefones */}
              <div className="contact-info-card">
                <div className="contact-info-card__header">
                  <span className="contact-info-card__icon">📞</span>
                  <h3 className="contact-info-card__title">Telefones</h3>
                </div>
                <div className="contact-info-card__content">
                  <a href={`tel:${pharmacyInfo.phone}`} className="contact-info-card__contact">
                    <span className="contact-info-card__contact-icon">☎️</span>
                    <div className="contact-info-card__contact-info">
                      <span className="contact-info-card__contact-label">Telefone</span>
                      <span className="contact-info-card__contact-value">{pharmacyInfo.phone}</span>
                    </div>
                  </a>
                  <a 
                    href={`https://wa.me/55${pharmacyInfo.whatsapp.replace(/\D/g, '')}`} 
                     
                    rel="noopener noreferrer"
                    className="contact-info-card__contact"
                  >
                    <span className="contact-info-card__contact-icon">💬</span>
                    <div className="contact-info-card__contact-info">
                      <span className="contact-info-card__contact-label">WhatsApp</span>
                      <span className="contact-info-card__contact-value">{pharmacyInfo.whatsapp}</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* E-mail */}
              <div className="contact-info-card">
                <div className="contact-info-card__header">
                  <span className="contact-info-card__icon">📧</span>
                  <h3 className="contact-info-card__title">E-mail</h3>
                </div>
                <div className="contact-info-card__content">
                  <a href={`mailto:${pharmacyInfo.email}`} className="contact-info-card__contact">
                    <span className="contact-info-card__contact-icon">✉️</span>
                    <div className="contact-info-card__contact-info">
                      <span className="contact-info-card__contact-label">E-mail</span>
                      <span className="contact-info-card__contact-value">{pharmacyInfo.email}</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Horários */}
              <div className="contact-info-card">
                <div className="contact-info-card__header">
                  <span className="contact-info-card__icon">🕒</span>
                  <h3 className="contact-info-card__title">Horário de Funcionamento</h3>
                </div>
                <div className="contact-info-card__content">
                  <div className="contact-info-card__hours">
                    <div className="contact-info-card__hour">
                      <span className="contact-info-card__hour-day">Segunda a Sexta</span>
                      <span className="contact-info-card__hour-time">{pharmacyInfo.hours.weekdays}</span>
                    </div>
                    <div className="contact-info-card__hour">
                      <span className="contact-info-card__hour-day">Sábado</span>
                      <span className="contact-info-card__hour-time">{pharmacyInfo.hours.saturday}</span>
                    </div>
                    <div className="contact-info-card__hour">
                      <span className="contact-info-card__hour-day">Domingo</span>
                      <span className="contact-info-card__hour-time">{pharmacyInfo.hours.sunday}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="contact-info-card">
                <div className="contact-info-card__header">
                  <span className="contact-info-card__icon">🌐</span>
                  <h3 className="contact-info-card__title">Redes Sociais</h3>
                </div>
                <div className="contact-info-card__content">
                  <div className="contact-info-card__social">
                    <a href="#" className="contact-info-card__social-link">
                      <span className="contact-info-card__social-icon">📘</span>
                      Facebook
                    </a>
                    <a href="#" className="contact-info-card__social-link">
                      <span className="contact-info-card__social-icon">📷</span>
                      Instagram
                    </a>
                    <a href="#" className="contact-info-card__social-link">
                      <span className="contact-info-card__social-icon">🐦</span>
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulário de Contato */}
            <div className="contact-page__form-section">
              <div className="contact-page__form-header">
                <h2 className="contact-page__form-title">
                  <span className="contact-page__form-icon">📝</span>
                  Envie uma Mensagem
                </h2>
                <p className="contact-page__form-subtitle">
                  Preencha o formulário abaixo e entraremos em contato o mais breve possível.
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                {/* Erro Geral */}
                {formStatus.error && (
                  <div className="contact-form__error">
                    <span className="contact-form__error-icon">❌</span>
                    <span className="contact-form__error-text">{formStatus.error}</span>
                  </div>
                )}

                <div className="contact-form__grid">
                  {/* Nome */}
                  <div className="contact-form__field">
                    <label htmlFor="name" className="contact-form__label">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`contact-form__input ${errors.name ? 'contact-form__input--error' : ''}`}
                      placeholder="Digite seu nome completo"
                      disabled={formStatus.loading}
                    />
                    {errors.name && (
                      <span className="contact-form__field-error">{errors.name}</span>
                    )}
                  </div>

                  {/* E-mail */}
                  <div className="contact-form__field">
                    <label htmlFor="email" className="contact-form__label">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`contact-form__input ${errors.email ? 'contact-form__input--error' : ''}`}
                      placeholder="Digite seu e-mail"
                      disabled={formStatus.loading}
                    />
                    {errors.email && (
                      <span className="contact-form__field-error">{errors.email}</span>
                    )}
                  </div>

                  {/* Telefone */}
                  <div className="contact-form__field">
                    <label htmlFor="phone" className="contact-form__label">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`contact-form__input ${errors.phone ? 'contact-form__input--error' : ''}`}
                      placeholder="(11) 99999-9999"
                      disabled={formStatus.loading}
                    />
                    {errors.phone && (
                      <span className="contact-form__field-error">{errors.phone}</span>
                    )}
                  </div>

                  {/* Departamento */}
                  <div className="contact-form__field">
                    <label htmlFor="department" className="contact-form__label">
                      Departamento
                    </label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="contact-form__select"
                      disabled={formStatus.loading}
                    >
                      {departments.map(dept => (
                        <option key={dept.value} value={dept.value}>
                          {dept.icon} {dept.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Assunto */}
                <div className="contact-form__field">
                  <label htmlFor="subject" className="contact-form__label">
                    Assunto *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`contact-form__input ${errors.subject ? 'contact-form__input--error' : ''}`}
                    placeholder="Digite o assunto da sua mensagem"
                    disabled={formStatus.loading}
                  />
                  {errors.subject && (
                    <span className="contact-form__field-error">{errors.subject}</span>
                  )}
                </div>

                {/* Prioridade */}
                <div className="contact-form__field">
                  <label className="contact-form__label">Prioridade</label>
                  <div className="contact-form__radio-group">
                    <label className="contact-form__radio">
                      <input
                        type="radio"
                        name="priority"
                        value="baixa"
                        checked={formData.priority === 'baixa'}
                        onChange={handleInputChange}
                        disabled={formStatus.loading}
                      />
                      <span className="contact-form__radio-label">🟢 Baixa</span>
                    </label>
                    <label className="contact-form__radio">
                      <input
                        type="radio"
                        name="priority"
                        value="normal"
                        checked={formData.priority === 'normal'}
                        onChange={handleInputChange}
                        disabled={formStatus.loading}
                      />
                      <span className="contact-form__radio-label">🟡 Normal</span>
                    </label>
                    <label className="contact-form__radio">
                      <input
                        type="radio"
                        name="priority"
                        value="alta"
                        checked={formData.priority === 'alta'}
                        onChange={handleInputChange}
                        disabled={formStatus.loading}
                      />
                      <span className="contact-form__radio-label">🔴 Alta</span>
                    </label>
                  </div>
                </div>

                {/* Mensagem */}
                <div className="contact-form__field">
                  <label htmlFor="message" className="contact-form__label">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    className={`contact-form__textarea ${errors.message ? 'contact-form__textarea--error' : ''}`}
                    placeholder="Digite sua mensagem aqui..."
                    disabled={formStatus.loading}
                  />
                  {errors.message && (
                    <span className="contact-form__field-error">{errors.message}</span>
                  )}
                  <div className="contact-form__char-count">
                    {formData.message.length} caracteres
                  </div>
                </div>

                {/* Botão de Envio */}
                <div className="contact-form__submit">
                  <button
                    type="submit"
                    className="contact-form__button"
                    disabled={formStatus.loading}
                  >
                    {formStatus.loading ? (
                      <>
                        <Loading type="spinner" size="small" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <span className="contact-form__button-icon">📤</span>
                        <span>Enviar Mensagem</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* FAQ Rápido */}
          <div className="contact-page__faq">
            <h2 className="contact-page__faq-title">
              <span className="contact-page__faq-icon">❓</span>
              Perguntas Frequentes
            </h2>
            
            <div className="contact-page__faq-grid">
              <div className="faq-card">
                <h3 className="faq-card__question">Como posso fazer um pedido?</h3>
                <p className="faq-card__answer">
                  Você pode fazer pedidos através do nosso site, telefone ou WhatsApp. 
                  Também aceitamos pedidos presencialmente na farmácia.
                </p>
              </div>
              
              <div className="faq-card">
                <h3 className="faq-card__question">Vocês fazem entrega?</h3>
                <p className="faq-card__answer">
                  Sim! Fazemos entregas na região. O prazo varia de acordo com a localização. 
                  Entre em contato para mais informações.
                </p>
              </div>
              
              <div className="faq-card">
                <h3 className="faq-card__question">Aceitam receitas digitais?</h3>
                <p className="faq-card__answer">
                  Sim, aceitamos receitas digitais válidas. Você pode enviar por WhatsApp 
                  ou e-mail para agilizar o atendimento.
                </p>
              </div>
              
              <div className="faq-card">
                <h3 className="faq-card__question">Qual o prazo de resposta?</h3>
                <p className="faq-card__answer">
                  Respondemos mensagens em até 24 horas úteis. Para urgências, 
                  recomendamos contato direto por telefone ou WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;