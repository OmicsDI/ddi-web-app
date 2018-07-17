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
});
