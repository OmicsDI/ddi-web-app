import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'truncate'
})
export class TruncateDashboardprofilePipe implements PipeTransform {
    transform(value: string, ...args: string[]): string {
        if (!value) {
            return null;
        }
        const limit = args.length > 0 ? parseInt(args[0], 10) : 200;
        const trail = args.length > 1 ? args[1] : '...';
        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
}

