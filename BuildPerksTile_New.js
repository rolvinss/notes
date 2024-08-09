import React, { Component } from "react";
import styled from "styled-components";
import { Body } from "@vds3/typography";
import { Toggle } from "@vds3/toggles";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { connect } from "react-redux";
import withRouterV6 from "../../../components/hoc/withRouterV6";
import {getSelectedMTN,getPerksinfo,LinesSelectedlnfo,getSelectedCustomize,getBundleprice, getPlansandPerksresponse} from "../../../pages/BAYouPlans/selectors";
import * as appMessageActions from "../../common/AppMessage/actions";
import { Button, TextLink } from "@vds3/buttons";
import { Icon } from "@vds3/icons";
import {
  FlexBox,
  FlexBoxContainer,
  StyledPaddingLeft8,
  FlexAlignCenterBox,
  NumberStike,
  PaddingTop8,
  FlexAlignEnd,
  PaddingLeft4,
} from "../../../constants/StyledConstantsGlobal";
import * as types from "../../../pages/BAYouPlans/constants";
import * as planActions from "../../../pages/BAYouPlans/actions";
import { getTysFlow } from "../../../components/App/selectors";
import PerksTileBottomSlot from "./PerkTileBottomSlot";
import _ from "lodash";
import BuildTileRemoveModal from "./BuildTileRemoveModal";
import CancelledPerkModal from "./CancelledPerkModal";
import PerkcancelledModal from "../Modals/PerkcancelledModal";
import {isPerkSelecterToolEnabled} from "../../../pages/Landing/selectors"
import ApplePerkInfoModal from "./ApplePerkInfoModal";

const PlanContainer = styled.div`
  padding: 1rem;
  background: ${(props) => (props?.isgray) ? '#a7a7a7':(props?.perkBackgroundColor ? props?.perkBackgroundColor : "#000000")};
  border: ${(props) => (props?.perkBackgroundColor === "#F6F6F6;") ? "1px solid #A7A7A7" : "none"};
  border-radius: 0.5rem;
  min-height: ${(props) =>
    props.tileType && props.tileType === "small"
      ? "auto"
      : props.tileType === "medium"
      ? "66px"
      : "86px"};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const BuildPerkTile = styled.div`
  min-height:100%;
  display: flex;
  flex-direction: column;
  -webkit-box-flex: 1;
  flex-grow: 1;
`;
const FlexGrowOne = styled.div`
  flex-grow: 1;
`;
const SpecialNote = styled.div`
  text-align: right;
  padding-top: 0.25rem;
`;
const RadioSpecialNote = styled.div`
  position: absolute;
  top: -20px;
`;
const StyledBackGround = styled.div`
  background: #3D92DA;
  border-radius:4px;
  margin:0.5rem 0 0.25rem 0
  padding:3px;
  width:fit-content;
`;
const CustomRadioButtonGroupWrapper = styled.div`
padding-top:0px;
  [class^="RadioButtonGroupWrapper-"] {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    > .radioWrapper {
      margin-top: 0px;
      width: auto;
      margin-right: 30px;
    }
  }
  [class^="LabelWrapper-"] {
    font-size: 0.6875rem;
    font-weight: 400;
    line-height: 1rem;
    font-family: Verizon-NHG-eTX, Helvetica, Ariel, Sans-serif;
  }
