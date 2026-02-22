import React, { useState } from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { SettingsScreen } from '../SettingsScreen';

interface Article {
    id: number;
    icon: string;
    iconBg: string;
    title: string;
    subtitle: string;
    readTime: string;
    content: string;
}

const articlesData: Article[] = [
    {
        id: 1,
        icon: "📱",
        iconBg: "#FCE7F3", // bg-pink-100
        title: "Como usar este aplicativo para ter resultados",
        subtitle: "Um guia rápido para dominar as ferramentas do seu app.",
        readTime: "3 min",
        content: "Bem-vinda ao seu novo parceiro de estilo de vida! Este aplicativo foi desenhado para ser simples, mas extremamente poderoso se souber usá-lo corretamente.\n\n**1. O Timer é o seu guia (Aba Meu Dia):**\nO círculo central não é apenas um relógio. Quando clica em 'Iniciar Jejum', ele diz-lhe exatamente em que fase metabólica o seu corpo está. Siga as cores e celebre cada marco alcançado (como a queima de gordura e a autofagia).\n\n**2. A aba Alimentar é inteligente:**\nReparou que quando está em jejum a aba de receitas foca em 'O que comer agora'? Use essas sugestões de baixo índice glicémico para quebrar o seu jejum. Comer doces ou muito carboidrato na quebra vai anular os seus esforços!\n\n**3. Registe para vencer:**\nNa aba 'Progresso', o gráfico só cresce se você o alimentar. Registe o seu peso semanalmente (não todos os dias para evitar ansiedade) e marque a sua ingestão de água. Pessoas que registam o processo têm 70% mais hipóteses de atingir a meta final."
    },
    {
        id: 2,
        icon: "☕",
        iconBg: "#FEF3C7", // bg-amber-100
        title: "O que quebra e o que não quebra o jejum?",
        subtitle: "A dúvida número 1: afinal, posso beber café?",
        readTime: "2 min",
        content: "A regra de ouro do jejum intermitente é manter a insulina baixa para que o seu corpo use a gordura armazenada como energia. Qualquer coisa que estimule a insulina, quebra o jejum.\n\n**O que está LIBERTADO (Não quebra o jejum):**\n* **Água:** Com ou sem gás, é a sua melhor amiga.\n* **Café preto:** Sem açúcar, sem adoçantes e sem leite. O café puro ainda ajuda a acelerar a queima de gordura.\n* **Chás:** Chá verde, chá preto, camomila, hortelã. Novamente, puríssimos. Nada de mel ou açúcar.\n\n**O que QUEBRA o jejum (Evite):**\n* **Adoçantes:** Mesmo os zero calorias podem enganar o cérebro e dar um pico de insulina.\n* **Leite e Natas:** O leite tem lactose (açúcar) e quebra o estado de jejum imediatamente.\n* **Sumos de fruta:** Mesmo sem açúcar, a frutose pura interrompe o processo metabólico.\n\nSentiu fome? Beba um copo de água com gás ou um chá quente. Muitas vezes o que sentimos é sede disfarçada!"
    },
    {
        id: 3,
        icon: "🧬",
        iconBg: "#DBEAFE", // bg-blue-100
        title: "O que é Autofagia?",
        subtitle: "Como o seu corpo se renova e rejuvenesce.",
        readTime: "4 min",
        content: "A Autofagia é como ter uma equipa de limpeza profissional a trabalhar dentro do seu corpo enquanto dorme ou jejua.\n\nA palavra vem do grego: 'Auto' (a si mesmo) e 'Phagia' (comer). Literalmente, o seu corpo começa a comer-se a si mesmo. Mas não se assuste! Ele come apenas o lixo celular.\n\n**Como funciona?**\nQuando passa de 14 a 16 horas sem comer, o seu corpo não tem nutrientes novos a entrar. Para sobreviver, ele vasculha as próprias células à procura de proteínas velhas, danificadas ou vírus, e recicla tudo isso para gerar energia.\n\n**Os Benefícios:**\n* **Anti-envelhecimento:** A pele fica melhor e as células são renovadas.\n* **Prevenção de Doenças:** Ajuda a prevenir doenças neurodegenerativas limpando 'placas' do cérebro.\n* **Imunidade:** Destrói invasores e bactérias indesejadas.\n\nO jejum intermitente não é apenas sobre a balança, é sobre saúde celular profunda. Toda vez que ultrapassa as 16 horas, a magia da autofagia acontece!"
    },
    {
        id: 4,
        icon: "⚠️",
        iconBg: "#FEE2E2", // bg-red-100
        title: "Os 5 maiores erros no Jejum",
        subtitle: "Descubra o que está a travar o seu emagrecimento.",
        readTime: "4 min",
        content: "Está a jejuar direitinho, mas o peso estagnou? Pode estar a cometer um destes erros clássicos:\n\n**1. Comer mal na janela de alimentação**\nO jejum não é um passe livre para comer fast-food. Se jejuar 16 horas, mas comer 3.000 calorias de ultraprocessados nas 8 horas seguintes, vai engordar. Foque em comida de verdade.\n\n**2. Quebrar o jejum com carboidratos simples**\nAbrir a janela alimentar com pão branco ou sumo de laranja causa um pico de insulina violento. Vai sentir sono imediato e uma fome incontrolável 2 horas depois. Quebre o jejum com proteínas (ovos, carnes) ou gorduras boas (abacate).\n\n**3. Esquecer da hidratação**\nO jejum faz o corpo libertar muita água e sais minerais. Dor de cabeça e fraqueza raramente são fome: são desidratação. Beba pelo menos 2 a 3 litros de água por dia.\n\n**4. Começar com protocolos extremos**\nNunca fez jejum e quer tentar 24 horas logo de cara? Vai sofrer e desistir. Comece com 12 horas, suba para 14 e só depois vá para as 16 horas.\n\n**5. Dormir mal**\nO stress e a falta de sono aumentam o cortisol, um hormônio que bloqueia a queima de gordura e dá mais fome. O jejum e um bom sono precisam de andar de mãos dadas."
    },
    {
        id: 5,
        icon: "🧘‍♀️",
        iconBg: "#F3E8FF", // bg-purple-100
        title: "Estou com muita fome! E agora?",
        subtitle: "Estratégias práticas para lidar com os desejos.",
        readTime: "3 min",
        content: "Todos passamos por isso. O estômago ronca, a vontade de mastigar aparece. Antes de quebrar o seu jejum antes da hora, tente estas estratégias:\n\n**1. A Regra dos 15 minutos**\nA fome vem em ondas. Ela não aumenta infinitamente. Se bater uma fome forte, beba um copo de água cheio, mude de atividade (vá caminhar, ler, trabalhar) e espere 15 minutos. Na maioria das vezes, a onda passa.\n\n**2. Café ou Chá Quente**\nBebidas quentes têm um efeito de preenchimento no estômago muito maior do que bebidas geladas. Um café preto ou chá de camomila pode 'desligar' os recetores de fome por algumas horas.\n\n**3. Água com Sal (Reposição de Eletrólitos)**\nSe a fome vier acompanhada de tontura ou fraqueza, coloque uma pitada pequena de sal integral (sal rosa ou marinho) num copo de água e beba. A falta de sódio imita os sintomas da fome.\n\n**4. Identifique o tédio**\nPergunte a si mesmo: 'Estou com fome o suficiente para comer um prato de brócolos e peito de frango frio?'. Se a resposta for não, e você só quiser um chocolate, isso não é fome fisiológica, é tédio ou fome emocional. Seja forte!"
    },
    {
        id: 6,
        icon: "🥗",
        iconBg: "#DCFCE7", // bg-green-100
        title: "Jejum Intermitente: O Guia Inicial",
        subtitle: "Tudo o que precisa saber para dar os primeiros passos.",
        readTime: "5 min",
        content: "O Jejum Intermitente não é uma dieta, é um padrão de horários. Não foca no que você come, mas sim em QUANDO você come.\n\n**Como funciona a biologia?**\nQuando comemos, o corpo usa a comida como energia imediata (açúcar/glicose). O que sobra é guardado como gordura com a ajuda de um hormônio chamado Insulina.\n\nQuando jejuamos (passamos horas sem comer), a insulina cai drasticamente. Sem a energia da comida, o corpo é obrigado a abrir as portas das reservas de gordura e começar a 'queimá-la' para sobreviver.\n\n**Como começar?**\n* **Passo 1:** Defina a sua janela. O método mais comum é o 16:8. Jejuar por 16 horas e comer em 8 horas.\n* **Passo 2:** Ajuste aos seus horários. Por exemplo, jante às 20h00, durma, pule o pequeno-almoço e faça a primeira refeição apenas às 12h00 do dia seguinte.\n* **Passo 3:** Coma com sabedoria. Durante as 8 horas permitidas, faça 2 ou 3 refeições saudáveis, focando em proteínas, vegetais e gorduras boas para manter a saciedade no jejum seguinte.\n\nO início pode exigir adaptação (de 3 a 7 dias). O seu corpo está a reaprender a usar gordura como combustível. Tenha paciência, beba muita água e confie no processo!"
    }
];

