import React,{ Component }from "react";
import { Modal, ModalTitle,ModalFooter,ModalBody } from "@vds3/modals";
import { Title, Body } from "@vds3/typography";
import { Button } from "@vds/buttons";
import styled from "styled-components";
import { isIpad } from "../../../services/dom.service";

const TextLinkWrapper = styled.div`
  padding: 1rem 0 0.5rem 0;
  display: flex;
`;
class ApplePerkInfoModal extends Component{
    constructor(props) {
        super(props);
    }
    render(){
      const {isOpen}= this.props;
        return(
          <Modal           
          surface="light"
          onOpenedChange={(opened) => { if (!opened) this.props.onClose() }}
          hideCloseButton={false}
          disableAnimation={false}
          fullScreenDialog={isIpad()}
          disableOutsideClick={false}
          ariaLabel="Important information Modal"
          opened = {isOpen}
          width = "100%"
          >
        <ModalTitle>
          <Title size="large" primitive="span" bold>
          Important information
          </Title>
        </ModalTitle>
        <ModalBody>
          <Body use="primary" size="large">
            <p>
              To start enjoying this product, you must have an iPhone with iOS 14 or later, an iPad with iPadOS 14 or later, or a Mac with macOS Big Sur or later.
            </p>
          </Body>
      </ModalBody>
      <ModalFooter>
      <TextLinkWrapper>
      <Button primary size="large" onClick={()=>this.props.onClose()} data-testid="CancelButton">
          Got it
      </Button>
      </TextLinkWrapper>
      </ModalFooter>
      </Modal>)
    }
}
export default ApplePerkInfoModal;
  
