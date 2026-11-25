/**
 * ====================================================================
 * DEEPAK PRASAD VERMA — CYBERPUNK TERMINAL PORTFOLIO JAVASCRIPT
 * Full interactive system: Matrix Rain, 3D Canvas, Circuit switcher,
 * Superposition collapse engine, and interactive bash terminal.
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==================================================================
  // 1. MATRIX RAIN EFFECT
  // ==================================================================
  const matrixCanvas = document.getElementById('matrix-canvas');
  if (matrixCanvas) {
    const ctx = matrixCanvas.getContext('2d');
    let width = matrixCanvas.width = window.innerWidth;
    let height = matrixCanvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンDEEPAKVERMA{}[]<>/*+=~#$_';
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1);

    window.addEventListener('resize', () => {
      width = matrixCanvas.width = window.innerWidth;
      height = matrixCanvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    });

    function drawMatrix() {
      ctx.fillStyle = 'rgba(2, 5, 2, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00ff66';
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Randomly highlight head character with bright green / white
        if (Math.random() > 0.88) {
          ctx.fillStyle = '#ffffff';
        } else {
          ctx.fillStyle = '#00ff41';
        }
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(drawMatrix, 40);
  }

  // ==================================================================
  // 2. 3D SYSTEM CORE / COMPUTATIONAL SPHERE CANVAS
  // ==================================================================
  const sphereCanvas = document.getElementById('core-sphere-canvas');
  const thetaSlider = document.getElementById('theta-slider');
  const phiSlider = document.getElementById('phi-slider');
  const thetaVal = document.getElementById('theta-val');
  const phiVal = document.getElementById('phi-val');
  const coordReadout = document.getElementById('coord-readout');
  const stateEq = document.getElementById('state-equation');
  const sphereStateLabel = document.getElementById('sphere-state-label');
  const probBackendVal = document.getElementById('prob-backend-val');
  const probBackendFill = document.getElementById('prob-backend-fill');
  const probFrontendVal = document.getElementById('prob-frontend-val');
  const probFrontendFill = document.getElementById('prob-frontend-fill');
  const telemetryLog = document.getElementById('telemetry-log');

  let theta = 45; // Polar angle in degrees (0 to 180)
  let phi = 90;   // Azimuth angle in degrees (0 to 360)
  let animRotation = 0;

  function updateTelemetry(gateName = null) {
    if (thetaVal) thetaVal.textContent = `${Math.round(theta)}°`;
    if (phiVal) phiVal.textContent = `${Math.round(phi)}°`;
    if (coordReadout) coordReadout.textContent = `θ: ${Math.round(theta)}.0° • φ: ${Math.round(phi)}.0° • R: 1.0`;

    // Probability amplitudes
    const thetaRad = (theta * Math.PI) / 180;
    const prob0 = Math.pow(Math.cos(thetaRad / 2), 2);
    const prob1 = Math.pow(Math.sin(thetaRad / 2), 2);

    const amp0 = Math.cos(thetaRad / 2).toFixed(3);
    const amp1 = Math.sin(thetaRad / 2).toFixed(3);

    if (stateEq) {
      stateEq.textContent = `|ψ⟩ = ${amp0}|Backend⟩ + ${amp1}|Frontend⟩`;
    }

    const p0Pct = (prob0 * 100).toFixed(2);
    const p1Pct = (prob1 * 100).toFixed(2);

    if (probBackendVal) probBackendVal.textContent = `${p0Pct}%`;
    if (probBackendFill) probBackendFill.style.width = `${p0Pct}%`;
    if (probFrontendVal) probFrontendVal.textContent = `${p1Pct}%`;
    if (probFrontendFill) probFrontendFill.style.width = `${p1Pct}%`;

    if (sphereStateLabel) {
      if (prob0 > 0.8) sphereStateLabel.textContent = 'STATE: |BACKEND_DOMINANT⟩';
      else if (prob1 > 0.8) sphereStateLabel.textContent = 'STATE: |FRONTEND_DOMINANT⟩';
      else sphereStateLabel.textContent = 'STATE: |BALANCED_SUPERPOSITION⟩';
    }

    if (gateName && telemetryLog) {
      const timeStr = new Date().toTimeString().split(' ')[0];
      const entry = document.createElement('div');
      entry.className = 'log-entry active';
      entry.innerHTML = `<span class="log-time">[${timeStr}]</span> GATE_${gateName}: Vector shifted to θ=${Math.round(theta)}°, φ=${Math.round(phi)}°`;
      telemetryLog.prepend(entry);

      while (telemetryLog.children.length > 5) {
        telemetryLog.removeChild(telemetryLog.lastChild);
      }
    }
  }

  if (sphereCanvas) {
    const sCtx = sphereCanvas.getContext('2d');

    function renderSphere() {
      sCtx.clearRect(0, 0, sphereCanvas.width, sphereCanvas.height);
      const cx = sphereCanvas.width / 2;
      const cy = sphereCanvas.height / 2;
      const radius = 90;

      animRotation += 0.005;

      // Draw Outer Sphere Ring
      sCtx.strokeStyle = 'rgba(0, 255, 102, 0.25)';
      sCtx.lineWidth = 1.5;
      sCtx.beginPath();
      sCtx.arc(cx, cy, radius, 0, Math.PI * 2);
      sCtx.stroke();

      // Equator Ellipse
      sCtx.strokeStyle = 'rgba(0, 255, 102, 0.15)';
      sCtx.lineWidth = 1;
      sCtx.beginPath();
      sCtx.ellipse(cx, cy, radius, radius * 0.35, 0, 0, Math.PI * 2);
      sCtx.stroke();

      // Latitude Rings
      sCtx.beginPath();
      sCtx.ellipse(cx, cy - radius * 0.5, radius * 0.86, radius * 0.2, 0, 0, Math.PI * 2);
      sCtx.stroke();

      sCtx.beginPath();
      sCtx.ellipse(cx, cy + radius * 0.5, radius * 0.86, radius * 0.2, 0, 0, Math.PI * 2);
      sCtx.stroke();

      // Vertical Coordinate Axes
      sCtx.strokeStyle = 'rgba(0, 255, 102, 0.4)';
      sCtx.setLineDash([4, 4]);
      sCtx.beginPath();
      sCtx.moveTo(cx, cy - radius - 15);
      sCtx.lineTo(cx, cy + radius + 15);
      sCtx.stroke();
      sCtx.setLineDash([]);

      // Axis Labels
      sCtx.fillStyle = '#00ff66';
      sCtx.font = "10px 'Share Tech Mono', monospace";
      sCtx.fillText('|Backend⟩', cx - 25, cy - radius - 20);
      sCtx.fillText('|Frontend⟩', cx - 26, cy + radius + 25);

      // State Vector Line (from center to surface)
      const tRad = (theta * Math.PI) / 180;
      const pRad = ((phi + animRotation * 57.3) * Math.PI) / 180;

      const vx = radius * Math.sin(tRad) * Math.cos(pRad);
      const vy = -radius * Math.cos(tRad); // Upwards is negative Y
      const vz = radius * Math.sin(tRad) * Math.sin(pRad);

      // 3D projection onto 2D canvas
      const targetX = cx + vx;
      const targetY = cy + vy + vz * 0.2;

      // Glow line
      sCtx.strokeStyle = '#39ff14';
      sCtx.shadowColor = '#00ff66';
      sCtx.shadowBlur = 10;
      sCtx.lineWidth = 2.5;
      sCtx.beginPath();
      sCtx.moveTo(cx, cy);
      sCtx.lineTo(targetX, targetY);
      sCtx.stroke();
      sCtx.shadowBlur = 0; // reset

      // Tip Dot
      sCtx.fillStyle = '#ffffff';
      sCtx.beginPath();
      sCtx.arc(targetX, targetY, 4, 0, Math.PI * 2);
      sCtx.fill();

      requestAnimationFrame(renderSphere);
    }

    renderSphere();

    // Slider Listeners
    if (thetaSlider) {
      thetaSlider.addEventListener('input', (e) => {
        theta = parseFloat(e.target.value);
        updateTelemetry();
      });
    }

    if (phiSlider) {
      phiSlider.addEventListener('input', (e) => {
        phi = parseFloat(e.target.value);
        updateTelemetry();
      });
    }

    // Gate Buttons
    const gateButtons = document.querySelectorAll('.gate-btn');
    gateButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const gate = btn.getAttribute('data-gate');
        switch (gate) {
          case 'H': // Hadamard: 50/50 superposition
            theta = 90;
            phi = 0;
            break;
          case 'X': // Pauli-X: Invert |0> and |1>
            theta = 180 - theta;
            phi = (phi + 180) % 360;
            break;
          case 'Y': // Pauli-Y
            theta = 180 - theta;
            phi = (phi + 90) % 360;
            break;
          case 'Z': // Pauli-Z
            phi = (phi + 180) % 360;
            break;
          case 'S': // Phase S
            phi = (phi + 90) % 360;
            break;
          case 'T': // Phase T (pi/4)
            phi = (phi + 45) % 360;
            break;
          case 'RESET':
            theta = 45;
            phi = 90;
            break;
        }

        if (thetaSlider) thetaSlider.value = theta;
        if (phiSlider) phiSlider.value = phi;
        updateTelemetry(gate);
      });
    });
  }

  // ==================================================================
  // 3. INTERACTIVE CAREER CIRCUIT GATE SWITCHER
  // ==================================================================
  const circuitRolesData = {
    'gate-swe': {
      title: 'INSPECTION // ROLE: FULL_STACK_ENGINEER',
      role: 'Full Stack Software Engineer • Enterprise Apps',
      period: '2022 — Present',
      org: 'Enterprise Tech / Scalable Web Solutions',
      loc: 'India',
      desc: 'Architecting and deploying resilient, scalable web services and reactive user interfaces. Designing microservices, reducing end-to-end response latency by 35% through query caching, and managing high-availability production cloud workloads.',
      achievements: [
        'Engineered responsive single-page applications and interactive portals using React.js and modern TypeScript.',
        'Developed robust backend services with Node.js, Express, and RESTful API endpoints.',
        'Integrated PostgreSQL and MongoDB clusters with automated backup and connection pooling.',
        'Automated CI/CD release cycles with Docker, lowering release turnaround by 40%.'
      ],
      skills: ['React.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'RESTful APIs']
    },
    'gate-backend': {
      title: 'INSPECTION // ROLE: BACKEND_ARCHITECTURE_LEAD',
      role: 'Backend & Systems Engineer • Distributed Services',
      period: '2021 — 2023',
      org: 'Cloud Engineering & Microservices Hub',
      loc: 'India',
      desc: 'Focused on low-latency data ingestion pipelines, event-driven streaming, caching architectures (Redis), and secure authentication gateways utilizing OAuth 2.0 and JWT.',
      achievements: [
        'Constructed high-throughput message processing queues handling over 50,000 events/minute.',
        'Implemented database indexing strategies and query profiling, cutting P99 latency in half.',
        'Designed zero-trust authorization middleware and OWASP-compliant security filters.',
        'Authored comprehensive API documentation and OpenAPI/Swagger specifications.'
      ],
      skills: ['Python', 'Node.js', 'Redis', 'MongoDB', 'Microservices', 'System Design']
    },
    'gate-cloud': {
      title: 'INSPECTION // ROLE: CLOUD_AND_AUTOMATION',
      role: 'DevOps & Cloud Automation Specialist',
      period: '2022 — Ongoing',
      org: 'Infrastructure & Container Systems',
      loc: 'Remote / India',
      desc: 'Spearheading infrastructure-as-code automation, container orchestrations, and automated deployment pipelines across cloud infrastructure.',
      achievements: [
        'Containerized multi-tier applications using Docker and Docker Compose for reproducible builds.',
        'Configured GitHub Actions automated testing, linting, and vulnerability scanning workflows.',
        'Managed cloud storage, reverse proxies (Nginx), and SSL/TLS automation via Certbot.',
        'Established logging and monitoring telemetry with Prometheus and Grafana dashboards.'
      ],
      skills: ['Docker', 'Linux/Bash', 'GitHub Actions', 'AWS/Cloud', 'Nginx', 'CI/CD']
    },
    'gate-edu': {
      title: 'INSPECTION // ROLE: ACADEMIC_FOUNDATION',
      role: 'Bachelor of Technology (B.Tech) • Computer Science & Eng.',
      period: 'Graduated with Honors',
      org: 'Premier Technical University / Engineering College',
      loc: 'India',
      desc: 'Comprehensive academic rigor in theoretical computer science, advanced data structures, discrete mathematics, database design, and operating systems.',
      achievements: [
        'Deep mastery of Data Structures & Algorithms (Trees, Graphs, DP, Sorting, Searching).',
        'Led student engineering projects and technical hackathons in full-stack web development.',
        'Published coursework on distributed computing models and algorithm optimization.',
        'Active mentor for junior student developers in competitive programming and web technologies.'
      ],
      skills: ['Data Structures', 'Algorithms', 'C/C++', 'Database Management', 'Computer Networks']
    }
  };

  const gateNodes = document.querySelectorAll('.gate-node');
  const circuitDetailTitle = document.getElementById('circuit-detail-title');
  const detailRole = document.getElementById('detail-role');
  const detailPeriod = document.getElementById('detail-period');
  const detailOrg = document.getElementById('detail-org');
  const detailDesc = document.getElementById('detail-desc');
  const detailList = document.getElementById('detail-list');
  const detailSkills = document.getElementById('detail-skills');

  gateNodes.forEach(node => {
    node.addEventListener('click', () => {
      gateNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const gateId = node.getAttribute('data-gate-id');
      const data = circuitRolesData[gateId];
      if (!data) return;

      if (circuitDetailTitle) circuitDetailTitle.textContent = data.title;
      if (detailRole) detailRole.textContent = data.role;
      if (detailPeriod) detailPeriod.textContent = data.period;
      if (detailOrg) {
        detailOrg.innerHTML = `<span class="org-icon">🏢</span> <span class="org-name">${data.org}</span> <span class="org-loc">• ${data.loc}</span>`;
      }
      if (detailDesc) detailDesc.textContent = data.desc;

      if (detailList) {
        detailList.innerHTML = data.achievements.map(a => `<li>${a}</li>`).join('');
      }

      if (detailSkills) {
        detailSkills.innerHTML = data.skills.map(s => `<span class="hacker-pill">${s}</span>`).join('');
      }
    });
  });

  // ==================================================================
  // 4. SUPERPOSITION WAVEFUNCTION MEASURE ENGINE
  // ==================================================================
  const measureBtn = document.getElementById('measure-btn');
  const measureOutput = document.getElementById('measure-output');
  const roleCards = document.querySelectorAll('.role-card');

  const states = [
    { id: 'card-architect', name: '|System & Solution Architect⟩', eigenvalue: '+1.00', phase: '45°' },
    { id: 'card-builder', name: '|Full Stack Web Engineer⟩', eigenvalue: '+1.00', phase: '90°' },
    { id: 'card-mentor', name: '|Technical Mentor & Collaborator⟩', eigenvalue: '+1.00', phase: '180°' },
    { id: 'card-innovator', name: '|Continuous Explorer & Builder⟩', eigenvalue: '+1.00', phase: '270°' }
  ];

  if (measureBtn && measureOutput) {
    measureBtn.addEventListener('click', () => {
      measureOutput.textContent = 'Measuring wavefunction... |ψ⟩ collapsing through projection operator...';
      measureBtn.disabled = true;

      roleCards.forEach(c => c.classList.remove('collapsed-active'));

      setTimeout(() => {
        const choice = states[Math.floor(Math.random() * states.length)];
        measureOutput.innerHTML = `[COLLAPSE_SUCCESS] Eigenstate: <strong style="color:#00ff66;">${choice.name}</strong> (Eigenvalue: ${choice.eigenvalue}, Phase: ${choice.phase})`;

        const card = document.getElementById(choice.id);
        if (card) {
          card.classList.add('collapsed-active');
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        measureBtn.disabled = false;
      }, 700);
    });
  }

  // ==================================================================
  // 5. INTERACTIVE DEVELOPER TERMINAL CONSOLE
  // ==================================================================
  const consoleForm = document.getElementById('console-form');
  const consoleInput = document.getElementById('console-input');
  const consoleOutput = document.getElementById('console-output');
  const cmdChips = document.querySelectorAll('.cmd-chip');

  const cmdHistory = [];
  let historyIndex = -1;

  const terminalCommands = {
    help: () => `
AVAILABLE SYSTEM COMMANDS:
  help       - Print this command directory
  bio        - Display Deepak Prasad Verma's professional summary
  skills     - Display verified tech stack and skills matrix
  circuit    - Inspect career trajectory and engineering milestones
  projects   - Output featured engineering projects & repositories
  linkedin   - Open Deepak's LinkedIn profile [deepak-prasad-verma-872947250]
  contact    - Print communications uplink channels
  matrix     - Toggle matrix stream status
  whoami     - Print current virtual session credentials
  date       - Output current system timestamp
  clear      - Clear the console screen
`,
    bio: () => `
[IDENTITY // DEEPAK PRASAD VERMA]
  Role:       Full Stack Software Engineer & Solution Architect
  Location:   India
  Focus:      Scalable Web Applications, APIs, Cloud DevOps, System Design
  Status:     Available for technical challenges and engineering roles.
`,
    skills: () => `
[CORE_COMPETENCIES_TELEMETRY]
  • Languages:      JavaScript (ES6+), TypeScript, Python, C++, HTML5/CSS3, SQL
  • Frontend:       React.js, Next.js, Redux, Tailwind CSS, Responsive UI/UX
  • Backend:        Node.js, Express, REST APIs, GraphQL, Microservices
  • Databases:      PostgreSQL, MongoDB, MySQL, Redis
  • DevOps & Tools: Docker, Git/GitHub, Linux CLI, Nginx, CI/CD Pipelines
  • Core CS:        Data Structures, Algorithms, System Architecture, Web Security
`,
    circuit: () => `
[CAREER_CIRCUIT_REGISTERS]
  [Z] SWE:       Full Stack Software Engineer (2022 - Present)
  [X] API:       Backend & Systems Architecture
  [H] OPS:       DevOps, Cloud Automation & Docker CI/CD
  [M] DEG:       B.Tech in Computer Science & Engineering
`,
    projects: () => `
[FEATURED_PROJECTS_REGISTER]
  1. Nexus Distributed API Gateway   [Node.js, Express, Redis, Docker]
  2. Pulse Telemetry & Analytics     [React, TypeScript, Socket.io, Postgres]
  3. CloudOps CI/CD Automation Suite [Python, Bash, GitHub Actions, Docker]
  4. Aegis Zero-Knowledge Vault      [JavaScript, WebCrypto API, MongoDB]
`,
    linkedin: () => {
      window.open('https://www.linkedin.com/in/deepak-prasad-verma-872947250', '_blank');
      return `[UPLINK_DISPATCHED] Redirecting to LinkedIn profile: deepak-prasad-verma-872947250...`;
    },
    contact: () => `
[COMMUNICATION_UPLINKS]
  • LinkedIn:  https://www.linkedin.com/in/deepak-prasad-verma-872947250
  • GitHub:    https://github.com
  • Email:     deepakprasadverma90@gmail.com
  • Terminal:  Type 'dispatch' or use the Contact Form below.
`,
    matrix: () => `[MATRIX_STREAM] Particle stream running nominal at 40 FPS.`,
    whoami: () => `guest@quantum-node [PRIVILEGES: READ_EXECUTE]`,
    date: () => `SYSTEM_TIME: ${new Date().toUTCString()}`,
    sudo: () => `[PERMISSION_DENIED] guest is not in the sudoers file. This incident will be reported to Deepak.`,
    clear: () => {
      if (consoleOutput) consoleOutput.innerHTML = '';
      return null;
    }
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    cmdHistory.push(cmd);
    historyIndex = cmdHistory.length;

    // Append Command Echo
    appendOutput(`deepak@root:~$ ${rawCmd}`, 'term-cmd-echo');

    if (terminalCommands[cmd]) {
      const output = terminalCommands[cmd]();
      if (output) {
        appendOutput(output, 'term-line');
      }
    } else {
      appendOutput(`bash: command not found: '${cmd}'. Type 'help' to inspect valid commands.`, 'info-line');
    }

    if (consoleOutput) {
      consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }
  }

  function appendOutput(text, className = 'term-line') {
    if (!consoleOutput) return;
    const line = document.createElement('div');
    line.className = className;
    line.textContent = text;
    consoleOutput.appendChild(line);
  }

  if (consoleForm && consoleInput) {
    consoleForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = consoleInput.value;
      executeCommand(val);
      consoleInput.value = '';
    });

    // History navigation with arrow keys
    consoleInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        if (historyIndex > 0) {
          historyIndex--;
          consoleInput.value = cmdHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIndex < cmdHistory.length - 1) {
          historyIndex++;
          consoleInput.value = cmdHistory[historyIndex];
        } else {
          historyIndex = cmdHistory.length;
          consoleInput.value = '';
        }
      }
    });
  }

  // Clickable Chips
  cmdChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (consoleInput) consoleInput.value = cmd;
      executeCommand(cmd);
      if (consoleInput) consoleInput.value = '';
    });
  });

  // ==================================================================
  // 6. CONTACT DISPATCH FORM
  // ==================================================================
  const contactForm = document.getElementById('contact-form');
  const dispatchStatus = document.getElementById('dispatch-status');

  if (contactForm && dispatchStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;

      dispatchStatus.style.color = '#39ff14';
      dispatchStatus.textContent = 'Encrypting & dispatching telemetry payload...';

      setTimeout(() => {
        dispatchStatus.textContent = `[SUCCESS] Transmission acknowledged from ${name} <${email}>. Deepak will reply shortly!`;
        contactForm.reset();
      }, 1000);
    });
  }

  // ==================================================================
  // 7. ACTIVE NAVIGATION & MOBILE TOGGLE
  // ==================================================================
  const navToggleBtn = document.getElementById('nav-toggle-btn');
  const navLinksContainer = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggleBtn && navLinksContainer) {
    navToggleBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('mobile-open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('mobile-open');
      });
    });
  }

  // Active link scroll spy
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-target') === current) {
        link.classList.add('active');
      }
    });
  });

});
