const forms = document.getElementsByName('search');
const form = forms[0];
const elements = form.elements;

form.addEventListener('submit',validate,false);
form.addEventListener('submit', search, false);

function validate(event) {
    const city = elements.city.options[elements.city.selectedIndex].text;
    const origin = elements.origin.value;
    const powers = [...elements.powers].filter(box => box.checked).map(box => box.value);
    const category = elements.category.value;

    if (!city || !origin || !powers || !category) {
        event.preventDefault();
        alert('All fields are required');
    }
}

function search(event) {
    event.preventDefault();
    const city = elements.city.options[elements.city.selectedIndex].text;
    const origin = elements.origin.value;
    const powers = [...elements.powers].filter(box => box.checked).map(box => box.value);
    const category = elements.category.value;
    let hero;
    if ((!city || !origin) && (powers || category)) {
        hero = Hero.createAnemicHero(powers, category);
    } else {
        hero = new Hero(city,
            origin,
            powers,
            category)
    }
    alert(JSON.stringify(hero));
    console.log("Kills");
    console.log(Hero.calculateKills())
    hero.feed().train().sleep();
}



class Hero {
    constructor(city,
    origin,
    powers,
    category
    ) {
        this.city = city;
        this.origin = origin;
        this.powers = powers;
        this.category = category;
    }

    static createAnemicHero(powers, category) {
        return new Hero("", "", powers, category);
    }

    feed() {
        console.log("Hero is eating...")
        return this;
    }

    train() {
        console.log("Hero is training");
        return this;
    }

    sleep() {
        console.log("Hero is resting...")
        return this;
    }

    static calculateKills() {
        // return mean([1,23,12,3]);
    }

}



// Nice things to be implemented from chapter 15

/**
 * jQuery
 */

function jQueryProperty() {
    $(para).addClass('important').append('<p>Another Paragraph</p>');
}

function lodashFuncs() {
    // flatten an array
    _.flatten([1, [2, [3, [4]], 5]]);

    // return the last element in an array
    _.last([1, 2, 3]);

    // randomly shuffle an array
    _.shuffle([1, 2, 3, 4]);
}
