import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Columns } from "react-bulma-components";
import { useAuth } from "../hooks/useAuth";
import { useMessagesContext } from "../hooks/MessagesContext";

import { DalyviaiApi } from "../services/dalyviai-api";

export const Dalyvis = ({ dalyvisId, dalyvis, onRowUpdate }) => {
    const { token } = useAuth();
    const { addMessage } = useMessagesContext();

    const onDeleteDalyvis = async (e) => {
        e.preventDefault();
        try {
            if (window.confirm("Nori ištrinti?")) {
                const dalyvis = await DalyviaiApi.deleteDalyviai(dalyvisId, token);

                if (dalyvis.error) {
                    throw new Error(dalyvis.error);
                }
                addMessage("Dalyvis pašalintas iš sąrašo.");

                onRowUpdate();
            }
        } catch (error) {
            addMessage(`Error: ${error}`);
        }
    }

    return (
        <Columns>
            <Columns.Column>
            </Columns.Column>
            <Columns.Column>
                {dalyvis.firstname}
            </Columns.Column>
            <Columns.Column>
                {dalyvis.lastname}
            </Columns.Column>
            <Columns.Column>
                {dalyvis.email}
            </Columns.Column>
            <Columns.Column>
                {new Date(dalyvis.birth_date).toLocaleDateString()}
            </Columns.Column>
            <Columns.Column>
                <span className="mx-3">
                    <FontAwesomeIcon icon={faPen} />
                </span>
                <span className="mx-3">
                    <FontAwesomeIcon icon={faTrash}
                        onClick={onDeleteDalyvis}
                    />
                </span>
            </Columns.Column>
        </Columns>
    );
};
