import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { QUERY_MODEL } from '../../src/graphql/queries/models';
import { DataGrid } from '@mui/x-data-grid';
import TextField  from '@mui/material/TextField';
import _ from 'lodash';
import { decryptPrediction } from '../../src/encryption'
import { parse } from 'csv-parse/sync';
import {weiToEth} from '../../src/utils'

import {
    useQuery,
} from "@apollo/client";

function getColumns(list: Array<Object>) {
    if (list) {
        return _.map(list[0], (v: any, k: string) => {
            return { field: k, headerName: k }
        })
    } else {
        return []
    }
}

function Model({ Component, pageProps }: AppProps) {
    const router = useRouter();
    let { modelId } = router.query;
    if (typeof modelId !== "string") {
        modelId = ''
    }

    const queryModelResult = useQuery(QUERY_MODEL, {
        variables: { id: modelId },
    });

    {
        const { loading, error } = queryModelResult;
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {JSON.stringify(error)}</p>;
    }

    const model = queryModelResult.data.models[0]
    let symbols: string[] = []
    let predictions = _.map(model.predictions, (prediction, i) => {
        const decrypted = decryptPrediction(prediction.encryptedContent, prediction.contentKey)
        let rows = []
        if (decrypted) {
            rows = parse(decrypted, {
                columns: true,
                skip_empty_lines: true
            });
        }
        prediction = _.extend({
            'executionStartAtStr': new Date(+prediction['executionStartAt'] * 1000).toISOString(),
            'earningsEth': weiToEth(prediction['price']).times(prediction['shippedPurchaseCount']),
            'priceEth': weiToEth(prediction['price']),
        }, prediction)
        _.each(rows, (row) => {
            symbols.push(row.symbol)
            prediction['position.' + row.symbol] = (+row.position).toFixed(4)
        })
        return prediction
    })
    predictions = _.sortBy(predictions, (prediction) => {
        return -prediction.executionStartAt
    })
    symbols = _.sortBy(_.uniq(symbols))

    const predictionColumns = [
        { 'field': 'executionStartAtStr', 'headerName': 'time', 'width': 200 },
        { 'field': 'earningsEth', 'headerName': 'earnings (ETH)', 'width': 150 },
        { 'field': 'priceEth', 'headerName': 'price (ETH)', 'width': 100 },
    ]
    _.each(symbols, (symbol) => {
        predictionColumns.push({
            'field': 'position.' + symbol,
            'headerName': symbol,
            'width': 80
        })
    })

    return (
        <div>
            <h1>{modelId.toUpperCase()}</h1>

            <a href={process.env.NEXT_PUBLIC_ALPHASEA_ETHERSCAN_BASE_URL + '/address/' + model.owner}>{model.owner}</a>

            <h2>Prediction</h2>
            <div style={{ height: 400 }}>
                <DataGrid
                    rows={predictions}
                    columns={predictionColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>

            {/*<h2>Prediction</h2>*/}
            {/*<div style={{ height: 200 }}>*/}
            {/*    <DataGrid*/}
            {/*        rows={predictions}*/}
            {/*        columns={getColumns(predictions)}*/}
            {/*        pageSize={5}*/}
            {/*        rowsPerPageOptions={[5]}*/}
            {/*    />*/}
            {/*</div>*/}
        </div>
    )
}

export default Model
