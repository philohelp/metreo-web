import React from "react";
import withAuthorization from "./withAuthorization";

import { Grid, Button, Menu, Segment, Image } from "semantic-ui-react";

import AddGroup from "./AddGroup";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "Ajouter des élèves"
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <Grid centered style={{ marginTop: 20 }}>
        <Grid.Column computer={14}>
          <Menu pointing>
            <Menu.Item
              name="Ajouter des élèves"
              active={activeItem === "Ajouter des élèves"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Editer mes classes"
              active={activeItem === "Editer mes classes"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Personnaliser les évaluations"
              active={activeItem === "Personnaliser les évaluations"}
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
            {activeItem === "Ajouter des élèves"
              ? <Segment style={{paddingBottom:50}}><AddGroup /></Segment>
              : activeItem === "Editer mes classes"
                  ? <Segment>
                      Hello mes classes
                    </Segment>
                  : activeItem === "Personnaliser les évaluations"
                      ? <Segment>
                          Hello ma personnalisation
                        </Segment>
                      : activeItem === "Mes infos"
                          ? <Segment>
                              Hello mes infos
                            </Segment>
                          : null}

          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(Home);
