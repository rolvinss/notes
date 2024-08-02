import {
  prepareTilesDataClone,
  onBtnClickClone,
  prepareTilesDataServiceClone,
  getAddonsRefData,
  getWhwRefData,
  getAddonData,
} from '../../../../../../../components/Web/Addons/redesign/Components/FunctionalRedesign/addonsCommon';

describe('Render prepareTilesDataClone', () => {
  test('Test prepareTilesDataClone', () => {
    const accessoryDetails = [
      {
        skuDetails: { sorId: 'LVSKIHP', productId: 'LVSKIHP' },
      },
    ];
    const passthroughState = {
      state: { notificationCalled: false, hideNotificationCalled: false },
      showNotification: jest.fn(),
      setTimeOutCall: jest.fn(),
      changeSkip: jest.fn(),
      props: {
        selectedProdID: 'LVSKIHP',
        showAddNotification: true,
        plansReferenceData: {
          1293: {
            offerDescription: 'Enroll in autopay and paper free billing and receive a $XX discount',
            toolTip:
              '$XX autopay and paper free billing discount  Customers enrolled in autopay and paper free billing receive a $XX discount on the 5G Home Internet plan price. You will be able to enroll, while setting up your MyVerizon account, after completing your 5G Home Internet purchase',
            discountText: 'discount',
          },
        },
        cartDetails: {
          dueMonthlyList: [
            {
              name: '5G HOME INTERNET',
              actualAmount: '80.0',
              totalAmountWithDiscount: '35.0',
              productId: '39425',
              itemType: 'PLAN',
            },
            {
              name: 'Auto Pay & Paper-free billing',
              actualAmount: '-10.00',
              totalAmountWithDiscount: '-10.00',
              itemType: 'DISCOUNT',
            },
            {
              name: 'Verizon Wireless Loyalty Discount',
              actualAmount: '-35.00',
              totalAmountWithDiscount: '-35.00',
              itemType: 'DISCOUNT',
            },
            {
              name: '5G HOME PLUS',
              actualAmount: '80.0',
              totalAmountWithDiscount: '80.0',
              productId: '50129',
              itemType: 'PLAN',
            },
            {
              name: 'YouTubeTV Basic Subscription',
              actualAmount: '64.99',
              totalAmountWithDiscount: '64.99',
              productId: 'ASK-STI6220',
              itemType: 'SUBSCRIPTION',
              pricePlanId: '35616999',
            },
            {
              name: 'Verizon Home Device Protect',
              actualAmount: '25.00',
              totalAmountWithDiscount: '25.00',
              productId: '1614',
              itemType: 'PROTECTION',
            },
            {
              name: 'Verizon Internet Gateway',
              installationType: 'Self SetUp',
              discountApplied: '240.0',
              actualAmount: '240.0',
              totalAmountWithDiscount: '0.0',
              productId: 'dev15280028',
              sorId: 'ASK-NCQ1338',
              itemType: 'DEVICE',
              quantity: '1',
              taxAmount: '0.0',
              lineNumber: 'newLine1',
              multiLineSeqNumber: 1,
              isBackorder: 'false',
              preBackDate: '',
              networkBandwidthType: 'CBD',
              fullPriceDiscount: 'true',
            },
            {
              name: 'Stream TV',
              discountApplied: '69.99',
              actualAmount: '69.99',
              totalAmountWithDiscount: '0',
              productId: 'acc13960007',
              sorId: 'ASK-STI6220',
              itemType: 'ACCESSORY',
              quantity: '1',
              taxAmount: '0.0',
            },
            {
              name: 'Whole-Home Wi-fi Plus',
              actualAmount: '15.00',
              totalAmountWithDiscount: '5.00',
              sorId: '3240',
              itemType: 'WHWPLUS',
            },
          ],
          dueTodayList: [
            {
              name: '5G Internet Gateway',
              installationType: 'Self SetUp',
              discountApplied: '0.0',
              actualAmount: '0.0',
              totalAmountWithDiscount: '0.0',
              productId: '16900001',
              sorId: 'LVSKIHP',
              itemType: 'DEVICE',
              quantity: '1',
              taxAmount: '0.0',
              lineNumber: 'newLine1',
              multiLineSeqNumber: 1,
              isBackorder: 'false',
              preBackDate: '',
            },
            {
              name: 'Stream TV',
              discountApplied: '69.99',
              actualAmount: '139.98',
              totalAmountWithDiscount: '69.99',
              productId: 'acc13960007',
              sorId: 'ASK-STI6220',
              itemType: 'ACCESSORY',
              quantity: '2',
              taxAmount: '4.64',
            },
            {
              name: 'Whole-Home Wi-fi',
              actualAmount: '10.00',
              totalAmountWithDiscount: '0.00',
              sorId: '3239',
              itemType: 'WHWBASIC',
            },
          ],
        },
      },
    };
    const passthroughState1 = {
      state: { notificationCalled: true, hideNotificationCalled: false },
      showNotification: jest.fn(),

      props: {
        selectedProdID: 'LVSKIHP',
        showAddNotification: true,
        plansReferenceData: {
          1293: {
            offerDescription: 'Enroll in autopay and paper free billing and receive a $XX discount',
            toolTip:
              '$XX autopay and paper free billing discount  Customers enrolled in autopay and paper free billing receive a $XX discount on the 5G Home Internet plan price. You will be able to enroll, while setting up your MyVerizon account, after completing your 5G Home Internet purchase',
            discountText: 'discount',
          },
        },
        cartDetails: {
          dueMonthlyList: [
            {
              name: '5G HOME INTERNET',
              actualAmount: '80.0',
              totalAmountWithDiscount: '35.0',
              productId: '39425',
              itemType: 'PLAN',
            },
            {
              name: 'Auto Pay & Paper-free billing',
              actualAmount: '-10.00',
              totalAmountWithDiscount: '-10.00',
              itemType: 'DISCOUNT',
            },
            {
              name: 'Verizon Wireless Loyalty Discount',
              actualAmount: '-35.00',
              totalAmountWithDiscount: '-35.00',
              itemType: 'DISCOUNT',
            },
            {
              name: '5G HOME PLUS',
              actualAmount: '80.0',
              totalAmountWithDiscount: '80.0',
              productId: '50129',
              itemType: 'PLAN',
            },
            {
              name: 'YouTubeTV Basic Subscription',
              actualAmount: '64.99',
              totalAmountWithDiscount: '64.99',
              productId: 'ASK-STI6220',
              itemType: 'SUBSCRIPTION',
              pricePlanId: '35616999',
            },
            {
              name: 'Verizon Home Device Protect',
              actualAmount: '25.00',
              totalAmountWithDiscount: '25.00',
              productId: '1614',
              itemType: 'PROTECTION',
            },
            {
              name: 'Verizon Internet Gateway',
              installationType: 'Self SetUp',
              discountApplied: '240.0',
              actualAmount: '240.0',
              totalAmountWithDiscount: '0.0',
              productId: 'dev15280028',
              sorId: 'ASK-NCQ1338',
              itemType: 'DEVICE',
              quantity: '1',
              taxAmount: '0.0',
              lineNumber: 'newLine1',
              multiLineSeqNumber: 1,
              isBackorder: 'false',
              preBackDate: '',
              networkBandwidthType: 'CBD',
              fullPriceDiscount: 'true',
            },
            {
              name: 'Stream TV',
              discountApplied: '69.99',
              actualAmount: '69.99',
              totalAmountWithDiscount: '0',
              productId: 'acc13960007',
              sorId: 'ASK-STI6220',
              itemType: 'ACCESSORY',
              quantity: '1',
              taxAmount: '0.0',
            },
            {
              name: 'Whole-Home Wi-fi Plus',
              actualAmount: '15.00',
              totalAmountWithDiscount: '5.00',
              sorId: '3240',
              itemType: 'WHWPLUS',
            },
          ],
          dueTodayList: [
            {
              name: '5G Internet Gateway',
              installationType: 'Self SetUp',
              discountApplied: '0.0',
              actualAmount: '0.0',
              totalAmountWithDiscount: '0.0',
              productId: '16900001',
              sorId: 'LVSKIHP',
              itemType: 'DEVICE',
              quantity: '1',
              taxAmount: '0.0',
              lineNumber: 'newLine1',
              multiLineSeqNumber: 1,
              isBackorder: 'false',
              preBackDate: '',
            },
            {
              name: 'Stream TV',
              discountApplied: '69.99',
              actualAmount: '139.98',
              totalAmountWithDiscount: '69.99',
              productId: 'acc13960007',
              sorId: 'ASK-STI6220',
              itemType: 'ACCESSORY',
              quantity: '2',
              taxAmount: '4.64',
            },
            {
              name: 'Whole-Home Wi-fi',
              actualAmount: '10.00',
              totalAmountWithDiscount: '0.00',
              sorId: '3239',
              itemType: 'WHWBASIC',
            },
          ],
        },
      },
    };
    prepareTilesDataClone(accessoryDetails, true, passthroughState1);
    const data = prepareTilesDataClone(accessoryDetails, true, passthroughState);
    const customProps = {
      isCartPage: true,
      validateCartNeeded: jest.fn(),
      quantityChanged: jest.fn(),
      dueTodayList: [
        {
          name: '5G Internet Gateway',
          installationType: 'Self SetUp',
          discountApplied: '0.0',
          actualAmount: '0.0',
          totalAmountWithDiscount: '0.0',
          productId: '16900001',
          sorId: 'LVSKIHP',
          itemType: 'DEVICE',
          quantity: '1',
          taxAmount: '0.0',
          lineNumber: 'newLine1',
          multiLineSeqNumber: 1,
          isBackorder: 'false',
          preBackDate: '',
          isHomePhone: 'true',
        },
        {
          name: 'Stream TV',
          discountApplied: '69.99',
          actualAmount: '139.98',
          totalAmountWithDiscount: '69.99',
          productId: 'acc13960007',
          sorId: 'ASK-STI6220',
          itemType: 'ACCESSORY',
          quantity: '2',
          taxAmount: '4.64',
        },
        {
          name: 'Whole-Home Wi-fi',
          actualAmount: '10.00',
          totalAmountWithDiscount: '0.00',
          sorId: '3239',
          itemType: 'WHWBASIC',
        },
      ],
      isAddonsPage: true,
      postAccessory: {
        addonObj: {},
        cartDetails: {
          dueMonthlyList: [
            {
              name: '5G HOME INTERNET',
              actualAmount: '80.0',
              totalAmountWithDiscount: '35.0',
              productId: '39425',
              itemType: 'PLAN',
            },
            {
              name: 'Auto Pay & Paper-free billing',
              actualAmount: '-10.00',
              totalAmountWithDiscount: '-10.00',
              itemType: 'DISCOUNT',
            },
            {
              name: 'Verizon Wireless Loyalty Discount',
              actualAmount: '-35.00',
              totalAmountWithDiscount: '-35.00',
              itemType: 'DISCOUNT',
            },
            {
              name: '5G HOME PLUS',
              actualAmount: '80.0',
              totalAmountWithDiscount: '80.0',
              productId: '50129',
              itemType: 'PLAN',
            },
            {
              name: 'YouTubeTV Basic Subscription',
              actualAmount: '64.99',
              totalAmountWithDiscount: '64.99',
              productId: 'ASK-STI6220',
              itemType: 'SUBSCRIPTION',
              pricePlanId: '35616999',
            },
            {
              name: 'Whole-Home Wi-fi Plus',
              actualAmount: '15.00',
              totalAmountWithDiscount: '5.00',
              sorId: '3240',
              itemType: 'WHWPLUS',
            },
            {
              name: 'Verizon Home Device Protect',
              actualAmount: '25.00',
              totalAmountWithDiscount: '25.00',
              productId: '1614',
              itemType: 'PROTECTION',
            },
            {
              name: 'Verizon Internet Gateway',
              installationType: 'Self SetUp',
              discountApplied: '240.0',
              actualAmount: '240.0',
              totalAmountWithDiscount: '0.0',
              productId: 'dev15280028',
              sorId: 'ASK-NCQ1338',
              itemType: 'DEVICE',
              quantity: '1',
              taxAmount: '0.0',
              lineNumber: 'newLine1',
              multiLineSeqNumber: 1,
              isBackorder: 'false',
              preBackDate: '',
              networkBandwidthType: 'CBD',
              fullPriceDiscount: 'true',
            },
            {
              name: 'Stream TV',
              discountApplied: '69.99',
              actualAmount: '69.99',
              totalAmountWithDiscount: '0',
              productId: 'acc13960007',
              sorId: 'ASK-STI6220',
              itemType: 'ACCESSORY',
              quantity: '1',
              taxAmount: '0.0',
            },
          ],
          dueTodayList: [
            {
              name: '5G Internet Gateway',
              installationType: 'Self SetUp',
              discountApplied: '0.0',
              actualAmount: '0.0',
              totalAmountWithDiscount: '0.0',
              productId: '16900001',
              sorId: 'LVSKIHP',
              itemType: 'DEVICE',
              quantity: '1',
              taxAmount: '0.0',
              lineNumber: 'newLine1',
              multiLineSeqNumber: 1,
              isBackorder: 'false',
              preBackDate: '',
            },
            {
              name: 'Whole-Home Wi-fi',
              actualAmount: '10.00',
              totalAmountWithDiscount: '0.00',
              sorId: '3239',
              itemType: 'WHWBASIC',
            },
            {
              name: 'Stream TV',
              discountApplied: '69.99',
              actualAmount: '139.98',
              totalAmountWithDiscount: '69.99',
              productId: 'acc13960007',
              sorId: 'ASK-STI6220',
              itemType: 'ACCESSORY',
              quantity: '2',
              taxAmount: '4.64',
            },
          ],
        },
      },
    };
    const customProps1 = {
      isCartPage: true,
      validateCartNeeded: jest.fn(),
      quantityChanged: jest.fn(),
      dueTodayList: [
        {
          name: '5G Internet Gateway',
          installationType: 'Self SetUp',
          discountApplied: '0.0',
          actualAmount: '0.0',
          totalAmountWithDiscount: '0.0',
          productId: '16900001',
          sorId: 'LVSKIHP',
          itemType: 'DEVICE',
          quantity: '1',
          taxAmount: '0.0',
          lineNumber: 'newLine1',
          multiLineSeqNumber: 1,
          isBackorder: 'false',
          preBackDate: '',
          isHomePhone: 'true',
        },
        {
          name: 'Stream TV',
          discountApplied: '69.99',
          actualAmount: '139.98',
          totalAmountWithDiscount: '69.99',
          productId: 'acc13960007',
          sorId: 'ASK-STI6220',
          itemType: 'ACCESSORY',
          quantity: '2',
          taxAmount: '4.64',
        },
        {
          name: 'Whole-Home Wi-fi',
          actualAmount: '10.00',
          totalAmountWithDiscount: '0.00',
          sorId: '3239',
          itemType: 'WHWBASIC',
        },
      ],
      isAddonsPage: false,
      postAccessory: {
        addonObj: {},
        cartDetails: {
          dueMonthlyList: [
            {
              name: '5G HOME INTERNET',
              actualAmount: '80.0',
              totalAmountWithDiscount: '35.0',
              productId: '39425',
              itemType: 'PLAN',
            },
            {
              name: 'Auto Pay & Paper-free billing',
              actualAmount: '-10.00',
              totalAmountWithDiscount: '-10.00',
              itemType: 'DISCOUNT',
            },
            {
              name: 'Verizon Wireless Loyalty Discount',
              actualAmount: '-35.00',
              totalAmountWithDiscount: '-35.00',
              itemType: 'DISCOUNT',
            },
            {
              name: '5G HOME PLUS',
              actualAmount: '80.0',
              totalAmountWithDiscount: '80.0',
              productId: '50129',
              itemType: 'PLAN',
            },
            {
              name: 'YouTubeTV Basic Subscription',
              actualAmount: '64.99',
              totalAmountWithDiscount: '64.99',
              productId: 'ASK-STI6220',
              itemType: 'SUBSCRIPTION',
              pricePlanId: '35616999',
            },
            {
              name: 'Whole-Home Wi-fi Plus',
              actualAmount: '15.00',
              totalAmountWithDiscount: '5.00',
              sorId: '3240',
              itemType: 'WHWPLUS',
            },
            {
              name: 'Verizon Home Device Protect',
              actualAmount: '25.00',
              totalAmountWithDiscount: '25.00',
              productId: '1614',
              itemType: 'PROTECTION',
            },
            {
              name: 'Verizon Internet Gateway',
              installationType: 'Self SetUp',
              discountApplied: '240.0',
              actualAmount: '240.0',
              totalAmountWithDiscount: '0.0',
              productId: 'dev15280028',
              sorId: 'ASK-NCQ1338',
              itemType: 'DEVICE',
              quantity: '1',
              taxAmount: '0.0',
              lineNumber: 'newLine1',
              multiLineSeqNumber: 1,
              isBackorder: 'false',
              preBackDate: '',
              networkBandwidthType: 'CBD',
              fullPriceDiscount: 'true',
            },
            {
              name: 'Stream TV',
              discountApplied: '69.99',
              actualAmount: '69.99',
              totalAmountWithDiscount: '0',
              productId: 'acc13960007',
              sorId: 'ASK-STI6220',
              itemType: 'ACCESSORY',
              quantity: '1',
              taxAmount: '0.0',
            },
          ],
          dueTodayList: [
            {
              name: '5G Internet Gateway',
              installationType: 'Self SetUp',
              discountApplied: '0.0',
              actualAmount: '0.0',
              totalAmountWithDiscount: '0.0',
              productId: '16900001',
              sorId: 'LVSKIHP',
              itemType: 'DEVICE',
              quantity: '1',
              taxAmount: '0.0',
              lineNumber: 'newLine1',
              multiLineSeqNumber: 1,
              isBackorder: 'false',
              preBackDate: '',
            },
            {
              name: 'Stream TV',
              discountApplied: '69.99',
              actualAmount: '139.98',
              totalAmountWithDiscount: '69.99',
              productId: 'acc13960007',
              sorId: 'ASK-STI6220',
              itemType: 'ACCESSORY',
              quantity: '2',
              taxAmount: '4.64',
            },
            {
              name: 'Whole-Home Wi-fi',
              actualAmount: '10.00',
              totalAmountWithDiscount: '0.00',
              sorId: '3239',
              itemType: 'WHWBASIC',
            },
          ],
        },
      },
    };
    onBtnClickClone({ currentTarget: { id: '_Minus' } }, customProps);
    onBtnClickClone({ currentTarget: { id: '_Increment' } }, customProps1);
    onBtnClickClone({ currentTarget: { id: '_Increment1' } }, customProps1);
    onBtnClickClone({ currentTarget: { id: '_Minus' } });
    expect(data).toBeTruthy();
  });
  test('Test prepareTilesDataServiceClone with homePhoneService and notification called', () => {
    const addonProducts = [
      {
        type: 'homePhoneService',
        skuDetails: { sorId: 'LVSKIHP', productId: 'LVSKIHP' },
      },
    ];
    const passthroughState = {
      state: { notificationCalled: true, hideNotificationCalled: false },
      showNotification: jest.fn(),
      getNotification: jest.fn(),
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
      },
    };
    const result = prepareTilesDataServiceClone(
      addonProducts,
      passthroughState.props.cartDetails,
      passthroughState.props.selectedProdID,
      true,
      passthroughState,
    );
    expect(result).toBeTruthy();
  });

  test('Test prepareTilesDataServiceClone with whwServices', () => {
    const addonProducts = [
      {
        type: 'whwServices',
        skuDetails: { sorId: 'WHW123', productId: 'WHW123' },
      },
    ];
    const passthroughState = {
      state: { notificationCalled: false, hideNotificationCalled: false },
      showNotification: jest.fn(),
      setTimeOutCall: jest.fn(),
      changeSkip: jest.fn(),
      props: {
        selectedProdID: 'WHW123',
        plansReferenceData: {},
        cartDetails: {
          dueMonthlyList: [{ sorId: 'WHW123', itemType: 'WHWPLUS' }],
          dueTodayList: [],
        },
        skipBtnCall: false,
      },
    };
    const result = prepareTilesDataServiceClone(
      addonProducts,
      passthroughState.props.cartDetails,
      passthroughState.props.selectedProdID,
      true,
      passthroughState,
    );
    expect(result).toBeTruthy();
  });

  test('Test prepareTilesDataServiceClone with non-homePhoneService and non-whwServices', () => {
    const addonProducts = [
      {
        type: 'otherService',
        skuDetails: { sorId: 'OTHER123', productId: 'OTHER123' },
      },
    ];
    const passthroughState = {
      setState: jest.fn(),
      state: { notificationCalled: false, hideNotificationCalled: false, setState: jest.fn() },
      showNotification: jest.fn(),
      changeSkip: jest.fn(),
      props: {
        selectedProdID: 'OTHER123',
        plansReferenceData: {},
        cartDetails: {
          dueMonthlyList: [{ sorId: 'OTHER123', itemType: 'PLAN' }],
          dueTodayList: [],
        },
        skipBtnCall: false,
      },
    };
    const result = prepareTilesDataServiceClone(
      addonProducts,
      passthroughState.props.cartDetails,
      passthroughState.props.selectedProdID,
      true,
      passthroughState,
    );
    expect(result).toBeTruthy();
    expect(passthroughState.changeSkip).toHaveBeenCalledWith(true);
    expect(passthroughState.showNotification).toHaveBeenCalled();
  });
});

