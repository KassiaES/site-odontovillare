# 🦷 Odonto Villare - Clínica Odontológica

[![Deploy Status](https://github.com/KassiaES/site-odontovillare/workflows/Azure%20Static%20Web%20Apps%20CI/CD/badge.svg)](https://github.com/KassiaES/site-odontovillare/actions)
[![Live Site](https://img.shields.io/badge/Live%20Site-Online-brightgreen)](https://odontovillare.azurestaticapps.net)

> Landing page profissional para clínica odontológica com design moderno, PWA e otimizações avançadas.

## ✨ Características

### 🎨 Design Profissional
- **Design System Completo** com CSS custom properties
- **Tipografia Moderna** usando Inter font
- **Paleta de Cores Profissional** com gradientes e transparências
- **Layout Responsivo** mobile-first com breakpoints otimizados
- **Animações Suaves** com CSS transitions e transforms avançados

### 📱 Progressive Web App (PWA)
- **Manifest.json** configurado para instalação como app
- **Service Worker** com cache inteligente e funcionalidade offline
- **Ícones Adaptativos** em formato .avif para melhor performance
- **Shortcuts** para acesso rápido às principais funcionalidades

### 🚀 Performance e SEO
- **Otimização de Imagens** com formato .avif
- **Lazy Loading** para carregamento sob demanda
- **Meta Tags Completos** incluindo Open Graph e Twitter Cards
- **Schema.org** para rich snippets nos mecanismos de busca
- **Robots.txt** configurado para SEO

### 💫 Interatividade Avançada
- **Intersection Observer** para animações de entrada
- **Parallax Effects** no hero section
- **Smooth Scrolling** com easing customizado
- **Counter Animations** na seção de números
- **Header Inteligente** com auto-hide e blur effects

### 📊 Analytics e Tracking
- **Event Tracking** para interações do usuário
- **WhatsApp Integration** com tracking de conversões
- **Error Handling** robusto para imagens e recursos

## 🏗️ Estrutura do Projeto

```
odontovillare/
├── index.html           # Página principal
├── style.css           # Estilos profissionais
├── script.js           # JavaScript avançado
├── manifest.json       # Configuração PWA
├── sw.js              # Service Worker
├── robots.txt         # SEO configuration
├── staticwebapp.config.json # Azure config
├── .github/workflows/ # GitHub Actions
├── img/              # Imagens em formato .avif
└── README.md        # Documentação
```

## 🔧 Tecnologias Utilizadas

- **HTML5** semântico com estrutura moderna
- **CSS3** com Grid, Flexbox e custom properties
- **JavaScript ES6+** com APIs modernas
- **PWA** com Service Worker e Manifest
- **Azure Static Web Apps** para deployment
- **GitHub Actions** para CI/CD automático
- **AVIF Images** para otimização de performance

## 🌟 Seções da Landing Page

### 🏠 Hero Section
- Imagem de fundo impactante
- Call-to-action prominente
- Efeito parallax sutil

### 🔧 Serviços (9 Especialidades)
- Cards interativos com hover effects
- Ícones representativos
- Layout grid responsivo
- Animações de entrada em cascata

### 📊 Números e Estatísticas
- Contadores animados
- Dados de credibilidade
- Visual impactante

### 💬 Depoimentos
- Carrossel de testimonials
- Fotos dos clientes
- Avaliações reais

### 🏢 Unidades
- Informações de localização
- Horários de funcionamento
- Botões de contato direto

### 📞 Contato
- Múltiplas formas de contato
- WhatsApp integrado
- Formulário de contato

## 🚀 Deployment

O site está configurado para deployment automático no **Azure Static Web Apps** através de GitHub Actions.

### Processo:
1. **Push** para branch `main`
2. **GitHub Actions** executa o workflow
3. **Azure** faz build e deploy automaticamente
4. **Site** fica disponível em: [odontovillare.azurestaticapps.net](https://odontovillare.azurestaticapps.net)

### Configurações Azure:
- **skip_app_build**: true (site estático HTML/CSS/JS)
- **app_location**: "/" (raiz do projeto)
- **output_location**: "/" (sem build process)

## 🔧 Desenvolvimento Local

1. **Clone** o repositório:
```bash
git clone https://github.com/KassiaES/site-odontovillare.git
cd site-odontovillare
```

2. **Abra** com Live Server ou servidor local:
```bash
# Com Python
python -m http.server 8000

# Com Node.js
npx serve .

# Ou simplesmente abra index.html no navegador
```

3. **Teste PWA** (requer HTTPS em produção):
- Service Worker funciona apenas em localhost ou HTTPS
- Para testar PWA completo, use a URL de produção

## 📈 Métricas e Performance

### Lighthouse Scores:
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100
- **PWA**: ✅ Installable

### Otimizações:
- ⚡ **Carregamento rápido** com lazy loading
- 📱 **Mobile-first** design responsivo
- 🎯 **Core Web Vitals** otimizados
- 🔄 **Cache** inteligente com Service Worker

## 🛠️ Customização

### Cores e Branding:
Edite as CSS custom properties em `style.css`:
```css
:root {
  --cor-primaria: #0EA5E9;
  --cor-secundaria: #3B82F6;
  --cor-accent: #06B6D4;
  /* ... mais variáveis */
}
```

### Conteúdo:
- **Textos**: Edite diretamente no `index.html`
- **Imagens**: Substitua arquivos na pasta `img/` (manter formato .avif)
- **Contatos**: Atualize números de telefone e WhatsApp

### Funcionalidades:
- **Analytics**: Adicione Google Analytics no `script.js`
- **Formulários**: Integre com backend ou service de formulários
- **Chat**: Adicione widget de chat se necessário

## 📞 WhatsApp Integration

O site inclui botão flutuante do WhatsApp com:
- **Animação de respiração** para chamar atenção
- **Links diretos** para cada unidade
- **Mensagens pré-definidas** para cada serviço
- **Tracking de cliques** para analytics

## 🔐 Configurações de Segurança

### Headers de Segurança (Azure):
```json
{
  "globalHeaders": {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  }
}
```

## 📝 To-Do / Próximas Melhorias

- [ ] **Sistema de Agendamento Online** integrado
- [ ] **Blog/Artigos** sobre saúde bucal
- [ ] **Galeria de Antes/Depois** dos tratamentos
- [ ] **Sistema de Avaliações** integrado
- [ ] **Multi-idiomas** (português/inglês)
- [ ] **Dark Mode** opcional
- [ ] **Chatbot** para atendimento inicial

## 🤝 Contribuição

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📧 Contato

**Odonto Villare**
- 🌐 Website: [odontovillare.azurestaticapps.net](https://odontovillare.azurestaticapps.net)
- 📱 WhatsApp: +55 (47) 9999-9999
- 📧 Email: contato@odontovillare.com.br
- 📍 Blumenau - SC, Brasil

---

<div align="center">
  <p>
    <strong>🦷 Feito com ❤️ para Odonto Villare</strong>
  </p>
  <p>
    <em>Design profissional • Performance otimizada • PWA completo</em>
  </p>
</div>