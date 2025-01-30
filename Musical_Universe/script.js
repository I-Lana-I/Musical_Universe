// Crée les album dans le html
data.forEach(function (afficher) {
    document.querySelector('.box').innerHTML += 
    "<section class='album' id='" + afficher.id_album + "'>" +
        "<img src='" + afficher.img + "' alt='Image de l'album'>" +
        "<h3 id='album-names'>" + afficher.musiques + "</h3>" +
        "<h4>" + afficher.artist + "</h4>" +
    "</section>";
});

// Crée les fenetre modale pour chaque album dans le html
data.forEach(function (afficher) {
    document.querySelector('body').innerHTML +=  
        "<div class='modal' id='" + afficher.id_modal + "'>" + 
            "<div class='modal_content'>" + 
                "<span class='close' id='"+ afficher.id_close +"'>&times;</span>" + 
                "<p>" + afficher.descriptions + "</p>" + 
                "<audio id='audio-" + afficher.id_modal + "'>" + 
                    "<source src='" + afficher.audio + "' type='audio/mpeg'>" + 
                "</audio>" + 
                "<div class='audio_controls'>" + 
                      "<img src='" + afficher.img + "' alt='"+afficher.musiques+"'>" +
                      "<h3>" + afficher.musiques + "</h3>" + 
                      "<h4>" + afficher.artist + "</h4>" +
                      "<button class='playPauseBtn'>⏵</button>" + 
                      "<img src='img/SpectreAudioOff.jpg' class='audioSpectrum' alt='SpectreAudio'>" +
                      "<span class='track-time' id='track-time'>0:00</span><span> / </span><span class='TotalTime' id='TotalTime'>0:00</span>" +
                      "<button class='volume'><img src='img/volumeOn.png' alt='volume'></button>" +
                "</div>" + 
                "<a href='" + afficher.link_ytb + "' target='_blank' alt='lien ytb'>écouter l'album</a>" + 
            "</div>" + 
        "</div>";
});
 // Crée la preview dans le html
document.querySelector('form').innerHTML +=


"<div class='preview-container' id='preview-container'>"+
    "<section class='album' id='preview-album'>"+
        "<img id='preview-image' src='img/favicon.png' alt='Image de l'album'>"+
        "<h3 id='preview-title'>Titre de l'album</h3>"+
        "<h4 id='preview-artist'>Artiste</h4>"+
    "</section>"+
"</div>"
;






// Fonctionnalité pour les fenêtres modales
data.forEach(function (afficher) {
    var modal = document.getElementById(afficher.id_modal);
    var btn = document.getElementById(afficher.id_album);

    // Ouvre la fenêtre modale quand l'album est cliqué
    btn.onclick = function () {
        modal.style.display = "flex";
    };
});



// Ferme les fenêtres modales quand l'utilisateur clique en dehors des fenêtres modales ou sur la croix et réinitialise l'audio lorsque la fenêtre modale est fermée
window.onclick = function (event) {
    data.forEach(function (afficher) {
        var modal = document.getElementById(afficher.id_modal);
        var playPauseBtn = modal.querySelector(".playPauseBtn");
        var audioSpectrum = modal.querySelector(".audioSpectrum");
        var span = document.getElementById(afficher.id_close);

        if (event.target == modal) {
            modal.style.display = "none";
            var audio = modal.querySelector("audio");
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
                playPauseBtn.innerHTML = "⏵";
                audioSpectrum.src = 'img/SpectreAudioOff.jpg';
            }
        }

        span.onclick = function () {
            modal.style.display = "none";
            var audio = modal.querySelector("audio");
            audio.pause();
            audio.currentTime = 0;
            playPauseBtn.innerHTML = "⏵";
            audioSpectrum.src = 'img/SpectreAudioOff.jpg';
        }
    });
};

