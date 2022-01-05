import type { AppProps } from 'next/app'
import { QUERY_TOURNAMENTS } from '../src/graphql/queries/tournaments';
import { QUERY_MODELS } from '../src/graphql/queries/models';
import { DataGrid } from '@mui/x-data-grid';

import {
    useQuery,
    gql
} from "@apollo/client";

function getColumns(list: Array<Object>) {
    if (list) {
        const columns = [];
        for (let key in list[0]) {
            columns.push({ field: key, headerName: key });
        }
        return columns
    } else {
        return []
    }
}

function Debug({ Component, pageProps }: AppProps) {
    let tournaments;
    {
        const {loading, error, data} = useQuery(QUERY_TOURNAMENTS);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {JSON.stringify(error)}</p>;
        tournaments = data.tournaments;
    }

    let models;
    {
        const {loading, error, data} = useQuery(QUERY_MODELS);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {JSON.stringify(error)}</p>;
        models = data.models;
    }

    const graphqlEndpoint = process.env.NEXT_PUBLIC_ALPHASEA_THEGRAPH_ENDPOINT;

    return (
        <div>
            <h1>Debug Page</h1>

            <h2>Tournament</h2>
            <div style={{ height: 200 }}>
                <DataGrid
                    rows={tournaments}
                    columns={getColumns(tournaments)}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
            {JSON.stringify(tournaments)}

            <h2>Model</h2>
            <div style={{ height: 200 }}>
                <DataGrid
                    rows={models}
                    columns={getColumns(models)}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
            {JSON.stringify(models)}

            <h2>Prediction</h2>

            <h2>Purchase</h2>

            <h2>Settings</h2>
            GraphQL endpoint <a href={graphqlEndpoint}>{graphqlEndpoint}</a>
        </div>
    )
}

export default Debug
