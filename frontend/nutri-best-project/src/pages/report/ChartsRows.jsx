export default function ChartsRow({ top, weak }) {
    return <div className="row w-100 d-flex justify-content-evenly mt-2">
        <div className="col-md-6 mb-md-0 mb-5">
            {top}
        </div>
        <div className="col-md-6 mb-md-0 mb-5">
            {weak}
        </div>
    </div>
}