
// Befehle werden sequenziell abgearbeitet ...

// Es folgen einige Deklarationen, die aber noch nicht ausgeführt werden ...



var ajax = new XMLHttpRequest();    // includiert ajax Aufrufe

ajax.onreadystatechange = function() {  // diese Funktion wird automatisch aufgerufen, wenn eine ajax Anfrage gestellt wird
    if(ajax.readyState == 4){           // Stufe 4 entspricht der fertigen Antwort des Servers
        var Information = JSON.parse(ajax.responseText);    // Inhalt der Antwort ist ein JSON Text, dieser wird in ein Objekt umgewandelt
        updateInformation(Information); // Funktion zum verarbeiten wird aufgerufen
    }
}

function updateInformation(Speicher) {  // Diese Funktion verarbeitet die Informationen, die über die ajax Anfrage eingetroffen sind
    var numberUser = document.getElementById("numberUser");     // sucht im HTML Dokument nach der ID
    numberUser.innerHTML = Speicher["numberUser"];              // fügt Wert aus ajax Anfage an der Stelle ins HTML Dokument ein

    var numberQueue = document.getElementById("numberQueue");   // sucht im HTML Dokument nach der ID
    numberQueue.innerHTML = Speicher["numberQueue"];            // fügt Wert aus ajax Anfage an der Stelle ins HTML Dokument ein

    var currentOrder = document.getElementById("currentOrder"); // sucht im HTML Dokument nach der ID
    currentOrder.innerHTML = Speicher["currentOrder"];          // fügt Wert aus ajax Anfage an der Stelle ins HTML Dokument ein

    var orderList = document.getElementById("orderList");       // sucht im HTML Dokument nach der ID
    while (orderList.lastChild) {                               // entfernt alle Eintage aus der Liste
        orderList.removeChild(orderList.lastChild);
    }
    var li = document.createElement("li");                      // erzeugt Listenelement für Überschrift in der Liste
    li.className = "list-group-item list-group-item-info justify-content-between"   // fügt Klassen zur Überschrift hinzu
    li.innerHTML = "<strong> Meine Bestellungen</strong>";      // fügt Text zur Überschrift hinzu 
    orderList.appendChild(li);                                  // hängt Element in Liste ein
    Speicher["orderList"].forEach(element => {                  // for each Schleife für Liste der Order
        console.log(element);                                   // Log zum Debuggen
        var li = document.createElement("li");                  // erzeugt Listenelement
        li.className = "list-group-item justify-content-between"    // fügt Klassen dem Listenelement hinzu
        li.innerHTML = element;                                 // fügt den gesamten Inhalt der geschickten Informationen ein, kann je nach bedarf angepasst werden
        orderList.appendChild(li);                              // hängt Element in Liste ein
    });

    var tableOne = document.getElementById("tableOne");         // sucht im HTML Dokument nach der ID
    tableOne.innerHTML = "1: " + Speicher["tableOne"];          // fügt Wert aus ajax Anfage an der Stelle ins HTML Dokument ein
    var tableTwo = document.getElementById("tableTwo");         // sucht im HTML Dokument nach der ID
    tableTwo.innerHTML = "2: " + Speicher["tableTwo"];          // fügt Wert aus ajax Anfage an der Stelle ins HTML Dokument ein
    var tableThree = document.getElementById("tableThree");     // sucht im HTML Dokument nach der ID
    tableThree.innerHTML = "3: " + Speicher["tableThree"];      // fügt Wert aus ajax Anfage an der Stelle ins HTML Dokument ein
    var tableFour = document.getElementById("tableFour");       // sucht im HTML Dokument nach der ID
    tableFour.innerHTML = "4: " + Speicher["tableFour"];        // fügt Wert aus ajax Anfage an der Stelle ins HTML Dokument ein
    var tableFive = document.getElementById("tableFive");       // sucht im HTML Dokument nach der ID
    tableFive.innerHTML = "5: " + Speicher["tableFive"];        // fügt Wert aus ajax Anfage an der Stelle ins HTML Dokument ein

    var consumptionList = document.getElementById("consumptionList");   // sucht im HTML Dokument nach der ID
    while (consumptionList.lastChild) {                         // entfernt alle Eintage aus der Liste
        consumptionList.removeChild(consumptionList.lastChild);
    }
    var li = document.createElement("li");                      // erzeugt Listenelement für Überschrift in der Liste
    li.className = "list-group-item list-group-item-info justify-content-between"   // fügt Klassen zur Überschrift hinzu
    li.innerHTML = "<strong> Verbrauch</strong>";               // fügt Text zur Überschrift hinzu
    consumptionList.appendChild(li);                            // hängt Element in Liste ein
    Speicher["consumptionList"].forEach(element => {            // for each Schleife für Liste der Verbräuche
        console.log(element);                                   // Log zum Debuggen
        var li = document.createElement("li");                  // erzeugt Listenelement
        li.className = "list-group-item justify-content-between"    // fügt Klassen dem Listenelement hinzu
        li.innerHTML = element;                                 // fügt den gesamten Inhalt der geschickten Informationen ein, kann je nach bedarf angepasst werden
        consumptionList.appendChild(li);                        // hängt Element in Liste ein
    });
}

function get_new_information() {            // Funktion die aus HTML Dokument aufgerufen wird um Imformationen zu aktualisieren
    ajax.open("GET","information", true);   // neue ajax Anfrage um Informationen zu erhalten
    ajax.send();                            // senden der Anfage ohne weitere Inhalte
}

function sleep(ms) {    //implementiert sleep
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * "console.log" schreibt auf die Konsole des Browsers
 * Das Konsolenfenster muss im Browser explizit geöffnet werden.
 */
console.log("The script is going to start..."); // Debuggeintag damit der Start des Skripts nachverfolgt werden kann

start();

async function start() {
    await sleep(1);                                             // 1 ms sleep damit HTML gerendert werden kann
    
    get_new_information();  // initiale Anfrage um die neusten Informationen auf der Seite anzuzeigen
}