/* Dieses Skript wird ausgeführt, wenn der Browser index.html lädt. */

// Befehle werden sequenziell abgearbeitet ...

// Es folgen einige Deklarationen, die aber noch nicht ausgeführt werden ...

// Diese Funktion wirkt wie eine Klasse aus C++ und dient als Speicher für alle Cocktails
var DateiSpeicher = (function () {
    var Speicher = new Array();     // privates Array in dem die Cocktails gespeichert werden

    return {        // im return können alle öffentlichen Funktionen und variabeln angelegt werden
        searchID(id) {  // returnt die Datei an der Stelle "id"
			console.log("ID: " + id + ", Length: " + Speicher.length);
            if (id < Speicher.length) {
                return Speicher[id];
            }
            return {};
        },

        addDatei(pDatei) {    // fügt eine Datei der Liste hinzu und gibt die Position der neuen Datei zurück
            console.log(pDatei);
            Speicher.push(pDatei); 
            return Speicher.length - 1;          
        },

        deleteAll() {   // entfernt alle Elemente aus dem Array
            Speicher = new Array();    
        }
    }
})();

var aktuelleID = null;

var ajax = new XMLHttpRequest();    // includiert ajax Aufrufe

ajax.onreadystatechange = function() {  // diese Funktion wird automatisch aufgerufen, wenn eine ajax Anfrage gestellt wird
    if(ajax.readyState == 4){   // Stufe 4 entspricht der fertigen Antwort des Servers
		console.log("found something");
        var obj = JSON.parse(ajax.responseText);    // Inhalt der Antwort ist ein JSON Text, dieser wird in ein Objekt umgewandelt
		console.log(obj);
        if (obj.configs) {  // wenn das erhaltene Objekt "DateiListe" enthält wird die Funktion aufgerufen
            updateKonfigListe(obj.configs);
        }else if(obj.status) {
            window.alert(obj.status);
        }else {
        //if (obj.wlanKonfig) {
            updateKonfigAnsicht(ajax.responseText);
        }
    }
}

function updateKonfigListe(Speicher) {  // Diese Funktion verarbeitet die Informationen, die über die ajax Anfrage eingetroffen sind
    var ListDatei = document.getElementById("listDatei");   // sucht im HTML Dokument nach der ID
    while (ListDatei.lastChild) {                         // entfernt alle Cocktails aus der Liste
        ListDatei.removeChild(ListDatei.lastChild);
    }
    
    var li = document.createElement("li");                      // erzeugt Listenelement für Überschrift in der Liste
    li.className = "list-group-item list-group-item-info justify-content-between"   // fügt Klassen zur Überschrift hinzu
    li.innerHTML = "<strong>Konfigurationsdateien</strong>";    // fügt Text zur Überschrift hinzu
    // consumptionList.appendChild(li);                            // hängt Element in Liste ein

    Speicher.forEach(element => {                               // for each Schleife für alkoholische Cocktails
        console.log(element);                                   // Log zum Debuggen
        var li = document.createElement("li");                  // erzeugt neuen Listeneintag, noch nicht zugeordnet wo dieser hin soll
        li.className = "list-group-item list-item-flex"         // fügt Klassen zu Listenelement hinzu

        // HTML der Einträge wird erzeugt
        li.innerHTML = element.Name + 
        '<button class="btn btn-margin-0 col-2 m2-col-3" onclick="bearbeiten_btn_click(' 
        + DateiSpeicher.addDatei(element.Pfad) +                // neue Datei wird im Speicher angelegt und die Nummer in den Aufruf des Buttons eingetragen
        ')">Bearbeiten</button>';

        ListDatei.appendChild(li);    // neuer Listeneintag wird in Liste mit Configs eingehängt
    });
}

function updateKonfigAnsicht(aktuelleKonfig) {  // Diese Funktion verarbeitet die Informationen, die über die ajax Anfrage eingetroffen sind
    document.getElementById("configtextarea").value = aktuelleKonfig;   // Fügt aktuelle Konfig in Textfeld ein
}

function bearbeiten_btn_click(pID) {  // Diese Funktion wird aus dem HTML Dokument aufgerufen, wenn auf den entsprechenden Button geklickt wird
    aktuelleID = pID;
    ajax.open("POST", "/config",true);                            // erstellt neue ajax Anfage
    ajax.setRequestHeader("Content-type", "application/json");  // legt Parameter im Header der Anfage fest
    ajax.send("{ \"file\": \"" + DateiSpeicher.searchID(pID) + "\"}");     // sendet Anfage mit Name der Datei in JSON Format als Inhalt 
}

function speichern_btn_click() {  // Diese Funktion wird aus dem HTML Dokument aufgerufen, wenn auf den entsprechenden Button geklickt wird
    var text = document.getElementById("configtextarea").value;     // Textfeld auslesen
    var config = JSON.parse(text);                                  // Text in Objekt umwandeln
    if (config) {                                                   // Prüfen, ob ein objekt aus dem Text generriert wurde
        var obj = new Object;                                       // Neues Objekt anlegen
        obj.Pfad = DateiSpeicher.searchID(aktuelleID);              // Pfad im neuen Objekt anlegen
        obj.Config = config;                                        // Konfiguration als Objekt anlegen
        ajax.open("POST","/config_save",true);                           // erstellt neue ajax Anfage
        ajax.setRequestHeader("Content-type", "application/json");  // legt Parameter im Header der Anfage fest
        ajax.send(JSON.stringify(obj));                             // sendet Anfage mit neuer Konfig in JSON Format als Inhalt 
    } else {
        window.alert("Syntaxfehler in der Konfiguration.");         // Fehlermeldung
    }
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
    
    ajax.open("GET","/configs", true);                          // ajax Anfage für Cocktailliste
    ajax.send();                                                // senden der Anfrage ohne weiteren Inhalt
}
