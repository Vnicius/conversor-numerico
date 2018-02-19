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

    floatPart (number, tgtBase) {
        let floatNumber = parseFloat("0." + number);
        let cont = 0;
        let value = ""

        while(cont++ < 15 && (floatNumber > 0 && floatNumber < 1)){
            floatNumber = floatNumber * tgtBase;
            let intValue = Math.floor(floatNumber);
            floatNumber -= intValue;

            if (tgtBase == 16) {
                if(intToHexa[intValue]) {
                    intValue = intToHexa[intValue];
                }
            }
            value += intValue;
        }

        return value;
    }
}

class Binary{
    convert (number, tgtBase) {
        let dot = number.indexOf(".");

        if (dot < 0) {
            return this.intPart(number, tgtBase);
        } else {
            return this.intPart(number.slice(0, dot), tgtBase)
                   + this.floatPart(number.slice(dot+1), tgtBase);
        }
    }

    intPart (number, tgtBase) {
        let decimalObj = new Decimal();

        switch(tgtBase) {
            case 8:
            case 16:
                let dec = this.binToDecimal(number);
                return decimal.convert(dec.toString(), tgtBase);

            case 10:
                return this.binToDecimal(number);
        }
    }

    floatPart (number, tgtBase) {
        let decimalObj = new Decimal();

        switch(tgtBase) {
            case 8:
            case 16:
                let dec = this.floatBinToDecimal(number).toString();
                let index = dec.indexOf('.')
                dec = dec.slice(index + 1);

                return "." + decimalObj.floatPart(dec, tgtBase);

            case 10:
                return this.floatBinToDecimal(number);
        }
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

    floatBinToDecimal (number) {
        let numberList = number.split('');
        let decimal = 0;

        for(let index = 0; index < numberList.length; index++) {
            if(numberList[index] === '1') {
                decimal += Math.pow(2, (-1) * (index + 1))
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
                   + this.floatPart(number.slice(dot+1), tgtBase);
        }
    }

    intPart (number, tgtBase) {
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

    floatPart (number, tgtBase) {
        let decimalObj  = new Decimal();

        switch(tgtBase) {
            case 2:
            case 16:
                let dec = this.floatOctalToDecimal(number).toString();
                let index = dec.indexOf('.')
                dec = dec.slice(index + 1);

                return "." + decimalObj.floatPart(dec, tgtBase);
            case 10:
                return this.floatOctalToDecimal(number);
        }
        
    }

    octToDecimal(number) {
        let reverseNumber = number.split('').reverse();
        let cont = 0;

        for(let index = 0; index < number.length; index++) {
            cont += parseInt(reverseNumber[index]) * Math.pow(8, index);
        }

        return cont;
    }

    floatOctalToDecimal (number) {
        let numberList = number.split('');
        let decimal = 0;

        for(let index = 0; index < numberList.length; index++) {
            decimal += parseInt(numberList[index]) * Math.pow(8, (-1) * (index + 1))
        }

        return decimal;
    }

}

class Hexadecimal {
    convert (number, tgtBase) {
        let dot = number.indexOf(".");

        if (dot < 0) {
            return this.intPart(number.toUpperCase(), tgtBase);
        } else {
            return this.intPart(number.slice(0, dot), tgtBase)
                   + this.floatPart(number.slice(dot+1), tgtBase);
        }
    }

    intPart (number, tgtBase) {
        let decimalObj = new Decimal();

        switch(tgtBase) {
            case 2:
            case 8:
                let dec = this.hexaToDecimal(number);
                return decimalObj.convert(dec.toString(), tgtBase);
            
            case 10:
                return this.hexaToDecimal(number);
        }
    }

    floatPart (number, tgtBase) {
        let decimalObj = new Decimal();

        switch(tgtBase) {
            case 2:
            case 8:
                let dec = this.floatHexaToDecimal(number).toString();
                let index = dec.indexOf('.')
                dec = dec.slice(index + 1);

                return "." + decimalObj.floatPart(dec, tgtBase);
            case 10:
                return this.floatHexaToDecimal(number)
        }
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
            cont += value * Math.pow(16, index);
        }

        return cont;
    }

    floatHexaToDecimal (number) {
        let numberList = number.split('');
        let decimal = 0;

        for(let index = 0; index < numberList.length; index++) {
            let val = parseInt(numberList[index]);
            if(hexaToInt[numberList[index]]) {
                val = hexaToInt[numberList[index]]
            }
            decimal += val * Math.pow(16, (-1) * (index + 1))
        }

        return decimal;
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
        document.getElementById('binaryInput').value = hexa.convert(number, 2);
        document.getElementById('octalInput').value = hexa.convert(number, 8);
    } else {
        document.getElementById('decimalInput').value = 
        document.getElementById('binaryInput').value =
        document.getElementById('octalInput').value = "";
    }
}