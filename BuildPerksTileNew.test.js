import React from "react";
import BuildPerksTile from "./BuildPerksTile";
import { all } from "redux-saga/effects";
import { render, screen,waitFor,fireEvent} from "../../../test-utils/renderHelper";
import { setupChannel, CHANNELS,getApiContext } from "../../../test-utils/utils";
import planReducer from "../../../pages/BAYouPlans/reducer";
import saga from "../../../pages/BAYouPlans/saga";
import { BuildPerksTileMockData,BuildPerksTileMockData1,PerklongPollDataMock,PerklongPollDataMockNew,selectedMTN } from "../tabs/__Mock__/recommendedStateTestData";
import { shallow ,configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import landingReducer from "../../../pages/Landing/reducer";
import longPollReducer from "../../LongPoll/reducer";

configure({ adapter: new Adapter() });

const TestPlan = (channel) => {
    setupChannel(channel);
    let history, store, asFragment, component,rerender;
    const initialRoute = "plan-selection.html";
    const plansGridwallkey = "plansGridwallNew";
    function* rootSaga() {
        yield all([
            saga(),                         
        ]);
      }
    describe(`<BuildPerkTile Removebutton component - ${channel}`, () => {
        let reRenderComponent = null;
      beforeEach(() => {
          ({ history, store, asFragment, rerender, ...component  } = render(
          <BuildPerksTile longPollData={PerklongPollDataMock} perkId="2678"/> ,
          {
          reducers: {
              [plansGridwallkey]: planReducer,
              ['landing'] : landingReducer,
              ['longPollData']:longPollReducer
             },
             sagas: rootSaga,
             preloadedState:BuildPerksTileMockData,
             initialRoute
             }
          ));
          reRenderComponent = rerender;
            rerender(<BuildPerksTile
                longPollData={PerklongPollDataMockNew} perkId="2678"
        />)
      }); 
      test("should mount buildPlan component", async () => {
          const buildPlans = await screen.findByText(/Apple One/i);
          expect(buildPlans).toBeInTheDocument();
      });
      test("should add buildPerksTile component", async () => {
        expect(screen.getAllByTestId("buildPerksTile")[0]).toBeInTheDocument();
        const toggleON = screen.getAllByRole("checkbox")[0];
        fireEvent.click(toggleON);
        // const radioBtn = screen.getByRole("radio", { name: "Family(5) $/mo" })
        // fireEvent.click(radioBtn);
        // expect(radioBtn).toBeChecked()
       });
  });
  describe(`<BuildPerkTile Removebutton component - ${channel}`, () => {
    let reRenderComponent = null;
  beforeEach(() => {
      ({ history, store, asFragment, rerender, ...component  } = render(
      <BuildPerksTile longPollData={PerklongPollDataMock} perkId="2678"/> ,
      {
      reducers: {
          [plansGridwallkey]: planReducer,
          ['landing'] : landingReducer,
          ['longPollData']:longPollReducer
         },
         sagas: rootSaga,
         preloadedState:BuildPerksTileMockData1,
         initialRoute
         }
      ));
      reRenderComponent = rerender;
        rerender(<BuildPerksTile
            longPollData={PerklongPollDataMockNew} perkId="2678"
    />)
  }); 
  test("should mount buildPlan component", async () => {
      const buildPlans = await screen.findByText(/Apple One/i);
      expect(buildPlans).toBeInTheDocument();
  });
  test("should add buildPerksTile component", async () => {
    expect(screen.getAllByTestId("buildPerksTile")[0]).toBeInTheDocument();
    const toggleON = screen.getAllByRole("checkbox")[0];
    fireEvent.click(toggleON);
   });
   test("Able to click perk toggle wrapper", async () => {
    expect(screen.getAllByTestId("perk-toggle-wrapper")[0]).toBeInTheDocument();
    const toggleON = screen.getAllByTestId("perk-toggle-wrapper")[0];
    fireEvent.click(toggleON);
   });
});
    describe(`<BuildPerkTile when viewperks is not Y testing - ${channel}`, () => {
        let reRenderComponent = null;
        const PerklongPollDataMock1 = {
            event: "calculatePerkSavings",
            payload: {
                pageName: "perkAnalyzer",
                viewPerks: "N",
                payload: {
                    "perksCount": 10,
                }
            }
        }
        const PerklongPollDataMockNew1 = {
            event: "calculatePerkSavings",
            payload: {
                pageName: "perkAnalyzer",
                viewPerks: "N",
                payload: {
                }
            }
        }
        beforeEach(() => {
            ({ history, store, asFragment, rerender, ...component } = render(
                <BuildPerksTile longPollData={PerklongPollDataMock1} perkId="2678" />,
                {
                    reducers: {
                        [plansGridwallkey]: planReducer,
                        ['landing']: landingReducer,
                        ['longPollData']: longPollReducer
                    },
                    sagas: rootSaga,
                    preloadedState: BuildPerksTileMockData,
                    initialRoute
                }
            ));
            reRenderComponent = rerender;
            rerender(<BuildPerksTile
                longPollData={PerklongPollDataMockNew1} perkId="2678"
            />)
        });
        test("should mount buildPlan component", async () => {
            const buildPlans = await screen.findByText(/Apple One/i);
            expect(buildPlans).toBeInTheDocument();
        });
    });
    describe(`<BuildPerkTile without payload testing - ${channel}`, () => {
        let reRenderComponent = null;
        const PerklongPollDataMock1 = {
            event: "calculatePerkSavings",
            payload: {
                pageName: "perkAnalyzer",
                viewPerks: "Y"
            }
        }
        const PerklongPollDataMockNew1 = {
            event: "calculatePerkSavings",
            payload: {
                pageName: "perkAnalyzer",
                viewPerks: "Y",
            }
        }
        beforeEach(() => {
            ({ history, store, asFragment, rerender, ...component } = render(
                <BuildPerksTile longPollData={PerklongPollDataMock1} perkId="2678" />,
                {
                    reducers: {
                        [plansGridwallkey]: planReducer,
                        ['landing']: landingReducer,
                        ['longPollData']: longPollReducer
                    },
                    sagas: rootSaga,
                    preloadedState: BuildPerksTileMockData,
                    initialRoute
                }
            ));
            reRenderComponent = rerender;
            rerender(<BuildPerksTile
                longPollData={PerklongPollDataMockNew1} perkId="2678"
            />)
        });
        test("should mount buildPlan component", async () => {
            const buildPlans = await screen.findByText(/Apple One/i);
            expect(buildPlans).toBeInTheDocument();
        });
    });
    describe(`<BuildPerkTile without perkid testing - ${channel}`, () => {
        let reRenderComponent = null;
        const PerklongPollDataMock1 = {
            event: "calculatePerkSavings",
            payload: {
                pageName: "perkAnalyzer",
                viewPerks: "Y",
                payload: {
                    "lines": [{
                        "mtn": "Line 1",
                        "line": "",
                        "perkMapping": [
                            {
                                "customerServicesList": [
                                    {
                                        "subscriptionName": "Netflix (Premium)",
                                        "subscriptionCost": 22,
                                    }
                                ]
                            },]
                    }]
                }
            }
        }
        const PerklongPollDataMockNew1 = {
            event: "calculatePerkSavings",
            payload: {
                pageName: "perkAnalyzer",
                viewPerks: "Y",
                payload: {
                    "lines": [{
                        "mtn": "Line ",
                        "line": "",
                        "perkMapping": [
                            {
                                "customerServicesList": [
                                    {
                                        "subscriptionName": "Netflix (Premium)",
                                        "subscriptionCost": 22,
                                    }
                                ]
                            },]
                    }]
                }
            }
        }
        beforeEach(() => {
            ({ history, store, asFragment, rerender, ...component } = render(
                <BuildPerksTile longPollData={PerklongPollDataMock1} perkId="2678" />,
                {
                    reducers: {
                        [plansGridwallkey]: planReducer,
                        ['landing']: landingReducer,
                        ['longPollData']: longPollReducer
                    },
                    sagas: rootSaga,
                    preloadedState: BuildPerksTileMockData,
                    initialRoute
                }
            ));
            reRenderComponent = rerender;
            rerender(<BuildPerksTile
                longPollData={PerklongPollDataMockNew1} perkId="2678"
            />)
        });
        test("should mount buildPlan component", async () => {
            const buildPlans = await screen.findByText(/Apple One/i);
            expect(buildPlans).toBeInTheDocument();
        });
        // test("should mount buildPlan component", async () => {
        //     const buildPlans = await screen.getByRole("radio", {name:  "Apple One Individual"});
        //     fireEvent.click(buildPlans);
        //     // expect(buildPlans).toBeInTheDocument();
        // });
    });
  describe(`<BuildPerkTile Removebutton component - ${channel}`, () => {
    beforeEach(() => {
        ({ history, store, asFragment, ...component } = render(
        <BuildPerksTile perkId="2677" selectedMTN={selectedMTN}/> ,
        {
        reducers: {
            [plansGridwallkey]: planReducer
           },
           sagas: rootSaga,
           preloadedState:BuildPerksTileMockData,
           initialRoute
           }
        ));
    }); 
    test("should mount buildPlan component", async () => {
        const buildPlans = screen.getByText(/Perk perk must be removed before selecting this perk/i);
        expect(buildPlans).toBeInTheDocument();
    });
});
}

TestPlan(CHANNELS.OMNI_RETAIL);
