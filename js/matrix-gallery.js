(() => {
    const topicData = {
        algoritmos: [
            {
                title: "Busca Binária & Ordenação",
                icon: "fa-arrow-down-a-z",
                desc: "Reduza o problema pela metade.",
                details: "Se o enunciado pede 'o menor valor que satisfaz uma condição', pense em busca binária. Ordenar antes de resolver pode transformar força bruta em solução eficiente."
            },
            {
                title: "Recursão & Backtracking",
                icon: "fa-infinity",
                desc: "Explore todas as possibilidades… com controle.",
                details: "Use quando o problema pede gerar combinações, caminhos ou arranjos. Sempre defina bem o caso base e corte caminhos impossíveis cedo."
            },
            {
                title: "Programação Dinâmica",
                icon: "fa-bolt",
                desc: "Evite recalcular o que já sabe.",
                details: "Se o problema tem subproblemas repetidos, guarde resultados. Pense em 'estado' e 'transição'. Muitos problemas de máximo, mínimo ou contagem usam PD."
            }
        ],

        dados: [
            {
                title: "Pilhas, Filas e Deques",
                icon: "fa-layer-group",
                desc: "Estruturas simples resolvem muito.",
                details: "Pilha resolve parênteses e DFS. Fila é base do BFS. Deque é ótimo para sliding window e filas monotônicas."
            },
            {
                title: "Árvores e Heap",
                icon: "fa-network-wired",
                desc: "Acesso rápido ao menor ou maior.",
                details: "Priority queue mantém sempre o menor elemento disponível. Essencial para algoritmos como Dijkstra ou para problemas de ordenação dinâmica."
            },
            {
                title: "Grafos",
                icon: "fa-circle-nodes",
                desc: "Problemas de conexão quase sempre são grafos.",
                details: "BFS encontra menor caminho em grafos sem peso. DFS detecta ciclos e componentes. Com pesos positivos, Dijkstra resolve caminhos mínimos."
            }
        ],

        sql: [
            {
                title: "Modelagem Relacional",
                icon: "fa-database",
                desc: "Dados bem organizados facilitam queries.",
                details: "Separe entidades corretamente e evite duplicação. Chaves primárias e estrangeiras ajudam a manter consistência."
            },
            {
                title: "JOINs",
                icon: "fa-magnifying-glass-chart",
                desc: "Conecte tabelas para extrair informação.",
                details: "INNER JOIN cruza registros relacionados. LEFT JOIN mantém registros mesmo sem correspondência. Muitas queries de competição dependem de combinar tabelas."
            },
            {
                title: "Índices",
                icon: "fa-gauge-high",
                desc: "Aceleradores do banco de dados.",
                details: "Índices tornam buscas muito mais rápidas. Sem eles, o banco precisa percorrer toda a tabela."
            }
        ],

        arquitetura: [
            {
                title: "Arquitetura Limpa",
                icon: "fa-soap",
                desc: "Separe responsabilidades.",
                details: "Código organizado em camadas facilita manutenção. Mesmo em projetos pequenos, funções bem separadas ajudam a evitar bugs."
            },
            {
                title: "Microserviços",
                icon: "fa-cubes",
                desc: "Divida sistemas grandes.",
                details: "Cada serviço resolve um problema específico. Isso facilita escalar partes do sistema sem afetar o todo."
            },
            {
                title: "Padrões de Projeto",
                icon: "fa-chess-board",
                desc: "Soluções reutilizáveis.",
                details: "Padrões ajudam a resolver problemas comuns de design de software. Usar uma estrutura conhecida evita reinventar soluções."
            }
        ],

        "eng-software": [
            {
                title: "Métodos Ágeis",
                icon: "fa-people-group",
                desc: "Entregas rápidas e iterativas.",
                details: "Divida o trabalho em pequenas etapas e ajuste o plano conforme aprende mais sobre o problema."
            },
            {
                title: "Controle de Versão",
                icon: "fa-code-branch",
                desc: "Histórico do projeto.",
                details: "Git permite trabalhar em equipe sem perder mudanças. Branches e commits organizados evitam confusão."
            },
            {
                title: "Gestão de Requisitos",
                icon: "fa-list-check",
                desc: "Entenda o problema antes de codar.",
                details: "Definir claramente o que precisa ser feito evita retrabalho e soluções erradas."
            }
        ],

        qualidade: [
            {
                title: "Testes",
                icon: "fa-vial",
                desc: "Confirme que funciona.",
                details: "Teste casos extremos: entradas vazias, valores máximos, dados repetidos e limites do problema."
            },
            {
                title: "Code Review",
                icon: "fa-glasses",
                desc: "Outra pessoa vê novos erros.",
                details: "Revisar código ajuda a encontrar bugs lógicos e melhorar clareza."
            },
            {
                title: "Integração Contínua",
                icon: "fa-robot",
                desc: "Automatize verificações.",
                details: "Ferramentas podem rodar testes automaticamente a cada mudança no código."
            }
        ],

        devops: [
            {
                title: "Containerização",
                icon: "fa-box-open",
                desc: "O mesmo ambiente em qualquer máquina.",
                details: "Containers garantem que o código rode da mesma forma em desenvolvimento e produção."
            },
            {
                title: "Orquestração",
                icon: "fa-ship",
                desc: "Gerencie muitos serviços.",
                details: "Ferramentas de orquestração distribuem carga e reiniciam serviços que falham."
            },
            {
                title: "Monitoramento",
                icon: "fa-chart-line",
                desc: "Saiba o que está acontecendo.",
                details: "Logs e métricas ajudam a detectar problemas antes que afetem usuários."
            }
        ],

        uiux: [
            {
                title: "Design de Interfaces",
                icon: "fa-pen-nib",
                desc: "Interfaces claras ajudam o usuário.",
                details: "Layouts consistentes e componentes reutilizáveis tornam aplicações mais fáceis de usar."
            },
            {
                title: "Acessibilidade",
                icon: "fa-universal-access",
                desc: "Tecnologia para todos.",
                details: "Boa acessibilidade inclui contraste adequado, navegação por teclado e textos alternativos."
            },
            {
                title: "Usabilidade",
                icon: "fa-check-double",
                desc: "Menos fricção para o usuário.",
                details: "Interfaces devem comunicar claramente o que está acontecendo e como agir."
            }
        ],

        debugging: [
            {
                title: "Stack Trace",
                icon: "fa-bug",
                desc: "Siga o rastro do erro.",
                details: "A pilha de chamadas mostra onde o erro ocorreu e qual caminho levou até ele."
            },
            {
                title: "Breakpoints",
                icon: "fa-pause",
                desc: "Pare o programa e investigue.",
                details: "Executar passo a passo ajuda a descobrir exatamente onde algo sai do esperado."
            },
            {
                title: "Rubber Duck Debugging",
                icon: "fa-duck",
                desc: "Explique o problema em voz alta.",
                details: "Ao explicar o código linha por linha, inconsistências ficam mais evidentes."
            }
        ],

        seguranca: [
            {
                title: "OWASP Top 10",
                icon: "fa-shield-halved",
                desc: "Principais falhas de segurança.",
                details: "Ataques como SQL Injection e XSS exploram entradas mal validadas. Sempre valide e escape dados."
            },
            {
                title: "Criptografia",
                icon: "fa-key",
                desc: "Proteja informações sensíveis.",
                details: "Use algoritmos seguros para armazenar senhas e proteger dados em trânsito."
            },
            {
                title: "Autenticação",
                icon: "fa-id-card",
                desc: "Controle de acesso.",
                details: "Identifique usuários com segurança e verifique permissões antes de permitir ações."
            }
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