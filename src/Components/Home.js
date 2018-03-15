import React from "react";
import withAuthorization from "./withAuthorization";

import { Grid, Menu, Segment } from "semantic-ui-react";

import AddGroup from "./AddGroup";
import EditStudents from "./EditStudents";
import EditEvals from "./EditEvals";
import EditComs from "./EditComs";
import EditTopics from "./EditTopics";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "Élèves"
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <Grid centered style={{ marginTop: 20 }}>
        <Grid.Column computer={14}>
          <Menu pointing size="huge" stackable>
            <Menu.Item
              name="Élèves"
              active={activeItem === "Élèves"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Classes"
              active={activeItem === "Classes"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Évaluations"
              active={activeItem === "Évaluations"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Remarques"
              active={activeItem === "Remarques"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Sujets"
              active={activeItem === "Sujets"}
              onClick={this.handleItemClick}
            />
            <Menu.Menu
              position="right"
            >
              <Menu.Item
                name="Mes infos"
                active={activeItem === "Mes infos"}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
          </Menu>
          <div>
            {activeItem === "Élèves"
              ? <Segment style={{ paddingBottom: 50 }}><AddGroup /></Segment>
              : activeItem === "Classes"
                ? <div>
                  <EditStudents />
                </div>
                : activeItem === "Évaluations"
                  ? <div>
                    <EditEvals />
                  </div>
                  : activeItem === "Remarques"
                    ? <div>
                      <EditComs />
                    </div>
                    : activeItem === "Sujets"
                      ? <div>
                        <EditTopics />
                      </div>
                      : activeItem === "Mes infos"
                        ? <div>
                          Hello mes infos
                            </div>
                        : null}

          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(Home);
