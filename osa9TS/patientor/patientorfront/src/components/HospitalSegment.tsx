import React from "react";
import { Segment,  Header, Icon } from "semantic-ui-react";
import { Entry } from "../types";

const HospitalSegment = (entry: Entry) => {
  if (entry.type === "Hospital") {
    return (
      <Segment.Group horizontal>
        <Segment.Group raised>
          <Segment><Icon size="big" name="folder open"/>{entry.date}</Segment>
          <Segment>{entry.description}</Segment>
        </Segment.Group>
        <Segment.Group>
          <Segment>
            <Header as="h4">Specialist: </Header>
          </Segment>
          <Segment textAlign="center">
            <i>{entry.specialist}</i>
          </Segment>
        </Segment.Group>
        <Segment.Group>
            <Segment>
                <Header as="h3">Discharged
                    <Header.Subheader>{entry.discharge.date}
                    </Header.Subheader>
                </Header>
            </Segment>
            <Segment>{entry.discharge.criteria}</Segment>       
        </Segment.Group>
        <Segment.Group>
          <Segment color="teal">
            <Header as="h5" icon>
              <Icon size="huge" name="hospital" />
              {entry.type}
            </Header>
          </Segment>
        </Segment.Group>
      </Segment.Group>
    );
  }
};

export default HospitalSegment;
