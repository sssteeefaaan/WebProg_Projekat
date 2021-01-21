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
            this.nacrtajNovuOpciju(dsc.naziv, this.container.querySelector(".TurnirUnos"));
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
        this.nacrtajInputDiscipline(div);
        this.nacrtajInputUcesnika(div);
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
    nacrtajInputDiscipline(divInput /* - div u koji stavljam ispisan inputDisciplina*/)
    {
        // glavni div u koji stavljam elemnte
        const divDsc = Help.napraviElement("div", divInput, "TurnirUnosDiscipline");

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

            var dsc = await this.napraviNovuDisciplinu(0, this.id, naziv, lokacija, max);
            if (dsc != null) {
                this.dodajDisciplinu(dsc);
            }
        });
    }

    // Služi za dodavanje nove opcije (discipline) u ListBox(select) gde se bira disciplina za učesnika
    nacrtajNovuOpciju(naziv, divInput, select = null)
    {
        if (select == null)
            select = divInput.querySelector("select");

        const option = Help.napraviElement("option", select);
        option.innerHTML = naziv;
    }

    // Crta deo za unos učesnika u disciplinu
    nacrtajInputUcesnika(divInput /* - div u koji ispisujem formatiran inputUcesnika*/)
    {
        const divUc = Help.napraviElement("div", divInput, "TurnirUnosUcesnika");

        // Natpis
        Help.napraviElement("h3", divUc).innerHTML = "Novi učesnik:";

        // ListBox
        const select = Help.napraviElement("select", divUc);
        select.name = "IzborDiscipline";

        // Moguće opcije
        this.discipline.forEach(el => this.nacrtajNovuOpciju(el.naziv, divInput, select))

        // Input za podatke o učesniku
        let input;
        ["Ime", "Prezime", "Brzina"].forEach(el =>
        {
            input = Help.napraviElement("input", divUc);
            input.name = el;
            input.placeholder = el + " učesnika";
            if (el == "Brzina") {
                input.maxLength = 3;
                input.type = "number";
            }
        })

        // Dugme za dodavanje učesnika u disciplinu
        const button = Help.napraviElement("button", divUc);
        button.innerHTML = "Dodaj učesnika!";
        button.name = "Dodaj učesnika!";
        button.onclick = async el =>
        {
            const ime = divUc.querySelector("input[name='Ime']").value;
            const prezime = divUc.querySelector("input[name='Prezime']").value;
            const brzina = parseInt(divUc.querySelector("input[name='Brzina']").value);
            const nazivDiscipline = divUc.querySelector("select[name='IzborDiscipline']").value;

            const disc = this.discipline.find(el => el.naziv == nazivDiscipline);

            const ucesnikID = await this.napraviNovogUcesnika(0, disc, this.id, ime, prezime, brzina);
            if (ucesnikID != 0)
                disc.dodajUcesnika(new Ucesnik(ucesnikID, disc.id, this.id, ime, prezime, brzina));
        };
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
    async napraviNovuDisciplinu(disciplinaID, turnirID, naziv, lokacija, max)
    {
        const response = await fetch(`https://localhost:5001/Evidencija/CreateDisciplina/${ turnirID }`, {
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
            return new Disciplina(id, turnirID, naziv, lokacija, max);
        }
        else
            response.json()
                .then(er => console.log(er.message))
                .catch(er => console.log(er));
        return null;
    }

    // Kreiranje novog učesnika u bazi ( vraća njegov id u bazi )
    async napraviNovogUcesnika(ucesnikID, disciplina, turnirID, ime, prezime, brzina)
    {
        if (disciplina == null)
            alert("Takva disciplina ne postoji!");
        else {
            var response = await fetch(`https://localhost:5001/Evidencija/CreateUcesnik/${ turnirID }/${ disciplina.id }`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ime: ime,
                    prezime: prezime,
                    brzina: brzina
                })
            });

            if (response.ok) {
                console.log("Uspešno napravljen novi učesnik");
                let id = await response.json();
                return id;
            }
            else {
                response.json().then(error => alert(error.message));
            }
        }
        return 0;
    }
}