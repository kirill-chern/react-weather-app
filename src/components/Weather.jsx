function Weather() {
    return (
        <div className="container">
            <div className="cards">
                <h1>London</h1>
                <h5 className="py-4">
                    <i className="wi wi-day-sunny display-1"></i>
                </h5>
                <h2 className="py-2">25&deg;</h2>
                {minmaxTemp(15, 30)}
                <h4 className="py-3">Rain</h4>
            </div>
        </div>
    );
}

function minmaxTemp(min, max) {
    return (
        <h3>
            <span className="px-4">{min}&deg;</span>
            <span className="px-4">{max}&deg;</span>
        </h3>
    );
}

export default Weather;