import React from 'react'

const Note = ({ note, toggleImportance }) => {
  // Dans le composant Note, on a une fct fléchée avec 2 paramètres : note et toggleImportance. Le composant Note attend les 2 propriétés.

  const label = note.important
    ? 'make not important'
    : 'make important'
    // La condition ternaire ? détermine la valeur de la variable label. Si note.important est vrai, label sera 'make not important, sinon 'make important'.
    // La variable label est utilisée pour afficher le texte du bouton.

  return (
    <li className='note'>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    {/* On affiche note.content qui est le contenu de la note et un bouton
    Le bouton onClick est défini sur toggleImportance et quand il est cliqué, la fct toggleImportance est appelée. */}
    </li>
  )
}

export default Note
