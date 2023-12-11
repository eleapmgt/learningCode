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

  // Initialisations
  let score = 0
  let i = 0
  let listeProposition = listeMots

  let btnValiderMot = document.getElementById("btnValiderMot")
  let inputEcriture = document.getElementById("inputEcriture")

  afficherProposition(listeProposition[i])

  // Gestion de l'événement click sur le bouton "valider"
  btnValiderMot.addEventListener("click", () => {
    console.log(inputEcriture.value)
    if (inputEcriture.value === listeProposition[i]) {
      score++
    }
    i++
    afficherResultat(score, i)
    inputEcriture.value = ''
    if (listeProposition[i] === undefined) {
      afficherProposition("Le jeu est fini.")
      btnValiderMot.disabled = true
    } else {
      afficherProposition(listeProposition[i])
    }
  })

  // Gestion de l'événement change sur les boutons radio
  let listeBtnRadio = document.querySelectorAll(".optionSource input")
  for (let i = 0; i < listeBtnRadio.length; i++) {
    listeBtnRadio[i].addEventListener("change", (event) => {
      // Si le 1er élément a été modifié, on veut jouer avec listeMots
      if (event.target.value === "1") {
        listeProposition = listeMots
      } else {
        // Sinon on veut jouer avec listePhrases
        listeProposition = listePhrases
      }
      // On modifie l'affichage en direct
      afficherProposition(listeProposition[i])
    })
  }

  afficherResultat(score, i)
}
