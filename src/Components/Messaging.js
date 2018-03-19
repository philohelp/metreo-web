import React from "react";
import { Button, Message, Icon } from "semantic-ui-react";

const Messaging = (props) => {
    const { hidden, negative, positive, confirmative, header, content, messageCancelOp, deleteForGood } = props;
    return (
        <div style={{ marginBottom: 12 }}>
            <Message icon negative={negative} info={positive} hidden={hidden} size="small">
                <Icon name='warning' style={{ fontSize: 15 }} />
                <Message.Content style={{ marginLeft: 10 }}>
                    {header &&
                        <Message.Header>{header}</Message.Header>
                    }
                    <p>{content}</p>
                </Message.Content>
                {
                    confirmative &&
                    <Button.Group>
                        <Button onClick={() => messageCancelOp()} >
                            Annuler
                        </Button>
                        <Button onClick={() => deleteForGood()}>
                            Confirmer
                        </Button>
                    </Button.Group>
                }
            </Message>
        </div>
    )
}

export default Messaging;