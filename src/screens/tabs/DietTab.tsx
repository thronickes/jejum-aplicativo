import React, { useState } from 'react';
import { Search, Heart, X, Clock, Flame, CheckSquare } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface Recipe {
    id: number;
    title: string;
    category: string;
    time: string;
    cals: number;
    proteinLevel: 'Baixo' | 'Médio' | 'Alto';
    ingredients: string[];
    instructions: string[];
    image: string;
}

const recipesData: Recipe[] = [
    // Categoria 1: Desjejum
    {
        id: 1,
        title: 'Ovos Mexidos com Abacate',
        category: 'Desjejum',
        time: '10 min',
        cals: 320,
        proteinLevel: 'Alto',
        ingredients: [
            '2 ovos inteiros',
            '1/4 de abacate fatiado',
            '1 colher de chá de azeite ou manteiga',
            'Sal, pimenta e orégano a gosto'
        ],
        instructions: [
            'Aqueça a frigideira em fogo médio com o azeite/manteiga.',
            'Bata os ovos em um recipiente com uma pitada de sal.',
            'Despeje os ovos na frigideira e mexa suavemente até atingir a consistência desejada.',
            'Sirva no prato acompanhado das fatias de abacate temperadas com um fio de azeite e pimenta.'
        ],
        image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 2,
        title: 'Caldo de Ossos Nutritivo',
        category: 'Desjejum',
        time: '5 min',
        cals: 90,
        proteinLevel: 'Médio',
        ingredients: [
            '250ml de caldo de ossos caseiro',
            '1 pitada de sal integral e açafrão',
            'Cebolinha picada'
        ],
        instructions: [
            'Aqueça o caldo de ossos em uma panela pequena.',
            'Adicione o açafrão e o sal integral.',
            'Sirva em uma caneca quente e finalize com cebolinha fresca.'
        ],
        image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4859?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 3,
        title: 'Iogurte Natural com Chia e Amêndoas',
        category: 'Desjejum',
        time: '5 min',
        cals: 210,
        proteinLevel: 'Médio',
        ingredients: [
            '1 potinho (170g) de iogurte natural integral (sem açúcar)',
            '1 colher de sopa de sementes de chia',
            '10 amêndoas torradas'
        ],
        instructions: [
            'Em uma tigela, misture o iogurte natural com as sementes de chia.',
            'Deixe descansar por 3 minutos para a chia hidratar.',
            'Adicione as amêndoas por cima para dar crocância e sirva.'
        ],
        image: 'https://images.unsplash.com/photo-1511690078903-71dc5a49f5e3?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 4,
        title: 'Creme Leve de Abóbora com Gengibre',
        category: 'Desjejum',
        time: '20 min',
        cals: 150,
        proteinLevel: 'Baixo',
        ingredients: [
            '2 xícaras de abóbora cabotiá em cubos',
            '1 colher de chá de gengibre ralado',
            '1 fio de azeite e sal a gosto'
        ],
        instructions: [
            'Cozinhe a abóbora em água ou no vapor até ficar bem macia.',
            'Bata a abóbora no liquidificador com um pouco da água do cozimento.',
            'Volte para a panela, adicione o gengibre, azeite e sal. Aqueça por 2 minutos e sirva.'
        ],
        image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 5,
        title: 'Omelete de Espinafre e Queijo Branco',
        category: 'Desjejum',
        time: '12 min',
        cals: 280,
        proteinLevel: 'Alto',
        ingredients: [
            '2 ovos',
            '1 xícara de folhas de espinafre fresco',
            '1 fatia grossa de queijo branco (minas fresco ou ricota)'
        ],
        instructions: [
            'Refogue levemente o espinafre em uma frigideira até murchar e reserve.',
            'Bata os ovos e despeje na mesma frigideira.',
            'Quando a base estiver firme, adicione o espinafre e o queijo esfarelado de um lado.',
            'Dobre a omelete ao meio, deixe o queijo derreter levemente e sirva.'
        ],
        image: 'https://images.unsplash.com/photo-1510693225872-2fa136340630?auto=format&fit=crop&w=500&q=60'
    },

    // Almoço
    {
        id: 6,
        title: 'Bowl de Salmão e Quinoa',
        category: 'Almoço',
        time: '25 min',
        cals: 450,
        proteinLevel: 'Alto',
        ingredients: [
            '1 filé de salmão (150g)',
            '1/2 xícara de quinoa cozida',
            '1 xícara de brócolos e cenoura no vapor',
            'Molho shoyu light'
        ],
        instructions: [
            'Tempere o salmão e asse por 15 minutos.',
            'Em um bowl, coloque a quinoa como base.',
            'Adicione os vegetais de um lado e o salmão grelhado do outro.',
            'Finalize com shoyu.'
        ],
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 7,
        title: 'Escondidinho de Batata Doce com Carne Moída',
        category: 'Almoço',
        time: '40 min',
        cals: 410,
        proteinLevel: 'Alto',
        ingredients: [
            '1 batata doce média cozida e amassada',
            '150g de carne moída magra refogada',
            '1 colher de sopa de molho de tomate natural'
        ],
        instructions: [
            'Refogue a carne moída.',
            'Faça uma camada com metade do purê de batata doce em um refratário.',
            'Adicione a carne moída no meio.',
            'Cubra com o restante do purê e leve ao forno por 10 minutos.'
        ],
        image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 8,
        title: 'Peito de Frango Grelhado com Legumes Assados',
        category: 'Almoço',
        time: '30 min',
        cals: 350,
        proteinLevel: 'Alto',
        ingredients: [
            '1 filé de peito de frango (150g)',
            'Mix de legumes (abobrinha, pimentão, cebola roxa)',
            'Azeite, alecrim, sal e pimenta'
        ],
        instructions: [
            'Corte os legumes, regue com azeite e asse a 200ºC por 20 minutos.',
            'Grelhe o frango em uma frigideira quente.',
            'Sirva o frango com os legumes.'
        ],
        image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 9,
        title: 'Salada Completa com Atum e Grão-de-Bico',
        category: 'Almoço',
        time: '10 min',
        cals: 380,
        proteinLevel: 'Médio',
        ingredients: [
            '1 lata de atum em água',
            '1/2 xícara de grão-de-bico cozido',
            'Mix de folhas verdes',
            'Tomate cereja',
            'Limão e azeite'
        ],
        instructions: [
            'Faça uma cama com as folhas verdes.',
            'Adicione os tomates cortados.',
            'Junte o grão-de-bico e o atum no centro.',
            'Regue com limão e azeite.'
        ],
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 10,
        title: 'Tilápia no Papelote com Brócolos',
        category: 'Almoço',
        time: '25 min',
        cals: 290,
        proteinLevel: 'Alto',
        ingredients: [
            '1 filé de tilápia',
            '1 xícara de flores de brócolos',
            '2 rodelas de limão e ervas finas'
        ],
        instructions: [
            'Coloque os brócolos e o peixe sobre papel alumínio.',
            'Tempere e coloque o limão.',
            'Feche bem o papelote.',
            'Asse a 200ºC por 20 minutos.'
        ],
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=60'
    },

    // Jantar
    {
        id: 11,
        title: 'Sopa Leve de Legumes e Frango Desfiado',
        category: 'Jantar',
        time: '30 min',
        cals: 220,
        proteinLevel: 'Alto',
        ingredients: [
            '100g de frango desfiado cozido',
            '2 xícaras de legumes picados',
            'Caldo natural de frango'
        ],
        instructions: [
            'Cozinhe os legumes no caldo de frango.',
            'Adicione o frango desfiado.',
            'Ferva por 5 minutos.',
            'Sirva quente.'
        ],
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 12,
        title: 'Espaguete de Abobrinha com Molho Bolonhesa',
        category: 'Jantar',
        time: '20 min',
        cals: 310,
        proteinLevel: 'Alto',
        ingredients: [
            '1 abobrinha grande em fios finos',
            '150g de carne moída com molho de tomate',
            'Queijo parmesão'
        ],
        instructions: [
            'Aqueça o molho bolonhesa.',
            'Refogue a abobrinha rapidamente em azeite (2 min).',
            'Cubra a abobrinha com o molho e o queijo.'
        ],
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 13,
        title: 'Salada Caprese com Frango',
        category: 'Jantar',
        time: '10 min',
        cals: 340,
        proteinLevel: 'Alto',
        ingredients: [
            '100g de frango grelhado em tiras',
            'Rúcula',
            '1/2 tomate fatiado',
            'Mussarela de búfala',
            'Manjericão e azeite'
        ],
        instructions: [
            'Distribua a rúcula.',
            'Alterne tomate e mussarela.',
            'Adicione o frango.',
            'Tempere com azeite e manjericão.'
        ],
        image: 'https://images.unsplash.com/photo-1529312266912-b33cfce2eefd?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 14,
        title: 'Crepioca Recheada com Queijo e Tomate',
        category: 'Jantar',
        time: '10 min',
        cals: 260,
        proteinLevel: 'Médio',
        ingredients: [
            '1 ovo',
            '2 colheres de sopa de goma de tapioca',
            '1 fatia de mussarela e tomate picado'
        ],
        instructions: [
            'Bata o ovo com a tapioca.',
            'Despeje na frigideira quente.',
            'Quando firmar, vire, coloque o queijo e o tomate de um lado.',
            'Dobre ao meio e sirva.'
        ],
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 15,
        title: 'Tofu Grelhado com Aspargos',
        category: 'Jantar',
        time: '15 min',
        cals: 240,
        proteinLevel: 'Médio',
        ingredients: [
            '150g de Tofu em cubos',
            '8 talos de aspargos',
            'Molho shoyu, gengibre e gergelim'
        ],
        instructions: [
            'Marine o tofu em shoyu.',
            'Doure o tofu em uma frigideira.',
            'Na mesma frigideira, grelhe os aspargos.',
            'Sirva juntos.'
        ],
        image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&w=500&q=60'
    },

    // Lanches
    {
        id: 16,
        title: 'Smoothie Roxo Antioxidante',
        category: 'Lanches',
        time: '5 min',
        cals: 210,
        proteinLevel: 'Baixo',
        ingredients: [
            '1/2 banana congelada',
            '1/2 xícara de frutas vermelhas congeladas',
            '150ml de leite vegetal',
            '1 colher de sopa de aveia'
        ],
        instructions: [
            'Coloque tudo no liquidificador.',
            'Bata até ficar liso.',
            'Sirva imediatamente.'
        ],
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 17,
        title: 'Mix de Castanhas Temperadas',
        category: 'Lanches',
        time: '2 min',
        cals: 180,
        proteinLevel: 'Baixo',
        ingredients: [
            '30g de mix de castanhas',
            'Pitada de páprica defumada e sal'
        ],
        instructions: [
            'Coloque as castanhas num potinho.',
            'Polvilhe a páprica e o sal e misture.'
        ],
        image: 'https://images.unsplash.com/photo-1521197931388-c0b9982467d5?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 18,
        title: 'Panqueca de Banana com Aveia',
        category: 'Lanches',
        time: '10 min',
        cals: 250,
        proteinLevel: 'Médio',
        ingredients: [
            '1 banana amassada',
            '1 ovo',
            '2 colheres de sopa de aveia em flocos',
            'Canela a gosto'
        ],
        instructions: [
            'Misture todos os ingredientes.',
            'Aqueça uma frigideira untada.',
            'Despeje porções da massa e doure dos dois lados.'
        ],
        image: 'https://images.unsplash.com/photo-1540507204-6f0a3cc1e41f?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 19,
        title: 'Guacamole Rápido com Cenoura',
        category: 'Lanches',
        time: '10 min',
        cals: 200,
        proteinLevel: 'Baixo',
        ingredients: [
            '1/2 abacate maduro',
            'Suco de 1/2 limão, sal e coentro',
            '1 cenoura em palitos'
        ],
        instructions: [
            'Amasse o abacate e misture com limão e temperos.',
            'Mergulhe a cenoura no guacamole.'
        ],
        image: 'https://images.unsplash.com/photo-1564093951508-e8cb9e68e4ee?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 20,
        title: 'Pudim de Chia com Morangos',
        category: 'Lanches',
        time: '5 min',
        cals: 230,
        proteinLevel: 'Médio',
        ingredients: [
            '3 colheres de sopa de chia',
            '150ml de leite de coco',
            'Morangos picados'
        ],
        instructions: [
            'Misture a chia e o leite.',
            'Deixe na geladeira por 2 horas.',
            'Adicione morangos por cima.'
        ],
        image: 'https://images.unsplash.com/photo-1490333469792-716d9af67123?auto=format&fit=crop&w=500&q=60'
    }
];

