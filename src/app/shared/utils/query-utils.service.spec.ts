import {QueryUtils} from '@shared/utils/query-utils';


describe('Pipe: Default', () => {

    it('Test extract searchQuery to SearchQuery object', () => {
        const query = '(*:* AND tissue:"Brain" AND (disease: ("Sarcoma") AND (technology_type: ("EI") OR disease: ("Sarcoma") ' +
            'OR (technology_type: ("NMR")))))';
        const searchQuery = QueryUtils.extractQuery(query);
        expect(searchQuery.operator).toBe('AND');
        expect(searchQuery.rules.length).toBe(3);
        expect(searchQuery.rules[0].condition).toBe('equal');
        expect(searchQuery.rules[0].field).toBe('*');
        expect(searchQuery.rules[0].data).toBe('*');
        expect(searchQuery.rules[0].query).toBeNull();
        expect(searchQuery.rules[1].field).toBe('tissue');
        expect(searchQuery.rules[1].data).toBe('Brain');
        expect(searchQuery.rules[2].query.operator).toBe('AND');
        expect(searchQuery.rules[2].query.rules[0].field).toBe('disease');
        expect(searchQuery.rules[2].query.rules[0].data).toBe('Sarcoma');
    });
});
