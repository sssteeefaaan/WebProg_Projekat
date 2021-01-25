import { Ucesnik } from "./ucesnik.js";
import { Help } from "./help.js";

export class Disciplina
{
    constructor(id = 0, turnirID = 0, naziv = "Unknown", lokacija = "Unknown", maxUcesnici = 0, pobednikID = 0, pobednik = null)
    {
        this.id = id;
        this.turnirID = turnirID;
        this.naziv = naziv;
        this.lokacija = lokacija;
        this.maxUcesnici = maxUcesnici;
        this.pobednikID = pobednikID;
        this.pobednik = pobednik;

        // Not in the dataBase
        this.ucesnici = [];
        this.clicked = false;
        this.container = null;
        this.ucesniciContainer = null;
    }

    // Inicijalizacija kontejnera za ispis informacija o disciplini
    // Inicijalizacija kontejnera za prikaz svih učesnika discipline
    proslediContainer(host)
    {
        if (this.container == null) {
            this.container = Help.napraviElement("div", host, "Disciplina");
        }
        if (this.ucesniciContainer == null)
            this.ucesniciContainer = Help.napraviElement("div");
    }

    // Dodavanje učesnika u disciplinu
    // Iscrtavanje novododatog učesnika
    dodajUcesnika(ucesnik)
    {
        if (this.ucesniciContainer != null) {
            if (this.ucesnici.length < this.maxUcesnici) {
                this.ucesnici = [...this.ucesnici, ucesnik];

                // Update View
                ucesnik.nacrtajUcesnika(this.ucesniciContainer);
                this.ispisInfo(); // Pozivam ponovo, jer se 
                //
            }
            else
                alert("Popunjen kapacitet učesnika!");
        }
        else
            alert("Nije prosleđen kontejner za učesnike!");
    }

