const questions = [
    {
        text: "IDENTIFY CURRENT SECTOR STATE:",
        options: ["STABLE", "VOLATILE", "CRITICAL", "UNKNOWN"],
        type: "multi"
    },
    {
        text: "DETERMINE PRIMARY OBJECTIVE:",
        options: ["DATA EXTRACTION", "SYSTEM REPAIR", "VOID EXPLORATION", "TOTAL ERASE"],
        type: "multi"
    },
    {
        text: "ANALYZING NEURAL LOAD. PROCEED WITH CAUTION?",
        options: ["AFFIRMATIVE", "NEGATIVE"],
        type: "multi"
    },
    {
        text: "SELECT YOUR OPERATING FREQUENCY:",
        options: ["HIGH-BAND", "LOW-RES", "DEEP-VOICE", "ULTRASONIC"],
        type: "multi"
    }
];

let currentStep = 0;
let userAnswers = [];

const contentArea = document.getElementById('content-area');
const progressBar = document.getElementById('progressBar');
const timerEl = document.getElementById('timer');

// Timer logic
let startTime = Date.now();
setInterval(() => {
    const elapsed = Date.now() - startTime;
    const h = Math.floor(elapsed / 3600000).toString().padStart(2, '0');
    const m = Math.floor((elapsed % 3600000) / 60000).toString().padStart(2, '0');
    const s = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
    timerEl.innerText = `${h}:${m}:${s}`;
}, 1000);

document.getElementById('startBtn').addEventListener('click', startSession);

function startSession() {
    currentStep = 0;
    renderQuestion();
}

function renderQuestion() {
    if (currentStep >= questions.length) {
        showResults();
        return;
    }

    const q = questions[currentStep];
    const progress = (currentStep / questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    contentArea.innerHTML = `
        <div class="question-container">
            <h2 class="question-text">${q.text}</h2>
            <div class="options-grid">
                ${q.options.map((opt, i) => `
                    <button class="option-btn" onclick="handleAnswer('${opt}')">
                        <span class="opt-num">[0${i + 1}]</span> ${opt}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

window.handleAnswer = (answer) => {
    userAnswers.push(answer);
    currentStep++;
    
    // Add a small "processing" delay
    contentArea.innerHTML = `<div class="typewriter">PROCESSING DATA...</div>`;
    
    setTimeout(renderQuestion, 600);
};

function showResults() {
    progressBar.style.width = `100%`;
    contentArea.innerHTML = `
        <div class="result-screen">
            <h1 class="glitch" data-text="SESSION COMPLETE">SESSION COMPLETE</h1>
            <p>NEURAL SYNC ACHIEVED. ANALYZING RANK...</p>
            <div class="rank-badge">ELITE-X</div>
            <p>Summary of sequence: ${userAnswers.join(' > ')}</p>
            <button class="gaming-btn" style="margin-top: 30px" onclick="location.reload()">RE-INITIALIZE</button>
        </div>
        
        <div id="thankYouOverlay" class="thank-you-overlay hidden">
            <div class="thank-you-content">
                <h2 class="cyan-glow">THANKS FOR PARTICIPATING</h2>
                <p>Data successfully transmitted to AMD project: amd-first-494006.</p>
                <div class="separator"></div>
                <button class="gaming-btn small" onclick="document.getElementById('thankYouOverlay').classList.add('hidden')">CLOSE</button>
            </div>
        </div>
    `;

    // Show thank you note with a slight delay
    setTimeout(() => {
        const overlay = document.getElementById('thankYouOverlay');
        if (overlay) overlay.classList.remove('hidden');
    }, 2000);
}