// Fonctionalités pour le boutons lecture/pause et volume

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('playPauseBtn')) {
        var modal = event.target.closest('.modal');
        var audio = modal.querySelector("audio");
        var audioSpectrum = modal.querySelector(".audioSpectrum");
        var trackTime = modal.querySelector(".track-time");

        if (audio.paused || audio.ended) {
            audio.play();
            event.target.innerHTML = "⏸"; 
            audioSpectrum.src = 'img/SpectreAudioOn.gif'; 
        } else {
            audio.pause();
            event.target.innerHTML = "⏵"; 
            audioSpectrum.src = 'img/SpectreAudioOff.jpg'; 
        }
    }

    if (event.target.closest('.volume')) {
        var modal = event.target.closest('.modal');
        var audio = modal.querySelector("audio");
        var volumeImg = modal.querySelector(".volume img");

        if (audio.muted) {
            audio.muted = false;
            volumeImg.src = 'img/volumeOn.png';
        } else {
            audio.muted = true;
            volumeImg.src = 'img/volumeOff.jpg';
        }
    }

    // Ouvrir la fenêtre modale de l'album
    if (event.target.closest('.album')) {
        var albumId = event.target.closest('.album').id;
        var modalId = albumId.replace('album', 'modal');
        document.getElementById(modalId).style.display = "flex";
    }

    // Fermer la fenêtre modale
    if (event.target.classList.contains('close')) {
        var modal = event.target.closest('.modal');
        modal.style.display = "none";

        // Réinitialiser l'audio quand la fenetre modale est fermer
        var audio = modal.querySelector("audio");
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            modal.querySelector(".playPauseBtn").innerHTML = "⏵";  
            modal.querySelector(".audioSpectrum").src = 'img/SpectreAudioOff.jpg'; 
            modal.querySelector(".track-time").textContent = "0:00";  
        }
    }
});

// Ajoutez un événement pour réinitialiser les éléments après la fin de la lecture de l'audio
data.forEach(function (afficher) {
    var audio = document.getElementById("audio-" + afficher.id_modal);
    var modal = document.getElementById(afficher.id_modal);
    var playPauseBtn = modal.querySelector(".playPauseBtn");
    var audioSpectrum = modal.querySelector(".audioSpectrum");
    var trackTime = modal.querySelector(".track-time");

    if (audio) {
        audio.addEventListener('ended', function () {
            playPauseBtn.innerHTML = "⏵"; 
            audioSpectrum.src = 'img/SpectreAudioOff.jpg';
            audio.pause();
            audio.currentTime = 0;
        });
    }
});

// Convertit les secondes en format mm:ss(fait avec un tuto libre droit)
function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Met à jour le temps actuel et total de la piste audio
data.forEach(function (afficher) {
    var audio = document.getElementById("audio-" + afficher.id_modal);
    var totalTime = document.querySelector("#" + afficher.id_modal + " .TotalTime");
    var trackTime = document.querySelector("#" + afficher.id_modal + " .track-time");

    if (audio) {
        // Mettre à jour le temps total quand les métadonnées sont chargées
        audio.addEventListener('loadedmetadata', function () {
            totalTime.textContent = formatTime(audio.duration);
        });

        // Mettre à jour le temps actuel pendant la lecture
        audio.addEventListener('timeupdate', function () {
            trackTime.textContent = formatTime(audio.currentTime);
        });
    }

    
});


// Fonctionnalité pour la fenêtre modale du Formulaire et de la preview
var modalForm = document.getElementById("form");
var btnAdd = document.getElementById("addalbum");
var spanForm = document.getElementById("close-form");
var box = document.querySelector('.box');
var body = document.querySelector('body');
var previewModal = document.getElementById("preview-container");

// Ouvrir la fenêtre modale
btnAdd.onclick = function () {
    modalForm.style.display = "flex";
    previewModal.style.display = "flex";
}

// Fermer la fenêtre modale
spanForm.onclick = function () {
    modalForm.style.display = "none";
}


// Fermer la fenêtre modale si on clique à l'extérieur
modalForm.onclick = function (event) {
    if (event.target == modalForm) {
        modalForm.style.display = "none";
    }
}

