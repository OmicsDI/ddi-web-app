import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, ...args: string[]): string {
        if (!value) {
            return null;
        }
        const limit = args.length > 0 ? parseInt(args[0], 10) : 200;
        const trail = args.length > 1 ? args[1] : '...';
        const highlight = args.length > 2 ? args[2] : null;
        if (highlight != null) {
            let indexes = [];
            const keywords = highlight.split(/[\s;]+/);
            keywords.forEach(keyword => {
                const index = value.toLowerCase().indexOf(keyword.toLowerCase());
                if (index !== -1) {
                    indexes.push({'index': index, 'word': value.substring(index, index + keyword.length)});
                }
            });
            if (indexes.length > 0) {
                indexes = indexes.sort((i1, i2) => i2['index'] - i1['index']);
                const distance = indexes[0]['index'] - indexes[indexes.length - 1]['index'];
                let fromIndex = indexes[indexes.length - 1]['index'] - Math.abs(limit - distance) / 2;
                let delta = 0;
                if (fromIndex < 0) {
                    delta = 0 - fromIndex;
                    fromIndex = 0;
                }
                delta += Math.abs(limit - distance) / 2;
                const toIndex = indexes[0]['index'] + indexes[0]['word'].length + delta;
                let newVal = value.length > limit ? value.substring(fromIndex, toIndex) : value;
                if (fromIndex !== 0) {
                    newVal = trail + newVal.trimLeft();
                }
                if (toIndex < value.length) {
                    newVal = newVal + trail;
                }
                indexes.forEach(element => {
                    newVal = newVal.replace(element['word'], '<b>' + element['word'] + '</b>');
                });

                if (distance > limit) {
                    const maxDistance = {'from': 0, 'to': 0};
                    for (let i = 0; i + 1 < indexes.length; i++) {
                        if (indexes[i]['index'] - indexes[i + 1]['index'] > maxDistance['to'] - maxDistance['from']) {
                            maxDistance['from'] = indexes[i + 1]['index'] + indexes[i + 1]['word'].length;
                            maxDistance['to'] = indexes[i]['index'];
                        }
                    }
                    maxDistance['from'] = maxDistance['from'] - fromIndex + 100;
                    maxDistance['to'] = maxDistance['to'] - fromIndex - 100;

                    if (maxDistance['to'] > maxDistance['from']) {
                        newVal = newVal.substring(0, maxDistance['from']) + trail + '<br />' + trail + newVal.substring(maxDistance['to']);
                    }
                }
                return newVal;
            }
        }
        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
}

