import { Ucesnik } from "./ucesnik.js";

export class Help
{
    static napraviElement(type, parent = null, className = null)
    {
        let el = document.createElement(type);
        if (className != null)
            el.classList.add(className);
        if (parent != null)
            parent.appendChild(el);
        return el;
    }
    static clearElementOfChildren(parent)
    {
        while (parent.childNodes.length > 0)
            parent.removeChild(parent.childNodes[0]);
    }
    static removeChildFromElement(parent, child)
    {
        parent.childNodes.forEach(node => { if (node === child) parent.removeChild(child) });
    }
    static getRandomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    static getRandomRgb()
    {
        return "rgb(" + Help.getRandomInt(5, 250) + ", " + Help.getRandomInt(5, 250) + ", " + Help.getRandomInt(5, 250) + ")";
    }
    static getComplementedRgb(rgb)
    {
        let val = rgb.split("(");
        let val1 = val[1].split(",");
        return "rgb(" + (255 - parseInt(val1[0])) + ", " + (255 - parseInt(val1[1])) + ", " + (255 - parseInt(val1[2])) + ")";
    }
    static getColAndCompCol()
    {
        let r = Help.getRandomInt(5, 250);
        let g = Help.getRandomInt(5, 250);
        let b = Help.getRandomInt(5, 250);

        return [`rgb(${ r }, ${ g }, ${ b })`, `rgb(${ 255 - r }, ${ 255 - g }, ${ 255 - b })`]
    }
    static getColAndAvg()
    {
        let r = Help.getRandomInt(5, 250);
        let g = Help.getRandomInt(5, 250);
        let b = Help.getRandomInt(5, 250);
        let avg = ((0.299 * r + 0.587 * g + 0.114 * b) / 255) > 0.5 ? 0 : 255;

        return [`rgb(${ r }, ${ g }, ${ b })`, `rgb(${ avg }, ${ avg }, ${ avg })`]
    }
    static clearAllTimeouts()
    {
        var id = setTimeout(function () { }, 1);
        for (var i = 0; i < id; i++)
            clearTimeout(i);
    }
    static async getPobednik(pobednikID)
    {
        var response = await fetch(`https://localhost:5001/Evidencija/ReadUcesnik/${ pobednikID }`);
        if (response.ok) {
            var data = await response.json();
            return new Ucesnik(data.id, data.disciplinaID, data.turnirID, data.ime, data.prezime, data.brzina, data.pos, data.rang, data.compete, data.selected);
        }
        else
            console.log("Error occurred");
        return null;
    }
}