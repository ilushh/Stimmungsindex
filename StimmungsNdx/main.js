//einfach eingesetzt was auf firebase war
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

//dieser import ist vom random programm nicht 
import { onSnapshot, getDoc, getDocFromCache, doc, getFirestore, addDoc, DocumentSnapshot, Firestore, DocumentReference, updateDoc, setDoc, getDocs, collection, documentId } from "firebase/firestore";
import './style.css'

const firebaseConfig = {
  apiKey: "AIzaSyBRgqLBodBJg4KwkGpjRIJ_7mpe0wvuL50",
  authDomain: "stimmungsndx.firebaseapp.com",
  projectId: "stimmungsndx",
  storageBucket: "stimmungsndx.appspot.com",
  messagingSenderId: "435372091585",
  appId: "1:435372091585:web:1283bf0a6213b26133cc40",
  measurementId: "G-GTBBJ107V5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();

//function  für Textfeld 1
document.getElementById("go").addEventListener("click", () => {
  alert("Ihre Stimmungseingaben werden an den Server gesendet")
  const docRef = addDoc(collection(db,"User"), {
    Text: document.getElementById("input").value
  })
})
// import javascriptLogo from './javascript.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))


/* Speichern
"form" wurde auf HTML zuvor definiert
"querySelectorAll" gibt eine Liste von Elementen  zurück was auf CSS sich bezieht
".slider" ist der CSS-Selektor, der Elemente auswählt, die die Klasse "slider" haben.*/

const form = document.querySelector("#survey-form");
const sliders = form.querySelectorAll(".slider");
const result = document.querySelector("#result"); // Für einzelne Teilnehmer

const results = [];


/*Code snippet hat die Aufgabe für jedes Input-Element in der in der Variable "sliders" 
gespeicherten Liste von HTML-Elementen, einen Event-Listener zu registrieren, 
der auf das "input"-Event reagiert.*/

sliders.forEach(slider => {
  slider.addEventListener("input", function() {
    const id = this.id;
    const valueDisplay = document.querySelector(`#${id}-value`);
    valueDisplay.textContent = this.value;
  });
});

// Wenn das Formular gesendet wird, wird eine Funktion ausgeführt, die den Wert des Formulars berechnet.
form.addEventListener("submit", event => {
  event.preventDefault();

// Durchschnitt der 5 Fragen
const question1 = parseInt(document.querySelector("#question1").value, 10);
const question2 = parseInt(document.querySelector("#question2").value, 10);
const question3 = parseInt(document.querySelector("#question3").value, 10);
const question4 = parseInt(document.querySelector("#question4").value, 10);
const question5 = parseInt(document.querySelector("#question5").value, 10);

const average = (question1 + question2 + question3 + question4 + question5) / 5;

// fügt den durchschnittlichen Stimmungsindex des aktuellen Formulars in das results-Array ein
  results.push(average);


// Durchschnittsbewertung jedes Benutzers als Teil der Gesamtbewertungen in einem Ergebnisfeld angezeigt.
const container = document.createElement('div');
container.className = 'centered'; // um mit CSS arbeiten zu können bezogen auf Teilnehmer
container.innerHTML = `Teilnehmer ${results.length}: ${average}<br>`;

document.body.appendChild(container);


// nach 20 Eingaben werden die Einträge gelöscht
  form.reset();


// wenn 20 Stimmen abgegeben sind wird der Stimungsindex ausgerechnet.
  if (results.length === 20) {
    // kalkulieren
    const overallAverage = results.reduce((sum, result) => sum + result, 0) / results.length;
    result.innerHTML += `Der durchschnittliche Stimmungsindex aller Teilnehmer beträgt: ${overallAverage}`;
  }
});

/* --------------erstellt dieser eine Schaltfläche, 
die es dem Benutzer ermöglicht, eine Datei mit Umfrageergebnissen 
im JSON-Format herunterzuladen.-----------------*/



function downloadResults() {
  const jsonData = JSON.stringify(results);
/*Die Funktion ruft JSON.stringify(results) auf, 
um die Daten in der Variablen results in einen JSON-String umzuwandeln. 
Der JSON-String wird in der Variablen jsonData gespeichert.*/


  const blob = new Blob([jsonData], { type: 'application/json' });
  /*Dann wird ein neues Blob-Objekt erstellt, indem der JSON-String jsonData als Daten verwendet wird. 
  Die Option {type: 'application/json'} gibt an, dass es sich bei den Daten im Blob um JSON-Daten handelt. 
  Das Blob-Objekt wird in der Variablen blob gespeichert.*/

  const url = URL.createObjectURL(blob);
  /*Die Funktion erstellt eine temporäre URL für das Blob-Objekt blob mit der Methode URL.createObjectURL(blob). 
  URL wird in der Variablen url gespeichert.*/


  const a = document.createElement('a');
  //neues Element wird erstellt und in a gespeichert.
  
  a.href = url;
  a.download = 'Ergebnisse.json';
  a.click();

  URL.revokeObjectURL(url); // Blob-Objekt wird Freigegeben und damit die verbundene Speicherung freigesetzt
}

/* erstellt einen Button zum Download */
const downloadButton = document.createElement('button');
downloadButton.textContent = 'Download Ergebnis';
downloadButton.addEventListener('click', downloadResults);

// fügen Sie die Schaltfläche zur Seite hinzu
document.body.appendChild(downloadButton);