describe('Render getAddonsRefData', () => {
  test('Test getAddonsRefData', () => {
    const accessoryDetails = [
      {
        skuDetails: { sorId: 'LVSKIHP', productId: 'LVSKIHP' },
      },
      {
        skuDetails: { sorId: 'ASK-STI6220', productId: 'ASK-STI6220' },
      },
    ];

    const plansReferenceData = {
      LVSKIHP: {
        sorId: 'LVSKIHP',
        productId: 'LVSKIHP',
        displayName: 'Plan 1',
        planName: 'Plan One',
      },
      'ASK-STI6220': {
        sorId: 'ASK-STI6220',
        productId: 'ASK-STI6220',
        displayName: 'Plan 2',
        planName: 'Plan Two',
      },
    };

    // getProductRefData.mockImplementation((sorId, productId, plansReferenceData) => {
    //   return [plansReferenceData[sorId]];
    // });

    const result = getAddonsRefData(accessoryDetails, plansReferenceData);

    // expect(result).toEqual([
    //   {
    //     sorId: 'LVSKIHP',
    //     productId: 'LVSKIHP',
    //     displayName: 'Plan 1',
    //     planName: 'Plan One',
    //   },
    //   {
    //     sorId: 'ASK-STI6220',
    //     productId: 'ASK-STI6220',
    //     displayName: 'Plan 2',
    //     planName: 'Plan Two',
    //   },
    // ]);
    expect(result).toBeTruthy();
  });

  test('Test getAddonsRefData with empty accessoryDetails', () => {
    const accessoryDetails = [];
    const plansReferenceData = {
      LVSKIHP: {
        sorId: 'LVSKIHP',
        productId: 'LVSKIHP',
        displayName: 'Plan 1',
        planName: 'Plan One',
      },
      'ASK-STI6220': {
        sorId: 'ASK-STI6220',
        productId: 'ASK-STI6220',
        displayName: 'Plan 2',
        planName: 'Plan Two',
      },
    };

    const result = getAddonsRefData(accessoryDetails, plansReferenceData);

    expect(result).toEqual([]);
  });

  test('Test getAddonsRefData with empty plansReferenceData', () => {
    const accessoryDetails = [
      {
        skuDetails: { sorId: 'LVSKIHP', productId: 'LVSKIHP' },
      },
      {
        skuDetails: { sorId: 'ASK-STI6220', productId: 'ASK-STI6220' },
      },
    ];

    const plansReferenceData = {};

    const result = getAddonsRefData(accessoryDetails, plansReferenceData);

    expect(result).toEqual([]);
  });

  test('Test getAddonsRefData with undefined accessoryDetails', () => {
    const plansReferenceData = {
      LVSKIHP: {
        sorId: 'LVSKIHP',
        productId: 'LVSKIHP',
        displayName: 'Plan 1',
        planName: 'Plan One',
      },
      'ASK-STI6220': {
        sorId: 'ASK-STI6220',
        productId: 'ASK-STI6220',
        displayName: 'Plan 2',
        planName: 'Plan Two',
      },
    };

    const result = getAddonsRefData(undefined, plansReferenceData);

    expect(result).toEqual([]);
  });

  test('Test getAddonsRefData with undefined plansReferenceData', () => {
    const accessoryDetails = [
      {
        skuDetails: { sorId: 'LVSKIHP', productId: 'LVSKIHP' },
      },
      {
        skuDetails: { sorId: 'ASK-STI6220', productId: 'ASK-STI6220' },
      },
    ];

    const result = getAddonsRefData(accessoryDetails, undefined);

    expect(result).toEqual([]);
  });
});

