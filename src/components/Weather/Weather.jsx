function Weather(props) {
    return (
        <div className="container text-light">
            <div className="cards pt-4">
                <h1>{props.city}</h1>
                <h5 className="py-4">
                    <i className={`wi ${props.weatherIcon} display-1`}></i>
                </h5>
                { props.temp_celsius ? <h2 className="py-2">{props.temp_celsius}&deg;</h2> : null }
                {minmaxTemp(props.temp_min, props.temp_max)}
                <h4 className="py-3">{props.description.toUpperCase()}</h4>
            </div>
        </div>
    );
}

function minmaxTemp(min, max) {
    if( min && max ) {
        return (
            <h3>
                <span className="px-4">{min}&deg;</span>
                <span className="px-4">{max}&deg;</span>
            </h3>
        );
    }
}

export default Weather;