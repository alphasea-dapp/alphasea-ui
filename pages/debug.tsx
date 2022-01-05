import type { AppProps } from 'next/app'
import { QUERY_TOURNAMENTS } from '../src/graphql/queries/tournaments';
import { QUERY_MODELS } from '../src/graphql/queries/models';
import { DataGrid } from '@mui/x-data-grid';
import TextField  from '@mui/material/TextField';
import _ from 'lodash';

import {
    useQuery,
} from "@apollo/client";

function getColumns(list: Array<Object>) {
    if (list) {
        return _.map(list[0], (v: Any, k: string) => {
            return { field: k, headerName: k }
        })
    } else {
        return []
    }
}

function Debug({ Component, pageProps }: AppProps) {
    const queryTournamentsResult = useQuery(QUERY_TOURNAMENTS);
    const queryModelsResult = useQuery(QUERY_MODELS);

    {
        const { loading, error } = queryTournamentsResult;
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {JSON.stringify(error)}</p>;
    }
    {
        const { loading, error } = queryModelsResult;
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {JSON.stringify(error)}</p>;
    }

    const graphqlEndpoint = process.env.NEXT_PUBLIC_ALPHASEA_THEGRAPH_ENDPOINT;

    return (
        <div>
            <h1>Debug Page</h1>

            <h2>Tournament</h2>
            <div style={{ height: 200 }}>
                <DataGrid
                    rows={queryTournamentsResult.data.tournaments}
                    columns={getColumns(queryTournamentsResult.data.tournaments)}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
            <TextField
                multiline
                value={JSON.stringify(queryTournamentsResult.data)}
                maxRows={4}
                style={{ width: '100%' }}
            />

            <h2>Model</h2>
            <div style={{ height: 200 }}>
                <DataGrid
                    rows={queryModelsResult.data.models}
                    columns={getColumns(queryModelsResult.data.models)}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
            <TextField
                multiline
                value={JSON.stringify(queryModelsResult.data)}
                maxRows={4}
                style={{ width: '100%' }}
            />

            <h2>Prediction</h2>

            <h2>Purchase</h2>

            <h2>Settings</h2>
            GraphQL endpoint <a href={graphqlEndpoint}>{graphqlEndpoint}</a>
        </div>
    )
}

export default Debug
