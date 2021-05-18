import {TruncatePipe} from './truncate.pipe';


describe('Pipe: Default', () => {
    let pipe: TruncatePipe;

    beforeEach(() => {
        pipe = new TruncatePipe();
    });

    it('Truncate 15 characters', () => {
        expect(pipe.transform('Lorem ipsum dolor sit amet, consectetur adipiscing elit', '15', '...'))
            .toBe('Lorem ipsum dol...');
    });

    it('Truncate 15 characters - no ellipsis', () => {
        expect(pipe.transform('Lorem ipsum dolor sit amet, consectetur adipiscing elit', '15', ''))
            .toBe('Lorem ipsum dol');
    });


    it('Truncate 50 characters - with highlighting', () => {
        expect(pipe.transform('The human genome contains many thousands of long noncoding RNAs (lncRNAs). While several studies', '50', '...', 'and;noncoding'))
            .toBe('...contains many thous<b>and</b>s of long <b>noncoding</b> RNAs (lncRNAs). W...');
    });
});
