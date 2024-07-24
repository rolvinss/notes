import * as actionTypes from '../@Redux/actionTypes';
import { isJointTransactionFlow, isLoggedIn } from '../../../components/common/Helpers';
import { handleDuplicatePerks, handleDisclosurePerks } from '../path/to/your/file';

jest.mock('../../../components/common/Helpers');

describe('handleDuplicatePerks', () => {
  let state;
  let dispatch;
  let viewedDuplicatePerks;
  let perkInfo;
  let toggleOn;
  let isPerkToggleClicked;

  beforeEach(() => {
    state = {
      progressivePlans: {
        progressivePlanAPiResponse: { data: { shareablePerks: [{ spoId: 'spo1' }] } },
        netflixPlusPlay: { data: { subscriptions: [{ merchantAccountKey: 'NETFLIX' }] } },
        perkDuplicateOverlay: { disclosureDisplayed: [] }
      }
    };
    dispatch = jest.fn();
    viewedDuplicatePerks = new Set();
    perkInfo = { spoId: 'spo1' };
    toggleOn = true;
    isPerkToggleClicked = true;

    isJointTransactionFlow.mockReturnValue(false);
    isLoggedIn.mockReturnValue(false);
  });

  test('should handle overlay when toggleOn is true and perk is shareable', () => {
    handleDuplicatePerks(state, toggleOn, perkInfo, viewedDuplicatePerks, dispatch, isPerkToggleClicked);
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.DUPLICATE_PERK_DISCLOSURE,
      response: expect.objectContaining({
        show: true,
        currentSpoId: 'spo1',
        disclosureDisplayed: ['spo1']
      })
    });
  });

  test('should not handle overlay when toggleOn is false', () => {
    toggleOn = false;
    const result = handleDuplicatePerks(state, toggleOn, perkInfo, viewedDuplicatePerks, dispatch, isPerkToggleClicked);
    expect(dispatch).not.toHaveBeenCalled();
    expect(result).toBe(true);
  });

  test('should handle overlay when Netflix subscription exists and perk is not shareable', () => {
    perkInfo = { spoId: 'spo2' };
    handleDuplicatePerks(state, toggleOn, perkInfo, viewedDuplicatePerks, dispatch, isPerkToggleClicked);
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.DUPLICATE_PERK_DISCLOSURE,
      response: expect.objectContaining({
        show: true,
        currentSpoId: 'spo2',
        disclosureDisplayed: ['spo2']
      })
    });
  });

  test('should handle overlay when user is logged in', () => {
    isLoggedIn.mockReturnValue(true);
    handleDuplicatePerks(state, toggleOn, perkInfo, viewedDuplicatePerks, dispatch, isPerkToggleClicked);
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.DUPLICATE_PERK_DISCLOSURE,
      response: expect.objectContaining({
        show: true,
        currentSpoId: 'spo1',
        disclosureDisplayed: ['spo1']
      })
    });
  });

  test('should handle overlay when it is a joint transaction flow', () => {
    isJointTransactionFlow.mockReturnValue(true);
    handleDuplicatePerks(state, toggleOn, perkInfo, viewedDuplicatePerks, dispatch, isPerkToggleClicked);
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.DUPLICATE_PERK_DISCLOSURE,
      response: expect.objectContaining({
        show: true,
        currentSpoId: 'spo1',
        disclosureDisplayed: ['spo1']
      })
    });
  });
});

describe('handleDisclosurePerks', () => {
  let perkStaticContent;
  let perkInfo;
  let state;
  let toggleOn;
  let dispatch;

  beforeEach(() => {
    perkStaticContent = {
      disneyPerkSpoId: 'disney1',
      appleOneIndividualPerkSpoId: 'apple1',
      appleOneFamilyPerkSpoId: 'apple2'
    };
    perkInfo = { spoId: 'disney1' };
    state = {
      progressivePlans: {
        perkDisclosureOverlay: { disclosureDisplayed: [] }
      }
    };
    toggleOn = true;
    dispatch = jest.fn();

    isLoggedIn.mockReturnValue(false);
  });

  test('should handle disclosure perks when toggleOn is true and perk is in disclosurePerksSpoIds', () => {
    handleDisclosurePerks(perkStaticContent, perkInfo, state, toggleOn, dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.UPDATE_PERK_DISCLOSURE,
      response: expect.objectContaining({
        show: true,
        currentSpoId: 'disney1',
        disclosureDisplayed: ['disney1']
      })
    });
  });

  test('should not handle disclosure perks when toggleOn is false', () => {
    toggleOn = false;
    handleDisclosurePerks(perkStaticContent, perkInfo, state, toggleOn, dispatch);
    expect(dispatch).not.toHaveBeenCalled();
  });

  test('should handle disclosure perks when user is not logged in and perk is Apple One Individual', () => {
    perkInfo = { spoId: 'apple1' };
    handleDisclosurePerks(perkStaticContent, perkInfo, state, toggleOn, dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.UPDATE_PERK_DISCLOSURE,
      response: expect.objectContaining({
        show: true,
        currentSpoId: 'apple1',
        disclosureDisplayed: ['apple1']
      })
    });
  });

  test('should handle disclosure perks when user is not logged in and perk is Apple One Family', () => {
    perkInfo = { spoId: 'apple2' };
    handleDisclosurePerks(perkStaticContent, perkInfo, state, toggleOn, dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.UPDATE_PERK_DISCLOSURE,
      response: expect.objectContaining({
        show: true,
        currentSpoId: 'apple2',
        disclosureDisplayed: ['apple2']
      })
    });
  });

  test('should not handle disclosure perks when perk is not in disclosurePerksSpoIds', () => {
    perkInfo = { spoId: 'otherSpoId' };
    handleDisclosurePerks(perkStaticContent, perkInfo, state, toggleOn, dispatch);
    expect(dispatch).not.toHaveBeenCalled();
  });

  test('should handle disclosure perks when user is logged in', () => {
    isLoggedIn.mockReturnValue(true);
    handleDisclosurePerks(perkStaticContent, perkInfo, state, toggleOn, dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.UPDATE_PERK_DISCLOSURE,
      response: expect.objectContaining({
        show: true,
        currentSpoId: 'disney1',
        disclosureDisplayed: ['disney1']
      })
    });
  });
});
