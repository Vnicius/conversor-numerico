const intToHexa = {10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F'};
const hexaToInt = {'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15};

class Decimal{
    convert (number, tgtBase) {
        let dot = number.indexOf(".");

        if (dot < 0) {
            return this.intPart(number, tgtBase);
        } else {
            return this.intPart(number.slice(0, dot), tgtBase)
                   + "." + this.floatPart(number.slice(dot+1), tgtBase);
        }
    }

    intPart (number, tgtBase) {
        let num = parseInt(number);
        let values = [];

        while (num >= tgtBase) {
            values.push(num % tgtBase);
            num = Math.floor(num / tgtBase);
        }

        values.push(num);

        if( tgtBase == 16 ) {
            for(let index = 0; index < values.length; index++ ) {
                try {
                    if(intToHexa[values[index]]){
                        values[index] = intToHexa[values[index]];
                    }
                } catch(err) {
                    console.log(err)
                }
            }
        }

        return values.reverse().join('');
    }

    floatPart (number) {
        console.log(number)
    }
}

class Binary{
    convert (number, tgtBase) {
        let dot = number.indexOf(".");

        if (dot < 0) {
            return this.intPart(number, tgtBase);
        } else {
            return this.intPart(number.slice(0, dot), tgtBase)
                   + "." + this.floatPart(number.slice(dot+1), tgtBase);
        }
    }

    intPart (number, tgtBase) {
        let zeroes = 0
        let values = [];
        let aux = 0
        let decimalObj = new Decimal();

        switch(tgtBase) {
            case 8:
            case 16:
                let dec = this.binToDecimal(number);

                return decimal.convert(dec.toString(), tgtBase)

                break;

            case 10:
                return this.binToDecimal(number);
                break;
        }
    }

    floatPart (number) {
        console.log(number)
    }

    binToDecimal (number) {
        let revNumber = number.split('').reverse();
        let decimal = 0;

        for(let index = 0; index < revNumber.length; index++){
            if(revNumber[index] === '1') {
                decimal += Math.pow(2, index);
            }
        }
        return decimal;
    }
}

class Octal {
    convert (number, tgtBase) {
        let dot = number.indexOf(".");

        if (dot < 0) {
            return this.intPart(number, tgtBase);
        } else {
            return this.intPart(number.slice(0, dot), tgtBase)
                   + "." + this.floatPart(number.slice(dot+1), tgtBase);
        }
    }

    intPart (number, tgtBase) {
        let values = [];
        let aux = 0
        let decimalObj = new Decimal();

        switch(tgtBase) {
            case 2:
            case 16:
                let dec = this.octToDecimal(number);

                return decimalObj.convert(dec.toString(), tgtBase);

            case 10:
                return this.octToDecimal(number);
        }
    }

    floatPart (number) {
        console.log(number)
    }

    octToDecimal(number) {
        let reverseNumber = number.split('').reverse();
        let cont = 0;

        for(let index = 0; index < number.length; index++) {
            cont += parseInt(reverseNumber[index]) * Math.pow(8, index);
        }

        return cont;
    }

}

class Hexadecimal {
    convert (number, tgtBase) {
        let dot = number.indexOf(".");

        if (dot < 0) {
            return this.intPart(number.toUpperCase(), tgtBase);
        } else {
            return this.intPart(number.slice(0, dot), tgtBase)
                   + "." + this.floatPart(number.slice(dot+1), tgtBase);
        }
    }

    intPart (number, tgtBase) {
        let values = [];
        let aux = 0;
        let decimalObj = new Decimal();

        switch(tgtBase) {
            case 2:
            case 8:
                let dec = this.hexaToDecimal(number);
                console.log(dec)
                return decimalObj.convert(dec.toString(), tgtBase);
            
            case 10:
                return this.hexaToDecimal(number);
        }
    }

    floatPart (number) {
        console.log(number)
    }

    hexaToDecimal(number) {
        let reverseNumber = number.split('').reverse();
        let cont = 0;

        for(let index = 0; index < number.length; index++) {
            let value = 0;

            if(hexaToInt[reverseNumber[index]]) {
                value = hexaToInt[reverseNumber[index]];
            } else {
                value = parseInt(reverseNumber[index]);
            }
            console.log("value")
            console.log(value)
            cont += value * Math.pow(16, index);
        }

        return cont;
    }
}

const decimal = new Decimal();
const bin = new Binary();
const oct = new Octal();
const hexa = new Hexadecimal();



/* CHANGE HANDLERS */

function changeDecimal() {
    console.log(document.getElementById('decimalInput').value)
    let number = document.getElementById('decimalInput').value;

    if(document.getElementById('decimalInput').value){
        document.getElementById('binaryInput').value = decimal.convert(number, 2);
        document.getElementById('octalInput').value = decimal.convert(number, 8);
        document.getElementById('hexaInput').value = decimal.convert(number, 16);
    } else {
        document.getElementById('binaryInput').value =
        document.getElementById('octalInput').value =
        document.getElementById('hexaInput').value = "";
    }
}

function changeBinary() {
    console.log(document.getElementById('binaryInput').value)
    let number = document.getElementById('binaryInput').value;

    if(document.getElementById('binaryInput').value){
        document.getElementById('decimalInput').value = bin.convert(number, 10);
        document.getElementById('octalInput').value = bin.convert(number, 8);
        document.getElementById('hexaInput').value = bin.convert(number, 16);
    } else {
        document.getElementById('decimalInput').value = 
        document.getElementById('octalInput').value = 
        document.getElementById('hexaInput').value = "";
    }
}

function changeOctal() {
    console.log(document.getElementById('octalInput').value)
    let number = document.getElementById('octalInput').value;

    if(document.getElementById('octalInput').value){
        document.getElementById('decimalInput').value = oct.convert(number, 10);
        document.getElementById('binaryInput').value = oct.convert(number, 2);
        document.getElementById('hexaInput').value = oct.convert(number, 16);
    } else {
        document.getElementById('decimalInput').value = 
        document.getElementById('binaryInput').value = 
        document.getElementById('hexaInput').value = "";
    }
}

function changeHexa() {
    console.log(document.getElementById('hexaInput').value)
    let number = document.getElementById('hexaInput').value;

    if(document.getElementById('hexaInput').value){
        document.getElementById('decimalInput').value = hexa.convert(number, 10);
        console.log("hexaBIn")
        console.log(hexa.convert(number, 2));
        document.getElementById('binaryInput').value = hexa.convert(number, 2);
        document.getElementById('octalInput').value = hexa.convert(number, 8);
    } else {
        document.getElementById('decimalInput').value = 
        document.getElementById('binaryInput').value =
        document.getElementById('octalInput').value = "";
    }
}