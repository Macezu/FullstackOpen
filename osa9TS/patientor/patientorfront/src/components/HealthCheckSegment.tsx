import  React,{ ReactElement } from "react";
import { Icon, Segment, Header } from "semantic-ui-react";
import { Entry, HealthCheckRating } from "../types";

const healthCheckIcon = ({healthCheckRating}: {healthCheckRating: HealthCheckRating; }): ReactElement => {
  switch (healthCheckRating) {
    case HealthCheckRating.Healthy:
      return <Icon size="big" name="heart" color="red"/>;
    case HealthCheckRating.LowRisk:
      return <Icon size="large" name="band aid" color="yellow"/>;
    case HealthCheckRating.HighRisk:
      return <Icon size="huge" name="alarm" />;
    case HealthCheckRating.CriticalRisk:
      return <Icon size="big" name="frown" />;
    default:
      return <li></li>;
  }
};

const HealthCheckSegment = (entry : Entry) => {
  if (entry.type == "HealthCheck"){
    return (
      <Segment.Group horizontal>
        <Segment.Group raised>
          <Segment>
            {healthCheckIcon(entry)} {entry.date}
          </Segment>
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
          <Segment color="green">
            <Header as="h5" icon>
              <Icon size="huge" name="clipboard" />
              {entry.type}
            </Header>
          </Segment>
        </Segment.Group>
      </Segment.Group>
    );
  }
};

export default HealthCheckSegment;
