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
        return [
            -model.totalEarnings,
            -model.predictionCount,
            model.id,
        ]
    })
    models = _.map(models, (model, i) => {
        return _.extend({
            'rank': i + 1,
            'totalEarningsEth': weiToEth(model['totalEarnings']),
            'tournamentId': model.tournament.id,
        }, model)
    })

    const leaderboardColumns = [
        { 'field': 'rank', 'headerName': 'Rank', 'width': 100 },
        // { 'field': 'tournamentId', 'headerName': 'Tournament', 'width': 150 },
        {
            'field': 'id', 'headerName': 'Model ID', 'width': 200,
            'renderCell': (params: any) => (
                <NextLink
                    href={'/models/' + params.value}
                >
                    {params.value.toUpperCase()}
                </NextLink>
            ),
        },
        { 'field': 'totalEarningsEth', 'headerName': 'Earnings(MATIC)', 'width': 150 },
        { 'field': 'purchaseCount', 'headerName': 'Purchases', 'width': 100 },
        { 'field': 'predictionCount', 'headerName': 'Predictions', 'width': 100 },
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

                {/*<h2>Statistics</h2>*/}

                {/*<p>Earnings (MATIC): {0}</p>*/}
                {/*<p>Mean of sharpe: {0}</p>*/}
                {/*<p>Sharpe of all models ensemble: {0}</p>*/}
                {/*<p>Sharpe of top model (leak): {0}</p>*/}
                {/*<p>Sharpe of top 5 models ensemble (leak): {0}</p>*/}
                {/*<p>Sharpe of top 10 models ensemble (leak): {0}</p>*/}
                {/*<p>Mean of purchased models sharpe (equal weighted): {0}</p>*/}
                {/*<p>Mean of purchased models sharpe (count weighted): {0}</p>*/}
                {/*<p>Mean of purchased models sharpe (earnings weighted): {0}</p>*/}

                {/*<p>meta model</p>*/}
                {/*<p>Sharpe of purchased models ensemble (equal weighted): {0}</p>*/}
                {/*<p>Sharpe of purchased models ensemble (count weighted): {0}</p>*/}
                {/*<p>Sharpe of purchased models ensemble (earnings weighted): {0}</p>*/}

                {/*<p>Last published round return distribution (all vs purchased)</p>*/}
                {/*<p>Sharpe distribution (all vs purchased)</p>*/}

                {/*<p>notes</p>*/}
                {/*<p>Sharpe ratio is calculated by last {0} days</p>*/}
                {/*<p>Leak means that it cannot actually be reproducible.</p>*/}
            </main>

            <footer className={styles.footer}>
            </footer>
        </div>
    )
}

export default Home
