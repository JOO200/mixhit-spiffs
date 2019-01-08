/* Dieses Skript wird ausgeführt, wenn der Browser index.html lädt. */

// Befehle werden sequenziell abgearbeitet ...

// Es folgen einige Deklarationen, die aber noch nicht ausgeführt werden ...

// Diese Klasse dient als Struckt zum Speichern eines Cocktails
class Cocktail {
	constructor(pCocktail, pVolume) {
		console.log(pCocktail); 
		this.Name = pCocktail.Name;
		this.Volume = pVolume;
		this.Inhaltsstoffe = pCocktail.Inhaltsstoffe;
	}
}

// Diese Funktion wirkt wie eine Klasse aus C++ und dient als Speicher für alle Cocktails
var CocktailSpeicher = (function () {
    var Speicher = new Array();     // privates Array in dem die Cocktails gespeichert werden

    return {        // im return können alle öffentlichen Funktionen und variabeln angelegt werden
        searchID(id) {  // returnt den Cocktail an der Stelle "id"
			console.log("ID: " + id + ", Length: " + Speicher.length);
            if (id < Speicher.length) {
                return Speicher[id];
            }
            return {};
        },

        addCocktail(pCocktail) {    // fügt einen Cocktail der Liste hinzu und gibt die Position des neuen Cocktails zurück
            console.log(pCocktail);
            Speicher.push(pCocktail); 
            return Speicher.length - 1;          
        },

        deleteAll() {   // entfernt alle Elemente aus dem Array
            Speicher = new Array();    
        }
    }
})();


var ajax = new XMLHttpRequest();    // includiert ajax Aufrufe

ajax.onreadystatechange = function() {  // diese Funktion wird automatisch aufgerufen, wenn eine ajax Anfrage gestellt wird
    if(ajax.readyState == 4 && ajax.status == 200){   // Stufe 4 entspricht der fertigen Antwort des Servers
        var obj = JSON.parse(ajax.responseText);    // Inhalt der Antwort ist ein JSON Text, dieser wird in ein Objekt umgewandelt
        if (obj.CocktailListe) {    // wenn das erhaltene Objekt "CocktailListe" enthält wird die Funktion aufgerufen
            updateInformation(obj.CocktailListe);
        } else if(obj.status) {
            window.alert(obj.status);
        }
    }
}

