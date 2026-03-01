document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  if (input) {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        search(); 
      }
    });
  }
});
function search() {
  const inputText = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("searchResults");
  if (resultsDiv) resultsDiv.innerHTML = "";

  document.querySelectorAll("mark.search-highlight").forEach(mark => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });

  if (!inputText) return;

  let found = false;
  const regex = new RegExp(`(${inputText})`, "gi");
  const elements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, span");

  elements.forEach(el => {
    if (regex.test(el.textContent)) {
      el.innerHTML = el.innerHTML.replace(regex, '<mark class="search-highlight">$1</mark>');
      found = true;
    }
  });

  if (found) {
    setTimeout(() => {
      const firstMark = document.querySelector("mark.search-highlight");
      if (firstMark) {
        firstMark.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  } else {
    if (resultsDiv) {
      resultsDiv.innerHTML = "<p>No matching content found!</p>";
    } else {
      alert("No matching content found!");
    }
  }
}

/* responsivo*/
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const closeMenuBtn = document.querySelector('.close-menu');
const searchInput = document.querySelector('#search');
const searchButton = document.querySelector('.search-button');
const explorerButton = document.querySelector('.dropbtn');

function openMenu() {
  navMenu.classList.add('active');
  document.body.classList.add('menu-open');
}

function closeMenu() {
  navMenu.classList.remove('active');
  document.body.classList.remove('menu-open');

  if (explorerButton && explorerButton.classList.contains('active')) {
    explorerButton.classList.remove('active');
  }
}
function searchAction() {
  closeMenu();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  console.log("Busca executada!"); 
}

if (hamburger) hamburger.addEventListener('click', openMenu);

if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);

// Dropdown Explorer
if (explorerButton) {
  explorerButton.addEventListener('click', (e) => {
    e.stopPropagation();
    explorerButton.classList.toggle('active');
  });
}

if (searchInput) {
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchAction();
    }
  });
}
if (searchButton) {
  searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    searchAction();
  });
}
document.addEventListener('click', (event) => {
  const clickInsideMenu = navMenu.contains(event.target) || hamburger.contains(event.target);
  if (!clickInsideMenu && navMenu.classList.contains('active')) {
    closeMenu();
  }
});
function searchAction() {
  const searchTerm = searchInput.value.trim();
  closeMenu();

  if (!searchTerm) return;

  document.querySelectorAll('.highlighted').forEach(el => {
    el.replaceWith(el.textContent);
  });

  const elements = document.querySelectorAll('p, h1, h2, h3, span, a, li');
  let found = false;

  elements.forEach(el => {
    const text = el.textContent;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    if (regex.test(text) && !found) {
      const newHTML = text.replace(regex, '<span class="highlighted" style="background: yellow;">$1</span>');
      el.innerHTML = newHTML;
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      found = true;
    }
  });

  if (!found) {
    alert(`Nenhum resultado encontrado para "${searchTerm}"`);
  }
}
