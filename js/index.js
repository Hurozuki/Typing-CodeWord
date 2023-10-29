"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.onload = () => {
    // タイピング文字列表示要素
    const mainContent = document.getElementById("main-content");
    // 実際にユーザーが打鍵する文字列要素（#sub-contentのうち、白色の要素）
    const typeText = document.getElementById("type-text");
    // 実際にユーザーが打鍵した文字列要素（#sub-contentのうち、色付きの要素）
    const typedText = document.getElementById("typed-text");
    // 説明文表示div要素
    const descriptionCard = document.getElementById("description-card");
    // 「START!」/「STOP」ボタン
    const startStopButton = document.getElementById("start-stop-button");
    const missCountElement = document.getElementById("miss-count");
    // タイプミスカウンター
    let missCount = 0;
    // 現在、ゲームを行っているか
    let gamePlay = false;
    // タイピング文字を識別する処理
    document.addEventListener("keypress", (e) => {
        if (typeText !== null && typeText.textContent !== null && typedText !== null && typeText.textContent.length > 0 && missCountElement !== null) {
            let nextTypingString = typeText.textContent[0];
            if (e.key === nextTypingString) {
                // 成功時の処理
                // 効果音
                const typeSound = new Audio();
                typeSound.src = "./../assets/audio/typing-sound.mp3";
                typeSound.play();
                const newTypeText = typeText.textContent.substring(1);
                typedText.textContent += nextTypingString;
                typeText.textContent = newTypeText;
                if (typeText.textContent.length === 0) {
                    newTyping(getRandomData(typingData));
                }
            }
            else {
                // 打ち間違え時の処理
                // 効果音
                const typoSound = new Audio();
                typoSound.src = "./../assets/audio/typo-sound.mp3";
                typoSound.play();
                missCount++;
                missCountElement.textContent = missCount.toString();
                document.body.style.backgroundColor = "#6b1a22";
                document.body.classList.remove("bg-dark");
                setTimeout(() => {
                    document.body.style.backgroundColor = "";
                    document.body.classList.add("bg-dark");
                }, 50);
            }
        }
    });
    // 配列からランダムな値を取得する関数
    function getRandomData(array) {
        if (array.length !== 0) {
            const randomIndex = Math.floor(Math.random() * array.length);
            return array[randomIndex];
        }
        else {
            return null;
        }
    }
    // 1秒後に文字列を表示する非同期関数
    function showContent(showContent) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (mainContent !== null) {
                    mainContent.textContent = showContent;
                }
                resolve(null);
            }, 750);
        });
    }
    // タイピングする文字列表示関数
    function newTyping(showObj) {
        // ゲーム開始をグローバル変数で管理
        if (!gamePlay) {
            gamePlay = true;
        }
        // 前回のタイピング文字列削除
        if (typedText !== null) {
            typedText.textContent = "";
        }
        // タイピング文字列を表示
        if (mainContent !== null && showObj !== null && typeText !== null && descriptionCard !== null) {
            mainContent.textContent = showObj.word;
            typeText.textContent = showObj.word;
            descriptionCard.innerHTML = showObj.description.replace(/\n/g, "<br>");
            ;
        }
    }
    // 実際にカウントダウンを行う関数
    function countDown() {
        return __awaiter(this, void 0, void 0, function* () {
            if (descriptionCard !== null) {
                descriptionCard.style.display = "none";
            }
            for (let i = 3; i >= 1; i--) {
                yield showContent(i.toString());
            }
            yield setTimeout(() => {
                if (descriptionCard !== null) {
                    descriptionCard.style.display = "block";
                }
                newTyping(getRandomData(typingData));
            }, 1000);
        });
    }
    if (startStopButton !== null && typeText !== null && mainContent !== null && descriptionCard !== null) {
        // ゲーム開始処理
        startStopButton.addEventListener("click", (event) => {
            startStopButton.style.display = "none";
            startStopButton.textContent = "STOP";
            // 3カウント後、タイピング文字列表示
            countDown();
        });
    }
};
