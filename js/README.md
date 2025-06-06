# Mythika Studio - JavaScript Architecture

Este diretório contém todos os arquivos JavaScript organizados do site Mythika Studio.

## 📁 Estrutura dos Arquivos

### `main-animations.js`

**Controlador principal das animações**

- Configurações globais do GSAP
- Detecção de preferências de motion do usuário
- Métodos para pausar/retomar animações globalmente
- Sistema de debug para animações

### `hero-animations.js`

**Animações específicas da seção Hero**

- Detecção de dispositivos móveis
- Timeline de animações de entrada
- Animação de levitação da ilustração
- Efeitos de brilho místico
- Sistema de reconfiguração responsiva

### `main-scripts.js`

**Scripts funcionais principais**

- Menu mobile (toggle, abrir/fechar)
- Navegação smooth scroll
- Sistema de banner
- Lazy loading de imagens
- Inicialização do AOS (comentado)

## 🎯 Características da Arquitetura

### ✅ **Vantagens:**

- **Modularidade**: Cada arquivo tem responsabilidades específicas
- **Performance**: Código organizado e otimizado
- **Manutenibilidade**: Fácil de encontrar e editar funcionalidades
- **Escalabilidade**: Estrutura preparada para crescer
- **Debug**: Logs organizados e métodos de debug

### 🚀 **Otimizações:**

- **Mobile-first**: Animações desabilitadas em mobile para economizar bateria
- **Debounce**: Controle de resize events
- **Accessibility**: Respeita preferências de motion do usuário
- **Error Handling**: Verificações de segurança nos scripts

## 📱 **Responsividade:**

- **Desktop/Tablet**: Animações completas e efeitos avançados
- **Mobile**: Apenas funcionalidades essenciais, sem animações
- **Auto-detection**: Sistema detecta automaticamente o tipo de dispositivo

## 🔧 **Como Usar:**

### Adicionar nova animação:

1. Criar método na classe `HeroAnimations` (ou criar nova classe)
2. Integrar com o sistema de detecção mobile
3. Testar em diferentes dispositivos

### Adicionar nova funcionalidade:

1. Adicionar método na classe `MythikaScripts`
2. Chamar no método `init()`
3. Documentar a funcionalidade

## 🎭 **Sistema de Classes:**

```javascript
// Controlador principal
window.MythikaAnimations
// Animações do hero
window.heroAnimations (instância da classe HeroAnimations)
// Scripts principais
window.mythikaScripts (instância da classe MythikaScripts)
```

## 📋 **Ordem de Carregamento:**

1. GSAP (CDN)
2. main-animations.js
3. hero-animations.js
4. main-scripts.js
5. AOS (CDN)

---

**Mythika Studio** - Design with Soul, Magic and Purpose ✨
