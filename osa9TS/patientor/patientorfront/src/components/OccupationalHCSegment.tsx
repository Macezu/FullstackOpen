import React from "react";
import { Segment, Header, Icon } from "semantic-ui-react";
import { Entry } from "../types";

const OccupationalHealthcare= (entry : Entry) =>{
    if (entry.type === "OccupationalHealthcare"){
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
                    <Header as="h5" icon>
                    <Icon size="big" name="building" />
                    {entry.employerName}
                    </Header>
                </Segment>
            </Segment.Group>
            <Segment.Group>
              <Segment color="olive">
                <Header as="h5" icon>
                  <Icon size="huge" name="stethoscope" />
                  {entry.type}
                </Header>
              </Segment>
            </Segment.Group>
          </Segment.Group>
          );
    }  
};

export default OccupationalHealthcare;