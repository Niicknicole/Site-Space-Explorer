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
// Elementos
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const closeMenuBtn = document.querySelector('.close-menu');
const searchInput = document.querySelector('#search');
const searchButton = document.querySelector('.search-button');
const explorerButton = document.querySelector('.dropbtn');

// Abrir menu
function openMenu() {
  navMenu.classList.add('active');
  document.body.classList.add('menu-open');
}

// Fechar menu
function closeMenu() {
  navMenu.classList.remove('active');
  document.body.classList.remove('menu-open');

  // Fechar dropdown do Explorer se estiver aberto
  if (explorerButton && explorerButton.classList.contains('active')) {
    explorerButton.classList.remove('active');
  }
}

// Função de busca centralizada
function searchAction() {
  closeMenu();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  console.log("Busca executada!"); // Aqui você coloca sua função real de busca
}

// Abrir menu com hambúrguer
if (hamburger) hamburger.addEventListener('click', openMenu);

// Fechar menu com botão X
if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);

// Dropdown Explorer
if (explorerButton) {
  explorerButton.addEventListener('click', (e) => {
    e.stopPropagation();
    explorerButton.classList.toggle('active');
  });
}

// Fechar menu e executar busca com Enter
if (searchInput) {
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchAction();
    }
  });
}

// Fechar menu e executar busca clicando na lupa
if (searchButton) {
  searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    searchAction();
  });
}

// Fechar menu clicando fora dele
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

  // Resetar destaques anteriores
  document.querySelectorAll('.highlighted').forEach(el => {
    el.replaceWith(el.textContent);
  });

  // Procurar todos os elementos que podem conter texto
  const elements = document.querySelectorAll('p, h1, h2, h3, span, a, li');
  let found = false;

  elements.forEach(el => {
    const text = el.textContent;
    const regex = new RegExp(`(${searchTerm})`, 'gi'); // procura a palavra, case-insensitive
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
