const som = document.querySelector("#som");
const usd = document.querySelector("#usd");
const eur = document.querySelector("#eur");

const handleConvert = (elem, target, targetTwo) => {
    elem.addEventListener("input", () => {
        const request = new XMLHttpRequest();
        request.open("GET", "package.json");
        request.setRequestHeader("Content-type", "application/json");
        request.send();
        request.addEventListener("load", () => {
            const response = JSON.parse(request.response);

            if (elem === som) {
                (target.value = (elem.value / response.usd).toFixed(2))(
                    (targetTwo.value = (elem.value / response.eur).toFixed(2))
                );
            } else if (elem === eur) {
                (target.value = (elem.value * response.eur).toFixed(2))(
                    (targetTwo.value = (elem.value / response.eur / response.usd).toFixed(2))
                );
            } else if (elem === usd) {
                (target.value = (elem.value * response.usd).toFixed(2))(
                    (targetTwo.value = ((elem.value * response.usd) / response.eur).toFixed(2))
                );
            }
            elem.value === "" ? (target.value = "") : null;
            elem.value === "" ? (targetTwo.value = "") : null;
        });
    });
};

handleConvert(som, usd, eur);
handleConvert(eur, som, usd);
handleConvert(usd, som, eur);