// --- IMPORTAÇÕES ATUALIZADAS ---
import React, { useState, useEffect } from 'react';
import './App.css';

// --- COMPONENTES ---

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

// --- COMPONENTE HERO MODIFICADO PARA INCLUIR A BUSCA ---
// Hero agora recebe "props" (propriedades) do componente App para controlar a busca.
const Hero = ({ idBusca, setIdBusca, onBuscaSubmit, loading }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Olá, eu sou [Seu Nome]</h1>
        <p>Desenvolvedor(a) Web apaixonado(a) por criar soluções criativas e funcionais.</p>
        
        {/* Formulário de busca foi movido para cá */}
        <form onSubmit={onBuscaSubmit} className="hero-busca-form">
          <input
            type="text"
            value={idBusca}
            onChange={(e) => setIdBusca(e.target.value)}
            placeholder="Buscar projeto por ID..."
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
      </div>
    </section>
  );
};

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

// --- NOVO COMPONENTE APENAS PARA EXIBIR O RESULTADO DA BUSCA ---
const ResultadoBusca = ({ projeto, error }) => {
    if (error) {
        return <p className="error-message">Erro: {error}</p>;
    }
    if (!projeto) {
        return null; // Não exibe nada se não houver projeto
    }
    return (
        <section className="resultado-busca-container">
            <h2>Projeto Encontrado</h2>
            <div className="projeto-encontrado-card">
                <h4>{projeto.title}</h4>
                <p>{projeto.description}</p>
                <a href={projeto.link} target="_blank" rel="noopener noreferrer">Ver Projeto</a>
            </div>
        </section>
    );
};


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/projects');
        if (!response.ok) {
          throw new Error('Falha ao carregar os projetos.');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <p>Carregando projetos...</p>;
  if (error) return <p>Erro ao carregar projetos: {error}</p>;

  return (
    <section id="projects" className="projects">
      <h2>Meus Projetos</h2>
      <div className="projects-grid">
        {projects.map(proj => (
          <ProjectCard key={proj.id} project={proj} />
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="contact" className="footer">
      <p>Entre em contato: <a href="mailto:seuemail@exemplo.com">seuemail@exemplo.com</a></p>
      <p>&copy; {currentYear} [Seu Nome]. Todos os direitos reservados.</p>
    </footer>
  );
};

// --- APP PRINCIPAL AGORA CONTROLA A LÓGICA DA BUSCA ---
function App() {
  // A lógica e os estados da busca foram "elevados" para o componente App
  const [idBusca, setIdBusca] = useState('');
  const [projetoEncontrado, setProjetoEncontrado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBusca = async (event) => {
    event.preventDefault();
    if (!idBusca.trim()) {
        // Se a busca for vazia, limpamos o resultado e mostramos todos os projetos
        setProjetoEncontrado(null);
        setError(null);
        return;
    }
    setLoading(true);
    setError(null);
    setProjetoEncontrado(null);
    try {
      const response = await fetch(`http://localhost:3001/projects/${idBusca}`);
      if (!response.ok) {
        throw new Error('Projeto não encontrado. Verifique o ID.');
      }
      const data = await response.json();
      setProjetoEncontrado(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <main>
        {/* Passamos o estado e as funções para o Hero como props */}
        <Hero 
          idBusca={idBusca}
          setIdBusca={setIdBusca}
          onBuscaSubmit={handleBusca}
          loading={loading}
        />

        {/* Renderização Condicional: 
            Se houver um erro, mostra o erro.
            Se houver um projeto encontrado, mostra o card de resultado.
            Senão, mostra a lista completa de projetos.
        */}
        {error ? <p className="error-message centralizado">Erro: {error}</p> : (
            projetoEncontrado ? <ResultadoBusca projeto={projetoEncontrado} /> : <Projects />
        )}
        
      </main>
      <Footer />
    </div>
  );
}

export default App;