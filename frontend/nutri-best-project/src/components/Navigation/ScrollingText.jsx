import { delay, motion } from 'framer-motion';

const ScrollingText = ({ text }) => {
    // const marqueeVariants = {
    //     animate: {
    //         x: [1000, -2000], // Adjust the values based on your text and container width
    //         transition: {
    //             x: {
    //                 repeat: Infinity,
    //                 repeatType: "loop",
    //                 duration: 25, // Adjust timing to your liking
    //                 ease: "linear",
    //                 delay: 0
    //             }
    //         }
    //     }
    // };

    const marqueeVariants = {
        animate: {
            x: [window.innerWidth, -window.innerWidth * 2], // Ensure it moves entirely off-screen
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 25, // Slower movement for smoother effect
                    ease: "easeIn" // Smooth start and end
                }
            }
        }
    };

    return (
        <div style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            color: '#eee', // Light grey text for contrast
            fontSize: '15px',
            fontFamily: 'Arial, sans-serif',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)', // Adjusted shadow for depth
            padding: '5px 0',
            fontWeight: 'bold',
            borderTop: '1px solid #555', // Top border for more definition
            borderBottom: '1px solid #555', // Bottom border to mirror the top
            borderRadius: '5px',
            background: 'linear-gradient(to right, #4b4b4b, #2c2c2c)'
        }}>
            <motion.div
                variants={marqueeVariants}
                animate="animate"
                whileHover={{cursor: "pointer"}}
            >
                {text}
            </motion.div>
        </div>
    );
};

export default ScrollingText;