import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { DataGrid } from '@mui/x-data-grid';
import { QUERY_MODELS } from '../src/graphql/queries/models';
import {useQuery} from "@apollo/client";
import _ from 'lodash';
import {weiToEth} from '../src/utils'
import NextLink from 'next/link'

const Home: NextPage = () => {
    const queryModelsResult = useQuery(QUERY_MODELS);
    {
        const { loading, error } = queryModelsResult;
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {JSON.stringify(error)}</p>;
    }
    let models = _.sortBy(queryModelsResult.data.models, (model) => {
        return -model.totalEarnings
    })
    models = _.map(models, (model, i) => {
        return _.extend({
            'rank': i + 1,
            'totalEarningsEth': weiToEth(model['totalEarnings']),
        }, model)
    })

    const leaderboardColumns = [
        { 'field': 'rank', 'headerName': 'Rank', 'width': 150 },
        {
            'field': 'id', 'headerName': 'Model ID', 'width': 150,
            'renderCell': (params: any) => (
                <NextLink
                    href={'/models/' + params.value}
                >
                    {params.value.toUpperCase()}
                </NextLink>
            ),
        },
        { 'field': 'totalEarningsEth', 'headerName': 'Earnings(ETH)', 'width': 150 },
        { 'field': 'purchaseCount', 'headerName': 'Purchases', 'width': 150 },
        { 'field': 'predictionCount', 'headerName': 'Predictions', 'width': 150 },
    ]

    return (
        <div className={styles.container}>
            <Head>
                <title>AlphaSea App</title>
                <meta name="description" content="AlphaSea is a decentralized marketplace for market alphas." />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    AlphaSea Leaderboard
                </h1>

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={models}
                        columns={leaderboardColumns}
                        pageSize={100}
                        rowsPerPageOptions={[100]}
                    />
                </div>
            </main>

            <footer className={styles.footer}>
            </footer>
        </div>
    )
}

export default Home
