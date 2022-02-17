import { useState } from "react";
import { Button, Columns, Form, Icon } from "react-bulma-components";
import { useAuth } from "../hooks/useAuth";
import { useMessagesContext } from "../hooks/MessagesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DalyviaiApi } from "../services/dalyviai-api";
import { validateEmail } from "../services/validation";

export const AddDalyvis = ({ onAdded }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [birth_date, setBirth_date] = useState('');
    const { token } = useAuth();

    const { addMessage } = useMessagesContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firstname) {
            addMessage("Įrašykite vardą.")
            return;
        }

        if (!lastname) {
            addMessage("Įrašykite pavardę.")
            return;
        }

        if (!email) {
            addMessage("Įrašykite el. paštą.")
            return;
        }

        if (!validateEmail(email)) {
            addMessage(`Klaida! Prašome įvesti galiojantį el. paštą.`);
            return;
        }

        if (!birth_date) {
            addMessage("Klaida! Įrašykite gimimo datą.")
            return;
        }

        if (new Date(birth_date).toLocaleDateString() == 'Invalid Date') {
            addMessage("Klaida! Įrašykite gimimo datą formatu YYYY-MM-DD.")
            return;
        }

        // if (!firstname || !lastname || !email || !birth_date) {
        //     addMessage("Užpildykite visus laukus dalyvį.")
        //     return;
        // }

        try {
            const dalyvis = {
                firstname,
                lastname,
                email,
                birth_date
            };
            const result = await DalyviaiApi.addDalyviai(dalyvis, token);

            if (result.error) {
                throw new Error(dalyvis.error);
            }
            addMessage("Dalyvis pridėtas.");

            onAdded();
        } catch (error) {
            addMessage(`Klaida: ${error}`);
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
                    title="Vardas"
                    placeholder="Vardas"
                    onChange={(e) => setFirstname(e.target.value)}
                />
            </Columns.Column>

            <Columns.Column>
                <Form.Input
                    value={lastname}
                    title="Pavardė"
                    placeholder="Pavardė"
                    onChange={(e) => setLastname(e.target.value)}
                />
            </Columns.Column>

            <Columns.Column>
                <Form.Input
                    value={email}
                    title="El. paštas"
                    placeholder="El. paštas"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Columns.Column>

            <Columns.Column>
                <Form.Input
                    value={birth_date}
                    title="Gimimo data"
                    placeholder="Gimimo data"
                    onChange={(e) => setBirth_date(e.target.value)}
                />
            </Columns.Column>
            <Columns.Column>
                <Button
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