function updateInformation(Speicher) {  // Diese Funktion verarbeitet die Informationen, die über die ajax Anfrage eingetroffen sind
    var ListAlkoholisch = document.getElementById("listAlk");   // sucht im HTML Dokument nach der ID
    while (ListAlkoholisch.lastChild) {                         // entfernt alle Cocktails aus der Liste
        ListAlkoholisch.removeChild(ListAlkoholisch.lastChild);
    }
    ListAlkoholisch.appendChild(document.createElement("ul"));  // erzeugt eine neue Liste
    var results = ListAlkoholisch.childNodes[0];
    Speicher.AlkoholischeCocktails.forEach(element => {         // for each Schleife für alkoholische Cocktails
        console.log(element);                                   // Log zum Debuggen
        var li = document.createElement("li");                  // erzeugt neuen Listeneintag, noch nicht zugeordnet wo dieser hin soll

		var textelement = element.Cocktail.Inhaltsstoffe.map(obj => {
            return "" + obj.Anteil +"% " + obj.Zutat;
        });
		var text = textelement.join(", ");

        // HTML der Einträge wird erzeugt
        li.innerHTML = '<div class="col-12"><div class="col-7 m2-col-4" id="listDiv"><h3>' 
        + element.Cocktail.Name + '</h3><p>' + text + 
        '</p></div><button class="btn col-2 m2-col-3" onclick="small_button(' 
        + CocktailSpeicher.addCocktail(new Cocktail(element.Cocktail, 120)) +    // neuer Cocktail mit 120 ml wird im Speicher angelegt und die Nummer in den Aufruf des Buttons eingetragen
        ')">120 ml</button><button class="btn col-2 m2-col-3" onclick="small_button('
        + CocktailSpeicher.addCocktail(new Cocktail(element.Cocktail, 250)) +    // neuer Cocktail mit 250 ml wird im Speicher angelegt und die Nummer in den Aufruf des Buttons eingetragen
        ')">250 ml</button></div>';

        results.appendChild(li);    // neuer Listeneintag wird in Liste mit alkoholischen Cocktails angehängt
    });

    var ListNichtAlkoholisch = document.getElementById("listAlkFree");      // sucht im HTML Dokument nach der ID
    while (ListNichtAlkoholisch.lastChild) {                                // entfernt alle Cocktails aus der Liste
        ListNichtAlkoholisch.removeChild(ListNichtAlkoholisch.lastChild);
    }
    ListNichtAlkoholisch.appendChild(document.createElement("ul"));         // erzeugt eine neue Liste
    var results = ListNichtAlkoholisch.childNodes[0];
    Speicher.AlkoholfreieCocktails.forEach(element => {                     // for each Schleife für nicht alkoholische Cocktails
        console.log(element);                                               // Log zum Debuggen
        var li = document.createElement("li");                              // erzeugt neuen Listeneintag, noch nicht zugeordnet wo dieser hin soll
        
		var textelement = element.Cocktail.Inhaltsstoffe.map(obj => {
            return "" + obj.Anteil +"% " + obj.Zutat;
        });
		var text = textelement.join(", ");

        // HTML der Einträge wird erzeugt
        li.innerHTML = '<div class="col-12"><div class="col-7 m2-col-4" id="listDiv"><h3>' 
        + element.Cocktail.Name + '</h3><p>' + text + 
        '</p></div><button class="btn col-2 m2-col-3" onclick="small_button(' 
        + CocktailSpeicher.addCocktail(new Cocktail(element.Cocktail, 120)) +    // neuer Cocktail mit 120 ml wird im Speicher angelegt und die Nummer in den Aufruf des Buttons eingetragen
        ')">120 ml</button><button class="btn col-2 m2-col-3" onclick="small_button('
        + CocktailSpeicher.addCocktail(new Cocktail(element.Cocktail, 250)) +    // neuer Cocktail mit 250 ml wird im Speicher angelegt und die Nummer in den Aufruf des Buttons eingetragen
        ')">250 ml</button></div>';

        results.appendChild(li);    // neuer Listeneintag wird in Liste mit alkoholischen Cocktails angehängt
    });
}

function small_button(pID) {  // Diese Funktion wird aus dem HTML Dokument aufgerufen, wenn auf den entsprechenden Button geklickt wird
    ajax.open("POST","/cocktail",true);                          // erstellt neue ajax Anfage
    ajax.setRequestHeader("Content-type", "application/json");  // legt Parameter im Header der Anfage fest
    ajax.send(JSON.stringify(CocktailSpeicher.searchID(pID)));  // sendet Anfage mit Cocktail in JSON Format als Inhalt 
    console.log(CocktailSpeicher.searchID(pID));
    window.alert("Vielen Dank für deine Bestellung! Bitte stelle das Glas auf den RFID-Chip.");          // erzeugt Benachrichtigungsfenster im Browser, damit der Benutzer informiert wird
}

function sleep(ms) {    //implementiert sleep
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
/**
 * "console.log" schreibt auf die Konsole des Browsers
 * Das Konsolenfenster muss im Browser explizit geöffnet werden.
 */
console.log("The script is going to start...");                 // Debuggeintag damit der Start des Skripts nachverfolgt werden kann

start();

async function start() {
    await sleep(1);                                             // 1 ms sleep damit HTML gerendert werden kann
    
    ajax.open("GET","/cocktails", true);                         // ajax Anfage für Cocktailliste
    ajax.send();                                                // senden der Anfrage ohne weiteren Inhalt
}
