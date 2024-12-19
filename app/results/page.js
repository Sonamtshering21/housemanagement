import styles from './results.module.css'
const ResultsPage = ({ searchParams }) => {
    const { location, date, typeofhouse, price } = searchParams; // Access the query parameters

    return (
        <div>
            <h1>Results Page</h1>
            <div className={styles.details}>
                <p>Location: {location}</p>
                <p>Date: {date}</p>
                <p>Type of House: {typeofhouse}</p>
                <p>Price: {price}</p>
            </div>
            <div className={styles.displaystatus}>
                <p>Sort By:Popular</p>
                <p>User Rating (Highest First)</p>
                <p>Price (Highest First)</p>
                <p>Price (Lowest First)</p>
            </div>
            <div className={styles.resultscontent}>
                <img src='/bhutan.jpg' width={300} height={300} />
                <p>SinQ The Party Hotel (No Stags Allowed)
                Candolim | 10 minutes walk to Sinquerium Beach
                Couple Friendly
                Swimming PoolSwimming Pool
                Book Party Cottage and Pool View Room Get Free Entry in SinQ Night Club once during the stay per person 
                Book Party Cottage and Pool View Room Get Free Entry in SinQ Night Club once during the stay per person</p>
                <p>Very good Rating
                    price 2000rs
                    login and book now pay later
                </p>
            </div>
            <div className={styles.resultscontent}>
                <img src='/bhutan.jpg' width={300} height={300} />
                <p>SinQ The Party Hotel (No Stags Allowed)
                Candolim | 10 minutes walk to Sinquerium Beach
                Couple Friendly
                Swimming PoolSwimming Pool
                Book Party Cottage and Pool View Room Get Free Entry in SinQ Night Club once during the stay per person 
                Book Party Cottage and Pool View Room Get Free Entry in SinQ Night Club once during the stay per person</p>
                <p>Very good Rating
                    price 2000rs
                    login and book now pay later
                </p>
            </div>
            <div className={styles.resultscontent}>
                <img src='/bhutan.jpg' width={300} height={300} />
                <p>SinQ The Party Hotel (No Stags Allowed)
                Candolim | 10 minutes walk to Sinquerium Beach
                Couple Friendly
                Swimming PoolSwimming Pool
                Book Party Cottage and Pool View Room Get Free Entry in SinQ Night Club once during the stay per person 
                Book Party Cottage and Pool View Room Get Free Entry in SinQ Night Club once during the stay per person</p>
                <p>Very good Rating
                    price 2000rs
                    login and book now pay later
                </p>
            </div>
        </div>
    );
};

export default ResultsPage;
