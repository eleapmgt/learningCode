// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

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

  // Rattachement de la balise article à la section Fiches
  sectionFiches.appendChild(pieceElement);
  // Rattachement de nos balises au DOM
  pieceElement.appendChild(imageElement);
  pieceElement.appendChild(nomElement);
  pieceElement.appendChild(prixElement);
  pieceElement.appendChild(categorieElement);
  pieceElement.appendChild(descriptionElement);
  pieceElement.appendChild(stockElement);
}

const buttonTrier = document.querySelector(".btn-trier");
buttonTrier.addEventListener("click", function() {
  const piecesOrdonnees = Array.from(pieces);
  piecesOrdonnees.sort(function(a,b) {
    return a.prix - b.prix;
  });
  console.log(piecesOrdonnees);
});
