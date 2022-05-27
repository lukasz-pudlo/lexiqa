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

const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

if (!indexedDB) {
    console.log("IndexedDB could not be found in this browser.");
}

// 2
const request = indexedDB.open("LexiqaDatabase", 1);

request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
};

request.onupgradeneeded = function () {
    //1
    const db = request.result;

    //2
    const store = db.createObjectStore("words", { keyPath: "id" });

    //3
    store.createIndex("source_word_meaning", ["source_word"], { unique: false });

    store.createIndex("target_word_meaning", ["target_word"], { unique: false });
};

request.onsuccess = function () {
    console.log("Database opened successfully");

    const db = request.result;

    // 1
    const transaction = db.transaction("words", "readwrite");

    //2
    const store = transaction.objectStore("words");
    const sourceIndex = store.index("source_word_meaning");
    const targetIndex = store.index("target_word_meaning");

    //3
    store.put({ id: 1, source_word: "maison", target_word: "house" });
    store.put({ id: 2, source_word: "voiture", target_word: "car" });

    //4
    const idQuery = store.get(2);
    const sourceQuery = sourceIndex.getAll();
    const targetQuery = targetIndex.getAll();

    // 5
    idQuery.onsuccess = function () {
        console.log('idQuery', idQuery.result);
    };
    colourQuery.onsuccess = function () {
        console.log('sourceQuery', sourceQuery.result);
    };
    colourMakeQuery.onsuccess = function () {
        console.log('targetQuery', targetQuery.result);
    };

    // 6
    transaction.oncomplete = function () {
        db.close();
    };
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