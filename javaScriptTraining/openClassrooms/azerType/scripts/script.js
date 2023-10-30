function afficherResultat(score, nbMotsProposes) {
  // Récupération de la zone dans laquelle on va écrire le score
  let spanScore = document.querySelector(".zoneScore span")
  // Ecriture du texte
  let affichageScore = `${score} / ${nbMotsProposes}`
  // On place le texte à l'intérieur du span.
  spanScore.innerText = affichageScore
}

function afficherProposition(proposition) {
  let zoneProposition = document.querySelector(".zoneProposition")
  zoneProposition.innerText = proposition
}

function lancerJeu() {

  let score = 0
  let i = 0

  let btnValiderMot = document.getElementById("btnValiderMot")
  let inputEcriture = document.getElementById("inputEcriture")
  afficherProposition(listeMots[i])
  btnValiderMot.addEventListener("click", () => {
    console.log(inputEcriture.value)
    if (inputEcriture.value === listeMots[i]) {
      score++
    }
    i++
    afficherResultat(score, i)
    inputEcriture.value = ''
    if (listeMots[i] === undefined) {
      afficherProposition("Le jeu est fini.")
      btnValiderMot.disabled = true
    } else {
      afficherProposition(listeMots[i])
    }
  })

  afficherResultat(score, i)
}
