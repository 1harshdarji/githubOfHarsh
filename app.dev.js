// DATA - FROM YOUR APP.TSX
        const projects = [
            { name: "Autonomous Sensor Fusion Pipeline", image: "assets/12.png", tags: ["C++", "Embedded Systems", "Real-Time OS"], url: "https://github.com" },
            { name: "Supply Chain Optimizer",  tags: ["Python", "Data Science", "AWS"], url: "https://github.com" },
            { name: "Cloud-Native Microservices",  tags: ["Docker", "Kubernetes", "Node.js"], url: "https://github.com" },
            { name: "Financial Modeling Engine",  tags: ["Python", "TensorFlow", "APIs"], url: "https://github.com" },
            { name: "IoT Dashboard", tags: ["React", "MQTT", "TimescaleDB"], url: "https://github.com" },
            { name: "AI Chat Application", tags: ["TypeScript", "OpenAI", "WebSockets"], url: "https://github.com" }
        ];

        // INJECT PROJECTS
        const grid = document.getElementById('projectGrid');
        projects.forEach(p => {
            const card = document.createElement('a');
            card.href = p.url;
            card.className = 'card';
            card.target = '_blank';
            card.innerHTML = `
                <h3 class="card-title">${p.name}</h3>
                <div class="card-image">
                    <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/400x200?text=Image+Missing'">
                </div>
                <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
            `;
            grid.appendChild(card);
        });

        document.getElementById('year').innerText = new Date().getFullYear();

        // ANIMATION LOGIC 
        const canvas = document.getElementById('starCanvas');
        const ctx = canvas.getContext('2d');
        let stars = [];
        let shootingStars = [];

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function initStars() {
            stars = [];
            for (let i = 0; i < 500; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1.8 + 0.3,
                    opacity: Math.random() * 0.6 + 0.1,
                    speed: Math.random() * 0.3 + 0.05
                });
            }
        }
        function spawnShootingStar() {
            const edge = Math.floor(Math.random() * 3);
            let x, y, angle;
            if (edge === 0) { x = Math.random() * canvas.width; y = -10; angle = Math.PI * 0.25 + Math.random() * Math.PI * 0.5; }
            else if (edge === 1) { x = -10; y = Math.random() * canvas.height * 0.5; angle = Math.random() * Math.PI * 0.4 + 0.1; }
            else { x = canvas.width + 10; y = Math.random() * canvas.height * 0.5; angle = Math.PI - Math.random() * Math.PI * 0.4 - 0.1; }
            
            shootingStars.push({ 
                x, y, angle, 
                speed: 12 + Math.random() * 8, 
                size: 1.5 + Math.random(), 
                life: 0, 
                maxLife: 100 + Math.random() * 40, 
                tailLength: 30 + Math.random() * 20 
            });
        }
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw regular stars
            stars.forEach(s => {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
                ctx.fill();
                s.y -= s.speed;
                if (s.y < -5) { s.y = canvas.height + 5; s.x = Math.random() * canvas.width; }
            });

            // Draw shooting stars
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const ss = shootingStars[i];
                ss.x += Math.cos(ss.angle) * ss.speed;
                ss.y += Math.sin(ss.angle) * ss.speed;
                ss.life++;
                
                const progress = ss.life / ss.maxLife;
                const alpha = progress < 0.1 ? progress * 10 : progress > 0.7 ? (1 - progress) / 0.3 : 1;
                
                const tailX = ss.x - Math.cos(ss.angle) * ss.tailLength;
                const tailY = ss.y - Math.sin(ss.angle) * ss.tailLength;
                
                const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
                grad.addColorStop(0, `rgba(255,255,255,0)`);
                grad.addColorStop(1, `rgba(255,255,255,${alpha * 0.8})`);
                
                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(ss.x, ss.y);
                ctx.strokeStyle = grad;
                ctx.lineWidth = ss.size;
                ctx.stroke();

                if (ss.life >= ss.maxLife) shootingStars.splice(i, 1);
            }
            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', () => { resize(); initStars(); });
        window.addEventListener("load", () => {
            resize();
            initStars();
            draw();
            setInterval(spawnShootingStar, 10000);
            setTimeout(spawnShootingStar, 2000);
        });