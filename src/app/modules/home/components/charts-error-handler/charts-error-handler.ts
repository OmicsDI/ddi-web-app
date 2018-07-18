import * as d3 from 'd3';

export class ChartsErrorHandler {
    public static outputErrorInfo(errDiv: string): void {
        const tempDiv = d3.select('#' + errDiv);

        tempDiv.selectAll('i').remove();
        tempDiv.selectAll('p').remove();
        tempDiv.append('p')
            .attr('class', 'error-info')
            .text('Sorry, accessing to this web service was temporally failed.');
    }

    public static outputGettingInfo(errDiv: string): void {
        const tempDiv = d3.select('#' + errDiv);

        if (!tempDiv.select('i')[0]) {
            tempDiv.append('i')
                .attr('class', 'fa fa-spinner fa-spin');
        }
    }

    public static removeGettingInfo(errDiv: string): void {
        const tempDiv = d3.select('#' + errDiv);
        tempDiv.select('i').remove();
    }
}
