import { ajoutListenersAvis } from "./avis.js";

// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

function genererPieces(pieces) {
  for (let i = 0; i < pieces.length; i++) {

    const article = pieces[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // Création d'une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");
    // Création des balises
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    const nomElement = document.createElement("h2")
    nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix : ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ?? "Pas de description pour le moment."
    const stockElement = document.createElement("p");
    stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
    // Création d'un bouton pour afficher les avis
    const avisBouton = document.createElement("button");
    avisBouton.dataset.id = article.id;
    avisBouton.textContent = "Afficher les avis";

    // Rattachement de la balise article à la section Fiches
    sectionFiches.appendChild(pieceElement);
    // Rattachement de nos balises au DOM
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);
    pieceElement.appendChild(avisBouton);
  };
  ajoutListenersAvis();
};

genererPieces(pieces);

// Gestion des boutons
const buttonTrier = document.querySelector(".btn-trier");
buttonTrier.addEventListener("click", function() {
  const piecesOrdonnees = Array.from(pieces);
  piecesOrdonnees.sort(function(a,b) {
    return a.prix - b.prix;
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesOrdonnees);
});

const buttonFiltrer = document.querySelector(".btn-filtrer");
buttonFiltrer.addEventListener("click", function() {
  const piecesFiltrees = pieces.filter(function(piece) {
    return piece.prix <= 35;
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFiltrees);
})

const buttonDecroissant = document.querySelector(".btn-decroissant");
buttonDecroissant.addEventListener("click", function() {
  const piecesOrdonnees = Array.from(pieces);
  piecesOrdonnees.sort(function(a,b) {
    return b.prix - a.prix;
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesOrdonnees);
});

const buttonNoDesc = document.querySelector(".btn-nodesc");
buttonNoDesc.addEventListener("click", function() {
  const piecesFiltrees = pieces.filter(function(piece) {
    return piece.description
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFiltrees);
});

const noms = pieces.map(piece => piece.nom);
for (let i = pieces.length - 1; i >=0; i--) {
  if (pieces[i].prix > 35) {
    noms.splice(i, 1);
  };
};

//Création de l'en-tête
const pElement = document.createElement("p");
pElement.innerText = "Pièces abordables :";

// Création de la liste d'éléments abordables
const abordablesElements = document.createElement("ul");
// Ajout de chaque nom à la liste
for (let i = 0; i < noms.length; i++) {
  const nomElement = document.createElement("li");
  nomElement.innerText = noms[i];
  abordablesElements.appendChild(nomElement);
};

// Ajout de l'en-tête puis de la liste au bloc résultats filtrés
document.querySelector(".abordables").appendChild(pElement).appendChild(abordablesElements);

const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);
for (let i = pieces.length - 1; i >= 0; i--) {
  if (pieces[i].disponibilite === false) {
    nomsDisponibles.slice(i, 1);
    prixDisponibles.slice(i, 1);
  };
};

const disponiblesElements = document.createElement("ul");
for (let i = 0; i < nomsDisponibles.length; i++) {
  const nomElement = document.createElement("li");
  nomElement.innerHTML = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
  disponiblesElements.appendChild(nomElement);
};

const pElementDisponible = document.createElement("p");
pElementDisponible.innerText = "Pièces disponibles :";

document.querySelector(".disponibles").appendChild(pElementDisponible).appendChild(disponiblesElements);

const inputPrixMax = document.querySelector("#prix-max");
inputPrixMax.addEventListener("input", function() {
  const piecesFiltrees = pieces.filter(function(piece) {
    return piece.prix <= inputPrixMax.value;
  })
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFiltrees);
});
