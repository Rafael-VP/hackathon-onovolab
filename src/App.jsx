import React from 'react';
import './App.css'; // Vamos criar este arquivo para os estilos

// Componente Header (Cabeçalho)
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Logo do meu portfólio" />
      </div>
      <nav>
        <a href="#projects">Projetos</a>
        <a href="#contact">Contato</a>
      </nav>
    </header>
  );
};

// Componente Hero (Seção de Destaque)
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Olá, eu sou [Seu Nome]</h1>
        <p>Desenvolvedor(a) Web apaixonado(a) por criar soluções criativas e funcionais.</p>
        <button className="cta-button">Veja meus trabalhos</button>
      </div>
    </section>
  );
};

// Componente para um único projeto
// A "prop" `project` passa os dados para o componente
const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <img src={project.imageUrl} alt={`Imagem do ${project.title}`} />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        Ver Projeto
      </a>
    </div>
  );
};


// Componente Projects (Lista de Projetos)
const Projects = () => {
  // Em um site real, esses dados viriam de uma API
  const projectData = [
    {
      id: 1,
      title: 'Sistema de E-commerce',
      description: 'Plataforma completa de vendas online com carrinho de compras e integração de pagamento.',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=E-commerce',
      link: '#',
    },
    {
      id: 2,
      title: 'Aplicativo de Tarefas',
      description: 'Um app para organizar o dia a dia, com funcionalidades de adicionar, editar e remover tarefas.',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=App+de+Tarefas',
      link: '#',
    },
    {
      id: 3,
      title: 'Landing Page Institucional',
      description: 'Página de apresentação para uma startup de tecnologia, focada em conversão de leads.',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=Landing+Page',
      link: '#',
    },
  ];

  return (
    <section id="projects" className="projects">
      <h2>Meus Projetos</h2>
      <div className="projects-grid">
        {projectData.map(proj => (
          <ProjectCard key={proj.id} project={proj} />
        ))}
      </div>
    </section>
  );
};

// Componente Footer (Rodapé)
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="contact" className="footer">
      <p>Entre em contato: <a href="mailto:seuemail@exemplo.com">seuemail@exemplo.com</a></p>
      <p>&copy; {currentYear} [Seu Nome]. Todos os direitos reservados.</p>
    </footer>
  );
};


// Componente Principal que reúne tudo
function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}

export default App;