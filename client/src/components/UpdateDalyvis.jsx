import { useState } from "react";
import { Button, Columns, Form, Icon } from "react-bulma-components";
import { useAuth } from "../hooks/useAuth";
import { useMessagesContext } from "../hooks/MessagesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { DalyviaiApi } from "../services/dalyviai-api";

export const UpdateDalyvis = ({ dalyvis, onUpdated, onCancelUpdate }) => {
    const [firstname, setFirstname] = useState(dalyvis.firstname);
    const [lastname, setLastname] = useState(dalyvis.lastname);
    const [email, setEmail] = useState(dalyvis.email);
    const [birth_date, setBirth_date] = useState(new Date(dalyvis.birth_date).toLocaleDateString());
    const { token } = useAuth();

    const { addMessage } = useMessagesContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firstname || !lastname || !email || !birth_date) {
            addMessage("Užpildykite visus laukus apie dalyvį.")
            return;
        }

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
            addMessage(`Error: ${error}`);
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
                <span className="mx-1">
                    <Button
                        rounded
                        color="primary"
                        type="submit"
                        onClick={handleSubmit}
                    ><Icon align="left"
                        title="Išsaugoti pakeitimus"
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
                        title="Nesaugoti pakeitimų"
                    >
                            <FontAwesomeIcon icon={faTimes} />
                        </Icon>
                    </Button>
                </span>
            </Columns.Column>
        </Columns >
    )
};


