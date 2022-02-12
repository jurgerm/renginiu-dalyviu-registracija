import { useState } from "react";
import { Button, Columns, Container, Form, Icon } from "react-bulma-components";
import { NavigationType, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useMessagesContext } from "../hooks/MessagesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DalyviaiApi } from "../services/dalyviai-api";

export const AddDalyvis = ({ dalyvis_id, onAdded }) => {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [birth_date, setBirth_date] = useState('');
    const { token } = useAuth();

    const { addMessage } = useMessagesContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firstname || !lastname || !email || !birth_date) {
            addMessage("Užpildykite visus laukus dalyvį.")
            return;
        }

        try {
            const dalyvis = await DalyviaiApi.addDalyviai(
                {
                    firstname,
                    lastname,
                    email,
                    birth_date
                }, token);

            if (dalyvis.error) {
                throw new Error(dalyvis.error);
            }
            addMessage("Dalyvis pridėtas.");

            onAdded();

        } catch (error) {
            addMessage(`Error: ${error}`);
        }
    }
    
    return (
        <Columns>
            <Columns.Column>
                &nbsp;
            </Columns.Column>
            <Columns.Column>
                <Form.Input
                    value={firstname}
                    placeholder="Vardas"
                    onChange={(e) => setFirstname(e.target.value)}
                />
            </Columns.Column>

            <Columns.Column>
                <Form.Input
                    value={lastname}
                    placeholder="Pavardė"
                    onChange={(e) => setLastname(e.target.value)}
                />
            </Columns.Column>

            <Columns.Column>
                <Form.Input
                    value={email}
                    placeholder="El. paštas"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Columns.Column>

            <Columns.Column>
                <Form.Input
                    value={birth_date}
                    placeholder="Gimimo data"
                    onChange={(e) => setBirth_date(e.target.value)}
                />                
            </Columns.Column>
            <Columns.Column>
                <Button
                    fullwidth
                    rounded
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                ><Icon align="left">
                        <FontAwesomeIcon icon={faPlus} />
                    </Icon>
                </Button>
            </Columns.Column>
        </Columns>

    )
};


