/* eslint-disable react/prop-types */
import styles from "./css/LiveUsers.module.css";
import { motion } from "framer-motion";

const LiveUsers = ({ liveUsers }) => {
    return (
      <div className="container mt-3">
        <div className="row d-flex justify-content-evenly">
          {liveUsers.map((user, index) => (
            <motion.div
              key={index}
              className="col-xl-3 col-md-4 col-sm-6 mb-4 d-flex justify-content-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`card h-100 shadow-sm ${styles["user-route-card"]} position-relative`}>
                <div className="card-body">
                  <h5 className="card-title">Route: {user.route}</h5>
                  <p className="card-text">Users: {user.count}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };
  
  export default LiveUsers;