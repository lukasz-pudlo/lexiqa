/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

// import tr from "googletrans";

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

}

// Info on how to work with IndexedDB: 
// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || { READ_WRITE: "readwrite" }; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

if (!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

//Make an open request to the database version 1. The first parameter is the name of the database and second
// parameter is the version

var request = window.indexedDB.open("LexiqaDatabase", 1);

var db;
var request = indexedDB.open("MyTestDatabase");
request.onerror = event => {
    console.log("Why didn't you allow my web app to use IndexedDB?!");
};
request.onsuccess = event => {
    db = event.target.result;
};

db.onerror = event => {
    // Generic error handler for all errors targeted at this database's
    // requests!
    console.error("Database error: " + event.target.errorCode);
};

// Trigger the on upgrade event when a new database is created or a new version of the database is added
// This event is only implemented in recent browsers
request.onupgradeneeded = event => {
    // Save the IDBDatabase interface
    var db = event.target.result;

    // Create an objectStore for this database
    var objectStore = db.createObjectStore("name", { keyPath: "myKey" });
};

// Initialise an empty list of words
var wordList = [];

function divideText() {
    // Get the value entered into the textbox
    var enteredText = $("#entered-text").val();
    // Split the entered text on empty spaces between words
    var splitText = enteredText.split(' ');
    // Push each word into the wordList
    splitText.forEach((word) => {
        wordList.push(word);
    });
    return wordList;
}

function addWordsFromWordList() {
    var wordList = divideText();
    var wrapperDiv = document.getElementById("wrapperDiv");
    // Initialise an empty unordered list
    var unorderedList = document.createElement("ul");
    wrapperDiv.appendChild(unorderedList);

    wordList.forEach((word) => {
        var wordLi = document.createElement("li");
        wordLi.appendChild(document.createTextNode(`${word}`));
        unorderedList.appendChild(wordLi);
    });
}