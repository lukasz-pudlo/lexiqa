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

// Initialise the database name independetly of how it is referred in specific browsers
const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

if (!indexedDB) {
    console.log("IndexedDB could not be found in this browser.");
}

//Make an open request to the database version 1. The first parameter is the name of the database and second
// parameter is the version
const request = indexedDB.open("LexiqaDatabase", 1);

request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
};

// Trigger the on upgrade event when a new database is created or a new version of the database is added
request.onupgradeneeded = function () {
    //1
    const db = request.result;

    //2
    const store = db.createObjectStore("words", { keyPath: "id", autoIncrement: true });

    //3
    store.createIndex("word_source_meaning", ["word_source"], { unique: false });
};

request.onsuccess = function () {
    console.log("Database opened successfully");

    const db = request.result;

    // 1
    const transaction = db.transaction("words", "readwrite");

    //2
    const store = transaction.objectStore("words");
    const word_source_meaning = store.index("word_source_meaning");

//     transaction.oncomplete = function () {
//       db.close();
//     };
  };

function divideText() {
    // Initialise an empty list of words
    var wordList = [];
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
        store.put({ word_source: word, word_target: "translation" });
    });
}