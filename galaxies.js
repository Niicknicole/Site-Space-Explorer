
// Lista completa de galáxias
const galaxies = [
  {
    name: "Andromeda",
    image: "imagens/andromeda.jpg",
    description: "The Andromeda Galaxy is the closest major galaxy to the Milky Way, located approximately 2.5 million light-years from Earth."
  },
  {
    name: "Whirlpool",
    image: "imagens/whirlpool.jpg",
    description: "Famous for its spiral arms, located about 23 million light-years away."
  },
  {
    name: "Milky Way",
    image: "imagens/milkyway.jpg",
    description: "Our home galaxy, a barred spiral galaxy containing our Solar System."
  },
  {
    name: "Sombrero",
    image: "imagens/sombrero.jpg",
    description: "Known for its bright core and hat-like shape."
  },
  {
    name: "Triangulum",
    image: "imagens/triangulum.jpg",
    description: "A small spiral galaxy belonging to our local group of galaxies."
  },
  {
    name: "Cartwheel",
    image: "imagens/cartwheel.jpg",
    description: "A peculiar galaxy with a wheel-like appearance due to galactic collisions."
  },
  {
    name: "Messier 87",
    image: "imagens/m87.jpg",
    description: "A giant elliptical galaxy known for its supermassive black hole."
  },
  {
    name: "Pinwheel Galaxy",
    image: "imagens/Pinwheel.webp",
    description: "A face-on spiral galaxy with beautiful arms and active star formation."
  }
];

let availableGalaxies = [...galaxies]; 

document.getElementById('discoverBtn').addEventListener('click', () => {
  if (availableGalaxies.length === 0) {
    availableGalaxies = [...galaxies];
  }

  // Escolhe índice aleatório
  const index = Math.floor(Math.random() * availableGalaxies.length);
  const selected = availableGalaxies.splice(index, 1)[0];

  const result = document.getElementById('galaxyResult');
  const name = document.getElementById('galaxyName');
  const image = document.getElementById('galaxyImage');
  const desc = document.getElementById('galaxyDescription');

  name.textContent = selected.name;
  image.src = selected.image;
  image.alt = `Imagem da galáxia ${selected.name}`;
  desc.textContent = selected.description;

  result.classList.remove('hidden');

  result.scrollIntoView({ behavior: 'smooth', block: 'center' });

});