// Soumission du formulaire
modalForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page car de base le comportement du submit est de recharger la page

    // Récupére les données du formulaire
    var imgURL = document.getElementById("image").value;
    var albumName = document.getElementById("album-name").value;
    var artistName = document.getElementById("artist-name").value;
    var description = document.getElementById("description").value;
    var audioURL = document.getElementById("audio").value;
    var albumLink = document.getElementById("link").value;

    // Identifiants uniques pour l'album et sa fenetre modale(technique trouver sur ce site:https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13)
    
    var uniqueId = Date.now();
    var albumId = "album-" + uniqueId;
    var modalId = "modal-" + uniqueId;
    var closeId = "close-" + uniqueId;

    // Ajoute l'album ajouter avec le fourmulaire
    box.innerHTML += 
        "<section class='album' id='" + albumId + "'>" +
            "<img src='" + imgURL + "' alt='" + albumName + "'>" +
            "<h3>" + albumName + "</h3>" +
            "<h4>" + artistName + "</h4>" +
        "</section>";

    // Crée la modale de la modale de l'album ajouter avec le fourmulaire
    var modalHTML = 
       "<div class='modal' id='" + modalId + "'>" +
           "<div class='modal_content'>" +
               "<span class='close' id='" + closeId + "'>&times;</span>" +
               "<p class=description2>" + description + "</p>" +
               "<audio id='audio-" + uniqueId + "'>" +
                   "<source src='" + audioURL + "' type='audio/mpeg'>" +
               "</audio>" +
               "<div class='audio_controls'>" +
                   "<img src='" + imgURL + "' alt='" + albumName + "'>" +
                   "<h3>" + albumName + "</h3>" +
                   "<h4>" + artistName + "</h4>" +
                   "<button class='playPauseBtn'>⏵</button>" +
                   "<img src='img/SpectreAudioOff.jpg' class='audioSpectrum' alt='SpectreAudio'>" +
                   "<span class='track-time' id='track-time'>0:00</span><span> / </span><span class='TotalTime' id='TotalTime'>0:00</span>" +
                   "<button class='volume'><img src='img/volumeOn.png' alt='volume'></button>" +
              "</div>" +
              "<a href='" + albumLink + "' target='_blank'>Écouter l'album</a>" +
           "</div>" +
      "</div>";
    body.insertAdjacentHTML("beforeend", modalHTML);

        // Ajoute les fonctionalités pour l'audio après que la modale ait été ajoutée
        var modal = document.getElementById(modalId);
        var audio = modal.querySelector("audio");
        var NewtotalTime = modal.querySelector(".TotalTime");
        var NewtrackTime = modal.querySelector(".track-time");
    
        if (audio) {
            // Met à jour le temps total
            audio.addEventListener('loadedmetadata', function () {
                NewtotalTime.textContent = formatTime(audio.duration);
            });
    
            // Met à jour le temps actuel pendant la lecture
            audio.addEventListener('timeupdate', function () {
                NewtrackTime.textContent = formatTime(audio.currentTime);
            });
        }

        // Ferme la fenêtre modale si on clique à l'extérieur et réinitialise l'audio
       modal.onclick = function (event) {
          if (event.target == modal) {
           modal.style.display = "none";
           if (audio) {
            audio.pause();
            audio.currentTime = 0;
            modal.querySelector(".playPauseBtn").innerHTML = "⏵";
            modal.querySelector(".audioSpectrum").src = 'img/SpectreAudioOff.jpg';
        }
           }
        }

         //Réinitilise l'audio lorsque l'audio a terminé
        var playPauseBtn = modal.querySelector(".playPauseBtn");
        var audioSpectrum = modal.querySelector(".audioSpectrum");
        
    
        if (audio) {
            audio.addEventListener('ended', function () {
                playPauseBtn.innerHTML = "⏵"; 
                audioSpectrum.src = 'img/SpectreAudioOff.jpg';
                audio.pause();
                audio.currentTime = 0;
            });
        }
  





    // Réinitialise les champs du formulaire après la soumission
    resetForm();

// Réinitialise les messages d'erreur après la soumission
    resetErrors();
    
   // Ferme la fenêtre modale du formulaire après la soumission
   modalForm.style.display = "none";

   
      // Réinitialise la compter de caractère après la soumission
      resetCounter();

      // Réinitialise la prévisualisation après la soumission
      resetPreview();

      




 
});



