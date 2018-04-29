// A simple d3 scatter plot
"use strict";

// Create a new class Pet
class Pet {
    // Constructor function is called when the class is instantiated
    constructor(name) {
        this.name = name;
    }
}

// Create an instance of your pet
let myPet = new Pet("Magnet");
console.log(myPet.name);

// Create a new class Dog by extending the class Pet
class Dog extends Pet {
    constructor(name, sound) {
        super(name); // call parent class constructor function
        this.sound = sound;
    }

    // Add a new method `bark` to the class
    bark() {
        console.log(`${this.sound}! My name is ${this.name}`);
    }
}

// Create an instance of a dog
let myDog = new Dog("Mocha", "Woof Woof!");

// Have the dog bark
myDog.bark();