import { getQueryParams } from './addQueryParams';

describe('shared/url/addQueryParams', () => {
    test('test with one param', () => {
        const params = getQueryParams({
            testSearchParam: 'value',
        });
        expect(params).toBe('?testSearchParam=value');
    });
    test('test with multiple params', () => {
        const params = getQueryParams({
            testSearchParam: 'value',
            secondParam: '2',
        });
        expect(params).toBe('?testSearchParam=value&secondParam=2');
    });
    test('test with undefined', () => {
        const params = getQueryParams({
            testSearchParam: 'value',
            secondParam: undefined,
        });
        expect(params).toBe('?testSearchParam=value');
    });
});
