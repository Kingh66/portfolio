// modules/projects.js
export function initializeProjects() {
    const projectsGrid = document.querySelector('.projects .grid');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const projectsSection = document.getElementById('projects'); // Added section reference
    
    if (!viewMoreBtn) return;

    const projects = Array.from(document.querySelectorAll('.projects .card'));
    
    if (projects.length > 2) {
        projects.forEach((project, index) => {
            if (index >= 2) project.classList.add('hidden');
        });

        let isExpanded = false;
        
        viewMoreBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;
            
            projects.forEach((project, index) => {
                if (index >= 2) project.classList.toggle('hidden');
            });

            viewMoreBtn.textContent = isExpanded ? 'View Less Projects' : 'View More Projects';
            projectsGrid.classList.toggle('show-all', isExpanded);
            
            if (isExpanded) {
                // Scroll to newly revealed projects
                const firstHiddenProject = projects[2];
                firstHiddenProject.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // Scroll back to projects section when collapsing
                projectsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    } else {
        viewMoreBtn.style.display = 'none';
    }
}