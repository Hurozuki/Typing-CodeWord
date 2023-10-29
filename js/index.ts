
window.onload = (): void => {


    // タイピング文字列表示要素
    const mainContent: HTMLElement | null = document.getElementById("main-content");
    // 実際にユーザーが打鍵する文字列要素（#sub-contentのうち、白色の要素）
    const typeText: HTMLElement | null = document.getElementById("type-text");
    // 実際にユーザーが打鍵した文字列要素（#sub-contentのうち、色付きの要素）
    const typedText: HTMLElement | null = document.getElementById("typed-text");
    // 説明文表示div要素
    const descriptionCard: HTMLElement | null = document.getElementById("description-card");

    // 「START!」/「STOP」ボタン
    const startStopButton: HTMLElement | null = document.getElementById("start-stop-button");

    const missCountElement: HTMLElement | null = document.getElementById("miss-count");

    // タイプミスカウンター
    let missCount: number = 0;



    // 現在、ゲームを行っているか
    let gamePlay: boolean = false;

    type TypingData = {
        word: string,
        description: string,
    }








    // タイピング文字を識別する処理
    document.addEventListener("keypress", (e: KeyboardEvent) => {
        if (typeText !== null && typeText.textContent !== null && typedText !== null && typeText.textContent.length > 0 && missCountElement !== null) {
            let nextTypingString = typeText.textContent[0];

            if (e.key === nextTypingString) {
                // 成功時の処理

                // 効果音
                const typeSound: HTMLAudioElement = new Audio();
                typeSound.src = "./../assets/audio/typing-sound.mp3";
                typeSound.play();

                const newTypeText = typeText.textContent.substring(1);
                typedText.textContent += nextTypingString;
                typeText.textContent = newTypeText;
                if (typeText.textContent.length === 0) {
                    newTyping(getRandomData(typingData));
                }

            } else {
                // 打ち間違え時の処理

                // 効果音
                const typoSound: HTMLAudioElement = new Audio();
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
    function getRandomData(array: TypingData[]): TypingData | null {
        if (array.length !== 0) {
            const randomIndex: number = Math.floor(Math.random() * array.length);
            return array[randomIndex];
        } else {
            return null;
        }
    }






    // 1秒後に文字列を表示する非同期関数
    function showContent(showContent: string): Promise<null> {
        return new Promise((resolve, reject) => {
            setTimeout((): void => {
                if (mainContent !== null) {
                    mainContent.textContent = showContent;
                }
                resolve(null);
            }, 750);

        });
    }






    // タイピングする文字列表示関数
    function newTyping(showObj: TypingData | null): void {
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
            descriptionCard.innerHTML = showObj.description.replace(/\n/g, "<br>");;
        }

    }







    // 実際にカウントダウンを行う関数
    async function countDown() {
        if (descriptionCard !== null) {
            descriptionCard.style.display = "none";
        }
        for (let i: number = 3; i >= 1; i--) {
            await showContent(i.toString());
        }
        await setTimeout((): void => {
            if (descriptionCard !== null) {
                descriptionCard.style.display = "block";
            }
            newTyping(getRandomData(typingData));
        }, 1000);
    }










    if (startStopButton !== null && typeText !== null && mainContent !== null && descriptionCard !== null) {



        // ゲーム開始処理
        startStopButton.addEventListener("click", (event: MouseEvent): void => {
            startStopButton.style.display = "none";
            startStopButton.textContent = "STOP";

            // 3カウント後、タイピング文字列表示
            countDown();



        });

    }
}