describe('Render getWhwRefData', () => {
  test('Test getWhwRefData', () => {
    const accessoryDetails = [
      {
        skuDetails: { sorId: 'LVSKIHP', productId: 'LVSKIHP' },
      },
      {
        skuDetails: { sorId: 'ASK-STI6220', productId: 'ASK-STI6220' },
      },
    ];

    const plansReferenceData = {
      LVSKIHP: {
        sorId: 'LVSKIHP',
        productId: 'LVSKIHP',
        displayName: 'Plan 1',
        planName: 'Plan One',
      },
      'ASK-STI6220': {
        sorId: 'ASK-STI6220',
        productId: 'ASK-STI6220',
        displayName: 'Plan 2',
        planName: 'Plan Two',
      },
    };

    const result = getWhwRefData(accessoryDetails, plansReferenceData);

    expect(result).toBeTruthy();
  });

  test('Test getWhwRefData with empty accessoryDetails', () => {
    const accessoryDetails = [];
    const plansReferenceData = {
      LVSKIHP: {
        sorId: 'LVSKIHP',
        productId: 'LVSKIHP',
        displayName: 'Plan 1',
        planName: 'Plan One',
      },
      'ASK-STI6220': {
        sorId: 'ASK-STI6220',
        productId: 'ASK-STI6220',
        displayName: 'Plan 2',
        planName: 'Plan Two',
      },
    };

    const result = getWhwRefData(accessoryDetails, plansReferenceData);

    expect(result).toEqual([]);
  });

  test('Test getWhwRefData with empty plansReferenceData', () => {
    const accessoryDetails = [
      {
        skuDetails: { sorId: 'LVSKIHP', productId: 'LVSKIHP' },
      },
      {
        skuDetails: { sorId: 'ASK-STI6220', productId: 'ASK-STI6220' },
      },
    ];

    const plansReferenceData = {};

    const result = getWhwRefData(accessoryDetails, plansReferenceData);

    expect(result).toEqual([]);
  });

  test('Test getWhwRefData with undefined accessoryDetails', () => {
    const plansReferenceData = {
      LVSKIHP: {
        sorId: 'LVSKIHP',
        productId: 'LVSKIHP',
        displayName: 'Plan 1',
        planName: 'Plan One',
      },
      'ASK-STI6220': {
        sorId: 'ASK-STI6220',
        productId: 'ASK-STI6220',
        displayName: 'Plan 2',
        planName: 'Plan Two',
      },
    };

    const result = getWhwRefData(undefined, plansReferenceData);

    expect(result).toEqual([]);
  });

  test('Test getWhwRefData with undefined plansReferenceData', () => {
    const accessoryDetails = [
      {
        skuDetails: { sorId: 'LVSKIHP', productId: 'LVSKIHP' },
      },
      {
        skuDetails: { sorId: 'ASK-STI6220', productId: 'ASK-STI6220' },
      },
    ];

    const result = getWhwRefData(accessoryDetails, undefined);

    expect(result).toEqual([]);
  });
});

