import React, { useState, useEffect } from 'react'
import './About.scss'
import { motion } from 'framer-motion';
// import { images } from "../../constants"
import  { urlFor, client} from "../../client"
import { AppWrap ,MotionWrap} from "../../wrapper"


// const abouts1 = [
//   {
//     title: "Web Development",
//     description: "I build responsive and scalable web applications.",
//     imageUrl: images?.about01,
//   },
//   {
//     title: "Frontend Development",
//     description: "I create modern, responsive and interactive UI using React.",
//     imageUrl: images?.about02,
//   },
//   {
//     title: "Backend Development",
//     description: "I develop secure and scalable APIs using Node.js & Express.",
//     imageUrl: images?.about03,
//   },
//   {
//     title: "UI/UX Design",
//     description: "I design clean, user-friendly and modern interfaces.",
//     imageUrl: images.about04,
//   },
// ];


const About = () => {

  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query)
      .then((data) => {
        setAbouts(data);
      })
      .catch((err) => {
        console.error("Error fetching about data:", err);
      });
  }, []);


const order = {
  "Full Stack Development": 1,
  "Frontend Development": 2,
  "Backend Development": 3,
  "API Integration":4,
  "Database Design & Optimization":5
};

const sortedAbouts = [...abouts].sort((a, b) => {
  return (order[a.title] || 99) - (order[b.title] || 99);
});



// console.log("abouts",abouts)





  return (
    <>
    <h2 className="head-text">
      I Know <span>Good design.</span> 
      <br />
      Solid code. <span>Better business.</span>
    </h2>
    <div className="app__profiles">

      {sortedAbouts.map((about, index) => (
         <motion.div
         whileInView={{ opacity: 1 }}
         whileHover={{ scale: 1.1 }}
         transition={{ duration: 0.5, type: 'tween' }}
         className="app__profile-item"
         key={about.title + index}
         >
          <img src={urlFor(about?.imgUrl).url() || null} alt={about.title} />
          <h2 className="bold-text" style={{ marginTop: 20 }}>{about.title}</h2>
          <p className="p-text" style={{ marginTop: 10 }}>{about.description}</p>
         </motion.div>
      ))}

    </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);
