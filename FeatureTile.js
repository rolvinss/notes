import { prepareTilesDataServiceClone } from '../../../../../../../components/Web/Addons/redesign/Components/FunctionalRedesign/addonsCommon';

describe('Render prepareTilesDataServiceClone', () => {
    test('Test prepareTilesDataServiceClone with homePhoneService and notification called', () => {
        const addonProducts = [{
            type: 'homePhoneService',
            skuDetails: { sorId: 'LVSKIHP', productId: 'LVSKIHP' },
        }];
        const passthroughState = {
            state: { notificationCalled: true, hideNotificationCalled: false },
            showNotification: jest.fn(),
            getTodayPhone: jest.fn(() => '1'),
            getMonthlyPhone: jest.fn(() => '1'),
            changeSkip: jest.fn(),
            props: {
                selectedProdID: 'LVSKIHP',
                plansReferenceData: {},
                cartDetails: {
                    dueMonthlyList: [],
                    dueTodayList: [],
                },
            }
        };
        const result = prepareTilesDataServiceClone(addonProducts, passthroughState.props.cartDetails, passthroughState.props.selectedProdID, true, passthroughState);
        expect(result).toEqual([{ 'LVSKIHP': { quantity: '1', productId: 'LVSKIHP', sorId: '' } }]);
        expect(passthroughState.showNotification).toHaveBeenCalled();
        expect(passthroughState.changeSkip).toHaveBeenCalledWith(true);
    });

    test('Test prepareTilesDataServiceClone with whwServices', () => {
        const addonProducts = [{
            type: 'whwServices',
            skuDetails: { sorId: 'WHW123', productId: 'WHW123' },
        }];
        const passthroughState = {
            state: { notificationCalled: false, hideNotificationCalled: false },
            showNotification: jest.fn(),
            setTimeOutCall: jest.fn(),
            changeSkip: jest.fn(),
            props: {
                selectedProdID: 'WHW123',
                plansReferenceData: {},
                cartDetails: {
                    dueMonthlyList: [
                        { sorId: 'WHW123', itemType: 'WHWPLUS' },
                    ],
                    dueTodayList: [],
                },
                skipBtnCall: false
            }
        };
        const result = prepareTilesDataServiceClone(addonProducts, passthroughState.props.cartDetails, passthroughState.props.selectedProdID, true, passthroughState);
        expect(result).toEqual([{ 'WHW123': { quantity: '1', productId: 'WHW123', sorId: '' } }]);
        expect(passthroughState.changeSkip).toHaveBeenCalledWith(true);
        expect(passthroughState.showNotification).toHaveBeenCalled();
        expect(passthroughState.setTimeOutCall).toHaveBeenCalled();
    });

    test('Test prepareTilesDataServiceClone with non-homePhoneService and non-whwServices', () => {
        const addonProducts = [{
            type: 'otherService',
            skuDetails: { sorId: 'OTHER123', productId: 'OTHER123' },
        }];
        const passthroughState = {
            state: { notificationCalled: false, hideNotificationCalled: false },
            showNotification: jest.fn(),
            changeSkip: jest.fn(),
            props: {
                selectedProdID: 'OTHER123',
                plansReferenceData: {},
                cartDetails: {
                    dueMonthlyList: [
                        { sorId: 'OTHER123', itemType: 'PLAN' },
                    ],
                    dueTodayList: [],
                },
                skipBtnCall: false
            }
        };
        const result = prepareTilesDataServiceClone(addonProducts, passthroughState.props.cartDetails, passthroughState.props.selectedProdID, true, passthroughState);
        expect(result).toEqual([{ 'OTHER123': { quantity: '1', productId: 'OTHER123', sorId: '' } }]);
        expect(passthroughState.changeSkip).toHaveBeenCalledWith(true);
        expect(passthroughState.showNotification).toHaveBeenCalled();
    });
});
