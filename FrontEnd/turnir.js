import { Disciplina } from "./disciplina.js";
import { Ucesnik } from "./ucesnik.js";
import { Help } from "./help.js";

export class Turnir
{
    constructor(id, naziv)
    {
        this.id = id;
        this.naziv = naziv;

        // Not in the database
        this.discipline = [];
        this.container = null;
    }

    // Glavni kontejner u koji se crtaju svi elementi turnira
    proslediContainer(host)
    {
        if (this.container == null)
            this.container = Help.napraviElement("div", host, "Turnir");
    }

    // Dodaje novu disciplinu u turnir
    // Iscrtava njen prikaz
    // Dodaje je kao opciju za unos učesnika u nju
    dodajDisciplinu(dsc)
    {
        if (this.container != null) {
            dsc.nacrtajDisciplinu(this.container.querySelector(".TurnirPrikazDisciplina"),
                this.container.querySelector(".TurnirPrikazUcesnika"));
            this.discipline.push(dsc);
        }
    }

    // Crta sve elemente turnira u prosleđeni kontejner
    nacrtajTurnir(host)
    {
        this.proslediContainer(host);

        //Header
        let div = Help.napraviElement("div", this.container, "TurnirHeaderDiv");
        this.nacrtajHeaderTurnira(div);

        //InputDiscipline, InputUcesnika, PrikazDisciplina
        div = Help.napraviElement("div", this.container, "TurnirUnos");
        // this.nacrtajInputDiscipline(div);
        // this.nacrtajInputUcesnika(div);
        this.nacrtajPrikazDisciplina(div);

        // PrikazUcesnika će crtacti PrikazDisciplina
        // Help.napraviElement("div", this.container, "TurnirPrikazUcesnika");
    }

    // Crta header (naziv turnira i dugmići za kontrolu)
    nacrtajHeaderTurnira(headerDiv)
    {
        // Natpis
        let div = Help.napraviElement("div", headerDiv, "TurnirHeader");
        Help.napraviElement("h2", div).innerHTML = this.naziv;

        // Dugmad
        div = Help.napraviElement("div", headerDiv, "TurnirHeaderButton");

        const buttonDodajDisciplinu = Help.napraviElement("button", div);
        buttonDodajDisciplinu.innerHTML = "Dodaj disciplinu";
        buttonDodajDisciplinu.name = "Dodaj disciplinu";
        buttonDodajDisciplinu.onclick = () =>
        {
            document.body.scrollIntoView();
            document.body.style.overflow = "hidden";
            const inputBackground = Help.napraviElement("div", document.body, "PopUpBackground");
            const inputDiscipline = Help.napraviElement("div", inputBackground, "PopUp");
            inputDiscipline.classList.add("TurnirUnosDiscipline");
            this.nacrtajInputDiscipline(inputDiscipline);
        };

        // Za prikaz i skrivanje svih disciplina
        const buttonShowHide = Help.napraviElement("button", div);
        buttonShowHide.innerHTML = "Prikaži sve";
        buttonShowHide.name = "Prikaži sve";
        buttonShowHide.onclick = el =>
        {
            if (buttonShowHide.innerHTML == "Prikaži sve") {
                buttonShowHide.innerHTML = "Sakrij sve";
                buttonShowHide.name = "Sakrij sve";
                headerDiv.parentNode
                    .querySelector(".TurnirPrikazDisciplina")
                    .querySelectorAll("button[name='Prikaži']")
                    .forEach(el => el.dispatchEvent(new Event("click")));
            }
            else {
                buttonShowHide.innerHTML = "Prikaži sve";
                buttonShowHide.name = "Prikaži sve";
                buttonPlayPause.innerHTML = "Pokreni sve";
                buttonPlayPause.name = "Pokreni sve";
                headerDiv.parentNode
                    .querySelector(".TurnirPrikazDisciplina")
                    .querySelectorAll("button[name='Sakrij']")
                    .forEach(el => el.dispatchEvent(new Event("click")));
            }
        };

        // Za automatsku igru ili pauziranje svih disciplina
        const buttonPlayPause = Help.napraviElement("button", div);
        buttonPlayPause.innerHTML = "Pokreni sve";
        buttonPlayPause.name = "Pokreni sve";
        buttonPlayPause.onclick = el =>
        {
            if (buttonPlayPause.innerHTML == "Pokreni sve") {
                buttonPlayPause.innerHTML = "Pauziraj sve";
                buttonPlayPause.name = "Pauziraj sve";
                buttonShowHide.innerHTML = "Sakrij sve";
                buttonShowHide.name = "Sakrij sve";
                headerDiv.parentNode
                    .querySelector(".TurnirPrikazDisciplina")
                    .querySelectorAll("button[name='Automatska igra']")
                    .forEach(el =>
                        el.dispatchEvent(new Event("click"))
                    );
            }
            else {
                buttonPlayPause.innerHTML = "Pokreni sve";
                buttonPlayPause.name = "Pokreni sve";
                headerDiv.parentNode
                    .querySelector(".TurnirPrikazDisciplina")
                    .querySelectorAll("button[name='Pauziraj']")
                    .forEach(el =>
                        el.dispatchEvent(new Event("click"))
                    );
            }
        };

        // Za resetovanje svih disciplina
        const buttonReset = Help.napraviElement("button", div);
        buttonReset.innerHTML = "Resetuj sve";
        buttonReset.name = "Resetuj sve";
        buttonReset.onclick = el =>
        {
            buttonPlayPause.innerHTML = "Pokreni sve";
            buttonPlayPause.name = "Pokreni sve";
            headerDiv.parentNode
                .querySelector(".TurnirPrikazDisciplina")
                .querySelectorAll("button[name='Resetuj']")
                .forEach(el => el.dispatchEvent(new Event("click")));
        };
    }