    // Crta prikaz informacija o disciplini
    nacrtajDisciplinu(host, hostUcesnici)
    {
        this.proslediContainer(host);

        // Opis discipline
        let div = Help.napraviElement("div", this.container, "HeaderDiscipline");
        let label = Help.napraviElement("label", div);
        const col = Help.getColAndAvg();

        this.ispisInfo();
        this.container.style.backgroundColor = col[0];
        label.style.backgroundColor = col[0];
        label.style.color = col[1];
        label.name = "OpisDiscipline";
        //

        // Kontrola
        div = Help.napraviElement("div", this.container, "KontrolaDiscipline");
        const buttons = [];
        ["Dodaj učesnika", "Prikaži", "Automatska igra", "Regularna igra", "Resetuj", "Obriši disciplinu"].forEach((el, ind) =>
        {
            buttons.push(Help.napraviElement("button", div))
            buttons[ind].innerHTML = el;
            buttons[ind].name = el;
        });

        // Dodaj Učesnika dugme
        buttons[0].onclick = () =>
        {
            const background = Help.napraviElement("div", document.body, "PopUpBackground");
            const input = Help.napraviElement("div", background, "PopUp");
            input.classList.add("TurnirUnosUcesnika");
            document.body.style.overflow = "hidden";
            this.nacrtajInputUcesnika(input);
        };

        // Show/Hide button
        buttons[1].onclick = ev =>
        {
            if (this.ucesnici.length < 1)
                alert("Disciplina nema učesnike!");
            else {
                if (buttons[1].innerHTML == "Prikaži") {
                    this.nacrtajStanje(hostUcesnici, col);
                    buttons[1].innerHTML = "Sakrij";
                    buttons[1].name = "Sakrij";
                }
                else {
                    this.ucesnici.forEach(uc => uc.compete = false)
                    // this.ucesnici.forEach(uc => uc.reset())
                    Help.removeChildFromElement(hostUcesnici, this.ucesniciContainer);
                    buttons[1].innerHTML = "Prikaži";
                    buttons[1].name = "Prikaži";
                    buttons[2].innerHTML = "Automatska igra";
                    buttons[2].name = "Automatska igra";
                    buttons[3].innerHTML = "Regularna igra";
                    buttons[3].name = "Regularna igra";
                }
            }
        };

        // Autoplay/Pause button
        buttons[2].onclick = ev =>
        {
            if (this.ucesnici.length < 1)
                alert("Disciplina nema učesnike!");
            else {
                if (buttons[2].innerHTML == "Automatska igra") {
                    buttons[1].innerHTML = "Sakrij";
                    buttons[1].name = "Sakrij";
                    buttons[2].innerHTML = "Pauziraj";
                    buttons[2].name = "Pauziraj";

                    this.ucesnici.forEach(uc => uc.reset());
                    this.finish(null);

                    Help.removeChildFromElement(hostUcesnici, this.ucesniciContainer);

                    this.nacrtajStanje(hostUcesnici, col);
                    this.ucesnici.forEach(uc =>
                    {
                        uc.compete = true;
                        uc.race(Help.getRandomInt(25, 60), true);
                    });
                }
                else {
                    buttons[2].innerHTML = "Automatska igra";
                    buttons[2].name = "Automatska igra";
                    this.ucesnici.forEach(uc => uc.compete = false)
                }
            }
        };

        // Regularplay/Pause button -> ukoliko korisnik krene da pritiska učesnika,
        // onda učesnik prestaje automatski da se kreće i korisnik ima kontrolu nad njim
        buttons[3].onclick = ev =>
        {
            if (this.ucesnici.length < 1)
                alert("Disciplina nema učesnike!");
            else {
                if (buttons[3].innerHTML == "Regularna igra") {
                    buttons[1].innerHTML = "Sakrij";
                    buttons[1].name = "Sakrij";
                    buttons[3].innerHTML = "Obustavi";
                    buttons[3].name = "Obustavi";

                    this.ucesnici.forEach(uc => uc.reset());
                    this.finish(null);
                    Help.removeChildFromElement(hostUcesnici, this.ucesniciContainer);

                    this.nacrtajStanje(hostUcesnici, col);
                    this.ucesnici.forEach(uc =>
                    {
                        uc.compete = true;
                        uc.race(Help.getRandomInt(40, 60));
                    })
                }
                else {
                    buttons[3].innerHTML = "Regularna igra";
                    buttons[3].name = "Regularna igra";
                    this.ucesnici.forEach(uc => uc.compete = false);
                }
            }
        };

        // Reset button
        buttons[4].onclick = el =>
        {
            if (this.ucesnici.length < 1)
                alert("Disciplina nema učesnike!");
            else {
                buttons[2].innerHTML = "Automatska igra";
                buttons[2].name = "Automatska igra";
                buttons[3].innerHTML = "Regularna igra";
                buttons[3].name = "Regularna igra";
                this.ucesnici.forEach(uc => uc.reset());
                this.finish(null); // setuje pobednika na null i šalje update bazi
            }
        };

        buttons[5].onclick = () =>
        {
            if (this.ucesniciContainer != null && this.ucesniciContainer.parentNode != null)
                this.ucesniciContainer.parentNode.removeChild(this.ucesniciContainer);
            if (this.container != null && this.container.parentNode != null)
                this.container.parentNode.removeChild(this.container);
            this.deleteDisciplina();
        };
    }

    // Ispisuje naziv, lokaciju, (current/max) i potencijalnog pobednika
    ispisInfo()
    {
        const label = this.container.querySelector(".HeaderDiscipline>label");
        if (this.pobednik != null)
            label.innerHTML = `${ this.naziv }, ${ this.lokacija }, (${ this.ucesnici.length } /${ this.maxUcesnici }), Pobednik: ${ this.pobednik.ime } ${ this.pobednik.prezime }`;
        else
            label.innerHTML = `${ this.naziv }, ${ this.lokacija }, (${ this.ucesnici.length } /${ this.maxUcesnici })`;
    }

    // Crta deo za unos učesnika u disciplinu
    nacrtajInputUcesnika(divUc /* - div u koji ispisujem formatiran inputUcesnika*/)
    {
        //const divUc = Help.napraviElement("div", divInput, "TurnirUnosUcesnika");

        // Natpis
        Help.napraviElement("h3", divUc).innerHTML = "Novi učesnik:";

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

            const ucesnikID = await this.napraviNovogUcesnika(ime, prezime, brzina);
            if (ucesnikID != 0) {
                this.dodajUcesnika(new Ucesnik(ucesnikID, this.id, this.turnirID, ime, prezime, brzina));
                document.body.style.overflow = "auto";
                document.body.removeChild(button.parentNode.parentNode);
                this.container.querySelector(".KontrolaDiscipline").querySelector("button[name='Resetuj']").click();
            }
        };

