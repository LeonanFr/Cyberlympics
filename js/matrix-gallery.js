(() => {
    const topicData = {
        algoritmos: [
            { title: "Busca Binária & Ordenação", icon: "fa-arrow-down-a-z", desc: "Encontrar agulhas em palheiros gigantes em O(log n).", details: "Se o problema pede 'o menor valor que satisfaz uma condição', é busca binária. Ordenar com Quick/Merge sort é pré‑requisito para dois ponteiros e eliminar força bruta. A função sort() da linguagem já é otimizada – use‑a!" },
            { title: "Recursão & Backtracking", icon: "fa-infinity", desc: "Pense como uma matrioska: resolva o pequeno e confie no resto.", details: "Base de backtracking (rainhas, labirintos) e divisão e conquista. Cuidado com a pilha – problemas grandes podem estourar. Prefira recursão quando a árvore de chamadas for limitada." },
            { title: "Programação Dinâmica", icon: "fa-bolt", desc: "Se já calculou, não recalcule – guarde!", details: "Transforma exponencial em polinomial. Domine os clássicos: mochila, LCS, subsequência máxima. Comece definindo o estado e a transição. Se o problema pede mínimo/máximo ou contagem, PD é forte candidata." }
        ],
        dados: [
            { title: "Pilhas, Filas e Deques", icon: "fa-layer-group", desc: "LIFO, FIFO, e o melhor dos dois mundos.", details: "Pilha para expressões, parênteses balanceados e DFS iterativo. Filas são a alma do BFS. Em sliding window, um deque resolve em O(n)." },
            { title: "Árvores Binárias e Heap", icon: "fa-network-wired", desc: "Organização hierárquica com buscas rápidas.", details: "BST permite busca O(log n) se balanceada. Heap (priority queue) é essencial para Dijkstra, Huffman e para manter o menor/maior elemento dinamicamente. Preciso do mínimo? → heap." },
            { title: "Grafos – Conexões", icon: "fa-circle-nodes", desc: "Represente qualquer relação como vértices e arestas.", details: "BFS para distâncias em grafos não‑ponderados, DFS para detectar ciclos e componentes. Dijkstra (com heap) para caminho mínimo com pesos positivos. Grafos estão em mapas, dependências, jogos." }
        ],
        sql: [
            { title: "Modelagem Relacional", icon: "fa-database", desc: "Projete para não se arrepender depois.", details: "Evite redundância: normalize até a 3FN. Consultas complexas exigem esquemas bem pensados. Chaves estrangeiras e índices adequados fazem diferença." },
            { title: "Consultas Poderosas", icon: "fa-magnifying-glass-chart", desc: "Combine tabelas como peças de lego.", details: "Domine JOINs (INNER, LEFT, SELF) e subqueries correlacionadas. Window functions (ROW_NUMBER, LAG) resolvem ranking e séries temporais em uma passada." },
            { title: "Índices – O Turbo", icon: "fa-gauge-high", desc: "Sem índice, o banco varre a tabela inteira.", details: "Índices aceleram buscas, mas custam escrita. Use EXPLAIN para ver se o índice está sendo usado. Uma query bem indexada pode ser a diferença entre lento e rápido." }
        ],
        arquitetura: [
            { title: "Arquitetura Limpa", icon: "fa-soap", desc: "Separe o que muda do que é estável.", details: "Regras de negócio no centro, frameworks na periferia. Útil para projetos grandes, mas em olimpíadas manter funções curtas e coesas ajuda na depuração." },
            { title: "Microserviços", icon: "fa-cubes", desc: "Nem tudo são flores.", details: "Serviços independentes, cada um com seu banco. O desafio é a comunicação e consistência eventual. Ótimo para escalar, complexo para coordenar." },
            { title: "Padrões de Projeto", icon: "fa-chess-board", desc: "Reutilize soluções consagradas.", details: "Strategy para algoritmos intercambiáveis, Observer para eventos, Factory para criação de objetos. Usar o padrão certo evita if‑else monstro." }
        ],
        "eng-software": [
            { title: "Métodos Ágeis", icon: "fa-people-group", desc: "Entregue valor rápido, adapte‑se.", details: "Scrum e Kanban organizam o trabalho em ciclos curtos. Feedback constante e melhoria contínua são a chave." },
            { title: "Controle de Versão", icon: "fa-code-branch", desc: "Histórico do código colaborativo.", details: "Git permite ramificações, merges e volta segura. Commits semânticos e pull requests facilitam a revisão." },
            { title: "Gestão de Requisitos", icon: "fa-list-check", desc: "O que construir e por quê.", details: "Histórias de usuário, critérios de aceite e priorização. Foco no essencial evita retrabalho." }
        ],
        qualidade: [
            { title: "Testes e TDD", icon: "fa-vial", desc: "Se não testou, está quebrado.", details: "Teste primeiro garante que o código faz o que deve. Em olimpíadas, teste mentalmente casos limite: vetor vazio, valor máximo, entradas repetidas." },
            { title: "Code Review", icon: "fa-glasses", desc: "Quatro olhos veem mais que dois.", details: "Outro programador enxerga o que você não vê. Procure bugs lógicos, variáveis não inicializadas e complexidade desnecessária." },
            { title: "Integração Contínua", icon: "fa-robot", desc: "Automatize o óbvio.", details: "A cada commit, rode testes e linters. Evita que código quebrado chegue à versão final." }
        ],
        devops: [
            { title: "Containerização", icon: "fa-box-open", desc: "Empacote com tudo que precisa.", details: "Garante que o código rode igual em qualquer ambiente. Isolamento e reprodutibilidade são os benefícios." },
            { title: "Orquestração", icon: "fa-ship", desc: "Gerencie múltiplos containers.", details: "Escalonamento automático, cura de falhas e atualizações sem downtime. Conceito útil para sistemas distribuídos." },
            { title: "Monitoramento", icon: "fa-chart-line", desc: "Veja o invisível.", details: "Métricas, logs e rastreamento mostram a saúde do sistema. Saber o que medir ajuda a detectar gargalos." }
        ],
        uiux: [
            { title: "Design de Interfaces", icon: "fa-pen-nib", desc: "Crie interfaces que funcionam.", details: "Componentes reutilizáveis, layouts responsivos e prototipagem rápida. Um bom design economiza horas de implementação." },
            { title: "Acessibilidade", icon: "fa-universal-access", desc: "Inclusão não é opcional.", details: "Contraste mínimo, navegação por teclado, textos alternativos. Um site acessível alcança mais usuários." },
            { title: "Heurísticas de Nielsen", icon: "fa-check-double", desc: "10 regras de ouro.", details: "Visibilidade do estado, correspondência com o mundo real, controle do usuário. Aplicar essas regras evita frustração." }
        ],
        debugging: [
            { title: "Stack Trace", icon: "fa-bug", desc: "O mapa do erro.", details: "Leia a pilha de chamadas de baixo para cima. A primeira linha é o efeito; a causa está algumas chamadas acima." },
            { title: "Breakpoints", icon: "fa-pause", desc: "Pare e examine.", details: "Use o debugger para inspecionar variáveis passo a passo. Melhor que mil prints." },
            { title: "Método do Patinho", icon: "fa-duck", desc: "Explique em voz alta.", details: "Descreva linha por linha o que o programa deveria fazer. A contradição entre o que você diz e o que o código faz salta aos olhos." }
        ],
        seguranca: [
            { title: "OWASP Top 10", icon: "fa-shield-halved", desc: "Conheça o inimigo.", details: "SQL Injection, XSS, CSRF – jamais concatene strings em queries, escape toda saída. Prepared statements e validação são essenciais." },
            { title: "Criptografia", icon: "fa-key", desc: "Segredos bem guardados.", details: "Use bcrypt, scrypt ou Argon2 para senhas. Para dados em trânsito, TLS. Não invente sua própria criptografia." },
            { title: "Autenticação", icon: "fa-id-card", desc: "Quem é você e o que pode fazer?", details: "Sessões com cookies HttpOnly ou tokens JWT. Autenticação identifica, autorização define permissões. Nunca confie em dados do cliente sem validação." }
        ]
    };

    const dialer = document.getElementById("matrix-dialer");
    const itemsContainer = document.getElementById("matrix-items");
    const container = document.getElementById("matrix-gallery-wrapper");
    const navPrev = document.getElementById("matrixPrevCard");
    const navNext = document.getElementById("matrixNextCard");
    const navIndex = document.getElementById("matrixCardIndex");

    if (!dialer || !itemsContainer || !container) return;

    const topics = Array.from(dialer.querySelectorAll("li"));

    function createModal(id) {
        let m = document.getElementById(id);
        if (m) return m;
        m = document.createElement("div");
        m.id = id;
        m.className = "matrix-modal";
        m.innerHTML = `
            <div class="modal-content">
                <div class="modal-close"><i class="fa-solid fa-xmark"></i></div>
                <div class="modal-icon"><i class="fa-solid"></i></div>
                <h2 class="modal-title"></h2>
                <p class="modal-desc"></p>
                <div class="modal-detail"></div>
            </div>`;
        document.body.appendChild(m);
        m.querySelector(".modal-close").onclick = () => m.classList.remove("active");
        m.onclick = (e) => { if (e.target === m) m.classList.remove("active"); };
        return m;
    }

    const cardModal = createModal("cardModal");
    const techModal = createModal("techModal");

    function typeText(el, text, speed = 12) {
        el.textContent = "";
        let i = 0;
        const tick = () => {
            el.textContent += text[i];
            i++;
            if (i < text.length) requestAnimationFrame(() => setTimeout(tick, speed));
        };
        tick();
    }

    function showModal(modal, data, typed = false) {
        const iconWrap = modal.querySelector(".modal-icon");
        iconWrap.innerHTML = "";

        if (data.iconSvg) {
            const img = document.createElement("img");
            img.src = data.iconSvg;
            img.alt = data.title;
            img.style.width = "48px";
            img.style.height = "48px";
            img.style.objectFit = "contain";
            img.style.filter = "drop-shadow(0 0 10px rgba(0, 255, 102, 0.4))";
            iconWrap.appendChild(img);
        } else {
            const i = document.createElement("i");
            if (data.iconClass) {
                i.className = data.iconClass;
            } else if (data.icon) {
                i.className = data.icon.startsWith("fa-") ? `fa-solid ${data.icon}` : data.icon;
            } else {
                i.className = "fa-solid fa-code";
            }
            iconWrap.appendChild(i);
        }

        modal.querySelector(".modal-title").textContent = data.title;

        const descEl = modal.querySelector(".modal-desc");
        if (typed && typeof typeText === "function") typeText(descEl, data.desc, 11);
        else descEl.textContent = data.desc;

        modal.querySelector(".modal-detail").textContent = data.details || "";
        modal.classList.add("active");
    }

    const techFacts = {
        "C": [
            "C compila extremamente rápido e gera executáveis leves — ótimo quando cada milissegundo conta.",
            "Sem STL ou garbage collector: em C você controla tudo manualmente, inclusive memória.",
            "Arrays estáticos e manipulação direta de memória fazem C ser muito rápido em algoritmos simples."
        ],

        "C++": [
            "C++ é a linguagem mais usada em maratonas de programação por causa da STL.",
            "std::sort roda em O(n log n) e costuma ser altamente otimizado — use sempre que puder.",
            "priority_queue, vector, set e map resolvem metade dos problemas clássicos de algoritmos."
        ],

        "Java": [
            "Java tem estruturas prontas como ArrayList, HashMap e PriorityQueue no Collection Framework.",
            "Para evitar TLE em competições, use BufferedReader e StringBuilder em vez de Scanner.",
            "A JVM faz otimizações em runtime, então loops pesados podem ficar mais rápidos após aquecimento."
        ],

        "Kotlin": [
            "Kotlin roda na JVM e pode usar todas as bibliotecas do Java.",
            "Funções como map, filter e sorted deixam o código de algoritmos muito mais conciso.",
            "Apesar da sintaxe moderna, o desempenho costuma ser parecido com Java."
        ],

        "Python": [
            "Python é muito rápido para escrever soluções — ideal quando o tempo de codar é curto.",
            "sorted(), heapq e collections resolvem muitos problemas clássicos de maratona.",
            "Use sys.stdin.readline() para leitura rápida quando a entrada for muito grande."
        ],

        "JavaScript": [
            "Com Node.js, JavaScript também pode resolver problemas de algoritmos no backend.",
            "Arrays dinâmicos e objetos funcionam como mapas hash de forma natural.",
            "Para leitura rápida em competições, use fs.readFileSync(0, 'utf8')."
        ],
    };

    function pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function setupTechStack() {
        const icons = document.querySelectorAll(".tech-stack > *");

        icons.forEach(el => {
            el.addEventListener("pointermove", (e) => {
                const r = el.getBoundingClientRect();
                const x = e.clientX - (r.left + r.width / 2);
                const y = e.clientY - (r.top + r.height / 2);
                el.style.setProperty("--rx", `${Math.max(-14, Math.min(14, x))}px`);
                el.style.setProperty("--ry", `${Math.max(-14, Math.min(14, y))}px`);
            });

            el.addEventListener("pointerleave", () => {
                el.style.setProperty("--rx", `0px`);
                el.style.setProperty("--ry", `0px`);
            });

            el.addEventListener("click", () => {
                const key = (el.getAttribute("data-lang") || el.innerText || el.title || "").trim();
                if (!key) return;

                const map = {
                    "C": {
                        title: "Linguagem C",
                        iconSvg: "assets/icons/c.svg",
                        desc: pick(techFacts["C"]),
                        details: "Criada em 1972. Base de sistemas e bibliotecas essenciais."
                    },
                    "C++": {
                        title: "C++",
                        iconSvg: "assets/icons/cpp.svg",
                        desc: pick(techFacts["C++"]),
                        details: "Muito usada em engines, tempo real e alto desempenho."
                    },
                    "Java": {
                        title: "Java",
                        iconSvg: "assets/icons/java.svg",
                        desc: pick(techFacts["Java"]),
                        details: "JVM, ecossistema enorme e uso forte no mercado."
                    },
                    "Kotlin": {
                        title: "Kotlin",
                        iconSvg: "assets/icons/kotlin.svg",
                        desc: pick(techFacts["Kotlin"]),
                        details: "Moderna, concisa, interoperável com Java."
                    },
                    "Python": {
                        title: "Python",
                        iconSvg: "assets/icons/python.svg",
                        desc: pick(techFacts["Python"]),
                        details: "Automação, back-end, dados e IA."
                    },
                    "JavaScript": {
                        title: "JavaScript",
                        iconSvg: "assets/icons/javascript.svg",
                        desc: pick(techFacts["JavaScript"]),
                        details: "Linguagem versátil: front-end, back-end (Node.js), mobile (React Native), e até desktop (Electron)."
                    }
                };

                const data = map[key] || map[el.getAttribute("title")] || null;
                if (!data) return;

                showModal(techModal, data, true);
            });
        });
    }

    function clamp(v, min, max) {
        return Math.max(min, Math.min(max, v));
    }

    function isMobile() {
        return window.matchMedia("(max-width: 768px)").matches;
    }

    function hashCode(str) {
        let hash = 2166136261;
        for (let i = 0; i < str.length; i++) {
            hash ^= str.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
        }
        return hash >>> 0;
    }

    function createRNG(seed) {
        let t = seed + 0x6D2B79F5;
        return () => {
            t += 0x6D2B79F5;
            let r = Math.imul(t ^ (t >>> 15), 1 | t);
            r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
            return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
        };
    }

    function setActive(li, smooth = true) {
        topics.forEach(t => t.classList.remove("active"));
        li.classList.add("active");

        const center = (dialer.clientWidth - li.clientWidth) / 2;
        dialer.scrollTo({ left: li.offsetLeft - center, behavior: smooth ? "smooth" : "auto" });

        mobileIndex = 0;
        renderTopic(li.dataset.topic);
    }

    function nearestTopic() {
        const rect = dialer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;

        let best = topics[0];
        let bestDist = Infinity;

        topics.forEach(li => {
            const r = li.getBoundingClientRect();
            const c = r.left + r.width / 2;
            const d = Math.abs(c - centerX);
            if (d < bestDist) {
                bestDist = d;
                best = li;
            }
        });

        return best;
    }

    function renderDesktopCards(key) {
        itemsContainer.innerHTML = "";
        const data = topicData[key] || [];
        const w = itemsContainer.clientWidth;
        const h = itemsContainer.clientHeight;

        const cardW = 280;
        const cardH = 380;

        const cols = w < 980 ? 2 : 3;
        const rows = Math.ceil(data.length / cols);

        const padX = Math.max(14, Math.floor(w * 0.06));
        const padY = 18;

        const usableW = Math.max(1, w - padX * 2);
        const usableH = Math.max(1, h - padY * 2);

        const slotW = usableW / cols;
        const slotH = Math.min(cardH + 24, usableH / Math.max(1, rows));

        const rng = createRNG(hashCode(key));

        data.forEach((item, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);

            const baseX = padX + col * slotW + (slotW - cardW) / 2;
            const baseY = padY + row * slotH + (slotH - cardH) / 2;

            const jitterX = (rng() - 0.5) * Math.min(28, (slotW - cardW) * 0.55);
            const jitterY = (rng() - 0.5) * Math.min(22, (slotH - cardH) * 0.55);

            const x = clamp(baseX + jitterX, 10, w - cardW - 10);
            const y = clamp(baseY + jitterY, 10, h - cardH - 10);

            const rot = ((rng() - 0.5) * 4.6).toFixed(2);
            const tx = ((rng() - 0.5) * 10).toFixed(1);
            const ty = ((rng() - 0.5) * 10).toFixed(1);

            const card = document.createElement("div");
            card.className = "matrix-card";
            card.style.left = `${x}px`;
            card.style.top = `${y}px`;
            card.style.setProperty("--r", `${rot}deg`);
            card.style.setProperty("--tx", `${tx}px`);
            card.style.setProperty("--ty", `${ty}px`);
            card.style.animationDelay = `${(rng() * -5).toFixed(2)}s`;

            card.innerHTML = `
                <div class="card-preview"><i class="fa-solid ${item.icon}"></i></div>
                <div class="card-content">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            `;

            card.onclick = () => showModal(cardModal, item, false);
            itemsContainer.appendChild(card);

            setTimeout(() => card.classList.add("visible"), i * 90 + 30);
        });

        if (navIndex) navIndex.textContent = "";
    }

    let mobileIndex = 0;
    let swipeEl = null;

    function renderMobileCard(key) {
        itemsContainer.innerHTML = "";
        const data = topicData[key] || [];
        const total = Math.max(1, data.length);

        mobileIndex = clamp(mobileIndex, 0, total - 1);
        const item = data[mobileIndex];
        if (!item) return;

        const card = document.createElement("div");
        card.className = "matrix-card visible";
        card.style.left = `50%`;
        card.style.top = `52%`;
        card.style.setProperty("--r", `0deg`);
        card.style.setProperty("--tx", `0px`);
        card.style.setProperty("--ty", `0px`);
        card.style.animation = "none";
        card.style.opacity = "1";

        card.innerHTML = `
            <div class="card-preview"><i class="fa-solid ${item.icon}"></i></div>
            <div class="card-content">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
        `;

        card.classList.add("sweep");
        setTimeout(() => card.classList.remove("sweep"), 650);
        card.onclick = () => showModal(cardModal, item, false);
        itemsContainer.appendChild(card);

        swipeEl = card;
        attachCardSwipe();

        if (navIndex) navIndex.textContent = `${mobileIndex + 1} / ${total}`;

        if (navPrev) navPrev.disabled = mobileIndex === 0;
        if (navNext) navNext.disabled = mobileIndex === total - 1;
    }

    function renderTopic(key) {
        if (isMobile()) renderMobileCard(key);
        else renderDesktopCards(key);
    }

    function shiftMobileCard(dir) {
        const active = dialer.querySelector("li.active");
        const key = active ? active.dataset.topic : (topics[0]?.dataset.topic || "algoritmos");
        const data = topicData[key] || [];
        if (!data.length) return;

        const next = clamp(mobileIndex + dir, 0, data.length - 1);
        if (next === mobileIndex) {
            if (swipeEl) swipeEl.style.transform = "translate3d(-50%, -50%, 0)";
            return;
        }
        mobileIndex = next;
        renderMobileCard(key);
    }

    if (navPrev) navPrev.addEventListener("click", () => shiftMobileCard(-1));
    if (navNext) navNext.addEventListener("click", () => shiftMobileCard(1));

    function attachCardSwipe() {
        if (!swipeEl) return;

        const st = {
            down: false,
            pid: null,
            startX: 0,
            lastX: 0,
            lastT: 0,
            vx: 0,
            dx: 0
        };

        const threshold = 70;
        const maxDrag = 140;

        function setTransform(px) {
            const clamped = clamp(px, -maxDrag, maxDrag);
            const rot = (clamped / maxDrag) * 6;
            swipeEl.style.transform = `translate3d(calc(-50% + ${clamped}px), -50%, 0) rotate(${rot}deg)`;
        }

        function reset() {
            swipeEl.style.transition = "transform 0.18s ease";
            swipeEl.style.transform = "translate3d(-50%, -50%, 0)";
            setTimeout(() => { if (swipeEl) swipeEl.style.transition = ""; }, 190);
        }

        function fling(dir) {
            swipeEl.style.transition = "transform 0.18s ease, opacity 0.18s ease";
            swipeEl.style.opacity = "0";
            const out = dir > 0 ? 240 : -240;
            swipeEl.style.transform = `translate3d(calc(-50% + ${out}px), -50%, 0) rotate(${dir > 0 ? 10 : -10}deg)`;
            container.style.transition = "filter 180ms ease";
            container.style.filter = "brightness(1.05)";
            setTimeout(() => { container.style.filter = ""; }, 200);
            setTimeout(() => {
                shiftMobileCard(dir > 0 ? 1 : -1);
            }, 160);
        }

        swipeEl.addEventListener("pointerdown", (e) => {
            if (!isMobile()) return;
            st.down = true;
            st.pid = e.pointerId;
            st.startX = e.clientX;
            st.lastX = e.clientX;
            st.lastT = performance.now();
            st.vx = 0;
            st.dx = 0;

            swipeEl.setPointerCapture(st.pid);
            swipeEl.style.transition = "";
            e.preventDefault();
        }, { passive: false });

        swipeEl.addEventListener("pointermove", (e) => {
            if (!st.down || e.pointerId !== st.pid) return;

            const x = e.clientX;
            st.dx = x - st.startX;

            const now = performance.now();
            const dt = Math.max(10, now - st.lastT);
            st.vx = ((x - st.lastX) / dt) * 20;

            st.lastX = x;
            st.lastT = now;

            const resisted = st.dx * 0.92;
            setTransform(resisted);

            e.preventDefault();
        }, { passive: false });

        function endSwipe(e) {
            if (!st.down) return;
            st.down = false;
            try { swipeEl.releasePointerCapture(st.pid); } catch (_) { }
            st.pid = null;

            const absDx = Math.abs(st.dx);
            const absV = Math.abs(st.vx);

            if (absDx > threshold || absV > 7) {
                const dir = st.dx < 0 ? 1 : -1;
                fling(dir);
            } else {
                reset();
            }

            e?.preventDefault?.();
        }

        swipeEl.addEventListener("pointerup", endSwipe, { passive: false });
        swipeEl.addEventListener("pointercancel", endSwipe, { passive: false });
    }

    const drag = {
        down: false,
        startX: 0,
        startScroll: 0,
        lastX: 0,
        lastT: 0,
        v: 0,
        raf: 0,
        pointerId: null
    };

    function stopMomentum() {
        if (drag.raf) cancelAnimationFrame(drag.raf);
        drag.raf = 0;
    }

    function momentum() {
        dialer.scrollLeft -= drag.v;
        drag.v *= 0.94;

        if (Math.abs(drag.v) > 0.5) {
            drag.raf = requestAnimationFrame(momentum);
        } else {
            stopMomentum();
            const best = nearestTopic();
            setActive(best, true);
        }
    }

    function onDown(e) {
        if (e.button != null && e.button !== 0) return;
        drag.down = true;
        drag.pointerId = e.pointerId;

        dialer.classList.add("is-dragging");
        dialer.setPointerCapture(drag.pointerId);

        drag.startX = e.clientX;
        drag.startScroll = dialer.scrollLeft;
        drag.lastX = e.clientX;
        drag.lastT = performance.now();
        drag.v = 0;

        stopMomentum();
        e.preventDefault();
    }

    function onMove(e) {
        if (!drag.down || e.pointerId !== drag.pointerId) return;

        const x = e.clientX;
        const dx = x - drag.startX;

        dialer.scrollLeft = drag.startScroll - dx;

        const now = performance.now();
        const dt = Math.max(10, now - drag.lastT);
        const vx = ((x - drag.lastX) / dt) * 20;

        drag.v = clamp(vx, -28, 28);
        drag.lastX = x;
        drag.lastT = now;

        e.preventDefault();
    }

    function onUp(e) {
        if (!drag.down) return;
        drag.down = false;

        dialer.classList.remove("is-dragging");
        try { dialer.releasePointerCapture(drag.pointerId); } catch (_) { }
        drag.pointerId = null;

        if (Math.abs(drag.v) > 0.8) {
            drag.raf = requestAnimationFrame(momentum);
        } else {
            const best = nearestTopic();
            setActive(best, true);
        }

        e.preventDefault();
    }

    dialer.addEventListener("pointerdown", onDown, { passive: false });
    dialer.addEventListener("pointermove", onMove, { passive: false });
    dialer.addEventListener("pointerup", onUp, { passive: false });
    dialer.addEventListener("pointercancel", onUp, { passive: false });

    topics.forEach(li => {
        li.addEventListener("click", () => setActive(li, true));
    });

    function centerInitial() {
        const initial = dialer.querySelector("li.active") || dialer.querySelector('li[data-topic="algoritmos"]') || topics[0];
        if (!initial) return;
        initial.classList.add("active");

        setTimeout(() => {
            const center = (dialer.clientWidth - initial.clientWidth) / 2;
            dialer.scrollLeft = initial.offsetLeft - center;
            renderTopic(initial.dataset.topic);
        }, 80);
    }

    window.addEventListener("resize", () => {
        const active = dialer.querySelector("li.active") || topics[0];
        if (!active) return;
        const center = (dialer.clientWidth - active.clientWidth) / 2;
        dialer.scrollLeft = active.offsetLeft - center;
        renderTopic(active.dataset.topic);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            cardModal.classList.remove("active");
            techModal.classList.remove("active");
        }
        if (isMobile()) {
            if (e.key === "ArrowLeft") shiftMobileCard(-1);
            if (e.key === "ArrowRight") shiftMobileCard(1);
        }
    });

    setupTechStack();
    centerInitial();
})();