// Fonction pour réinitialiser les champs du formulaire
function resetForm() {
    document.getElementById("image").value = "";
    document.getElementById("album-name").value = "";
    document.getElementById("artist-name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("audio").value = "";
    document.getElementById("link").value = "";
}



// Limite de caractere
var description = document.getElementById("description")
var counter = document.getElementById("counter")
var limit = 705;
var almostLimit = 600;

// Affiche le compteur de caractères à 0/705
counter.textContent = 0 + "/" + limit;

//Quand on écrit dans "description", le compteur de caractere se met à jour
description.addEventListener("input", function () {
    var descriptionLength = description.value.length;// Compte le nombre de caractères tapés dans "description"
    counter.textContent = descriptionLength + "/" + limit; // Met à jour le compteur de caractères

    if (descriptionLength > almostLimit) {
        counter.style.color = "orange";
    }

  
    if (descriptionLength > 704) {
        counter.style.color = "red";
    }

 
    if (descriptionLength < almostLimit) {
        counter.style.color = "gray";
    }


});

// Fonction pour réinitialiser la compteur
function resetCounter() {
    counter.textContent = 0 + "/" + limit;
}


//Empêche le saut de ligne dans le textarea(fait car le texte pourait sortir de sa boite)
document.getElementById('description').addEventListener('keydown', function(Enter) {
    if (Enter.key === 'Enter') {
        Enter.preventDefault(); // Empêche le comportement par défaut de la touche Entrée
    }
});

// Prévisualisation 
var previewImage = document.getElementById("preview-image");
var previewTitle = document.getElementById("preview-title");
var previewArtist = document.getElementById("preview-artist");
var previewDescription = document.getElementById("previewDescription");
var previewImageModal = document.getElementById("previewImageModal");
var previewTitleModal = document.getElementById("preview-titleModal");
var previewArtistModal = document.getElementById("preview-artistModal");

// Mise à jour des élement situé dans la prévisualisation à partir de ce qui est écrit dans le formulaire

document.getElementById("image").addEventListener("input", function () {
    previewImage.src = this.value || "img/favicon.png"; // Met à jour à partir de ce qui est écrit dans le formulaire l'image ou utilise une image par défaut
});

document.getElementById("album-name").addEventListener("input", function () {
    previewTitle.textContent = this.value || "Titre de l'album";
});

document.getElementById("artist-name").addEventListener("input", function () {
    previewArtist.textContent = this.value || "Artiste";
});

document.getElementById("description").addEventListener("input", function () {
    previewDescription.textContent = this.value || "Description";
});

document.getElementById("image").addEventListener("input", function () {
    previewImageModal.src = this.value || "img/favicon.png";
});

document.getElementById("album-name").addEventListener("input", function () {
    previewTitleModal.textContent = this.value || "Titre de l'album";
});

document.getElementById("artist-name").addEventListener("input", function () {
    previewArtistModal.textContent = this.value || "Artiste";
});

// Fonction pour réinitialiser la prévisualisation
function resetPreview() {
    previewImage.src = "img/favicon.png";
    previewTitle.textContent = "Titre de l'album";
    previewArtist.textContent = "Artiste";
    previewDescription.textContent = "Description";
    previewImageModal.src = "img/favicon.png";
    previewTitleModal.textContent = "Titre de l'album";
    previewArtistModal.textContent = "Artiste";
}

//Messages Erreur Formulaire
document.getElementById('submit').addEventListener('click', function (submit){
    var nameInput = document.getElementById("album-name");
    var albumnameError = document.getElementById("album-nameError");
    var URLError = document.getElementById("URLError");
    var URLError2 = document.getElementById("URLError2");
    var imageInput = document.getElementById("image");
    var artistnameError = document.getElementById("artist-nameError");
    var artistnameInput = document.getElementById("artist-name");
    var descriptionError = document.getElementById("descriptionError");
    var descriptionInput = document.getElementById("description");
    var audioError = document.getElementById("audioError");
    var audioError2 = document.getElementById("audioError2");
    var audioInput = document.getElementById("audio");
    var linkError = document.getElementById("linkError");
    var linkInput = document.getElementById("link");


 // Vérification du champ du nom de l'album
    if (nameInput.validity.valid) {
        albumnameError.style.display = "none";// Cache le message d'erreur si le champ est valide
        nameInput.style.borderColor = "";//la bordure ne change pas
        nameInput.style.boxShadow = ""; //l'ombre ne change pas

      } else {
        albumnameError.style.display = "block";// Affiche le message d'erreur
        nameInput.style.borderColor = "red";// Change la couleur de la bordure
        nameInput.style.boxShadow = "5px 5px 0px red";// Change la couleur de l'ombre
        submit.preventDefault();// le formulaire ne peut pas se soumettre
      }




    if (imageInput.validity.valid) {
        URLError.style.display = "none";
        imageInput.style.borderColor = "";
        imageInput.style.boxShadow = ""; 


      } else {


       if (imageInput.value.trim() == "") {// Vérifie si le champ est vide
           URLError.style.display = "block";// Affiche un message pour champ vide
           imageInput.style.borderColor = "red";
           imageInput.style.boxShadow = "5px 5px 0px red";
           submit.preventDefault();
          } else {
            URLError2.style.display = "block";// Affiche un message pour URL invalide
            imageInput.style.borderColor = "red";
            imageInput.style.boxShadow = "5px 5px 0px red";
            submit.preventDefault();
    }
   }
      

      if (artistnameInput.validity.valid) {
        artistnameError.style.display = "none";
        artistnameInput.style.borderColor = "";
        artistnameInput.style.boxShadow = ""; 
     
      } else {
        artistnameError.style.display = "block";
        artistnameInput.style.borderColor = "red";
        artistnameInput.style.boxShadow = "5px 5px 0px red";
        submit.preventDefault();
      }

      if (descriptionInput.validity.valid) {
        descriptionError.style.display = "none";
        descriptionInput.style.borderColor = "";
        descriptionInput.style.boxShadow = ""; 
     
      } else {
        descriptionError.style.display = "block";
        descriptionInput.style.borderColor = "red";
        descriptionInput.style.boxShadow = "5px 5px 0px red";
        submit.preventDefault();
      }



      if (audioInput.validity.valid) {
        audioError.style.display = "none";
        audioInput.style.borderColor = "";
        audioInput.style.boxShadow = ""; 

      } else {


       if (audioInput.value.trim() == "") {
           audioError.style.display = "block";
           audioInput.style.borderColor = "red";
           audioInput.style.boxShadow = "5px 5px 0px red";
           submit.preventDefault();

          } else {
            audioError2.style.display = "block";
            audioInput.style.borderColor = "red";
            audioInput.style.boxShadow = "5px 5px 0px red";
            submit.preventDefault();
    }
   }

      if ( linkInput.validity.valid) {
        linkError.style.display = "none";
        linkInput.style.borderColor = "";
        linkInput.style.boxShadow = ""; 
     
      } else {
        linkError.style.display = "block";
        linkInput.style.borderColor = "red";
        linkInput.style.boxShadow = "5px 5px 0px red";
        submit.preventDefault();
    }



});

// Fonction pour réinitialiser les messages d'erreurs du formulaire
function resetErrors() {
    var nameInput = document.getElementById("album-name");
    var albumnameError = document.getElementById("album-nameError");
    var URLError = document.getElementById("URLError");
    var URLError2 = document.getElementById("URLError2");
    var imageInput = document.getElementById("image");
    var artistnameError = document.getElementById("artist-nameError");
    var artistnameInput = document.getElementById("artist-name");
    var descriptionError = document.getElementById("descriptionError");
    var descriptionInput = document.getElementById("description");
    var audioError = document.getElementById("audioError");
    var audioError2 = document.getElementById("audioError2");
    var audioInput = document.getElementById("audio");
    var linkError = document.getElementById("linkError");
    var linkInput = document.getElementById("link");

    // Réinitialise les messages d'erreur
    albumnameError.style.display = "none";
    URLError.style.display = "none";
    URLError2.style.display = "none";
    artistnameError.style.display = "none";
    descriptionError.style.display = "none";
    audioError.style.display = "none";
    audioError2.style.display = "none";
    linkError.style.display = "none";


    // Réinitialise les bordures et les ombre
    nameInput.style.borderColor = "";
    nameInput.style.boxShadow = "";
    imageInput.style.borderColor = "";
    imageInput.style.boxShadow = "";
    artistnameInput.style.borderColor = "";
    artistnameInput.style.boxShadow = "";
    descriptionInput.style.borderColor = "";
    descriptionInput.style.boxShadow = "";
    audioInput.style.borderColor = "";
    audioInput.style.boxShadow = "";
    linkInput.style.borderColor = "";
    linkInput.style.boxShadow = "";
}
