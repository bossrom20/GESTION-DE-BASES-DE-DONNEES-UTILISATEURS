// Global Variables
let currentUserRole = "manager"; // 'manager' or 'member'
let currentSection = "dashboard";

// Initialize the app
document.addEventListener("DOMContentLoaded", function () {
  // Set user role based on role in system
  setupUserRole();

  // Setup navigation
  setupNavigation();

  // Setup tabs
  setupTabs();

  // Setup forms
  setupForms();
});

// Setup user role
function setupUserRole() {
  // This would normally come from a backend API
  // For now, we'll just set it to 'manager' by default
  const userRoleElement = document.getElementById("user-role");

  if (currentUserRole === "manager") {
    userRoleElement.textContent = "Responsable";
    // Show manager controls
    document.querySelectorAll(".manager-only").forEach((el) => {
      el.style.display = "block";
    });
  } else {
    userRoleElement.textContent = "Membre";
    // Hide manager controls
    document.querySelectorAll(".manager-only").forEach((el) => {
      el.style.display = "none";
    });
  }
}

// Setup navigation
function setupNavigation() {
  // Navigation links
  document
    .getElementById("nav-dashboard")
    .addEventListener("click", function (e) {
      e.preventDefault();
      showSection("dashboard");
    });

  document
    .getElementById("nav-projects")
    .addEventListener("click", function (e) {
      e.preventDefault();
      showSection("projects");
    });

  document.getElementById("nav-tasks").addEventListener("click", function (e) {
    e.preventDefault();
    showSection("tasks");
  });

  document.getElementById("nav-teams").addEventListener("click", function (e) {
    e.preventDefault();
    showSection("teams");
  });

  // Show default section
  showSection("dashboard");
}

// Show section and hide others
function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.add("hidden");
  });

  // Show the requested section
  const sectionToShow = document.getElementById(`${sectionName}-section`);
  if (sectionToShow) {
    sectionToShow.classList.remove("hidden");
    currentSection = sectionName;
  }
}

// Setup tabs
function setupTabs() {
  const tabs = document.querySelectorAll(".tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Hide all tab content
      const tabContents = document.querySelectorAll(".tab-content");
      tabContents.forEach((content) => {
        content.classList.remove("active");
      });

      // Show the corresponding tab content
      const tabId = this.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });
}

// Setup forms
function setupForms() {
  // Project form
  document
    .getElementById("project-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      saveProject();
    });

  // Task form
  document.getElementById("task-form").addEventListener("submit", function (e) {
    e.preventDefault();
    saveTask();
  });

  // Team form
  document.getElementById("team-form").addEventListener("submit", function (e) {
    e.preventDefault();
    saveTeam();
  });

  // Add project button
  document
    .getElementById("add-project-btn")
    .addEventListener("click", function () {
      openNewProjectModal();
    });

  // Add task button
  document
    .getElementById("add-task-btn")
    .addEventListener("click", function () {
      openNewTaskModal();
    });

  // Add team button
  document
    .getElementById("add-team-btn")
    .addEventListener("click", function () {
      openNewTeamModal();
    });
}