export const DietTab: React.FC = () => {
    const { isFasting, toggleFasting } = useAppStore();
    const [activeCategory, setActiveCategory] = useState('Todas');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

    const categories = ['Todas', 'Desjejum', 'Almoço', 'Jantar', 'Lanches'];

    // Lógica condicional MUITO IMPORTANTE
    // Se o usuário está em jejum (prestes a quebrar), mostre apenas Desjejum.
    const displayRecipes = isFasting
        ? recipesData.filter(r => r.category === 'Desjejum')
        : recipesData.filter(r => {
            const matchesCategory = activeCategory === 'Todas' || r.category === activeCategory;
            const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

    const handleSelectRecipe = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setCheckedIngredients({});
    };

    const toggleIngredient = (idx: number) => {
        setCheckedIngredients(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    return (
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '80px', position: 'relative' }}>

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 className="title">Alimentar</h1>
                    <p className="subtitle">Coma com propósito na sua janela.</p>
                </div>
                {/* Botão para Teste de Estado */}
                <button
                    onClick={toggleFasting}
                    style={{
                        padding: '6px 12px',
                        fontSize: '0.75rem',
                        borderRadius: '20px',
                        backgroundColor: isFasting ? 'var(--text-color)' : 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    TESTE: {isFasting ? 'Terminar Jejum' : 'Iniciar Jejum'}
                </button>
            </header>

            {/* SE ESTÁ EM JEJUM (Quebrando o Jejum) */}
            {isFasting ? (
                <section>
                    <div style={{
                        backgroundColor: 'var(--primary)',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        color: 'white',
                        boxShadow: '0 4px 12px -2px rgb(236 72 153 / 0.3)'
                    }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>O que comer agora?</h2>
                        <p style={{ fontSize: '0.875rem', lineHeight: '1.4', marginBottom: '1rem', opacity: 0.9 }}>
                            Para quebrar o jejum sem picos de insulina, aposte em proteínas magras e gorduras boas. Evite carboidratos simples!
                        </p>
                    </div>

                    <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: '1.5rem 0 1rem 0' }}>Sugestões de Desjejum</h2>

                    {/* Lista Horizontal (Carrossel) */}
                    <div style={{ display: 'flex', overflowX: 'auto', gap: '1rem', paddingBottom: '1rem', scrollbarWidth: 'none' }}>
                        {displayRecipes.map(recipe => (
                            <div
                                key={recipe.id}
                                onClick={() => handleSelectRecipe(recipe)}
                                style={{
                                    flexShrink: 0,
                                    width: '200px',
                                    backgroundColor: 'var(--surface-color)',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    border: '1px solid var(--border-color)',
                                    boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.05)',
                                    cursor: 'pointer'
                                }}
                            >
                                <div style={{ height: '120px', backgroundImage: `url(${recipe.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                                    <button style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                                        <Heart size={16} color="var(--primary)" />
                                    </button>
                                </div>
                                <div style={{ padding: '0.75rem' }}>
                                    <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '8px', height: '32px', overflow: 'hidden' }}>{recipe.title}</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                        <span>{recipe.cals} kcal</span>
                                        <span>{recipe.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ) : (
                /* SE NÃO ESTÁ EM JEJUM (Janela de Alimentação) */
                <>
                    {/* Search & Filters */}
                    <section>
                        <div style={{ position: 'relative', marginBottom: '1rem' }}>
                            <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                            <input
                                type="text"
                                placeholder="Procurar receitas..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-color)',
                                    backgroundColor: 'var(--surface-color)',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', overflowX: 'auto', gap: '8px', paddingBottom: '8px', scrollbarWidth: 'none' }}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    style={{
                                        flexShrink: 0,
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        border: cat === activeCategory ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                                        backgroundColor: cat === activeCategory ? 'var(--primary)' : 'var(--surface-color)',
                                        color: cat === activeCategory ? 'white' : 'var(--text-color)',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Recipe Grid */}
                    <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                            {displayRecipes.map(recipe => (
                                <div
                                    key={recipe.id}
                                    onClick={() => handleSelectRecipe(recipe)}
                                    style={{
                                        backgroundColor: 'var(--surface-color)',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        border: '1px solid var(--border-color)',
                                        boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.05)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ height: '120px', backgroundImage: `url(${recipe.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                                        <button style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                                            <Heart size={16} color="var(--primary)" />
                                        </button>
                                    </div>
                                    <div style={{ padding: '0.75rem' }}>
                                        <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '8px', height: '32px', overflow: 'hidden' }}>{recipe.title}</h3>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                            <span>{recipe.cals} kcal</span>
                                            <span>{recipe.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {displayRecipes.length === 0 && (
                            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>Nenhuma receita encontrada.</p>
                        )}
                    </section>
                </>
            )}

            {/* Modal/Tela de Detalhes da Receita */}
            {selectedRecipe && (
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
                    {/* Modal Header/Image */}
                    <div style={{ position: 'relative', height: '250px', backgroundImage: `url(${selectedRecipe.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <button
                            onClick={() => setSelectedRecipe(null)}
                            style={{
                                position: 'absolute', top: '16px', left: '16px',
                                background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%',
                                width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                                cursor: 'pointer', color: 'white'
                            }}>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Modal Content */}
                    <div style={{ padding: '1.5rem', flex: 1, borderTopLeftRadius: '24px', borderTopRightRadius: '24px', backgroundColor: 'white', marginTop: '-24px', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', lineHeight: '1.2', width: '80%' }}>{selectedRecipe.title}</h2>
                            <button style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                                <Heart size={20} color="var(--primary)" />
                            </button>
                        </div>

                        {/* Metadata Pills */}
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#F3F4F6', padding: '6px 12px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: '600' }}>
                                <Flame size={14} color="#EF4444" /> {selectedRecipe.cals} kcal
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#F3F4F6', padding: '6px 12px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: '600' }}>
                                <Clock size={14} color="#10B981" /> {selectedRecipe.time}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#FDF2F8', color: 'var(--primary-dark)', padding: '6px 12px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: '600' }}>
                                Proteína: {selectedRecipe.proteinLevel}
                            </div>
                        </div>

                        {/* Ingredientes */}
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Ingredientes</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
                            {selectedRecipe.ingredients.map((ing, idx) => (
                                <div key={idx} onClick={() => toggleIngredient(idx)} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer' }}>
                                    <div style={{ marginTop: '2px' }}>
                                        {checkedIngredients[idx] ? (
                                            <CheckSquare size={20} color="var(--primary)" />
                                        ) : (
                                            <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: '2px solid var(--border-color)' }} />
                                        )}
                                    </div>
                                    <span style={{ fontSize: '0.9rem', color: checkedIngredients[idx] ? 'var(--text-muted)' : 'var(--text-color)', textDecoration: checkedIngredients[idx] ? 'line-through' : 'none' }}>
                                        {ing}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Modo de Preparo */}
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Modo de Preparo</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                            {selectedRecipe.instructions.map((inst, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                    <div style={{ backgroundColor: 'var(--primary)', color: 'white', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.75rem', fontWeight: 'bold', flexShrink: 0 }}>
                                        {idx + 1}
                                    </div>
                                    <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{inst}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
