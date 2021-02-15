import "./Form.css";

function Form(props) {
  return (
    <div className="form">
    <div>{props.error ? error() : null}</div>
    <form onSubmit={props.loadWeather}>
        <div className="row">
            <div className="col-md-3 offset-md-2">
            <input
                type="text"
                className="form__item"
                name="city"
                autoComplete="off"
                placeholder="city"
            />
            </div>
            <div className="col-md-3">
            <input
                type="text"
                className="form__item"
                name="country"
                autoComplete="off"
                placeholder="country"
            />
            </div>
            <div className="col-md-3 mt-md-0 text-md-left">
            <button className="btn btn-success">Get weather</button>
            </div>
        </div>
    </form>
     </div>
  );
}

function error() {
    return (
        <div className="alert alert-danger mx-5" role="alert">
            Please enter city and country
        </div>
    );
}

export default Form;