`;

class BuildPerksTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      pendingModalAccepted: false,
      isApplePerkInfoModalOpen: false,
    };
  }

  componentDidMount(){
    this.getAvailablePerkInfo();
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.LinesSelectedlnfo !== prevProps.LinesSelectedlnfo || JSON.stringify(this.props.eligiblePerks) !== JSON.stringify(prevProps.eligiblePerks)){
      this.getAvailablePerkInfo();
    }
 
    if (this.props.isPerkSelecterToolEnabled && this.props?.longPollData !== prevProps?.longPollData && this.props?.longPollData?.event === "calculatePerkSavings"
      && this.props?.longPollData?.payload?.pageName === "perkAnalyzer") {
      const calculatePerkSavings = this.props.longPollData?.payload?.payload || {};
      const lineQuantity = calculatePerkSavings?.lines?.reduce((acc, line) => {
        const linesHasPerk = line?.perkMapping?.some(perk => perk?.customerServicesList.some(service => service.perkId === "2639"))
        return acc + (linesHasPerk ? 1 : 0);
      }, 0)
      calculatePerkSavings?.lines?.[0]?.perkMapping?.forEach(perk => {
        perk?.customerServicesList?.forEach(service => {
          this.toggleSelect(service?.perkId, true, lineQuantity)
        })
      });
    }
  }

  closeModal = () => {
    this.removeBuildPerk(this.props.perkId)
    this.setState({ isOpenModal: false });
  };

  handleApplePerkInfoModal = (value) => {
    this.setState({ isApplePerkInfoModalOpen: value });
  };
 
  getCurrentBundledPrice=(perkId)=>{
    const {bundleprice =[],selectedMTN,selectedMTN:{mtn="",selectedPlan="",currentPlan="",removePlan=""}} = this.props;
    if(bundleprice?.lines?.length > 0){
    const selectedBundle = bundleprice?.lines?.find((line)=> line.mtn === mtn);
    if(!_.isEmpty(selectedBundle)){
      const currentPlanId = selectedPlan !=="" ? selectedPlan : currentPlan;
      const currenSelectedPlan = currentPlanId !== "" ? selectedMTN?.buildYourOwn?.length > 0 && selectedMTN.buildYourOwn.find(plan=>plan.planId === currentPlanId): {};
      if((!_.isEmpty(currenSelectedPlan) && removePlan==="")){
        const currentPlanId = selectedPlan !=="" ? selectedPlan : currentPlan;
        const bundlePlan = selectedBundle?.planPerksBundlesCost?.length > 0 && selectedBundle?.planPerksBundlesCost.find((plan)=> plan?.propositionName?.includes("BuildYourOwn") && ( plan.planId === currentPlanId));
        if(bundlePlan?.perkOptionsPrice?.perkSpoList?.length > 0){
          const perkPrice = bundlePlan?.perkOptionsPrice?.perkSpoList.find(spo => spo.spoId === perkId);
          return perkPrice;
         }
       }else{
        const bundlePlan = selectedBundle?.planPerksBundlesCost?.length > 0 && selectedBundle?.planPerksBundlesCost.find((plan)=>plan?.propositionName?.includes("BuildYourOwn"));
         if(bundlePlan?.perkOptionsPrice?.perkSpoList?.length > 0){
          const perkPrice = bundlePlan?.perkOptionsPrice?.perkSpoList.find(spo => spo.spoId === perkId);
          return perkPrice;
         }
       }
      }
    }
  }

  getAvailablePerkInfo =()=>{
     const {perkId="",allPerksinfo=[],selectedMTN={}} = this.props;
     const {availablePerks=[]} = selectedMTN;
     const availablePerkInfo = availablePerks.length > 0 && availablePerks.find((perk)=>perk.spoId === perkId);
     const availablePerkReference = Object.entries(allPerksinfo).length > 0 && Object.values(allPerksinfo).find((spo) => spo.spoId === perkId);
     const combinePerkInfo ={...availablePerkInfo,...availablePerkReference};
     this.setState({perkInfo:combinePerkInfo})
     console.log("perkInfo",combinePerkInfo)
  }

  addBuildPerk =(perkId, lineQuantity = 0)=>{
    const {selectedMTN = [],selectedCustomize={}} = this.props;
    const data = {
      mtn: selectedMTN?.mtn ||"",
      selectedPerk : perkId,
      isBundle : false,
      selectedCustomize:selectedCustomize?.clicked || false,
      lineQuantity
    };
    const availablePerkInfo = selectedMTN?.availablePerks?.length > 0 && selectedMTN?.availablePerks?.find((perk)=>perk?.spoId === perkId);
    if(((availablePerkInfo.status == "PENDING_CANCEL" || availablePerkInfo.status == "PENDING_CANCEL_RESUME") && !this.state.pendingModalAccepted) || availablePerkInfo?.within24HoursOfExpiry){
      this.setState({pendingModalAccepted:true})
      return 
    }
    this.props.UpdateAllLinesSelectedlnfo({type:types.ADD_PERK,...data});
    if (perkId === types.APPLE_ONE_PERK_ID || perkId === types.APPLE_FAMILY_PERK_ID) {
      this.handleApplePerkInfoModal(true)
    }
  }

  removeBuildPerk =(perkId)=>{
    const {selectedMTN = [],selectedCustomize={},allPerksinfo={}} = this.props;
    const data = {
      mtn: selectedMTN?.mtn ||"",
      selectedPerk : perkId,
      isBundle : false,
      selectedCustomize:selectedCustomize?.clicked || false
    };
    const currentCheck = selectedMTN?.availablePerks.find((e)=>{ return e.spoId == perkId})
    if(allPerksinfo[perkId]?.categoryCodes?.includes("BYOGETHELP") && currentCheck?.current === true && !this.state.isOpenModal)
    {
      this.setState({isOpenModal:true})
      return
    }
    this.props.UpdateAllLinesSelectedlnfo({type:types.REMOVE_PERK,...data});
  }

  toggleSelect =(perkId, perkTool = false, lineQuantity = 0)=>{
    if(!this.getSelectedPlan()){
      return false;
    }
    const {selectedMTN:{selectedPerks=[],perksInAccount=[],removeAccountPerks=[],isBundle=false},selectedCustomize={}, getPlansandPerksresponse} = this.props;
    const allSelectedPerks = this.getAllRetainedPerks();
    if (!perkTool && (selectedPerks?.indexOf(perkId) > -1 || ((!selectedCustomize?.clicked && !isBundle) && perksInAccount?.indexOf(perkId) > -1
      && removeAccountPerks?.indexOf(perkId) === -1))) {
      const nonProratablePerks  = ["BYODISNEY", "TPBYOPERK", "MHSPERK", "BYOWALMART", "BYOPLSPLAY"];
      const perkReferenceDataList =  getPlansandPerksresponse?.perkReferenceDataList;
      const selectedPerkDetails = perkReferenceDataList[perkId];
      if(selectedPerkDetails && selectedPerkDetails?.categoryCodes){
        let showPerkCancelledMessage = false;
        nonProratablePerks.forEach(code =>{ 
           if(showPerkCancelledMessage === false && selectedPerkDetails?.categoryCodes?.includes(code) && perksInAccount?.indexOf(perkId) > -1){
            showPerkCancelledMessage = true;
           }
        })
      this.setState({showPerkCancelledMessage});
      console.log(selectedPerkDetails?.categoryCodes,showPerkCancelledMessage, 'categoryCodes');
      }

      this.removeBuildPerk(perkId);
     }else if (!perkTool || (perkTool && (!selectedPerks.includes(perkId) ||  !allSelectedPerks.includes(perkId)))){
      const mutualExclusionsData =this.mutualExclusions(perkId)
      perkId = mutualExclusionsData?.radioButtonData 
      && Array.isArray(mutualExclusionsData?.radioButtonData) 
      && mutualExclusionsData?.radioButtonData.length > 0 ? mutualExclusionsData?.radioButtonData[0]?.perkId:perkId
         this.addBuildPerk(perkId, lineQuantity);
     }
  }

  getSelectedPlan=()=>{
    const {selectedMTN:{selectedPlan="",currentPlan="",buildYourOwn=[],isBundle=false,userClickedRemovePlan=false},selectedCustomize={}} = this.props;
    const planId = selectedPlan ? selectedPlan : userClickedRemovePlan ? "" : currentPlan ? currentPlan : "";
    if(buildYourOwn?.length > 0 && buildYourOwn.some(plan=>plan.planId === planId) && (!isBundle  && !userClickedRemovePlan || selectedCustomize?.clicked || isBundle)){
        return true
    }else{
      window.store.dispatch(appMessageActions.addAppMessage("Please choose your plan before adding perks", "warning", true, true));
      return false;
    }
  }

  getPerkinfo=(spoId)=>{
    var perkdetails=this?.props?.allPerksinfo[spoId] ? this.props.allPerksinfo[spoId]:{}
    const mututalperks= _.get(perkdetails, "groupBy[0].spoSorIds")
    const isMutualPerk=mututalperks?.some((item)=>this.props?.selectedMTN?.perksInAccount?.includes(item))
    const MtnPerkView=this.props?.selectedMTN?.perksInAccount?.includes(spoId)
    if(MtnPerkView || isMutualPerk){
      return <PaddingTop8><FlexAlignEnd><Body color="#FFFFFF" tabIndex="0">Existing</Body></FlexAlignEnd></PaddingTop8>
    }else{
      return null
    }
  }

  RemoveMutualExclusionsPerks =(radioButtonData)=>{
    if(!this.getSelectedPlan()){
       return false;
    }
    const {selectedMTN = {},perkInfo={}} = this.props;
    var RemovingPerks=Array.isArray(radioButtonData) ? radioButtonData.map((item)=>{return item.perkId}):[]
    const data = {
      mtn: selectedMTN?.mtn ||"",
      selectedPerk : "",
      isBundle : false,
      selectedCustomize:false,
      RemovingPerk:RemovingPerks
    };
    this.props.UpdateAllLinesSelectedlnfo({type:types.ADD_PERK_AND_REMOVE_PERK,...data});
  }

  mutualExclusions=(spoId)=>{
    var perkdetails=this?.props?.allPerksinfo[spoId] ? this.props.allPerksinfo[spoId]:{}
    var {selectedPerks}=this.props.selectedMTN
    var spoSorIds=_.get(perkdetails, "groupBy[0].spoSorIds")
    console.log("spoSorIds",spoSorIds)
    var availableGroupPerk = ''
    const { selectedMTN = {} } = this.props
    const { availablePerks = [] } = selectedMTN
    const groupId = (perkdetails?.groupBy && perkdetails.groupBy.length > 0) ? perkdetails?.groupBy[0]?.id : ''
    if (groupId) {
      availableGroupPerk = availablePerks.length > 0 && availablePerks.find((perk) => perk.groupId === groupId);
    }
    if(Array.isArray(spoSorIds) && spoSorIds.length > 0 && availableGroupPerk){
      var mutualExclusionsData={
        description:perkdetails?.groupBy && Array.isArray(perkdetails?.groupBy) && perkdetails?.groupBy?.length > 0 ? perkdetails.groupBy[0].displayName:"-",
        bottomVariant:"radio",
        radioButtonData:[],
        defaultValue:"none"
      }
      const allSelectedPerks = this.getAllRetainedPerks();
      spoSorIds.forEach((item,index)=>{
        var mutualPerk=this?.props?.allPerksinfo[item] ? this.props.allPerksinfo[item]:{}
        var smallPerkTitle=mutualPerk?.perkTitle?.split(" ");
        smallPerkTitle = (smallPerkTitle?.includes("Cloud") && smallPerkTitle?.length > 0 && smallPerkTitle[1] !== undefined) ? smallPerkTitle[1] : smallPerkTitle?.pop();
        smallPerkTitle=smallPerkTitle?.includes("Family") ? `${smallPerkTitle}(5)`:smallPerkTitle
        var isThisPerkisSelected=allSelectedPerks?.includes(item)
        if(isThisPerkisSelected){
          mutualExclusionsData.defaultValue=item
        }
        const currentBundlePerkPrice = this.getCurrentBundledPrice(item);
        mutualExclusionsData.radioButtonData.push({
          name: 'group',
          label: (<Body size="small" color="#ffffff">{smallPerkTitle ? smallPerkTitle:"Perk"}</Body>),
          children:(
            <>
              <Body size="small" color="#ffffff">
                ${currentBundlePerkPrice?.price?.discountedPrice}/mo
              </Body>
            </>
          ),
          value: item,
          ariaLabel: `radio ${index}`,
          perkId:item,
          disabled: false,
          selected: isThisPerkisSelected ? true:false,
        })
      })
      return mutualExclusionsData
    }else{
      return null
    }
  }

  removemutualExclusions=(spoId)=>{
    var perkdetails=this?.props?.allPerksinfo[spoId] ? this.props.allPerksinfo[spoId]:{}
    return {description: perkdetails?.groupBy && Array.isArray(perkdetails?.groupBy) && perkdetails?.groupBy?.length > 0 ? 
                         perkdetails.groupBy[0].displayName:perkdetails?.perkTitle} 
  }

  getAllRetainedPerks=()=>{
    const {selectedMTN:{selectedPerks=[],removeAccountPerks=[],isBundle=false},selectedCustomize={}} = this.props;
    let perksInAccount = this.props?.selectedMTN?.perksInAccount?.length > 0 ? [...this.props.selectedMTN.perksInAccount] : [];
    let allSelectedPerks = [...selectedPerks];
    if(perksInAccount?.length > 0){
      if(removeAccountPerks.length > 0){
        removeAccountPerks.forEach((perkId)=>{
          const perkIndex = perksInAccount?.findIndex((perk)=>perk === perkId); 
          if(perkIndex > -1){
            perksInAccount?.splice(perkIndex,1);
          } 
        })
      }
      allSelectedPerks = [...selectedPerks,...perksInAccount];
    }
    return allSelectedPerks;
  }

  closePerkCancelledModal = () => {
    this.setState({showPerkCancelledMessage: false});
  }

  render() {
    const {perkId="",selectedMTN={},selectedMTN:{selectedPerks=[]},selectedCustomize={},isTysFlow=false,toggleViewDetails,setSelectedPerk}= this.props;
    
    const {
      perkInfo = {},
      isOpenModal,
      pendingModalAccepted,
      isApplePerkInfoModalOpen,
    } = this.state;
    const currentBundlePerkPrice = this.getCurrentBundledPrice(perkId);
    const mutualExclusionsData=this.mutualExclusions(perkId);
    var ShowPerkTile=false
    if(mutualExclusionsData){
      perkInfo.PerkDetails=mutualExclusionsData;
      ShowPerkTile=perkInfo?.PerkDetails?.radioButtonData && Array.isArray(perkInfo.PerkDetails.radioButtonData) 
                       ? perkInfo.PerkDetails.radioButtonData.some((item)=>item.selected) :false;
      if(ShowPerkTile){
        perkInfo.bottomVariant="radio"
      }else{
        perkInfo.bottomVariant="badge"
      }
    }
    var mutualPerknotCompatable="";
    var mutualDisableData={}
    console.log("test",mutualExclusionsData,Array.isArray(perkInfo?.mutualExclusions),ShowPerkTile)
    const allSelectedPerks = this.getAllRetainedPerks();
    const isgray=Array.isArray(perkInfo?.mutualExclusions) 
                  && !ShowPerkTile ? perkInfo?.mutualExclusions.some((item,ind)=>{
      if(allSelectedPerks?.includes(item)){
        mutualPerknotCompatable=item
        return true
      }else{
        return false
      }
    }):false
    if(isgray){
      mutualDisableData=this.removemutualExclusions(mutualPerknotCompatable ? mutualPerknotCompatable:perkId)
    }

    const togglePerk=ShowPerkTile ? true:!selectedMTN.isBundle && allSelectedPerks.indexOf(perkId) >-1 ? true : selectedPerks.indexOf(perkId) >-1 ? true : false
    // console.log("mutualExclusionsData",JSON.stringify(this.props),perkId)
    return (
      <BuildPerkTile>
      <BuildPerkTile data-testid="buildPerksTile" tabIndex="0" aria-Label={perkInfo?.PerkDetails?.description ? perkInfo.PerkDetails.description:perkInfo?.perkTitle ? perkInfo.perkTitle:"Perk"} role="heading" aria-level={"2"} data-perkid={perkId} data-perktoggle={togglePerk ? "true":"false"}onClick= {()=>{toggleViewDetails();setSelectedPerk(perkId);}}>
       <PlanContainer tileType={"small"} isgray={isgray} perkBackgroundColor={perkInfo?.perkBackgroundColor} >
        <FlexGrowOne>
          { !isgray ? 
          <FlexBox>
            <FlexGrowOne>
              <Body size="large" primitive ="span" tabIndex="0" bold={false} color={perkInfo?.perkTextAppearance === 'Dark' ? "#000000" : "#ffffff"}>
              {perkInfo?.PerkDetails?.description ? perkInfo.PerkDetails.description:perkInfo?.perkTitle ? perkInfo.perkTitle:"Perk"}
              </Body>
              <PaddingLeft4>
              <Body size="small" primitive="span" tabIndex="0" ariaLabel={`More informations ${perkInfo?.PerkDetails?.description ? perkInfo.PerkDetails.description:perkInfo?.perkTitle ? perkInfo.perkTitle:"Perk"} perks`}>
                  <Icon name="right-caret" ariaHidden={true} surface={perkInfo?.perkTextAppearance === 'Dark' ? "light" : "dark"} size={12} iconPosition="right"></Icon>
              </Body>
              </PaddingLeft4>
            </FlexGrowOne>
                <StyledPaddingLeft8 onClick={(e) => { e.stopPropagation() }} data-testid="perk-toggle-wrapper">
                <div perkidtogglebutton={`${perkId}perktogglebutton`}>
                <Toggle
                  disabled={isTysFlow}
                  showText={false}
                  value="default"
                  data-testid="buildPerksTile-toggle"
                  data-track={`${perkInfo?.PerkDetails?.description ? perkInfo.PerkDetails.description:perkInfo?.perkTitle ? perkInfo.perkTitle:"Perk"}${ShowPerkTile ? "_ToggleOff":"_ToggleOn"}`}
                  onChange={()=>ShowPerkTile ? this.RemoveMutualExclusionsPerks(perkInfo?.PerkDetails?.radioButtonData):this.toggleSelect(perkId)}
                  on={togglePerk}
                  ariaLabel={`${perkInfo?.PerkDetails?.description ? perkInfo.PerkDetails.description:perkInfo?.perkTitle ? perkInfo.perkTitle:"Perk"}${ShowPerkTile ? "_ToggleOff":"_ToggleOn"}`}
                />
                </div>
                {
                <BuildTileRemoveModal isOpen = {isOpenModal} onClose={this.closeModal}/>
                }
                <ApplePerkInfoModal isOpen={isApplePerkInfoModalOpen} onClose={this.handleApplePerkInfoModal} />
              {/* {PerkDetails.existing && PerkDetails.existing === true ? (
                <SpecialNote>
                  <Body size="small" color="#A7A7A7">
                    Existing
                  </Body>
                </SpecialNote>
              ) : (
                <></>
              )} */}
              {this.getPerkinfo(perkId)}
            </StyledPaddingLeft8>
          </FlexBox>:
              <FlexBox>
                <FlexGrowOne>
                  <Body size="large" bold={false} color="#ffffff" tabIndex="0">
                  {`${mutualDisableData?.description ? mutualDisableData.description:"Perk"} perk must be removed before selecting this perk.`}
                  </Body>
                </FlexGrowOne>
              </FlexBox>
          }
        </FlexGrowOne>
        <PerksTileBottomSlot
        perkInfo={perkInfo} 
        isgray={isgray}
        currentBundlePerkPrice={currentBundlePerkPrice}
        />
      </PlanContainer>
      <CancelledPerkModal 
      pendingModalAccepted = {pendingModalAccepted} 
      accept={()=>this.addBuildPerk(perkId)}
      perkId={perkId}
      closeModal={()=>this.setState({ pendingModalAccepted:false})}/>
      </BuildPerkTile>
      {this.state.showPerkCancelledMessage && <PerkcancelledModal showPerkCancelledMessage={this.state.showPerkCancelledMessage} closePerkCancelledModal={this.closePerkCancelledModal}/> }
      </BuildPerkTile>

    );
  }
}
const mapStateToProps = createStructuredSelector({
  selectedMTN:getSelectedMTN(),
  allPerksinfo: getPerksinfo(),
  LinesSelectedlnfo:LinesSelectedlnfo(),
  selectedCustomize:getSelectedCustomize(),
  bundleprice: getBundleprice(),
  isTysFlow: getTysFlow(),
  getPlansandPerksresponse:getPlansandPerksresponse(),
  isPerkSelecterToolEnabled: isPerkSelecterToolEnabled(),
});

const mapDispatchToProps = dispatch => ({
  UpdateAllLinesSelectedlnfo: (data) => dispatch(planActions.UpdateAllLinesSelectedlnfo(data)),
  toggleViewDetails: () => dispatch(planActions.toggleViewDetails()),
  setSelectedPerk: (data) => dispatch(planActions.setSelectedPerk(data)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouterV6(compose(
  withConnect
)(BuildPerksTile));