// Modal Functions
function openModal(modalId) {
  document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Project functions
function openNewProjectModal() {
  // Reset form
  document.getElementById("project-form").reset();
  document.getElementById("project-modal-title").textContent = "Nouveau projet";
  document.getElementById("project-id").value = "";

  // Open modal
  openModal("project-modal");
}

function openProjectModal(projectId) {
  // This would normally fetch data from a backend API
  // For now, we'll just use some placeholder data
  document.getElementById("project-modal-title").textContent =
    "Modifier le projet";
  document.getElementById("project-id").value = projectId;

  if (projectId === 1) {
    document.getElementById("project-name").value = "Refonte du site web";
    document.getElementById("project-description").value =
      "Refonte complète du site web de l'entreprise avec une nouvelle identité visuelle.";
    document.getElementById("project-start-date").value = "2025-04-01";
    document.getElementById("project-end-date").value = "2025-05-15";
  } else if (projectId === 2) {
    document.getElementById("project-name").value = "Application mobile";
    document.getElementById("project-description").value =
      "Développement d'une application mobile pour iOS et Android.";
    document.getElementById("project-start-date").value = "2025-03-15";
    document.getElementById("project-end-date").value = "2025-06-30";
  } else if (projectId === 3) {
    document.getElementById("project-name").value = "Administration";
    document.getElementById("project-description").value =
      "Tâches administratives récurrentes de l'entreprise.";
    document.getElementById("project-start-date").value = "2025-01-01";
    document.getElementById("project-end-date").value = "2025-12-31";
  }

  // Open modal
  openModal("project-modal");
}

function saveProject() {
  // This would normally send data to a backend API
  // For now, we'll just close the modal
  alert("Projet enregistré avec succès !");
  closeModal("project-modal");
}

// Task functions
function openNewTaskModal() {
  // Reset form
  document.getElementById("task-form").reset();
  document.getElementById("task-modal-title").textContent = "Nouvelle tâche";
  document.getElementById("task-id").value = "";

  // Open modal
  openModal("task-modal");
}

function openTaskModal(taskId) {
  // For editing tasks
  if (currentUserRole === "manager") {
    // Reset form
    document.getElementById("task-form").reset();
    document.getElementById("task-modal-title").textContent =
      "Modifier la tâche";
    document.getElementById("task-id").value = taskId;

    // Set placeholder values based on taskId
    if (taskId === 1) {
      document.getElementById("task-title").value = "Finaliser le design";
      document.getElementById("task-description").value =
        "Finaliser tous les éléments de design pour la page d'accueil et les pages produits.";
      document.getElementById("task-project").value = "1";
      document.getElementById("task-assignee").value = "2";
      document.getElementById("task-priority").value = "high";
      document.getElementById("task-status").value = "progress";
      document.getElementById("task-due-date").value = "2025-04-25";
    } else if (taskId === 2) {
      document.getElementById("task-title").value = "Implémenter l'API";
      document.getElementById("task-description").value =
        "Développer l'API REST pour l'application mobile.";
      document.getElementById("task-project").value = "2";
      document.getElementById("task-assignee").value = "3";
      document.getElementById("task-priority").value = "medium";
      document.getElementById("task-status").value = "pending";
      document.getElementById("task-due-date").value = "2025-04-27";
    }

    // Open modal
    openModal("task-modal");
  } else {
    // For viewing task details (member role)
    openTaskDetailModal(taskId);
  }
}

function openTaskDetailModal(taskId) {
  // This would normally fetch data from a backend API
  // For now, we'll just use some placeholder data
  if (taskId === 1) {
    document.getElementById("detail-task-title").textContent =
      "Finaliser le design";
    document.getElementById("detail-task-description").textContent =
      "Finaliser tous les éléments de design pour la page d'accueil et les pages produits.";
    document.getElementById("detail-task-project").textContent =
      "Refonte du site web";
    document.getElementById("detail-task-assignee").textContent = "Alice Smith";
    document.getElementById("detail-task-priority").textContent = "Haute";
    document.getElementById("detail-task-due-date").textContent = "25/04/2025";
    document.getElementById("update-task-status").value = "progress";
  } else if (taskId === 2) {
    document.getElementById("detail-task-title").textContent =
      "Implémenter l'API";
    document.getElementById("detail-task-description").textContent =
      "Développer l'API REST pour l'application mobile.";
    document.getElementById("detail-task-project").textContent =
      "Application mobile";
    document.getElementById("detail-task-assignee").textContent = "Bob Johnson";
    document.getElementById("detail-task-priority").textContent = "Moyenne";
    document.getElementById("detail-task-due-date").textContent = "27/04/2025";
    document.getElementById("update-task-status").value = "pending";
  } else if (taskId === 3) {
    document.getElementById("detail-task-title").textContent =
      "Rapport mensuel";
    document.getElementById("detail-task-description").textContent =
      "Préparer le rapport mensuel des activités.";
    document.getElementById("detail-task-project").textContent =
      "Administration";
    document.getElementById("detail-task-assignee").textContent = "John Doe";
    document.getElementById("detail-task-priority").textContent = "Basse";
    document.getElementById("detail-task-due-date").textContent = "30/04/2025";
    document.getElementById("update-task-status").value = "blocked";
  }

  // Open modal
  openModal("task-detail-modal");
}

function saveTask() {
  // This would normally send data to a backend API
  // For now, we'll just close the modal
  alert("Tâche enregistrée avec succès !");
  closeModal("task-modal");
}

function updateTaskStatus() {
  // This would normally send data to a backend API
  // For now, we'll just show an alert
  const status = document.getElementById("update-task-status").value;
  let statusText = "";

  if (status === "pending") statusText = "À faire";
  else if (status === "progress") statusText = "En cours";
  else if (status === "completed") statusText = "Terminée";
  else if (status === "blocked") statusText = "Bloquée";

  alert(`Statut mis à jour: ${statusText}`);
}

function addTaskComment() {
  const comment = document.getElementById("new-comment").value;

  if (comment.trim() === "") {
    alert("Veuillez saisir un commentaire");
    return;
  }

  // This would normally send data to a backend API
  // For now, we'll just show an alert
  alert("Commentaire ajouté !");
  document.getElementById("new-comment").value = "";
}

// Team functions
function openNewTeamModal() {
  // Reset form
  document.getElementById("team-form").reset();
  document.getElementById("team-modal-title").textContent = "Nouvelle équipe";
  document.getElementById("team-id").value = "";

  // Open modal
  openModal("team-modal");
}

function openTeamModal(projectId) {
  // This would normally fetch data from a backend API
  // For now, we'll just use some placeholder data
  document.getElementById("team-modal-title").textContent = "Gestion d'équipe";
  document.getElementById("team-id").value = projectId;

  if (projectId === 1) {
    document.getElementById("team-name").value = "Équipe de développement web";
    document.getElementById("team-project").value = "1";
    document.getElementById("team-leader").value = "1";

    // Reset checkboxes
    document
      .querySelectorAll('#team-members-list input[type="checkbox"]')
      .forEach((cb) => {
        cb.checked = false;
      });

    // Set selected members
    document.getElementById("member-1").checked = true;
    document.getElementById("member-2").checked = true;
    document.getElementById("member-3").checked = true;
  } else if (projectId === 2) {
    document.getElementById("team-name").value = "Équipe mobile";
    document.getElementById("team-project").value = "2";
    document.getElementById("team-leader").value = "1";

    // Reset checkboxes
    document
      .querySelectorAll('#team-members-list input[type="checkbox"]')
      .forEach((cb) => {
        cb.checked = false;
      });

    // Set selected members
    document.getElementById("member-1").checked = true;
    document.getElementById("member-4").checked = true;
    document.getElementById("member-5").checked = true;
    document.getElementById("member-6").checked = true;
  }

  // Open modal
  openModal("team-modal");
}

function openTeamEditModal(teamId) {
  openTeamModal(teamId); // Reuse the same function for now
}

function saveTeam() {
  // This would normally send data to a backend API
  // For now, we'll just close the modal
  alert("Équipe enregistrée avec succès !");
  closeModal("team-modal");
}

// Project tasks function
function openProjectTasks(projectId) {
  // Show tasks section
  showSection("tasks");

  // Set project filter
  document.getElementById("task-filter-project").value = projectId;

  // Would normally trigger the filter to show only tasks for this project
  alert("Affichage des tâches du projet");
}

// Toggle user role for demo purposes
function toggleUserRole() {
  currentUserRole = currentUserRole === "manager" ? "member" : "manager";
  setupUserRole();

  // Refresh the current section
  showSection(currentSection);
}
