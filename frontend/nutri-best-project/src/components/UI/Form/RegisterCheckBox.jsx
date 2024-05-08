// eslint-disable-next-line react/prop-types
export default function RegisterCheckBox({text}) {
    return <div className="checkbox px-3 d-flex justify-content-start">
        <div className="container d-flex justify-content-evenly">
            <div className="row">
                <div className="col-md-1 d-flex justify-content-center align-items-start mt-1">
                    <input type="checkbox" name="terms" id="terms" />
                </div>
                <div className="col-md-11 d-flex justify-content-center align-items-center">
                    <label htmlFor="terms">{text}</label>
                </div>
            </div>
        </div>
    </div>
}