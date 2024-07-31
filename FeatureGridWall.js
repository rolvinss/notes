import { getAddonData } from '../../../../../../../components/Web/Addons/redesign/Components/FunctionalRedesign/addonsCommon';

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

        const expectedData = {
            title: 'Plan A',
            newPrice: '10',
            features: 'Feature 2',
            pricingText: 'Included',
            oldPrice: '20',
            cap: undefined,
            color: undefined,
            type: 'whwServices',
            addonProductData: serviceData,
            detailModalHeader: 'Header',
            detailModalBody: 'Body',
            promoDetailModalBody: 'Promo Body',
            detailModalBody5G: '5G Body',
            detailModalBodyLTE: 'LTE Body',
            useBrandLogoNamming: 'Brand Logo',
            imageUrl: 'http://example.com/image.jpg',
            discountAvailed: '5',
            addonRefData: refData[0],
            youtTubePromoBanner: 'YouTube Banner',
            youTubePricingTextLabel: 'YouTube Pricing Text',
            promoBannerDetailsModalHeader: 'Promo Header',
            promoBannerDetailsModalContent: 'Promo Content',
            superscriptContent: 'Superscript',
        };

        const result = getAddonData(serviceData, refData);
        expect(result).toEqual(expectedData);
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

    test('Test getAddonData with missing serviceData', () => {
        const serviceData = null;

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

        const expectedData = {
            title: 'Plan A',
            newPrice: '10',
            features: 'Feature 1',
            pricingText: 'Included',
            oldPrice: '20',
            cap: undefined,
            color: undefined,
            type: 'whwServices',
            addonProductData: serviceData,
            detailModalHeader: undefined,
            detailModalBody: undefined,
            promoDetailModalBody: undefined,
            detailModalBody5G: undefined,
            detailModalBodyLTE: undefined,
            useBrandLogoNamming: undefined,
            imageUrl: undefined,
            discountAvailed: '5',
            addonRefData: refData[0],
            youtTubePromoBanner: undefined,
            youTubePricingTextLabel: undefined,
            promoBannerDetailsModalHeader: undefined,
            promoBannerDetailsModalContent: undefined,
            superscriptContent: undefined,
        };

        const result = getAddonData(serviceData, refData);
        expect(result).toEqual(expectedData);
    });
});
