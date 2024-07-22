import React from 'react';
import PropTypes from 'prop-types';
import { useStore, useDispatch } from 'react-redux';
import { convertStringToElements } from '@vds/html-parsers';
import OverlayModal from '../common/overlayModal';
import * as actionTypes from '../@Redux/actionTypes';
import { isJointTransactionFlow, isLoggedIn } from '../../../components/common/Helpers';
import { planJourneyCodes } from '../../Common/SessionValues/Constants';

const PerkDuplicateModal = (props) => {
  const state = useStore().getState();
  const dispatch = useDispatch();
  const isAALflow = isLoggedIn();
  const shareablePerks = state?.progressivePlans?.progressivePlanAPiResponse?.data?.shareablePerks
    ? state?.progressivePlans?.progressivePlanAPiResponse?.data?.shareablePerks
    : [];
  const nextflixplaySubscriptions = state?.progressivePlans?.netflixPlusPlay?.data?.subscriptions
    ? state?.progressivePlans?.netflixPlusPlay?.data?.subscriptions
    : [];
  const hasNetflixSubscription = nextflixplaySubscriptions.find((i) => i.merchantAccountKey === 'NETFLIX');

  const perkDuplicateOverlay = state?.progressivePlans?.perkDuplicateOverlay;
  if (perkDuplicateOverlay?.currentSpoId === '') return;

  const { duplicatePerkOverlay = {}, duplicatePerkOverlayAAL = {} } = state?.plansReferenceData?.output || {};
  const currentSelectedperk = shareablePerks?.filter((i) => i.spoId === perkDuplicateOverlay.currentSpoId);

  let title = isJointTransactionFlow()
    ? duplicatePerkOverlay?.comboTitle
    : duplicatePerkOverlay[perkDuplicateOverlay?.currentSpoId]?.title
      ? duplicatePerkOverlay[perkDuplicateOverlay?.currentSpoId]?.title
      : duplicatePerkOverlay?.title
        ? duplicatePerkOverlay?.title
        : '';

  if (isLoggedIn() && currentSelectedperk.length > 0) {
    const isFwa = currentSelectedperk.map((i) => i.lineActivityType).some((val) => val === 'FWA');
    if (isFwa) {
      title = duplicatePerkOverlayAAL[perkDuplicateOverlay?.currentSpoId]?.title || duplicatePerkOverlayAAL?.title;
    } else {
      title = duplicatePerkOverlay[perkDuplicateOverlay?.currentSpoId]?.title || duplicatePerkOverlay?.title;
    }
  } else if (isLoggedIn() && currentSelectedperk.length < 1 && hasNetflixSubscription) {
    title = 'Some dummy title';
  }
  const description = duplicatePerkOverlay[perkDuplicateOverlay?.currentSpoId]?.description
    ? duplicatePerkOverlay[perkDuplicateOverlay?.currentSpoId]?.description
    : '';
  const message = isAALflow
    ? convertStringToElements(duplicatePerkOverlayAAL[perkDuplicateOverlay?.currentSpoId]?.message)
    : duplicatePerkOverlay[perkDuplicateOverlay?.currentSpoId]?.message
      ? convertStringToElements(duplicatePerkOverlay[perkDuplicateOverlay?.currentSpoId]?.message)
      : '';

  const currentPerkInfo = state?.progressivePlans?.selectedPlanInfo?.selectedPerks?.find((i) => i.spoId === perkDuplicateOverlay?.currentSpoId);
  const modalData = {
    title,
    description,
    message,
    primaryBtnText: isAALflow ? duplicatePerkOverlayAAL?.yesDuplicateButton : duplicatePerkOverlay?.gotDuplicateButton,
    closeBtnText: duplicatePerkOverlayAAL?.closeDuplicateButton,
    onModalCloseHandler: () => {
      dispatch({
        type: actionTypes.DUPLICATE_PERK_DISCLOSURE,
        response: {
          ...perkDuplicateOverlay,
          show: false,
        },
      });
      if (props.pageName === 'popularPlan') {
        dispatch({ type: actionTypes.ADD_PLAN_API, payload: 'popularPlan', history: props?.history, planSelectionJourney: planJourneyCodes.POPULAR });
      }
    },
    onModalCancelHandler: () => {
      if (props.pageName === 'popularPlan') {
        dispatch({ type: actionTypes.REMOVE_DUPLICATE_PERKS, payload: { payload: 'popularPlan', history: props?.history } });
      }
      if (props.pageName === 'progressivePlan') {
        dispatch({ type: actionTypes.UPDATE_SELECT_DATA_PERK, payload: { perkInfo: currentPerkInfo, toggleOn: false } });
      }
      dispatch({
        type: actionTypes.DUPLICATE_PERK_DISCLOSURE,
        response: {
          ...perkDuplicateOverlay,
          show: false,
        },
      });
    },
    isOpened: perkDuplicateOverlay?.show,
  };

  return <OverlayModal {...modalData} fromPopularPlan />;
};

PerkDuplicateModal.propTypes = {
  modalArrgs: PropTypes.object,
  history: PropTypes.object,
  pageName: PropTypes.string,
};

export default PerkDuplicateModal;