export const LearnTab: React.FC = () => {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [showSettings, setShowSettings] = useState(false);

    // Helper to render text with bolding
    const renderContent = (text: string) => {
        // Splitting by double newlines for paragraphs
        const paragraphs = text.split('\n\n');

        return paragraphs.map((paragraph, index) => {
            // Check for list items (lines starting with *)
            if (paragraph.includes('\n* ')) {
                const lines = paragraph.split('\n');
                return (
                    <div key={index} style={{ marginBottom: '1.25rem' }}>
                        {lines.map((line, lIndex) => {
                            if (line.trim().startsWith('* ')) {
                                return (
                                    <div key={lIndex} style={{ display: 'flex', gap: '8px', marginBottom: '8px', marginLeft: '8px' }}>
                                        <span style={{ color: 'var(--primary)' }}>•</span>
                                        <span dangerouslySetInnerHTML={{ __html: formatBold(line.substring(2)) }} />
                                    </div>
                                );
                            }
                            return <p key={lIndex} dangerouslySetInnerHTML={{ __html: formatBold(line) }} style={{ marginBottom: '8px' }} />;
                        })}
                    </div>
                );
            }

            // Regular paragraph
            return (
                <p
                    key={index}
                    style={{
                        marginBottom: '1.25rem',
                        lineHeight: '1.75',
                        color: '#334155' // slate-700
                    }}
                    dangerouslySetInnerHTML={{ __html: formatBold(paragraph) }}
                />
            );
        });
    };

    const formatBold = (text: string) => {
        // Replace **text** with <strong>text</strong>
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    };

    return (
        <div style={{ position: 'relative', height: '100%', minHeight: '100dvh' }}>
            {/* ARTICLE LIST VIEW */}
            <div style={{ padding: '1.5rem', display: selectedArticle ? 'none' : 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '80px' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h1 className="title" style={{ fontSize: '1.75rem', color: '#1E293B' /* slate-800 */ }}>Crescer e Aprender</h1>
                        <p className="subtitle" style={{ color: '#64748B' /* slate-500 */ }}>O conhecimento é a chave para a longo prazo.</p>
                    </div>

                    <button
                        onClick={() => setShowSettings(true)}
                        style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                    >
                        <Settings color="var(--text-muted)" size={20} />
                    </button>
                </header>

                {/* Article List */}
                <section>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {articlesData.map(article => (
                            <div
                                key={article.id}
                                onClick={() => setSelectedArticle(article)}
                                style={{
                                    backgroundColor: 'white',
                                    padding: '1rem',
                                    borderRadius: '16px',
                                    border: '1px solid var(--border-color)',
                                    display: 'flex',
                                    gap: '1rem',
                                    alignItems: 'center',
                                    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                            >
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    backgroundColor: article.iconBg,
                                    borderRadius: '16px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '2rem',
                                    flexShrink: 0
                                }}>
                                    {article.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontWeight: 'bold', fontSize: '1rem', color: '#1E293B', marginBottom: '4px', lineHeight: '1.2' }}>{article.title}</h3>
                                    <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: '1.3' }}>{article.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* FULL SCREEN READING VIEW */}
            {selectedArticle && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'white',
                    zIndex: 100,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ padding: '1.5rem', maxWidth: '600px', margin: '0 auto', width: '100%', paddingBottom: '3rem' }}>
                        {/* Nav */}
                        <button
                            onClick={() => setSelectedArticle(null)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                color: '#64748B',
                                fontSize: '1rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                                marginBottom: '2rem',
                                padding: 0
                            }}>
                            <ArrowLeft size={24} color="#1E293B" /> Voltar
                        </button>

                        {/* Article Header */}
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{selectedArticle.icon}</div>
                            <h1 style={{ fontSize: '1.875rem', fontWeight: '900', color: '#1E293B', lineHeight: '1.2', marginBottom: '1rem' }}>
                                {selectedArticle.title}
                            </h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8', fontSize: '0.875rem', fontWeight: '500' }}>
                                <span>⏱️</span>
                                <span>{selectedArticle.readTime} de leitura</span>
                            </div>
                        </div>

                        {/* Article Content */}
                        <div style={{ fontSize: '1rem' }}>
                            {renderContent(selectedArticle.content)}
                        </div>
                    </div>
                </div>
            )}
            {/* Settings Modal */}
            {showSettings && <SettingsScreen onClose={() => setShowSettings(false)} />}
        </div>
    );
};
