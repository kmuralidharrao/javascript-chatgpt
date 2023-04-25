const API_KEY = "";
const submitButton = document.querySelector("#submit")
const outputElement = document.querySelector("#output");
const inputElement = document.querySelector("input");
const historyElement = document.querySelector(".history");
const buttonElement = document.querySelector("button");

async function fetchTextCompletion() {
    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: "hello, how are you today?",
            max_token: 7
        })
    }
    const response = await fetch("https://api.openai.com/v1/completions", options);

    const data = await response.json();
    console.log(data)
}

function changeInput(value) {
    const inputElement = document.querySelector("input");
    inputElement.value = value;
}

async function fetchChatCompletion() {
    try {
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "user",
                    content: inputElement.value
                }],
                max_tokens: 100
            })
        }
        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
    
        const data = await response.json();
        console.log(data);
        outputElement.textContent = data.choices[0].message.content;
        if(data.choices[0].message.content && inputElement.value) {
            const pElement = document.createElement("p");
            pElement.textContent = inputElement.value;
            pElement.addEventListener("click", () => changeInput(pElement.textContent))
            historyElement.append(pElement)
        }
    } catch (error) {
        console.log(error)
    } 
}

function clearInput() {
    inputElement.value = "";
}

submitButton.addEventListener("click", fetchChatCompletion)
buttonElement.addEventListener("click", clearInput)