        const buttonClose = Help.napraviElement("button", divUc, "closeButton");
        buttonClose.innerHTML = "x";

        buttonClose.onclick = () =>
        {
            document.body.style.overflow = "auto";
            document.body.removeChild(buttonClose.parentNode.parentNode);
        }
    }

    // Crta učesnike na disciplini
    nacrtajStanje(hostUcesnici, col)
    {
        this.ucesniciContainer.style.backgroundColor = col[0];
        this.ucesnici.forEach(el => el.nacrtajUcesnika(this.ucesniciContainer));
        //hostUcesnici.appendChild(this.ucesniciContainer);
        hostUcesnici.insertBefore(this.ucesniciContainer, hostUcesnici.firstChild);

        // Nije najefikasnije odrađeneno, pogotovo što se konstantno zove,
        // Bolji prilaz bi bio Observer
        this.ucesniciContainer.addEventListener("move", el =>
        {
            const positions = this.ucesnici.map(x => x.pos);
            positions.sort((a, b) => b - a);
            let k, pos;
            for (var j = 0; j < this.ucesnici.length; j++) {
                k = 0;
                while (k < positions.length && positions[k] != this.ucesnici[j].pos)
                    k++;
                pos = positions[k];
                this.ucesnici[j].promeniRang(k + 1);
            }
        });
    }

    // Ispis pobednika discipline
    finish(pob)
    {
        this.pobednik = pob;
        if (this.pobednik != null) {
            this.pobednikID = pob.id;
            this.container
                .querySelector("label")
                .innerHTML = `${ this.naziv }, ${ this.lokacija }, (${ this.ucesnici.length }/${ this.maxUcesnici }), Pobednik: ${ pob.ime } ${ pob.prezime }`;
        }
        else {
            this.pobednikID = null;
            this.container
                .querySelector("label")
                .innerHTML = `${ this.naziv }, ${ this.lokacija }, (${ this.ucesnici.length }/${ this.maxUcesnici })`;
        }
        this.updateDisciplina();
    }

    // Upisuje izmene u bazu
    updateDisciplina()
    {
        fetch("https://localhost:5001/Evidencija/UpdateDisciplina", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this.id,
                turnirID: this.turnirID,
                naziv: this.naziv,
                lokacija: this.lokacija,
                maxUcesnici: this.maxUcesnici,
                trenutniBrojUcesnika: this.ucesnici.length,
                pobednikID: this.pobednikID
            })
        }).then(response =>
        {
            if (response.ok) {
                console.log("Successfully updated disciplina!");
            }
            else {
                response.json().then(badRequest =>
                {
                    console.log(badRequest.message);
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

    //Pribavlja učesnika iz baze, koji je pobednik discipline
    async nabaviPobednika()
    {
        const response = await fetch(`https://localhost:5001/Evidencija/ReadUcesnik/${ this.pobednikID }`);
        if (response.ok) {
            console.log("Uspešno nabavljen pobednik!");
            const pobednik = await response.json();
            this.pobednik = new Ucesnik(this.pobednikID, this.id, this.turnirID, pobednik.ime, pobednik.prezime, pobednik.brzina, pobednik.pozicija, pobednik.rang, pobednik.selected, pobednik.compete);
            return this.pobednik;
        }
        else
            response.json()
                .then(er => console.log(er.message))
                .catch(er => console.log(er));
        return null;
    }

    // Kreiranje novog učesnika u bazi ( vraća njegov id u bazi )
    async napraviNovogUcesnika(ime, prezime, brzina)
    {
        var response = await fetch(`https://localhost:5001/Evidencija/CreateUcesnik/${ this.turnirID }/${ this.id }`, {
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
        return 0;
    }

    deleteDisciplina()
    {
        fetch(`https://localhost:5001/Evidencija/DeleteDisciplina/${ this.turnirID }/${ this.id }`,
            {
                method: "DELETE"
            })
            .then(response =>
            {
                if (response.ok)
                    console.log("Uspešno uklonjena disciplina");
                else
                    response.json()
                        .then(er => console.log(er.message))
                        .catch(error => console.log("error unpacking json " + error));
            })
            .catch(error => console.log("error unpacking response " + error));
    }
}