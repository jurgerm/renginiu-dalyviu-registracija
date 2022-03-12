import { useState } from "react";
import { Button, Columns, Form, Icon } from "react-bulma-components";
import { useAuth } from "../hooks/useAuth";
import { useMessagesContext } from "../hooks/MessagesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { DalyviaiApi } from "../services/dalyviai-api";
import { validateEmail } from "../services/validation";
import { setFirstnameError, setLastnameError, setEmailError, setBirth_dateError } from "../services/dalyvioValidacija";

export const UpdateDalyvis = ({ dalyvis, onUpdated, onCancelUpdate }) => {
    const [firstname, setFirstname] = useState(dalyvis.firstname);
    const [lastname, setLastname] = useState(dalyvis.lastname);
    const [email, setEmail] = useState(dalyvis.email);
    const [birth_date, setBirth_date] = useState(new Date(dalyvis.birth_date).toLocaleDateString());
    const { token } = useAuth();

    const { addMessage } = useMessagesContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firstname) {
            addMessage("Įrašykite vardą.");
            setFirstnameError(dalyvis.id, true);
            return;
        }

        setFirstnameError(dalyvis.id, false);

        if (!lastname) {
            addMessage("Įrašykite pavardę.");
            setLastnameError(dalyvis.id, true);
            return;
        }

        setLastnameError(dalyvis.id, false);

        if (!email) {
            addMessage("Įrašykite el. paštą.");
            setEmailError(dalyvis.id, true);
            return;
        }

        if (!validateEmail(email)) {
            addMessage(`Klaida! Prašome įvesti galiojantį el. paštą.`);
            setEmailError(dalyvis.id, true);
            return;
        }

        setEmailError(dalyvis.id, false);

        if (!birth_date) {
            addMessage("Klaida! Įrašykite gimimo datą.");
            setBirth_dateError(dalyvis.id, true);
            return;
        }

        if (new Date(birth_date).toLocaleDateString() === 'Invalid Date') {
            addMessage("Klaida! Įrašykite gimimo datą formatu YYYY-MM-DD.");

            setBirth_dateError(dalyvis.id, true);

            return;
        }

        const dalyvio_metai = new Date(birth_date).getFullYear();
        const einamieji_metai = new Date().getFullYear();
        if (einamieji_metai - dalyvio_metai < 0) {
            addMessage("Dalyvis dar negimęss :D.");
            setBirth_dateError(dalyvis.id, true);
            return;
        }

        setBirth_dateError(dalyvis.id, false);

        try {
            const dalyvisToUpdate = {
                firstname,
                lastname,
                email,
                birth_date: new Date(birth_date).toLocaleDateString(),
                id: dalyvis.id
            };
            const result = await DalyviaiApi.updateDalyviai(dalyvisToUpdate, token);

            if (result.error) {
                throw new Error(dalyvis.error);
            }
            addMessage("Dalyvis atnaujintas.");

            onUpdated();
        } catch (error) {
            addMessage(`Klaida: ${error}`);
        }
    }

    return (
        <Columns className="table-row">
            <Columns.Column>
                &nbsp;
            </Columns.Column>
            <Columns.Column>
                <Form.Input
                    value={firstname}
                    title="Vardas"
                    placeholder="Vardas"
                    onChange={(e) => setFirstname(e.target.value)}
                    id={`firstName_${dalyvis.id}`}
                />
            </Columns.Column>

            <Columns.Column>
                <Form.Input
                    value={lastname}
                    title="Pavardė"
                    placeholder="Pavardė"
                    onChange={(e) => setLastname(e.target.value)}
                    id={`lastName_${dalyvis.id}`}
                />
            </Columns.Column>

            <Columns.Column>
                <Form.Input
                    value={email}
                    title="El. paštas"
                    placeholder="El. paštas"
                    onChange={(e) => setEmail(e.target.value)}
                    id={`email_${dalyvis.id}`}
                />
            </Columns.Column>

            <Columns.Column>
                <Form.Input
                    value={birth_date}
                    title="Gimimo data"
                    placeholder="Gimimo data"
                    onChange={(e) => setBirth_date(e.target.value)}
                    id={`birth_date_${dalyvis.id}`}
                />
            </Columns.Column>
            <Columns.Column>
                <span className="mx-1">
                    <Button
                        rounded
                        color="primary"
                        type="submit"
                        onClick={handleSubmit}
                    ><Icon align="left"
                        title="Išsaugoti pakeitimus."
                    >
                            <FontAwesomeIcon icon={faSave} />
                        </Icon>
                    </Button>
                </span>
                <span className="mx-1">
                    <Button
                        rounded
                        color="secondary"
                        type="submit"
                        onClick={onCancelUpdate}
                    ><Icon align="left"
                        title="Nesaugoti pakeitimų."
                    >
                            <FontAwesomeIcon icon={faTimes} />
                        </Icon>
                    </Button>
                </span>
            </Columns.Column>
        </Columns >
    )
};