    // Crta deo za upis nove discipline u turnir
    nacrtajInputDiscipline(divDsc /* - div u koji stavljam ispisan inputDisciplina*/)
    {

        // Natpis
        Help.napraviElement("h3", divDsc).innerHTML = "Nova disciplina:";

        // Input za podatke o disciplini
        let input;
        ["Naziv", "Lokacija", "Max"].forEach(el =>
        {
            input = Help.napraviElement("input", divDsc);
            input.name = el;
            if (el == "Max") {
                input.type = "number";
                input.placeholder = "Maksimalni broj takmičara";
            }
            else
                input.placeholder = el + " discipline";
        })

        // Dugme za prosleđivanje discipline
        const button = Help.napraviElement("button", divDsc);
        button.innerHTML = "Dodajte novu disciplinu!";
        button.name = "Dodajte novu disciplinu!";

        button.onclick = (async el =>
        {
            const naziv = divDsc.querySelector("input[name='Naziv']").value;
            const lokacija = divDsc.querySelector("input[name='Lokacija']").value;
            const max = parseInt(divDsc.querySelector("input[name='Max']").value);

            var dsc = await this.napraviNovuDisciplinu(naziv, lokacija, max);
            if (dsc != null) {
                this.dodajDisciplinu(dsc);
                document.body.style.overflow = "auto";
                document.body.removeChild(button.parentNode.parentNode);
            }
        });

        const buttonClose = Help.napraviElement("button", divDsc, "closeButton");
        buttonClose.innerHTML = "x";

        buttonClose.onclick = () =>
        {
            document.body.style.overflow = "auto";
            document.body.removeChild(buttonClose.parentNode.parentNode);
        }
    }

    // Prikaz disciplina
    nacrtajPrikazDisciplina(divPrikaz)
    {
        let div = divPrikaz.querySelector(".TurnirPrikazDisciplina");
        if (div == null)
            div = Help.napraviElement("div", divPrikaz, "TurnirPrikazDisciplina");

        // Ispituje da li je neko pobedio (desila se pobeda)
        div.addEventListener("win", (ev) =>
        {
            this.discipline.forEach(dsc =>
            {
                dsc.ucesnici.forEach(ucesnik =>
                {
                    if (ev.detail.pobednik == ucesnik) {
                        dsc.finish(ucesnik);
                    }
                });
            });
        });

        let div2 = divPrikaz.parentNode.querySelector(".TurnirPrikazUcesnika");
        if (div2 == null)
            div2 = Help.napraviElement("div", this.container, "TurnirPrikazUcesnika");

        //Help.clearElementOfChildren(div);

        this.discipline.forEach(el => el.nacrtajDisciplinu(div, div2));
    }

    // Ovaj deo sam prebacio na server
    validacija(stringVals, numbVals)
    {
        let ret = true;
        stringVals.forEach(val => ret &= val.length > 0);
        numbVals.forEach(val => ret &= val > 0);
        return ret;
    }

    // Upis podataka turnira u bazu
    updateTurnir()
    {
        fetch("https://localhost:5001/Evidencija/UpdateTurnir", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this.id,
                naziv: this.naziv,
                brojDisciplina: this.discipline.length
            })
        }).then(response =>
        {
            if (response.ok) {
                console.log("Successfully updated turnir!");
            }
            else {
                response.json().then(badRequest =>
                {
                    console.log("Bad request " + badRequest.message);
                }).catch(er =>
                {
                    console.log("Error occurred " + er);
                });
            }
        }).catch(er =>
        {
            console.log("Error occurred " + er);
        });
    }

    // Kreiranje nove discipline u bazi (vraća Disciplinu koja je kreirana)
    async napraviNovuDisciplinu(naziv, lokacija, max)
    {
        const response = await fetch(`https://localhost:5001/Evidencija/CreateDisciplina/${ this.id }`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                naziv: naziv,
                lokacija: lokacija,
                maxUcesnici: max
            })
        });

        if (response.ok) {
            console.log("Uspešno napravljena nova disciplina");
            const id = await response.json();
            return new Disciplina(id, this.id, naziv, lokacija, max);
        }
        else
            response.json()
                .then(er => console.log(er.message))
                .catch(er => console.log(er));
        return null;
    }
}