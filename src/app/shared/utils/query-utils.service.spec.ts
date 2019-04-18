import {QueryUtils} from '@shared/utils/query-utils';


describe('Pipe: Default', () => {

    // it('Test extract searchQuery to SearchQuery object', () => {
    //     const query = {'q': 'tissue:"Brain" AND (disease: ("Sarcoma") AND (technology_type: ("EI") OR disease: ("Sarcoma") ' +
    //         'OR (technology_type: ("NMR"))))'};
    //     const searchQuery = QueryUtils.extractQuery(query);
    //     expect(searchQuery.operator).toBe('AND');
    //     expect(searchQuery.rules.length).toBe(2);
    //     expect(searchQuery.rules[0].query).toBeNull();
    //     expect(searchQuery.rules[0].field).toBe('tissue');
    //     expect(searchQuery.rules[0].data).toBe('Brain');
    //     expect(searchQuery.rules[1].query.operator).toBe('AND');
    //     expect(searchQuery.rules[1].query.rules[0].field).toBe('disease');
    //     expect(searchQuery.rules[1].query.rules[0].data).toBe('Sarcoma');
    // });
    //
    // it ('test extract searchQuery when two rule in the same level', () => {
    //     const query = {'q': 'tissue: "Blood" OR tissue:"Liver"'};
    //     const searchQuery = QueryUtils.extractQuery(query);
    //     expect(searchQuery.operator).toBe('OR');
    //     expect(searchQuery.rules.length).toBe(2);
    //     expect(searchQuery.rules[0].field).toBe('tissue');
    //     expect(searchQuery.rules[0].data).toBe('Blood');
    //     expect(searchQuery.rules[1].field).toBe('tissue');
    //     expect(searchQuery.rules[1].data).toBe('Liver');
    // });
    //
    // it ('test extract complex query', () => {
    //     const query = {'q': '"expression" AND (TAXONOMY: "9606" OR TAXONOMY: "520") AND (repository: "GEO")'};
    //     const searchQuery = QueryUtils.extractQuery(query);
    //     expect(searchQuery.operator).toBe('AND');
    //     expect(searchQuery.rules.length).toBe(3);
    //     expect(searchQuery.rules[0].field).toBe('all_fields');
    //     expect(searchQuery.rules[0].data).toBe('expression');
    //     expect(searchQuery.rules[1].field).toBe(null);
    //     expect(searchQuery.rules[1].data).toBe(null);
    //     expect(searchQuery.rules[1].query.operator).toBe('OR');
    //     expect(searchQuery.rules[1].query.rules.length).toBe(2);
    //     expect(searchQuery.rules[1].query.rules[0].field).toBe('TAXONOMY');
    //     expect(searchQuery.rules[1].query.rules[0].data).toBe('9606');
    // });
});
