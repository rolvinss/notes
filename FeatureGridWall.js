import { getAddonsRefData } from '../../../../../../components/Web/Addons/redesign/Components/FunctionalRedesign/addonsCommon';
import { getProductRefData } from '../../../../../../utils/plansReference';

jest.mock('../../../../../../utils/plansReference');

describe('getAddonsRefData', () => {
    const plansReferenceData = [
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
    ];

    const accessoryDetails = [
        {
            skuDetails: {
                sorId: 'LVSKIHP',
                productId: 'LVSKIHP'
            }
        },
        {
            skuDetails: {
                sorId: 'ASK-STI6220',
                productId: 'ASK-STI6220'
            }
        }
    ];

    it('should return product reference data for given accessory details', () => {
        getProductRefData.mockImplementation((sorId, productId, plansReferenceData) => {
            return plansReferenceData.filter(plan => plan.sorId === sorId && plan.productId === productId);
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

    it('should return an empty array if accessoryDetails is empty', () => {
        const result = getAddonsRefData([], plansReferenceData);
        expect(result).toEqual([]);
    });

    it('should return an empty array if plansReferenceData is empty', () => {
        const result = getAddonsRefData(accessoryDetails, []);
        expect(result).toEqual([]);
    });

    it('should handle undefined accessoryDetails gracefully', () => {
        const result = getAddonsRefData(undefined, plansReferenceData);
        expect(result).toEqual([]);
    });

    it('should handle undefined plansReferenceData gracefully', () => {
        const result = getAddonsRefData(accessoryDetails, undefined);
        expect(result).toEqual([]);
    });
});

