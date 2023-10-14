function afficherResultat(score, nbeMotsTotal) {
  console.log('Votre score est de ' + score + ' sur ' + nbeMotsTotal)
}

function choisirPhrasesOuMots() {
  let choix = prompt("Avec quelle liste souhaitez-vous jouer aujourd'hui : 'mots ou 'phrases' ?")
  while (choix !== "mots" && choix !== "phrases") {
    choix
  }
  return choix
}

function lancerBoucleDeJeu(tableau) {

  let score = 0

  for (let i = 0; i < tableau.length; i++) {
    let motUtilisateur = prompt("Entrez le mot : " + tableau[i])
    if (motUtilisateur === tableau[i]) {
      score++
    }
  }
  return score
}

function lancerJeu() {
  let choix = choisirPhrasesOuMots()
  let score = 0
  let nbeMotsTotal = 0

  if (choix === "mots") {
    score = lancerBoucleDeJeu(listeMots)
    nbeMotsTotal = listeMots.length
  } else {
    score = lancerBoucleDeJeu(listePhrases)
    nbeMotsTotal = listePhrases.length
  }
  afficherResultat(score, nbeMotsTotal)
}
