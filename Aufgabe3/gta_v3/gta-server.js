/**
 * Template für Übungsaufgabe VS1lab/Aufgabe3
 * Das Skript soll die Serverseite der gegebenen Client Komponenten im
 * Verzeichnisbaum implementieren. Dazu müssen die TODOs erledigt werden.
 */

/**
 * Definiere Modul Abhängigkeiten und erzeuge Express app.
 */

var http = require('http');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');

var app;
app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Setze ejs als View Engine
app.set('view engine', 'ejs');

/**
 * Konfiguriere den Pfad für statische Dateien.
 * Teste das Ergebnis im Browser unter 'http://localhost:3000/'.
 */

// TODO: CODE ERGÄNZEN
app.use(express.static(__dirname + "/public"));

/**
 * Konstruktor für GeoTag Objekte.
 * GeoTag Objekte sollen min. alle Felder des 'tag-form' Formulars aufnehmen.
 */

// TODO: CODE ERGÄNZEN
function geoTag() {
	this.latitude = document.getElementById("latitude");
	this.longitude = document.getElementById("longitude");
	this.name = document.getElementById("name");
	this.hashtag = document.getElementById("hashtag");
}

/**
 * Modul für 'In-Memory'-Speicherung von GeoTags mit folgenden Komponenten:
 * - Array als Speicher für Geo Tags.
 * - Funktion zur Suche von Geo Tags in einem Radius um eine Koordinate.
 * - Funktion zur Suche von Geo Tags nach Suchbegriff.
 * - Funktion zum hinzufügen eines Geo Tags.
 * - Funktion zum Löschen eines Geo Tags.
 */

// TODO: CODE ERGÄNZEN
var geoTagsModule = (function() {
	
	// Private Attribute
	// speichert alle geoTags
	var geoTags = [];

	// Oeffentliche Attribute
	return {

		// Sucht geoTags in einem Radius um eine Koordinate und gibt ein Array zurück, welches alle in Frage kommenden geoTags enthält
		searchGeoTagsByCoordinates : function(latitude, longitude, radius) {

			var counter = 0;
			var geoTagsFound = [];

			geoTags.forEach(function (element) {
				// Der Abstand von zwei Punkten ist die Wurzel aus der Summe der Quadraten der Differenzen der einzelnen Komponenten
				if(radius >= Math.sqrt(Math.pow(element.latitude - latitude, 2) + Math.pow(element.longitude - longitude, 2))) {
					geoTagsFound.push(geoTags[counter]);
				}

				counter++;
			});

			return geoTagsFound;
		},


		// Sucht geoTags nach einem Suchbegriff und gibt ein Array zurück, welches alle geoTags enthält die in ihrem Namen den Suchbegriff enthalten
		searchGeoTagsBySearchterm : function(searchterm) {

			var counter = 0;
			var geoTagsFound = [];

			geoTags.forEach(function (element) {
				if(element.name.toString().includes(searchterm.toString())) {
					geoTagsFound.push(geoTags[counter]);
				}

				counter++;
			});

			return geoTagsFound;
		},


		// Fügt einen geoTag hinzu
		addGeoTag : function(geoTag) {
			geoTags.push(geoTag);
		},


		// Löscht einen geoTag, dabei werden die Koordinaten, der name und der Hashtag aller geoTags verglichen und alle infrage kommenden gelöscht
		deleteGeoTag : function(geoTag) {

			var counter = 0;

			geoTags.forEach(function (element) {
				if(geoTag.latitude == element.latitude && 
				geoTag.longitude == element.longitude && 
				geoTag.name == element.name && 
				geoTag.hashtag == element.hashtag) {
					geoTags.remove(counter);
				}

				couner++;
			});
		}
	};

})();

/**
 * Route mit Pfad '/' für HTTP 'GET' Requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests enthalten keine Parameter
 *
 * Als Response wird das ejs-Template ohne Geo Tag Objekte gerendert.
 */

app.get('/', function(req, res) {
    res.render('gta', {
        taglist: []
    });
});

/**
 * Route mit Pfad '/tagging' für HTTP 'POST' Requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests enthalten im Body die Felder des 'tag-form' Formulars.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * Mit den Formulardaten wird ein neuer Geo Tag erstellt und gespeichert.
 *
 * Als Response wird das ejs-Template mit Geo Tag Objekten gerendert.
 * Die Objekte liegen in einem Standard Radius um die Koordinate (lat, lon).
 */

// TODO: CODE ERGÄNZEN START

/**
 * Route mit Pfad '/discovery' für HTTP 'POST' Requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests enthalten im Body die Felder des 'filter-form' Formulars.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * Als Response wird das ejs-Template mit Geo Tag Objekten gerendert.
 * Die Objekte liegen in einem Standard Radius um die Koordinate (lat, lon).
 * Falls 'term' vorhanden ist, wird nach Suchwort gefiltert.
 */

// TODO: CODE ERGÄNZEN

/**
 * Setze Port und speichere in Express.
 */

var port = 3000;
app.set('port', port);

/**
 * Erstelle HTTP Server
 */

var server = http.createServer(app);

/**
 * Horche auf dem Port an allen Netzwerk-Interfaces
 */

server.listen(port);
