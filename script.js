document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  if (input) {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        search(); //
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
