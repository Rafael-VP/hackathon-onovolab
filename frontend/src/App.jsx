// --- IMPORTAÇÕES ATUALIZADAS ---
import React, { useState, useEffect } from 'react';
import './App.css';

// --- COMPONENTES ---

// Seu Header personalizado (mantido)
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Logo do meu portfólio" />
      </div>
    </header>
  );
};

// Seu Hero personalizado (mantido)
const Hero = ({ idBusca, setIdBusca, onBuscaSubmit, loading }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Analista de Perfil Acadêmico</h1>
        <form onSubmit={onBuscaSubmit} className="hero-busca-form">
          <input
            type="text"
            value={idBusca}
            onChange={(e) => setIdBusca(e.target.value)}
            placeholder="Buscar por ID do Semantic Scholar..."
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Analisando...' : 'Analisar'}
          </button>
        </form>
      </div>
    </section>
  );
};

// --- NOVO COMPONENTE QUE SUBSTITUI O 'RESULTADOBUSCA' ---
// Ele sabe como ler e exibir o JSON da sua API Python
const AnalysisResult = ({ analysisData, error }) => {
    if (error) {
        return <p className="error-message centralizado">Erro: {error}</p>;
    }
    if (!analysisData) {
        return null;
    }

    const formatTitle = (key) => {
        return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <section className="analysis-container">
            <div className="analysis-card">
                <header className="analysis-header">
                    <div className="author-info">
                        <h2>{analysisData.author_name}</h2>
                        <p><strong>Pontuação Final:</strong> {analysisData.final_score} | <strong>Confiança:</strong> {analysisData.confidence_score}</p>
                    </div>
                    <div className={`rating-badge rating-${analysisData.final_rating.toLowerCase()}`}>
                        {analysisData.final_rating}
                    </div>
                </header>
                <div className="analysis-summary">
                    <h3>Resumo da Análise</h3>
                    <p>{analysisData.summary}</p>
                </div>
                <div className="analysis-breakdown">
                    <h3>Detalhamento</h3>
                    <div className="breakdown-grid">
                        {Object.entries(analysisData.breakdown).map(([key, value]) => (
                            <div className="breakdown-item" key={key}>
                                <h4>{formatTitle(key)}</h4>
                                <p className="breakdown-analysis">{value.analysis}</p>
                                <div className={value.score >= 0 ? 'score-positive' : 'score-negative'}>
                                    Score: {value.score}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};


// Seu componente Projects, que agora serve como conteúdo inicial (mantido)
const Projects = () => {
  // A lógica de fetch foi mantida, caso você queira usar um json-server para exemplos.
  // Se não precisar, pode remover a lógica e deixar um conteúdo estático.
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula um carregamento de exemplos ou instruções
    setTimeout(() => {
        setLoading(false);
    }, 500);
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <section id="projects" className="projects">
      <h2>Como Funciona</h2>
      <p>Insira o ID de um pesquisador do Semantic Scholar no campo de busca acima.<br/>Nossa IA analisará os padrões de publicação e citação para gerar uma avaliação de impacto e coerência.</p>
      <p style={{fontWeight: 'bold'}}>Tente buscar por IDs como '1743905' (D. Sculley) ou '145896939' (Geoffrey Hinton).</p>
    </section>
  );
};

// Seu Footer personalizado (mantido)
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="contact" className="footer">
      <p> Hackathon Raia by .monks </p>  
      <p>&copy; {currentYear} Kernel Panic. Todos os direitos reservados.</p>
    </footer>
  );
};

// --- APP PRINCIPAL COM A LÓGICA CORRETA ---
function App() {
  const [idBusca, setIdBusca] = useState('');
  // Estado renomeado para refletir o que ele guarda: a análise
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBusca = async (event) => {
    event.preventDefault();
    if (!idBusca.trim()) {
      setAnalysisResult(null);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const response = await fetch(`http://localhost:5000/researcher/${idBusca}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erro ao processar a resposta do servidor.' }));
        throw new Error(errorData.error || `Erro ${response.status}`);
      }
      // AGORA USAMOS .json() CORRETAMENTE
      const data = await response.json();
      setAnalysisResult(data);
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
        <Hero 
          idBusca={idBusca}
          setIdBusca={setIdBusca}
          onBuscaSubmit={handleBusca}
          loading={loading}
        />
        {/* LÓGICA DE RENDERIZAÇÃO ATUALIZADA */}
        {error ? <p className="error-message centralizado">Erro: {error}</p> : (
          analysisResult ? <AnalysisResult analysisData={analysisResult} /> : <Projects />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;