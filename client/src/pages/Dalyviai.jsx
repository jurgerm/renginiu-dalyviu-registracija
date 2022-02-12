import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useMessagesContext } from "../hooks/MessagesContext";
import { Columns, Container, Heading } from "react-bulma-components";
import { Dalyvis } from "../components/Dalyvis";
import { DalyviaiApi } from "../services/dalyviai-api";
import { AddDalyvis } from "../components/AddDalyvis";

export const Dalyviai = () => {
    const [dalyviai, setDalyviai] = useState();
    const { token } = useAuth();

    const { addMessage, removeMessage } = useMessagesContext();

    const fetchDalyviai = async () => {

        addMessage("Užkraunamas dalyvių sąrašas");
        // fetch dalyvius from api
        try {
            const allDalyviai = await DalyviaiApi.getDalyviai(token);

            if (allDalyviai.error) {
                addMessage(`ERROR: ${allDalyviai.error}`);
                setDalyviai([]);
                return;
            }

            removeMessage();

            if (!allDalyviai || !allDalyviai.dalyviai || (allDalyviai.dalyviai && allDalyviai.dalyviai.length === 0)) {
                addMessage("Nėra dalyvių.");
            }
            // save fetched dalyviai to local state
            setDalyviai(allDalyviai.dalyviai);

        }
        catch (err) {
            console.log({ err });
            addMessage(`ERROR: ${err}`);
            setDalyviai([]);
        }
    };

    // fetch questions list on component load
    useEffect(() => {
        fetchDalyviai();
    }, []);


    const parsedDalyviai =
        (dalyviai && dalyviai.length > 0) ?
            dalyviai.map((dalyvis) => (
                <Dalyvis
                    key={dalyvis.id}
                    dalyvisId={dalyvis.id}
                    dalyvis={dalyvis}
                    onRowUpdate={fetchDalyviai}
                />
            )) : (
                <p>
                    ¯\_(ツ)_/¯
                </p>
            )
        ;

    return (
        <Container>
            <Heading>
                Dalyvių sąrašas
            </Heading>
            <Columns>
                <Columns.Column>
                    &nbsp;
                </Columns.Column>
                <Columns.Column>
                    Vardas
                </Columns.Column>
                <Columns.Column>
                    Pavardė
                </Columns.Column>
                <Columns.Column>
                    El. paštas
                </Columns.Column>
                <Columns.Column>
                    Gimimo data
                </Columns.Column>
                <Columns.Column>
                    &nbsp;
                </Columns.Column>
            </Columns>
            {parsedDalyviai}
            <AddDalyvis onAdded={fetchDalyviai}> </AddDalyvis>
        </Container>
    );
};