export class Animal {
    constructor(name) {this.name = name}
    echoName() {console.log('I am a', this.name)}
}

export class Mamal extends Animal {
    constructor(name, hairColor) {super(name); this.hairColor = hairColor;}
    nurse() {console.log(this.hairColor + ' ' + this.name + ' is nursing.')}
}