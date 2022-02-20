import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useMessagesContext } from "../hooks/MessagesContext";
import { Columns, Container, Heading } from "react-bulma-components";
import { Dalyvis } from "../components/Dalyvis";
import { DalyviaiApi } from "../services/dalyviai-api";
import { AddDalyvis } from "../components/AddDalyvis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaDown, faSortAlphaUp } from "@fortawesome/free-solid-svg-icons";

export const Dalyviai = () => {
    const [dalyviai, setDalyviai] = useState();
    const { token } = useAuth();

    const [sortDir, setSortDir] = useState(1);
    const [sortBy, setSortBy] = useState('lastname');

    const toggleSorting = (by) => {
        if (sortBy !== by) {
            setSortBy(by);
            setSortDir(1);
        }
        else {
            setSortDir(-sortDir);
        }
    }

    const { addMessage, removeMessage } = useMessagesContext();

    const fetchDalyviai = async () => {

        addMessage("Užkraunamas dalyvių sąrašas");
        // fetch dalyvius from api
        try {
            const allDalyviai = await DalyviaiApi.getDalyviai(token);

            if (allDalyviai.error) {
                addMessage(`Klaida: ${allDalyviai.error}`);
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
            addMessage(`Klaida: ${err}`);
            setDalyviai([]);
        }
    };

    // fetch dalyviai list on component load
    useEffect(() => {
        fetchDalyviai();
    }, []);


    const parsedDalyviai =
        (dalyviai && dalyviai.length > 0) ?
            dalyviai
                .sort(function (a, b) {
                    if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) return sortDir;
                    if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) return -sortDir;
                    return 0;
                })
                .map((dalyvis) => (
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
            <Columns className="table-header">
                <Columns.Column>
                    &nbsp;
                </Columns.Column>
                <Columns.Column onClick={() => toggleSorting('firstname')}>
                    Vardas
                    {(sortBy === 'firstname') && (
                        <span className="mx-3">
                            {(sortDir === 1) ? (
                                <FontAwesomeIcon icon={faSortAlphaDown} />
                            ) : (
                                <FontAwesomeIcon icon={faSortAlphaUp} />
                            )}
                        </span>
                    )}
                </Columns.Column>
                <Columns.Column onClick={() => toggleSorting('lastname')}>
                    Pavardė
                    {(sortBy === 'lastname') && (
                        <span className="mx-3">
                            {(sortDir === 1) ? (
                                <FontAwesomeIcon icon={faSortAlphaDown} />
                            ) : (
                                <FontAwesomeIcon icon={faSortAlphaUp} />
                            )}
                        </span>
                    )}
                </Columns.Column>
                <Columns.Column onClick={() => toggleSorting('email')}>
                    El. paštas
                    {(sortBy === 'email') && (
                        <span className="mx-3">
                            {(sortDir === 1) ? (
                                <FontAwesomeIcon icon={faSortAlphaUp} />
                            ) : (
                                <FontAwesomeIcon icon={faSortAlphaDown} />
                            )}
                        </span>
                    )}
                </Columns.Column>
                <Columns.Column onClick={() => toggleSorting('birth_date')}>
                    Gimimo data
                    {(sortBy === 'birth_date') && (
                        <span className="mx-3">
                            {(sortDir === 1) ? (
                                <FontAwesomeIcon icon={faSortAlphaUp} />
                            ) : (
                                <FontAwesomeIcon icon={faSortAlphaDown} />
                            )}
                        </span>
                    )}
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