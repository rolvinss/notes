import { getAddonsRefData } from '../../../../../../components/Web/Addons/redesign/Components/FunctionalRedesign/addonsCommon';
import { getProductRefData } from '../../../../../../utils/plansReference';

jest.mock('../../../../../../utils/plansReference');

describe('Render getAddonsRefData', () => {
    test('Test getAddonsRefData', () => {
        const accessoryDetails = [
            {
                skuDetails: { sorId: 'LVSKIHP', productId: 'LVSKIHP' }
            },
            {
                skuDetails: { sorId: 'ASK-STI6220', productId: 'ASK-STI6220' }
            }
        ];
        
        const plansReferenceData = {
            'LVSKIHP': {
                sorId: 'LVSKIHP',
                productId: 'LVSKIHP',
                displayName: 'Plan 1',
                planName: 'Plan One'
            },
            'ASK-STI6220': {
                sorId: 'ASK-STI6220',
                productId: 'ASK-STI6220',
                displayName: 'Plan 2',
                planName: 'Plan Two'
            }
        };

        getProductRefData.mockImplementation((sorId, productId, plansReferenceData) => {
            return [plansReferenceData[sorId]];
        });

        const result = getAddonsRefData(accessoryDetails, plansReferenceData);

        expect(result).toEqual([
            {
                sorId: 'LVSKIHP',
                productId: 'LVSKIHP',
                displayName: 'Plan 1',
                planName: 'Plan One'
            },
            {
                sorId: 'ASK-STI6220',
                productId: 'ASK-STI6220',
                displayName: 'Plan 2',
                planName: 'Plan Two'
            }
        ]);
    });

    test('Test getAddonsRefData with empty accessoryDetails', () => {
        const accessoryDetails = [];
        const plansReferenceData = {
            'LVSKIHP': {
                sorId: 'LVSKIHP',
                productId: 'LVSKIHP',
                displayName: 'Plan 1',
                planName: 'Plan One'
            },
            'ASK-STI6220': {
                sorId: 'ASK-STI6220',
                productId: 'ASK-STI6220',
                displayName: 'Plan 2',
                planName: 'Plan Two'
            }
        };

        const result = getAddonsRefData(accessoryDetails, plansReferenceData);

        expect(result).toEqual([]);
    });

    test('Test getAddonsRefData with empty plansReferenceData', () => {
        const accessoryDetails = [
            {
                skuDetails: { sorId: 'LVSKIHP', productId: 'LVSKIHP' }
            },
            {
                skuDetails: { sorId: 'ASK-STI6220', productId: 'ASK-STI6220' }
            }
        ];
        
        const plansReferenceData = {};

        const result = getAddonsRefData(accessoryDetails, plansReferenceData);

        expect(result).toEqual([]);
    });

    test('Test getAddonsRefData with undefined accessoryDetails', () => {
        const plansReferenceData = {
            'LVSKIHP': {
                sorId: 'LVSKIHP',
                productId: 'LVSKIHP',
                displayName: 'Plan 1',
                planName: 'Plan One'
            },
            'ASK-STI6220': {
                sorId: 'ASK-STI6220',
                productId: 'ASK-STI6220',
                displayName: 'Plan 2',
                planName: 'Plan Two'
            }
        };

        const result = getAddonsRefData(undefined, plansReferenceData);

        expect(result).toEqual([]);
    });

    test('Test getAddonsRefData with undefined plansReferenceData', () => {
        const accessoryDetails = [
            {
                skuDetails: { sorId: 'LVSKIHP', productId: 'LVSKIHP' }
            },
            {
                skuDetails: { sorId: 'ASK-STI6220', productId: 'ASK-STI6220' }
            }
        ];
        
        const result = getAddonsRefData(accessoryDetails, undefined);

        expect(result).toEqual([]);
    });
});
