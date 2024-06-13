/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

export default function LiveUsersCount({ liveUsers }) {
    return <h5 className="text-center mt-3">
        &#x1F7E2;
        <Link to="/live/dashboard" className="text-success">
            Live:&nbsp;{liveUsers &&
                JSON.stringify(liveUsers
                    .map(x => x.count)
                    .reduce((acc, x) => acc += x, 0))}
        </Link>
    </h5>
}