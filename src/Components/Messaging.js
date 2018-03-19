import React from "react";
import { Button, Message, Icon } from "semantic-ui-react";

const Messaging = (props) => {
    const { negative, positive, messagehidden, confirmhidden, mheader, mcontent, cancelOp, deleteForGood } = props;
    return (
        <div>
            <Message icon negative={negative} info={positive} hidden={messagehidden} size="small">
                <Icon name='warning' style={{ fontSize: 15 }} />
                <Message.Content style={{ marginLeft: 10 }}>
                    {mheader ?
                        <Message.Header>{mheader}</Message.Header>
                        :
                        null
                    }
                    <p>{mcontent}</p>
                </Message.Content>
            </Message>
            <Message icon warning hidden={confirmhidden} size="small">
                <Icon name='warning' style={{ fontSize: 15 }} />
                <Message.Content style={{ marginLeft: 10 }}>
                    <Message.Header>{mheader}</Message.Header>
                    <p>{mcontent}</p>
                </Message.Content>
                <Button.Group>
                    <Button onClick={() => cancelOp()} >
                        Annuler
              </Button>
                    <Button onClick={() => deleteForGood()}>
                        Confirmer
              </Button>
                </Button.Group>
            </Message>
        </div>
    )
}

export default Messaging;