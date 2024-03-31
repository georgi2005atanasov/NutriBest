// eslint-disable-next-line react/prop-types
export default function LoginCheckBox({ text }) {
    return <div className="checkbox d-flex justify-content-start">
        <div className="container d-flex justify-content-start">
            <div className="row d-flex flex-row justify-content-center align-items-center">
                <div className="col-md-2 mt-1">
                    <input type="checkbox" name="remember" id="remember" />
                </div>
                <div className="col-md-10 d-flex justify-content-center align-items-center">
                    <label className="fw-lighter" htmlFor="remember">{text}</label>
                </div>
            </div>
        </div>
    </div>
}