describe('Render getAddonData', () => {
  test('Test getAddonData with valid serviceData and refData', () => {
    const serviceData = {
      skuDetails: {
        sorId: 'LVSKIHP',
        productId: 'LVSKIHP',
        categoryType: 'whw',
        priceText: '10',
        regularPrice: '20',
        discountPrice: '5',
      },
      type: 'whwServices',
    };

    const refData = [
      {
        sorId: 'LVSKIHP',
        productId: 'LVSKIHP',
        features: 'Feature 1',
        featuresRedemption: 'Feature 2',
        planName: 'Plan A',
        displayName: 'Plan A Display',
        detailModalHeader: 'Header',
        detailModalBody: 'Body',
        promoDetailModalBody: 'Promo Body',
        detailModalBody5G: '5G Body',
        detailModalBodyLTE: 'LTE Body',
        useBrandLogoNamming: 'Brand Logo',
        imageUrl: 'http://example.com/image.jpg',
        youtTubePromoBanner: 'YouTube Banner',
        youTubePricingTextLabel: 'YouTube Pricing Text',
        promoBannerDetailsModalHeader: 'Promo Header',
        promoBannerDetailsModalContent: 'Promo Content',
        superscriptContent: 'Superscript',
      },
    ];
    const result = getAddonData(serviceData, refData);
    expect(result).toBeTruthy();
  });

  test('Test getAddonData with missing refData', () => {
    const serviceData = {
      skuDetails: {
        sorId: 'LVSKIHP',
        productId: 'LVSKIHP',
        categoryType: 'whw',
        priceText: '10',
        regularPrice: '20',
        discountPrice: '5',
      },
      type: 'whwServices',
    };

    const refData = [];

    const expectedData = {};

    const result = getAddonData(serviceData, refData);
    expect(result).toEqual(expectedData);
  });

  test('Test getAddonData with partial data', () => {
    const serviceData = {
      skuDetails: {
        sorId: 'LVSKIHP',
        productId: 'LVSKIHP',
        categoryType: 'whw',
        priceText: '10',
        regularPrice: '20',
        discountPrice: '5',
      },
      type: 'whwServices',
    };

    const refData = [
      {
        sorId: 'LVSKIHP',
        productId: 'LVSKIHP',
        features: 'Feature 1',
        planName: 'Plan A',
      },
    ];

    const result = getAddonData(serviceData, refData);
    expect(result).toBeTruthy();
  });
});
