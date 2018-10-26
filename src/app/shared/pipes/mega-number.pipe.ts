import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'megaNumber'
})
export class MegaNumberPipe implements PipeTransform {
    transform(value: number, fractionSize: any): string {
        if (value == null) {
            return null;
        }
        if (value === 0) {
            return '0';
        }

        if (fractionSize < 0) {
            fractionSize = 1;
        }

        let abs = Math.abs(value);
        const rounder = Math.pow(10, fractionSize);
        const isNegative = value < 0;
        let key = '';
        const powers = [
            {key: 'Q', value: Math.pow(10, 15)},
            {key: 'T', value: Math.pow(10, 12)},
            {key: 'B', value: Math.pow(10, 9)},
            {key: 'M', value: Math.pow(10, 6)},
            {key: 'K', value: 1000}
        ];

        for (let i = 0; i < powers.length; i++) {

            let reduced = abs / powers[i].value;

            reduced = Math.round(reduced * rounder) / rounder;

            if (reduced >= 1) {
                abs = reduced;
                key = powers[i].key;
                break;
            }
        }

        return (isNegative ? '-' : '') + abs + key;
    }
}

