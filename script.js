// Project data sourced from Tyrone Tabornal CV
const projectsData = [
    {
        id: 1,
        title: "RUFBAC Tour Services",
        description: "Firebase-backed concierge that lets travelers book island tours, rentals, and shuttles in one frictionless React/Vite flow.",
        image: "images/RufbacTourServices.png",
        tags: ["React", "TypeScript", "Firebase", "Tailwind"],
        url: "https://rufbac-test.netlify.app/"
    },
    {
        id: 2,
        title: "KapwaNow",
        description: "Full-stack disaster response platform connecting requests, volunteers, and hazards on a live Next.js + Google Maps command map.",
        image: "images/KapwaNow.png",
        tags: ["Next.js", "Firebase", "GCP", "Maps API"],
        url: "https://kapwanow.netlify.app/"
    },
    {
        id: 3,
        title: "Pixelstash",
        description: "Curated pixel-art shelf powered by Contentful where indie artists filter vetted packs, pop open modals, and jump to creators.",
        image: "images/PixelStash.png",
        tags: ["Next.js", "Contentful", "Sass", "Netlify"],
        url: "https://pixelstash.netlify.app/"
    },
    {
        id: 4,
        title: "Waza82",
        description: "Interactive encyclopedia of all 82 sumo moves with animated replays, rarity filters, quizzes, and an editor-friendly admin mode.",
        image: "images/Waza82.png",
        tags: ["React", "TypeScript", "Vite", "Tailwind"],
        url: "https://waza82.dev"
    },
    {
        id: 5,
        title: "AgriSahayak",
        description: "AI-powered, multilingual weather advisor delivering WhatsApp chatbot tips and risk maps to help farmers prevent drought losses.",
        image: "images/AgriSahayak.png",
        tags: ["AI", "WhatsApp API", "React Native", "TensorFlow Lite"],
        url: ""
    },
    {
        id: 6,
        title: "StructSure",
        description: "Hybrid human-AI building safety assessment suite with Flutter field capture plus LGU dashboards for real-time damage triage.",
        image: "images/StructSure.png",
        tags: ["Flutter", "TensorFlow Lite", "GCP", "AI"],
        url: ""
    }
];

// Pagination State
const ITEMS_PER_PAGE = 3;
let currentPage = 1;

// Function to render projects
function renderProjects(page = 1) {
    const projectsContainer = document.getElementById('projects');
    if (!projectsContainer) return;

    // Calculate slice indices
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedItems = projectsData.slice(start, end);

    let htmlContent = '';
    
    paginatedItems.forEach(project => {
        // Generate random rotation for slight chaotic feel
        const rotation = Math.random() * 4 - 2; // between -2 and 2 degrees
        
        htmlContent += `
            <a class="project-card" href="${project.url ?? '#'}" target="_blank" rel="noopener" style="transform: rotate(${rotation}deg)">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </a>
        `;
    });

    projectsContainer.innerHTML = htmlContent;
    renderPaginationControls();
}

// Function to render pagination controls
function renderPaginationControls() {
    const controlsContainer = document.getElementById('pagination-controls');
    if (!controlsContainer) return;

    const totalPages = Math.ceil(projectsData.length / ITEMS_PER_PAGE);
    let controlsHtml = '';

    // Previous Button
    controlsHtml += `<button class="page-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>< PREV</button>`;

    // Page Numbers (Optional, sticking to simple Prev/Next for brutalism, but adding current/total indicator might be cool. Let's do simple numbers)
    for (let i = 1; i <= totalPages; i++) {
        controlsHtml += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }

    // Next Button
    controlsHtml += `<button class="page-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>NEXT ></button>`;

    controlsContainer.innerHTML = controlsHtml;
}

// Global function to handle page changes (needs to be accessible from onclick)
window.changePage = function(newPage) {
    const totalPages = Math.ceil(projectsData.length / ITEMS_PER_PAGE);
    if (newPage < 1 || newPage > totalPages) return;
    currentPage = newPage;
    renderProjects(currentPage);
    // Optional: Scroll to top of projects section
    document.getElementById('projects-section').scrollIntoView({ behavior: 'smooth' });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(currentPage);
    
    // Add a raw time display to footer
    const footer = document.querySelector('footer');
    const timeDiv = document.createElement('div');
    timeDiv.style.marginTop = '2rem';
    timeDiv.style.fontFamily = 'monospace';
    footer.appendChild(timeDiv);

    setInterval(() => {
        timeDiv.innerText = "SYSTEM TIME: " + new Date().toISOString().toUpperCase();
    }, 1000);
});
